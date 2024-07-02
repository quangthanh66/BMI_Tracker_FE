import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { SelectTypes, fieldValidate } from '@app/utils/helper';
import { Col, Form, Row, Select, Space, Spin, message } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { RecipeItem, TAddNewFood, TFoodItem } from '@app/api/foods';
import { useMutation, useQuery } from '@tanstack/react-query';
import FOOD_API from '@app/api/foods/type';
import { TagsRequest } from '@app/api/tags/type';
import { TIngredientItem } from '@app/api/ingredients/type';
import TagsAPI from '@app/api/tags';
import { PlusOutlined } from '@ant-design/icons';
import RecipeDialog from './RecipeDialog';

type TAddNewFoodModal = {
  ingredients: TIngredientItem[];
  foodUpdateProps: TFoodItem;
  refetchFoodPage: () => void;
};

const AddNewFoodModal = ({ ingredients, refetchFoodPage, foodUpdateProps }: TAddNewFoodModal, ref: any) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = BaseForm.useForm();
  const [tagsOptions, setTagsOptions] = useState<SelectTypes[]>([]);
  const [ingredientOptions, setIngredientOptions] = useState<SelectTypes[]>([]);

  const recipeRefDialog = useRef<any>();

  const { isLoading: isLoadingHandleFood, mutate: handleFoodMutate } = useMutation(FOOD_API.ADD_NEW_FOOD, {
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Add a new food is successfully',
      });

      refetchFoodPage();
      onCloseModal();
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cant add new food . Please try again !',
      });
    },
  });

  const { isLoading: isLoadingUpdateFood, mutate: updateFoodMutate } = useMutation(FOOD_API.UPDATE_FOOD, {
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Update food is successfully',
      });

      refetchFoodPage();
      onCloseModal();
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cant update food . Please try again !',
      });
    },
  });

  const { isLoading: isLoadingTags } = useQuery({
    queryKey: ['tags-key'],
    queryFn: TagsAPI.getAllTag,
    onError: () => message.error('Load tags is failed'),
    onSuccess: (response: TagsRequest[]) => {
      const result: SelectTypes[] = response.map((item) => {
        return {
          label: item.tagName,
          value: item.tagID,
        };
      });
      setTagsOptions(result);
    },
  });

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  useEffect(() => {
    if (ingredients.length > 0) {
      const availableIngredients = ingredients.filter((item) => item.isActive);
      const convertIngredients = availableIngredients.map((item) => {
        return {
          label: item.ingredientName,
          value: item.ingredientID,
        };
      });

      setIngredientOptions(convertIngredients);
    }
  }, [ingredients]);

  useEffect(() => {
    if (foodUpdateProps) {
      form.setFieldsValue(foodUpdateProps);
    }
  }, [foodUpdateProps]);

  const onCloseModal = () => {
    setIsOpenModal(false);
    form.resetFields();
  };

  const submitForm = (values: TAddNewFood) => {
    if (foodUpdateProps) {
      updateFoodMutate({
        ...values,
        foodCalories: Number(values.foodCalories),
        foodTimeProcess: Number(values.foodTimeProcess),
        foodID: foodUpdateProps.foodID,
      });
    } else {
      handleFoodMutate({
        ...values,
        foodCalories: Number(values.foodCalories),
        foodTimeProcess: Number(values.foodTimeProcess),
      });
    }
  };

  const onOpenRecipeDialog = () => recipeRefDialog.current.openModal();

  const afterClosedRecipeDialog = (value: RecipeItem) => {
    if (value) {
      form.setFieldsValue({
        recipeRequests: [...form.getFieldValue('recipeRequests'), value],
      });
    }
  };

  return (
    <BaseModal
      centered
      footer={null}
      open={isOpenModal}
      onCancel={onCloseModal}
      title={<BaseTypography className="text-xl">{foodUpdateProps ? 'Update Food' : 'Add new food'}</BaseTypography>}
      width={800}
    >
      {contextHolder}

      <RecipeDialog ingredientSelect={ingredientOptions} ref={recipeRefDialog} afterClosed={afterClosedRecipeDialog} />
      <Spin spinning={isLoadingTags}>
        <Form layout="vertical" onFinish={submitForm} requiredMark={false} form={form}>
          <Row gutter={[10, 10]}>
            <Col span={12}>
              <Form.Item label="Name" name="foodName" rules={[fieldValidate.required]}>
                <BaseInput />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Calories" name="foodCalories" rules={[fieldValidate.required]}>
                <BaseInput type="number" min={0} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Nutrition" name="foodNutrition" rules={[fieldValidate.required]}>
                <BaseInput />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Description" name="description">
                <BaseInput.TextArea rows={3} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Photo Link" name="foodPhoto">
                <BaseInput />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Video Link" name="foodVideo">
                <BaseInput />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Time process" name="foodTimeProcess" rules={[fieldValidate.required]}>
                <BaseInput type="number" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Ingredients" name="ingredientIDs" rules={[fieldValidate.required]}>
                <Select options={ingredientOptions} mode="multiple" allowClear />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Tags" name="tagIDs" rules={[fieldValidate.required]}>
                <Select
                  options={tagsOptions}
                  mode="multiple"
                  allowClear
                  value={foodUpdateProps && foodUpdateProps.foodTags.map((tag) => tag.tagID)}
                />
              </Form.Item>
            </Col>

            {/* <Col span={24}>
              <Row gutter={[14, 14]}>
                {form.getFieldValue('recipeRequests').map((item: RecipeItem) => {
                  return <div>{item.quantity}</div>;
                })}
              </Row>
            </Col> */}

            <Col span={24}>
              <BaseButton type="primary" icon={<PlusOutlined />} block onClick={onOpenRecipeDialog}>
                Add New Recipe
              </BaseButton>
            </Col>

            <Col span={24} className="flex justify-end">
              <Space>
                <BaseButton onClick={onCloseModal}>Close</BaseButton>
                <BaseButton
                  className="flex items-center"
                  htmlType="submit"
                  loading={isLoadingHandleFood || isLoadingUpdateFood}
                  disabled={isLoadingHandleFood || isLoadingUpdateFood}
                  type="primary"
                >
                  Confirm
                </BaseButton>
              </Space>
            </Col>
          </Row>
        </Form>
      </Spin>
    </BaseModal>
  );
};

export default forwardRef(AddNewFoodModal);
