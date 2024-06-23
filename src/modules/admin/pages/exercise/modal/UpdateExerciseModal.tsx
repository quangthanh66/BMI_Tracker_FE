import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import EXERCISE_API from '@app/api/exercise';
import { TExerciseItem, TUpdateExercise } from '@app/api/exercise/type';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { fieldValidate } from '@app/utils/helper';
import { useMutation } from '@tanstack/react-query';
import { Col, Form, Row, Space, message } from 'antd';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

type TUpdateExerciseModal = {
  refetchFoodPage: () => void;
  exerciseProps: TExerciseItem;
};

const UpdateExerciseModal = ({ refetchFoodPage, exerciseProps }: TUpdateExerciseModal, ref: any) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = BaseForm.useForm();

  const { isLoading, mutate } = useMutation(EXERCISE_API.UPDATE_EXERCISE, {
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Update exercise is successfully',
      });

      refetchFoodPage();
      onCloseModal();
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cant update exercise . Please try again !',
      });
    },
  });

  useEffect(() => {
    if (exerciseProps) {
      form.setFieldsValue({
        // exerciseName: exerciseProps.exerciseName,
        // exercisePhoto: exerciseProps.exercisePhoto,
      
      });
    }
  }, [exerciseProps]);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  const submitForm = (values: TUpdateExercise) => {
    // mutate({
    //   ...values,
    //   exerciseID: exerciseProps.exerciseID,
    //   isActive: true,
    // });
  };

  return (
    <BaseModal
      centered
      footer={null}
      open={isOpenModal}
      onCancel={onCloseModal}
      title={<BaseTypography className="text-xl">Update Exercise</BaseTypography>}
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
          <Col span={12}>
            <Form.Item label="Unit Of Measurement" name="unitOfMeasurement" rules={[fieldValidate.required]}>
              <BaseInput />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Quantity" name="quantity" rules={[fieldValidate.required]}>
              <BaseInput />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Ingredient Calories" name="ingredientCalories" rules={[fieldValidate.required]}>
              <BaseInput />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Tags" name="tagID" rules={[fieldValidate.required]}>
              <BaseInput />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Photo" name="ingredientPhoto">
              <BaseInput />
            </Form.Item>
          </Col>

          <Col span={24} className="flex justify-end">
            <Space>
              <BaseButton onClick={onCloseModal}>Close</BaseButton>
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

export default forwardRef(UpdateExerciseModal);
