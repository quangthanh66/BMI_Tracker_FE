import { UserAddOutlined } from '@ant-design/icons';
import USERS_API from '@app/api/users';
import { USER_ROLES_ENUM, USER_SEX_VALUES } from '@app/utils/constant';
import { fieldValidate } from '@app/utils/helper';
import { useMutation } from '@tanstack/react-query';
import { Col, Form, Input, Modal, Row, Select, Typography, message } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { ErrorResponseTypes } from '@app/api/collection';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { SignUpAccountTypes } from '@app/api/auth/type';

type CreateNewUserModalTypes = {
  onUpdateAfterCreateNew: () => void;
};

const CreateNewUser = ({ onUpdateAfterCreateNew }: CreateNewUserModalTypes, ref: any) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { isLoading, mutate } = useMutation(USERS_API.CREATE_USER, {
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Create a new user is successfully',
      });

      onUpdateAfterCreateNew();
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
  const onFinish = (values: SignUpAccountTypes) => {
    mutate({
      ...values,
      birthday: '2000-01-01',
    });
  };

  return (
    <Modal
      centered
      footer={null}
      open={isOpenModal}
      onCancel={onCloseModal}
      closeIcon
      title={<Typography className="text-xl">Create a new user</Typography>}
      width={600}
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
            <Form.Item name="fullName" label="Full name" rules={[fieldValidate.required]}>
              <Input placeholder="Enter your full name" required maxLength={50} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="phoneNumber" label="Phone number" rules={[fieldValidate.required]}>
              <Input placeholder="Enter your phone number" required maxLength={20} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="gender" label="Gender" rules={[fieldValidate.required]}>
              <Select
                options={[
                  {
                    label: 'Male',
                    value: 'Male',
                  },
                  {
                    label: 'Female',
                    value: 'Female',
                  },
                ]}
              ></Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="role" label="Role" rules={[fieldValidate.required]}>
              <Select
                options={[
                  {
                    label: 'Member',
                    value: USER_ROLES_ENUM.ROLE_MEMBER,
                  },
                  {
                    label: 'Advisor',
                    value: USER_ROLES_ENUM.ROLE_ADVISOR,
                  },
                  {
                    label: 'Manager',
                    value: USER_ROLES_ENUM.ROLE_MANAGER,
                  },
                  {
                    label: 'Admin',
                    value: USER_ROLES_ENUM.ROLE_ADMIN,
                  },
                ]}
              ></Select>
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
