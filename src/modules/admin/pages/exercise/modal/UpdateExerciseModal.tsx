import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import EXERCISE_API from '@app/api/exercise';
import { TExerciseItem, TUpdateExercise } from '@app/api/exercise/type';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { SelectTypes, fieldValidate } from '@app/utils/helper';
import { useMutation } from '@tanstack/react-query';
import { Col, Form, Row, Select, Space, message } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

type TUpdateExerciseModal = {
  refetchFoodPage: () => void;
  exerciseProps: TExerciseItem;
  tagsSelect: SelectTypes[];
};

const UpdateExerciseModal = ({ refetchFoodPage, exerciseProps, tagsSelect }: TUpdateExerciseModal, ref: any) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = BaseForm.useForm();

  const { isLoading, mutate: updateExerciseMutate } = useMutation(EXERCISE_API.UPDATE_EXERCISE, {
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
      const convertTagsNumber = exerciseProps.tags.map((item) => item.tagID);
      form.setFieldsValue({
        ...exerciseProps,
        tagID: convertTagsNumber,
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
    if (exerciseProps) {
      updateExerciseMutate({
        ...values,
        exerciseID: Number(exerciseProps.exerciseID),
        emoji: '',
        
      });
    }
  };

  return (
    <BaseModal
      centered
      footer={null}
      open={isOpenModal}
      onCancel={onCloseModal}
      title={<BaseTypography className="text-xl">Update Exercise</BaseTypography>}
      width={600}

    >
      {contextHolder}
      <Form layout="vertical" onFinish={submitForm} requiredMark={false} form={form}>
        <Row gutter={[14, 14]}>
          <Col span={12}>
            <Form.Item label={<span style={{fontWeight: 'bold'}}>Name</span>} name="exerciseName" rules={[fieldValidate.required]}>
              <BaseInput />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={<span style={{fontWeight: 'bold'}}>Duration</span>} name="duration" rules={[fieldValidate.required]}>
              <BaseInput type="number" min={0} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={<span style={{fontWeight: 'bold'}}>Distance</span>} name="distance" rules={[fieldValidate.required]}>
              <BaseInput type="number" min={0} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={<span style={{fontWeight: 'bold'}}>Calories burned</span>} name="caloriesBurned" rules={[fieldValidate.required]}>
              <BaseInput type="number" min={0} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={<span style={{fontWeight: 'bold'}}>Tags</span>} name="tagID" rules={[fieldValidate.required]}>
              <Select options={tagsSelect} mode="multiple" />
            </Form.Item>
          </Col>

          {/* <Col span={12}>
            <Form.Item label={<span style={{fontWeight: 'bold'}}>Status</span>} name="isActive">
              <Select
                defaultValue={true}
                options={[
                  {
                    label: 'Active',
                    value: true,
                  },
                  {
                    label: 'DeActive',
                    value: false,
                  },
                ]}
              />
            </Form.Item>
          </Col> */}

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

export default forwardRef(UpdateExerciseModal);
