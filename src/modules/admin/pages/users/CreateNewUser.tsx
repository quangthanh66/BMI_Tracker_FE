import { UserAddOutlined } from '@ant-design/icons';
import USERS_API from '@app/api/users';
import { CreateUserTypes } from '@app/api/users/type';
import { USER_ROLES_VALUES, USER_SEX_VALUES } from '@app/utils/constant';
import { fieldValidate } from '@app/utils/helper';
import { useMutation } from '@tanstack/react-query';
import { Col, DatePicker, Form, Input, Modal, Row, Select, Typography, message } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import dayjs from 'dayjs';
import { ErrorResponseTypes } from '@app/api/collection';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';

const CreateNewUser = ({}, ref: any) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { isLoading, mutate } = useMutation(USERS_API.CREATE_USER, {
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Create a new user is successfully',
      });

      form.resetFields();
      onCloseModal();
    },
    onError: (errors: ErrorResponseTypes) => {
      messageApi.open({
        type: 'error',
        content: errors.message,
      });
    },
  });

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  const onResetForm = () => {
    form.resetFields();
  };
  const onCloseModal = () => setIsOpenModal(false);
  const onFinish = (values: CreateUserTypes) => {
    const convertDate = dayjs(values.birth_day).format();
  };

  return (
    <Modal
      centered
      footer={null}
      open={isOpenModal}
      onCancel={onCloseModal}
      closeIcon
      title={<Typography className="text-xl">Create a new user</Typography>}
      width={800}
    >
      {contextHolder}
      <Form layout="vertical" requiredMark={false} onFinish={onFinish} form={form}>
        <Row gutter={[20, 20]}>
          <Col span={12}>
            <Form.Item name="email" label="Email" rules={[fieldValidate.required, fieldValidate.email]}>
              <Input placeholder="Enter your email" required type="email" maxLength={50} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="user_full_name" label="Full name" rules={[fieldValidate.required]}>
              <Input placeholder="Enter your full name" required maxLength={50} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="phone_number" label="Phone number" rules={[fieldValidate.required]}>
              <Input placeholder="Enter your phone number" required maxLength={20} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="birth_day" label="Birth day" rules={[fieldValidate.required]}>
              <DatePicker className="w-full" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="role_name" label="Roles" rules={[fieldValidate.required]}>
              <Select options={USER_ROLES_VALUES} placeholder="Choose your role" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="sex" label="Sex" rules={[fieldValidate.required]}>
              <Select options={USER_SEX_VALUES} placeholder="Choose your sex type" />
            </Form.Item>
          </Col>

          <Col span={24} className="flex items-center justify-end gap-2">
            <BaseButton danger onClick={onResetForm}>
              Clear
            </BaseButton>
            <BaseButton
              icon={<UserAddOutlined />}
              className="flex items-center"
              htmlType="submit"
              loading={isLoading}
              type="primary"
            >
              Submit
            </BaseButton>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default forwardRef(CreateNewUser);
