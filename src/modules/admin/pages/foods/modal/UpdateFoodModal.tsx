import { TCategoryItem } from '@app/api/categories/type';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { SelectTypes, fieldValidate } from '@app/utils/helper';
import { Col, Form, Row, Select, Space, message } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { TAddNewFood, TFoodItem } from '@app/api/foods';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { PlusOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import FOOD_API from '@app/api/foods/type';
import { IngredientTypes } from '../../ingredients/type';

type TUpdateFood = {
  categories: TCategoryItem[];
  ingredients: IngredientTypes[];
  refetchFoodPage: () => void;
  foodUpdate: TFoodItem;
};

const UpdateFoodModal = ({ categories, ingredients, refetchFoodPage, foodUpdate }: TUpdateFood, ref: any) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = BaseForm.useForm();
  const [categoryOptions, setCategoryOptions] = useState<SelectTypes[]>([]);
  const [ingredientOptions, setIngredientOptions] = useState<SelectTypes[]>([]);
  const { isLoading, mutate } = useMutation(FOOD_API.UPDATE_FOOD, {
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

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  useEffect(() => {
    if (categories.length > 0) {
      const convertCategories = categories.map((item) => {
        return {
          label: item.categoryName,
          value: item.categoryId,
        };
      });

      setCategoryOptions(convertCategories);
    }

    if (ingredients.length > 0) {
      const availableIngredients = ingredients.filter((item) => item.status !== 'false');
      const convertIngredients = availableIngredients.map((item) => {
        return {
          label: item.ingredientName,
          value: item.ingredientId,
        };
      });

      setIngredientOptions(convertIngredients);
    }
  }, [categories, ingredients]);

  useEffect(() => {
    if (foodUpdate) {
      // const ingredientsResult = foodUpdate.recipes.map((item) => {
      //   return item.ingredientId;
      // });
      // form.setFieldsValue({
      //   foodName: foodUpdate.foodName,
      //   foodNutrition: foodUpdate.foodNutrition,
      //   foodTag: foodUpdate.foodTag,
      //   categoryId: foodUpdate.categoryId,
      //   foodNotes: foodUpdate.foodNotes,
      //   foodDesciption: foodUpdate.foodDesciption,
      //   foodPhoto: foodUpdate.foodPhoto,
      //   foodtimeProcess: foodUpdate.foodtimeProcess,
      //   foodCalorios: foodUpdate.foodCalorios,
      //   foodProcessingVideo: foodUpdate.foodProcessingVideo,
      //   ingredients: ingredientsResult,
      // });
    }
  }, [foodUpdate]);

  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  const submitForm = (values: TAddNewFood) => {
    console.log(values);
    // const convertIngredients: any = values.ingredients.map((item) => {
    //   return {
    //     ingredientId: item,
    //   };
    // });
    // mutate({
    //   ...values,
    //   ingredients: convertIngredients,
    //   foodId: foodUpdate.foodId,
    // });
  };

  return (
    <BaseModal
      centered
      footer={null}
      open={isOpenModal}
      onCancel={onCloseModal}
      title={<BaseTypography className="text-xl">Update food</BaseTypography>}
      width={800}
    >
      {contextHolder}
      <Form layout="vertical" onFinish={submitForm} requiredMark={false} form={form}>
        <Row gutter={[10, 10]}>
          <Col span={12}>
            <Form.Item label="Name" name="foodName" rules={[fieldValidate.required]}>
              <BaseInput />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Nutrition" name="foodNutrition" rules={[fieldValidate.required]}>
              <BaseInput />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Tag" name="foodTag" rules={[fieldValidate.required]}>
              <BaseInput />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Category" name="categoryId" rules={[fieldValidate.required]}>
              <Select options={categoryOptions} allowClear />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Ingredients" name="ingredients" rules={[fieldValidate.required]}>
              <Select options={ingredientOptions} mode="multiple" allowClear />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Photo" name="foodPhoto" rules={[fieldValidate.required]}>
              <BaseInput />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Time process" name="foodtimeProcess" rules={[fieldValidate.required]}>
              <BaseInput type="number" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Calories" name="foodCalorios" rules={[fieldValidate.required]}>
              <BaseInput type="number" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Processing video" name="foodProcessingVideo" rules={[fieldValidate.required]}>
              <BaseInput />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Note" name="foodNotes" rules={[fieldValidate.required]}>
              <BaseInput.TextArea rows={2} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Description" name="foodDesciption" rules={[fieldValidate.required]}>
              <BaseInput.TextArea rows={3} />
            </Form.Item>
          </Col>

          <Col span={24} className="flex justify-end">
            <Space>
              <BaseButton onClick={onCloseModal}>Close modal</BaseButton>
              <BaseButton
                icon={<PlusOutlined />}
                className="flex items-center"
                htmlType="submit"
                loading={isLoading}
                type="primary"
              >
                Submit
              </BaseButton>
            </Space>
          </Col>
        </Row>
      </Form>
    </BaseModal>
  );
};

export default forwardRef(UpdateFoodModal);
