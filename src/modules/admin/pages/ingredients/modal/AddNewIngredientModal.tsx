import { PlusOutlined } from '@ant-design/icons';
import INGREDIENT_API from '@app/api/ingredients';
import { TAddNewIngredient } from '@app/api/ingredients/type';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { SelectTypes, fieldValidate } from '@app/utils/helper';
import { useMutation } from '@tanstack/react-query';
import { Col, Form, Row, Select, Space, message } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';

type TAddNewIngredientModal = {
  refetchPage: () => void;
  tagsSelect: SelectTypes[];
};

const AddNewIngredientModal = ({ refetchPage, tagsSelect }: TAddNewIngredientModal, ref: any) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = BaseForm.useForm();
  const { isLoading, mutate } = useMutation(INGREDIENT_API.ADD_NEW_INGREDIENT, {
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Add a new ingredient is successfully',
      });

      refetchPage();
      onCloseModal();
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cant add new ingredient . Please try again !',
      });
    },
  });

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  const onCloseModal = () => {
    setIsOpenModal(false);
    form.resetFields();
  };

  const submitForm = (values: TAddNewIngredient) => {
    mutate({
      ...values,
      quantity: Number(values.quantity),
      ingredientCalories: Number(values.ingredientCalories),
    });
  };

  return (
    <BaseModal
      centered
      footer={null}
      open={isOpenModal}
      onCancel={onCloseModal}
      title={<BaseTypography className="text-xl !text-white">Add new ingredient</BaseTypography>}
      width={800}
    >
      {contextHolder}
      <Form layout="vertical" onFinish={submitForm} requiredMark={false} form={form}>
        <Row gutter={[14, 14]}>
          <Col span={24}>
            <Form.Item label="Name" name="ingredientName" rules={[fieldValidate.required]}>
              <BaseInput />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Unit Of Measurement" name="unitOfMeasurement" rules={[fieldValidate.required]}>
              <BaseInput />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Quantity" name="quantity" rules={[fieldValidate.required]}>
              <BaseInput type="number" min={0} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Ingredient Calories" name="ingredientCalories" rules={[fieldValidate.required]}>
              <BaseInput type="number" min={0} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Tags" name="tagID" rules={[fieldValidate.required]}>
              <Select options={tagsSelect} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Photo" name="ingredientPhotoUrl">
              <BaseInput />
            </Form.Item>
          </Col>

          <Col span={24} className="flex justify-end">
            <Space>
              <BaseButton onClick={onCloseModal}>Close</BaseButton>
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

export default forwardRef(AddNewIngredientModal);
