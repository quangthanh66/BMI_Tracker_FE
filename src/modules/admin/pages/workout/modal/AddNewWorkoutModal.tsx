import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { fieldValidate } from '@app/utils/helper';
import { Col, Form, Row, Space, Spin, message } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { TAddNewWorkout, TWorkoutItem } from '@app/api/workout';
import { useMutation } from '@tanstack/react-query';
import WORKOUT_API from '@app/api/workout/type';
import { BaseSelect } from '@app/components/common/selects/BaseSelect/BaseSelect';

type TAddNewWorkoutModal = {
  workoutUpdateProps: TWorkoutItem;
  refetchWorkoutPage: () => void;
};

const AddNewWorkoutModal = ({ refetchWorkoutPage, workoutUpdateProps }: TAddNewWorkoutModal, ref: any) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = BaseForm.useForm();

  const { isLoading: isLoadingUpdateWorkout, mutate: updateWorkoutMutate } = useMutation(WORKOUT_API.UPDATE_WORKOUT, {
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Update workout is successfully",
      });

      refetchWorkoutPage();
      onCloseModal();
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Cant update workout . Please try again !",
      });
    },
  });

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  useEffect(() => {
    if (workoutUpdateProps) {
      form.setFieldsValue({
        ...workoutUpdateProps,
        totalCaloriesBurned: workoutUpdateProps.totalCaloriesBurned,
      });
    }
  }, [workoutUpdateProps]);

  const onCloseModal = () => {
    setIsOpenModal(false);
    form.resetFields();
  };

  const submitForm = (values: TAddNewWorkout) => {
    updateWorkoutMutate({
      ...values,
      workoutID: workoutUpdateProps.workoutID,
      standardWeight: "",
    });
  };

  return (
    <BaseModal
      centered
      footer={null}
      open={isOpenModal}
      onCancel={onCloseModal}
      title={
        <BaseTypography className="text-xl">{workoutUpdateProps ? "Update workout" : "Add new workout"}</BaseTypography>
      }
      width={800}
    >
      {contextHolder}
      <Spin spinning={isLoadingUpdateWorkout}>
        <Form layout="vertical" onFinish={submitForm} requiredMark={false} form={form}>
          <Row gutter={[10, 10]}>
            <Col span={24}>
              <Form.Item label={<span style={{fontWeight: "bold"}}>Name</span>} name="workoutName" rules={[fieldValidate.required]}>
                <BaseInput />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label={<span style={{fontWeight: "bold"}}>Standard Weight</span>} name="standardWeight" rules={[fieldValidate.required]}>
                <BaseInput type="number" min={0} step={0.1} />
              </Form.Item>
            </Col>

            {/* <Col span={12}>
              <Form.Item label={<span style={{fontWeight: 'bold'}}>Status</span>} name="isActive">
                <BaseSelect
                  defaultValue={true}
                  options={[
                    { label: 'Active', value: true },
                    { label: 'InActive', value: false },
                  ]}
                />
              </Form.Item>
            </Col> */}

            <Col span={24}>
              <Form.Item label={<span style={{fontWeight: "bold"}}>Description</span>} name="workoutDescription">
                <BaseInput.TextArea rows={3} />
              </Form.Item>
            </Col>

            <Col span={24} className="flex justify-end">
              <Space>
                <BaseButton onClick={onCloseModal}>Close</BaseButton>
                <BaseButton
                  className="flex items-center"
                  htmlType="submit"
                  loading={isLoadingUpdateWorkout}
                  disabled={isLoadingUpdateWorkout}
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

export default forwardRef(AddNewWorkoutModal);
