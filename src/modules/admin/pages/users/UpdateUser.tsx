import { SaveOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseSelect } from '@app/components/common/selects/BaseSelect/BaseSelect';
import { USER_ROLES_VALUES, USER_SEX_VALUES } from '@app/utils/constant';
import { fieldValidate } from '@app/utils/helper';
import { Col, DatePicker, Form, Row, Typography } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';

const UpdateUser = ({}, ref: any) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = Form.useForm();
  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  const onCloseModal = () => setIsOpenModal(false);
  const onFinish = () => {
    console.log('Submit form');
  };

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
      <Form layout="vertical" requiredMark={false} onFinish={onFinish} form={form}>
        <Row gutter={[20, 20]}>
          <Col span={12}>
            <Form.Item name="email" label="Email" rules={[fieldValidate.required, fieldValidate.email]}>
              <BaseInput placeholder="Enter your email" required type="email" maxLength={50} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="user_full_name" label="Full name" rules={[fieldValidate.required]}>
              <BaseInput placeholder="Enter your full name" required maxLength={50} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="phone_number" label="Phone number" rules={[fieldValidate.required]}>
              <BaseInput placeholder="Enter your phone number" required maxLength={20} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="birth_day" label="Birth day" rules={[fieldValidate.required]}>
              <DatePicker className="w-full" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="role_name" label="Roles" rules={[fieldValidate.required]}>
              <BaseSelect options={USER_ROLES_VALUES} placeholder="Choose your role" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="sex" label="Sex" rules={[fieldValidate.required]}>
              <BaseSelect options={USER_SEX_VALUES} placeholder="Choose your sex type" />
            </Form.Item>
          </Col>

          <Col span={24} className="flex items-center justify-end gap-2">
            <BaseButton danger>Reset value</BaseButton>
            <BaseButton
              icon={<SaveOutlined />}
              className="flex items-center"
              htmlType="submit"
              loading={false}
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
