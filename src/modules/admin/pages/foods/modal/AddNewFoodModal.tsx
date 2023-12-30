import { PlusOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { SelectTypes, fieldValidate } from '@app/utils/helper';
import { Col, Form, Row, Select, Space, message } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { IngredientTypes } from '../../inventory/ingredients/type';
import { TCategoryItem } from '@app/api/categories/type';
import { TAddNewFood } from '@app/api/foods';
import { useMutation } from '@tanstack/react-query';
import FOOD_API from '@app/api/foods/type';

type TAddNewFoodModal = {
  categories: TCategoryItem[];
  ingredients: IngredientTypes[];
  refetchFoodPage: () => void;
};

const AddNewFoodModal = ({ categories, ingredients, refetchFoodPage }: TAddNewFoodModal, ref: any) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = BaseForm.useForm();
  const [categoryOptions, setCategoryOptions] = useState<SelectTypes[]>([]);
  const [ingredientOptions, setIngredientOptions] = useState<SelectTypes[]>([]);
  const { isLoading, mutate } = useMutation(FOOD_API.ADD_NEW_FOOD, {
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
      const convertIngredients = ingredients.map((item) => {
        return {
          label: item.ingredientName,
          value: item.ingredientId,
        };
      });

      setIngredientOptions(convertIngredients);
    }
  }, [categories, ingredients]);

  const onCloseModal = () => {
    setIsOpenModal(false);
    form.resetFields();
  };

  const submitForm = (values: TAddNewFood) => {
    const convertIngredients: any = values.ingredients.map((item) => {
      return {
        ingredientId: item,
      };
    });

    mutate({
      ...values,
      ingredients: convertIngredients,
    });
  };

  return (
    <BaseModal
      centered
      footer={null}
      open={isOpenModal}
      onCancel={onCloseModal}
      title={<BaseTypography className="text-xl">Add new food</BaseTypography>}
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

export default forwardRef(AddNewFoodModal);
