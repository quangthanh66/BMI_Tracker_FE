import { RecipeItem, TFoodItem } from "@app/api/foods";
import { BaseModal } from "@app/components/common/BaseModal/BaseModal";
import { BaseTable } from "@app/components/common/BaseTable/BaseTable";
import _ from "lodash";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { FoodRecipeColumns } from "./FoodRecipeColumn";
import { useMutation } from "@tanstack/react-query";
import FOOD_API from "@app/api/foods/type";
import { message, Spin } from "antd";
import { BaseButton } from "@app/components/common/BaseButton/BaseButton";
import { PlusOutlined } from "@ant-design/icons";
import AddNewFoodRecipe from "./AddNewFoodRecipe";

type ViewDetailProps = {
  refreshFoods: () => void;
};

const ViewDetailRecipeDialog = (
  { refreshFoods }: ViewDetailProps,
  ref: any
) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [recipeItem, setRecipeItem] = useState<RecipeItem[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [foodId, setFoodId] = useState("");

  const addNewRecipeRef = useRef<any>();

  const { isLoading: isLoadingRemoveRecipe, mutate: handleRemoveFoodRecipe } =
    useMutation(FOOD_API.REMOVE_FOOD_RECIPE, {
      onError: () => {
        messageApi.open({
          type: "error",
          content: "Delete recipe is failed",
        });
      },
    });

  useImperativeHandle(ref, () => {
    return {
      openModal: (value: TFoodItem) => {
        setRecipeItem(value.recipes);
        setFoodId(value.foodID);
        setIsOpenModal(true);
      },
    };
  });
  const onCloseModal = () => {
    refreshFoods();
    setIsOpenModal(false);
  };

  const onDeleteFoodRecipe = (recipeId: number) => {
    handleRemoveFoodRecipe(recipeId, {
      onSuccess: () => {
        messageApi.open({
          type: "success",
          content: "Delete recipe is successful",
        });

        const filterRecipeResult = recipeItem.filter(
          (item) => item.recipeID !== recipeId
        );
        setRecipeItem(filterRecipeResult);
        refreshFoods();
      },
    });
  };

  const onOpenAddNewRecipeDialog = () =>
    addNewRecipeRef.current.openModal(Number(foodId));

  const afterClosedAddNewRecipeDialog = (value: RecipeItem) => {
    setRecipeItem([...recipeItem, value]);
  };

  return (
    <BaseModal
      title="Detail Recipe"
      open={isOpenModal}
      onCancel={onCloseModal}
      footer={
        <div className="flex items-center justify-end gap-2 w-full py-2">

          <BaseButton
            type="primary"
            icon={<PlusOutlined />}
            onClick={onOpenAddNewRecipeDialog}
          >
            Add ingredient
          </BaseButton>
        </div>
      }
      width={1000}
      bodyStyle={{
        margin: 30,
        height: '525px',
      }}
    >
      {contextHolder}

      <AddNewFoodRecipe
        ref={addNewRecipeRef}
        afterClosedDialog={afterClosedAddNewRecipeDialog}/>
      <Spin spinning={isLoadingRemoveRecipe} tip="Loading...">
        <BaseTable
          columns={FoodRecipeColumns({ onDeleteFoodRecipe })}
          dataSource={recipeItem}
          pagination={{
            pageSize: 3,
          }}
        />
      </Spin>
    </BaseModal>
  );
};

export default forwardRef(ViewDetailRecipeDialog);
