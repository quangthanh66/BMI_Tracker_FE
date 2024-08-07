import { SaveOutlined } from '@ant-design/icons';
import USERS_API from '@app/api/users';
import { UpdateUserTypesAPI, UserItemTypes } from '@app/api/users/type';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { fieldValidate } from '@app/utils/helper';
import { useMutation } from '@tanstack/react-query';
import { Col, DatePicker, Form, Input, Row, Select, Typography, message } from 'antd';
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
        content: 'Update account is successful',
      });

      onRefreshAfterUpdate();
      onCloseModal();
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Update account is failed',
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
    mutate({ ...values, accountID: userUpdate.accountID });
  };

  const handleReset = () => {
    form.resetFields(); 
    
  };
  useEffect(() => {
    if (userUpdate) {
      form.setFieldsValue({
        email: userUpdate.email,
        fullName: userUpdate.fullName,
        phoneNumber: userUpdate.phoneNumber,
        isActive: userUpdate.isActive,
        birthday: userUpdate.birthday,
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
      title={<Typography className="text-xl">Update account status</Typography>}
      width={500}
    >
      {contextHolder}
      <Form layout="vertical" requiredMark={false} onFinish={onFinish} form={form}>
        <Row gutter={[20, 20]}>
          {/* <Col span={12}>
            <Form.Item name="fullName" label="Full name" rules={[fieldValidate.required]}>
              <Input placeholder="Enter your full name" required maxLength={50} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="phoneNumber" label="Phone number" rules={[fieldValidate.required]}>
              <Input placeholder="Enter your phone number" required maxLength={20} />
            </Form.Item>
          </Col> */}

          {/* <Col span={12}>
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
          </Col> */}

          {/* <Col span={12}>
            <Form.Item name="birthday" label="Birthday" rules={[fieldValidate.required]}>
              <DatePicker format={'YYYY-MM-DD'} style={{ width: '100%' }} />
            </Form.Item>
          </Col> */}

          <Col span={12}>
            <Form.Item name="isActive" label="Status" rules={[fieldValidate.required]}>
              <Select
                options={[
                  {
                    label: 'Active',
                    value: 'true',
                  },
                  {
                    label: 'Deactivate',
                    value: 'False',
                  },
                ]}
              ></Select>
            </Form.Item>
          </Col>

          <Col span={12} className="flex items-center justify-end gap-2">
  <div className="mt-auto">  {/* Đưa nút vào một div để có thể căn dưới */}
    <BaseButton
      icon={<SaveOutlined />}
      className="flex items-center"
      htmlType="submit"
      loading={isLoading}
      type="primary"
      style={{
        fontSize: '16px', // Kích thước chữ
        padding: '10px 20px', // Kích thước padding
        // width: '100px', // Có thể thay đổi width nếu cần thiết
      }}
    >
      Save
    </BaseButton>
  </div>
</Col>

        </Row>
      </Form>
    </BaseModal>
  );
};

export default forwardRef(UpdateUser);
