import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import INGREDIENT_API from '@app/api/ingredients';
import { TIngredientItem, TUpdateIngredient } from '@app/api/ingredients/type';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { fieldValidate } from '@app/utils/helper';
import { useMutation } from '@tanstack/react-query';
import { Col, Form, Row, Space, message } from 'antd';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

type TUpdateIngredientModal = {
  refetchFoodPage: () => void;
  ingredientProps: TIngredientItem;
};

const UpdateIngredientModal = ({ refetchFoodPage, ingredientProps }: TUpdateIngredientModal, ref: any) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = BaseForm.useForm();

  const { isLoading, mutate } = useMutation(INGREDIENT_API.UPDATE_INGREDIENT, {
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Update ingredient is successfully',
      });

      refetchFoodPage();
      onCloseModal();
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cant update ingredient . Please try again !',
      });
    },
  });

  useEffect(() => {
    if (ingredientProps) {
      form.setFieldsValue({
        ingredientName: ingredientProps.ingredientName,
        ingredientPhoto: ingredientProps.ingredientPhoto,
        quantity: ingredientProps.quantity,
        unitOfMeasurement: ingredientProps.unitOfMeasurement,
        ingredientCalories: ingredientProps.ingredientCalories,
        tagID: ingredientProps.tagID,
      });
    }
  }, [ingredientProps]);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  const submitForm = (values: TUpdateIngredient) => {
    mutate({
      ...values,
      ingredientID: ingredientProps.ingredientID,
    });
  };

  return (
    <BaseModal
      centered
      footer={null}
      open={isOpenModal}
      onCancel={onCloseModal}
      title={<BaseTypography className="text-xl">Update ingredient</BaseTypography>}
      width={800}
    >
      {contextHolder}
      <Form layout="vertical" onFinish={submitForm} requiredMark={false} form={form}>
        <Row gutter={[14, 14]}>
          <Col span={12}>
            <Form.Item label="Name" name="ingredientName" rules={[fieldValidate.required]}>
              <BaseInput />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Photo" name="ingredientPhoto" rules={[fieldValidate.required]}>
              <BaseInput />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Quantity" name="quantity" rules={[fieldValidate.required]}>
              <BaseInput />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Unit Of Measurement" name="unitOfMeasurement" rules={[fieldValidate.required]}>
              <BaseInput />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Calories" name="ingredientCalories" rules={[fieldValidate.required]}>
              <BaseInput />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Tags" name="tagID" rules={[fieldValidate.required]}>
              <BaseInput />
            </Form.Item>
          </Col>
        
          <Col span={24} className="flex justify-end">
            <Space>
              <BaseButton onClick={onCloseModal}>Close modal</BaseButton>
              <BaseButton
                icon={<EditOutlined />}
                className="flex items-center"
                htmlType="submit"
                loading={isLoading}
                type="primary"
              >
                Update
              </BaseButton>
            </Space>
          </Col>
        </Row>
      </Form>
    </BaseModal>
  );
};

export default forwardRef(UpdateIngredientModal);
