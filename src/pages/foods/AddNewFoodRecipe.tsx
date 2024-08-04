import { AddFoodRecipeRequest, RecipeItem } from "@app/api/foods";
import FOOD_API from "@app/api/foods/type";
import INGREDIENT_API from "@app/api/ingredients";
import { BaseButton } from "@app/components/common/BaseButton/BaseButton";
import { BaseCol } from "@app/components/common/BaseCol/BaseCol";
import { BaseModal } from "@app/components/common/BaseModal/BaseModal";
import { BaseRow } from "@app/components/common/BaseRow/BaseRow";
import { BaseForm } from "@app/components/common/forms/BaseForm/BaseForm";
import { BaseInput } from "@app/components/common/inputs/BaseInput/BaseInput";
import { BaseSelect } from "@app/components/common/selects/BaseSelect/BaseSelect";
import { IngredientTypes } from "@app/modules/admin/pages/ingredients/type";
import { fieldValidate, SelectTypes } from "@app/utils/helper";
import { useMutation, useQuery } from "@tanstack/react-query";
import { message, Spin } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

type AddNewFoodRecipeProps = {
  afterClosedDialog: (value: RecipeItem) => void;
};

const AddNewFoodRecipe = (
  { afterClosedDialog }: AddNewFoodRecipeProps,
  ref: any
) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = BaseForm.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [ingredientOptions, setIngredientOptions] = useState<SelectTypes[]>([]);

  const {
    isLoading: isLoadingGetIngredient,
    refetch: getIngredients,
    data: ingredientsList,
  } = useQuery(["get-ingredients"], INGREDIENT_API.GET_INGREDIENTS, {
    enabled: false,
    onSuccess: (response: IngredientTypes[]) => {
      const convertResult: SelectTypes[] = response.map((item) => {
        return {
          label: item.ingredientName,
          value: item.ingredientID,
        };
      });
      setIngredientOptions(convertResult);
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Get ingredient is failed",
      });
    },
  });

  const { isLoading: isLoadingAddNewRecipe, mutate: mutateAddNewRecipe } =
    useMutation(FOOD_API.ADD_FOOD_RECIPE, {
      onError: () => {
        messageApi.open({
          type: "error",
          content: "Add new recipe is failed",
        });
      },
    });

  useImperativeHandle(ref, () => {
    return {
      openModal: (foodId: number) => {
        form.setFieldValue("foodID", foodId);
        setIsOpenModal(true);
      },
    };
  });
  const onCloseModal = () => setIsOpenModal(false);

  const onSubmitForm = (value: AddFoodRecipeRequest) => {
    mutateAddNewRecipe(
      {
        ...value,
        foodID: form.getFieldValue("foodID"),
      },
      {
        onSuccess: () => {
          messageApi.open({
            type: "success",
            content: "Add new recipe is successful",
          });

          const ingredientItem = ingredientsList?.find(
            (item) => Number(item.ingredientID) === value.ingredientID
          );

          afterClosedDialog({
            ...value,
            ingredientName: ingredientItem?.ingredientName || "",
            ingredientPhoto: ingredientItem?.ingredientPhoto || "",
            recipeID: 1,
          });

          onCloseModal();
        },
      }
    );
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <BaseModal
      title="Add New Recipe"
      open={isOpenModal}
      onCancel={onCloseModal}
      footer={null}
    >
      {contextHolder}
      <Spin spinning={isLoadingGetIngredient || isLoadingAddNewRecipe}>
        <BaseForm
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={onSubmitForm}
        >
          <BaseRow gutter={[20, 20]}>
            <BaseCol span={24}>
              <BaseForm.Item
                name="ingredientID"
                label="Ingredient"
                rules={[fieldValidate.required]}
              >
                <BaseSelect options={ingredientOptions} />
              </BaseForm.Item>
            </BaseCol>

            <BaseCol span={24}>
              <BaseForm.Item
                name="unit"
                label="Unit"
                rules={[fieldValidate.required]}
              >
                <BaseInput placeholder="Unit..." />
              </BaseForm.Item>
            </BaseCol>

            <BaseCol span={24}>
              <BaseForm.Item
                name="quantity"
                label="Quantity"
                rules={[
                  fieldValidate.required,
                  { min: 1, message: "Quantity minimum muts be 1" },
                ]}
              >
                <BaseInput placeholder="Quantity..." min={1} />
              </BaseForm.Item>
            </BaseCol>

            <BaseCol span={24}>
              <div className="flex items-center justify-end gap-x-2">
                <BaseButton onClick={onCloseModal}>Cancel</BaseButton>
                <BaseButton type="primary" htmlType="submit">
                  Submit
                </BaseButton>
              </div>
            </BaseCol>
          </BaseRow>
        </BaseForm>
      </Spin>
    </BaseModal>
  );
};

export default forwardRef(AddNewFoodRecipe);
