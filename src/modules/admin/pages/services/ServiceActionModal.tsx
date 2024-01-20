import SERVICE_API from '@app/api/services';
import { TAddNewService, TServiceItemState } from '@app/api/services/type';
import { UserItemTypes } from '@app/api/users/type';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { SelectTypes, fieldValidate } from '@app/utils/helper';
import { useMutation } from '@tanstack/react-query';
import { Col, Form, Row, Select, Space, message } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

type TServiceActionState = {
  serviceUpdate: TServiceItemState;
  onActionAfterClose: () => void;
  usersSelect: SelectTypes[];
};

const ServiceActionModal = ({ serviceUpdate, onActionAfterClose, usersSelect }: TServiceActionState, ref: any) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = BaseForm.useForm();
  const location = useLocation();
  const userProfileState: UserItemTypes = useSelector((state: any) => state.app.userProfile.payload);

  const { isLoading: isLoadingAddNew, mutate: mutateAddNew } = useMutation(SERVICE_API.ADD_NEW, {
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Add new service is successful',
      });

      onCloseModal();
      onActionAfterClose();
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cant add new service. Please try again',
      });
    },
  });
  const { isLoading: isLoadingUpdate, mutate: mutateUpdate } = useMutation(SERVICE_API.UPDATE, {
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Update service is successful',
      });

      onCloseModal();
      onActionAfterClose();
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cant update the service. Please try again',
      });
    },
  });

  useEffect(() => {
    if (serviceUpdate) {
      form.setFieldsValue({
        nameService: serviceUpdate.nameService,
        descriptionService: serviceUpdate.descriptionService,
        userId: serviceUpdate.userId,
      });
    }
  }, [serviceUpdate]);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  const onCloseModal = () => {
    setIsOpenModal(false);
    form.resetFields();
  };

  const submitForm = (values: TAddNewService) => {
    if (serviceUpdate) {
      mutateUpdate({
        ...values,
        serviceId: serviceUpdate.serviceId,
      });
    } else {
      if (location.pathname.includes('/trainer')) {
        mutateAddNew({
          ...values,
          userId: userProfileState.userId,
        });
      } else {
        mutateAddNew(values);
      }
    }
  };

  return (
    <BaseModal
      centered
      footer={null}
      open={isOpenModal}
      onCancel={onCloseModal}
      title={
        <BaseTypography className="text-xl">{serviceUpdate ? 'Update service' : 'Add new service'}</BaseTypography>
      }
      closeIcon
      width={700}
    >
      {contextHolder}

      <Form requiredMark layout="vertical" onFinish={submitForm} form={form}>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <Form.Item label="Name" name="nameService" rules={[fieldValidate.required]}>
              <BaseInput placeholder="Input your service name" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Description" name="descriptionService" rules={[fieldValidate.required]}>
              <BaseInput.TextArea rows={3} placeholder="Input your description" />
            </Form.Item>
          </Col>

          {!location.pathname.includes('/trainer') && (
            <Col span={24}>
              <Form.Item label="User" name="userId" rules={[fieldValidate.required]}>
                <Select placeholder="Choose the user" options={usersSelect}></Select>
              </Form.Item>
            </Col>
          )}

          <Col span={24} className="flex justify-end">
            <Space>
              <BaseButton onClick={onCloseModal}>Close modal</BaseButton>
              <BaseButton
                className="flex items-center"
                htmlType="submit"
                loading={isLoadingAddNew || isLoadingUpdate}
                type="primary"
              >
                Save
              </BaseButton>
            </Space>
          </Col>
        </Row>
      </Form>
    </BaseModal>
  );
};

export default forwardRef(ServiceActionModal);
