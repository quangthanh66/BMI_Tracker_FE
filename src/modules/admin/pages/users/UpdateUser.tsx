import { SaveOutlined } from '@ant-design/icons';
import USERS_API from '@app/api/users';
import { UpdateUserTypesAPI, UserItemTypes } from '@app/api/users/type';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { USER_SEX_VALUES } from '@app/utils/constant';
import { fieldValidate } from '@app/utils/helper';
import { useMutation } from '@tanstack/react-query';
import { Col, Form, Input, Row, Select, Typography, message } from 'antd';
import { forwardRef, useImperativeHandle, useState, useEffect } from 'react';

type UpdateUserTypes = {
  userUpdate: UserItemTypes;
  onRefreshAfterUpdate: () => void;
};

const UpdateUser = ({ userUpdate, onRefreshAfterUpdate }: UpdateUserTypes, ref: any) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const { isLoading, mutate } = useMutation(USERS_API.UPDATE_USER, {
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Update user is successful',
      });

      onRefreshAfterUpdate();
      onCloseModal();
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Update user is failed',
      });
    },
  });

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  const onCloseModal = () => setIsOpenModal(false);
  const onFinish = (values: UpdateUserTypesAPI) => {
    mutate({ ...values, userId: userUpdate.accountID });
  };

  useEffect(() => {
    if (userUpdate) {
      form.setFieldsValue({
        email: userUpdate.email,
        fullName: userUpdate.fullName,
        phoneNumber: userUpdate.phoneNumber,
      });
    }
  }, [userUpdate]);

  return (
    <BaseModal
      centered
      footer={null}
      open={isOpenModal}
      onCancel={onCloseModal}
      closeIcon
      title={<Typography className="text-xl">Update user profile</Typography>}
      width={800}
    >
      {contextHolder}
      <Form layout="vertical" requiredMark={false} onFinish={onFinish} form={form}>
        <Row gutter={[20, 20]}>
          <Col span={12}>
            <Form.Item name="email" label="Email" rules={[fieldValidate.required, fieldValidate.email]}>
              <BaseInput placeholder="Enter your email" required type="email" maxLength={50} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="fullname" label="Full name" rules={[fieldValidate.required]}>
              <Input placeholder="Enter your full name" required maxLength={50} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="phoneNumber" label="Phone number" rules={[fieldValidate.required]}>
              <Input placeholder="Enter your phone number" required maxLength={20} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="password" label="Password" rules={[fieldValidate.required]}>
              <Input.Password placeholder="Enter your password" required />
            </Form.Item>
          </Col>
          <Col span={24} className="flex items-center justify-end gap-2">
            <BaseButton danger>Reset value</BaseButton>
            <BaseButton
              icon={<SaveOutlined />}
              className="flex items-center"
              htmlType="submit"
              loading={isLoading}
              type="primary"
            >
              Save
            </BaseButton>
          </Col>
        </Row>
      </Form>
    </BaseModal>
  );
};

export default forwardRef(UpdateUser);
