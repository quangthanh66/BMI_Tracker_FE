import USERS_API from '@app/api/users';
import { ProveCertiTrainerTypes, UserItemTypes } from '@app/api/users/type';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { fieldValidate } from '@app/utils/helper';
import { useMutation } from '@tanstack/react-query';
import { Button, Col, Form, Input, Modal, Row, Typography, message } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type ProvideCertificateTypes = {
  userProps: UserItemTypes;
  onRefreshPage: () => void;
};

const ProveCertificate = ({ userProps, onRefreshPage }: ProvideCertificateTypes, ref: any) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { isLoading, mutate } = useMutation(USERS_API.PROVIDE_TRAINER_CERTIFICATE, {
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Provide certificate for the user is successful',
      });

      onCloseModal();
      onRefreshPage();
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Provide certificate for the user is failed',
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

  const onSubmitForm = (values: ProveCertiTrainerTypes) => {
    mutate({ ...values, userId: userProps.accountID, certificateId: uuidv4() });
  };

  return (
    <Modal
      centered
      footer={null}
      open={isOpenModal}
      onCancel={onCloseModal}
      closeIcon
      title={<Typography className="text-xl">Provide certificate</Typography>}
      width={800}
    >
      {contextHolder}
      <Form requiredMark={false} form={form} layout="vertical" onFinish={onSubmitForm}>
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <Form.Item name="certificateName" label="Certificate name" rules={[fieldValidate.required]}>
              <Input placeholder="Enter your certificate name" required />
            </Form.Item>
          </Col>

          <Col span={24} className="flex items-center justify-end gap-2">
            <BaseButton onClick={onCloseModal}>Cancel</BaseButton>
            <BaseButton type="primary" htmlType="submit" loading={isLoading}>
              Confirm to provide
            </BaseButton>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default forwardRef(ProveCertificate);
