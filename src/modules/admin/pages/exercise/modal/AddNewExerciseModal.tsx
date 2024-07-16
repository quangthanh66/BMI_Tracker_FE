import { PlusOutlined } from '@ant-design/icons';
import EXERCISE_API from '@app/api/exercise';
import { TAddNewExercise } from '@app/api/exercise/type';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { SelectTypes, fieldValidate } from '@app/utils/helper';
import { useMutation } from '@tanstack/react-query';
import { Col, Form, Row, Select, Space, message } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';

type TAddNewExerciseModal = {
  refetchPage: () => void;
  tagsSelect: SelectTypes[];
};

const AddNewExerciseModal = ({ refetchPage, tagsSelect }: TAddNewExerciseModal, ref: any) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = BaseForm.useForm();
  const { isLoading, mutate: addNewExercise } = useMutation(EXERCISE_API.ADD_NEW_EXERCISE, {
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Create a new exercise is successfully',
      });

      refetchPage();
      onCloseModal();
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cannot create new exercise . Please try again !',
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

  const submitForm = (values: TAddNewExercise) => {
    addNewExercise({
      ...values,
      emoji: '',
    });
  };

  return (
    <BaseModal
      centered
      footer={null}
      open={isOpenModal}
      onCancel={onCloseModal}
      title={<BaseTypography className="text-xl !text-black">Create new exercise</BaseTypography>}
      width={800}
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
            <Form.Item label={<span style={{fontWeight: 'bold'}}>Distance</span>} name="distance">
              <BaseInput type="number" min={0} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={<span style={{fontWeight: 'bold'}}>Calories burned</span>} name="caloriesBurned" rules={[fieldValidate.required]}>
              <BaseInput type="number" min={0} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={<span style={{fontWeight: 'bold'}}>Tags</span>} name="tagIDs" rules={[fieldValidate.required]}>
              <Select options={tagsSelect} mode="multiple" />
            </Form.Item>
          </Col>

          <Col span={12} className="flex justify-end">
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

export default forwardRef(AddNewExerciseModal);
