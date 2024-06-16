import { PlusOutlined } from '@ant-design/icons';
import CERTIFICATE_API from '@app/api/certificate';
import { CertificateItemTypes, CreateCertificateRequest } from '@app/api/certificate/type';
import { UserItemTypes } from '@app/api/users/type';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { fieldValidate } from '@app/utils/helper';
import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { useSelector } from 'react-redux';

type CreateCertificateTypes = {
  onRefreshPage: () => void;
};

const CreateCertificateModal = ({ onRefreshPage }: CreateCertificateTypes, ref: any) => {
  const [form] = BaseForm.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const userProfileState: UserItemTypes = useSelector((state: any) => state.app.userProfile.payload);

  const { isLoading: isLoadingCreateCertificate, mutate } = useMutation(CERTIFICATE_API.CREATE_NEW_CERTIFICATE, {
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Create a new Certificate is success',
      });

      onCloseModal();
      onRefreshPage();
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Create a new Certificate is failed',
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

  const onSubmit = (values: CreateCertificateRequest) => {
    mutate({ ...values, advisorID: Number(userProfileState.accountID) });
  };

  return (
    <BaseModal
      centered
      footer={null}
      open={isOpenModal}
      onCancel={onCloseModal}
      closeIcon
      title={<BaseTypography className="text-xl">Create a new certificate</BaseTypography>}
    >
      {contextHolder}
      <BaseForm form={form} layout="vertical" requiredMark={false} onFinish={onSubmit}>
        <BaseRow gutter={[20, 20]}>
          <BaseCol span={24}>
            <BaseForm.Item name="certificateName" label="Name" rules={[fieldValidate.required]}>
              <BaseInput placeholder="Enter your certificate name" required maxLength={50} />
            </BaseForm.Item>
          </BaseCol>

          <BaseCol span={24}>
            <BaseForm.Item name="certificateLink" label="Link" rules={[fieldValidate.required]}>
              <BaseInput.TextArea rows={3} placeholder="Enter your link certificate" required />
            </BaseForm.Item>
          </BaseCol>

          <BaseCol span={24} className="flex items-center justify-end gap-2">
            <BaseButton danger onClick={() => form.resetFields()}>
              Clear
            </BaseButton>
            <BaseButton
              icon={<PlusOutlined />}
              className="flex items-center"
              htmlType="submit"
              loading={isLoadingCreateCertificate}
              type="primary"
            >
              Submit
            </BaseButton>
          </BaseCol>
        </BaseRow>
      </BaseForm>
    </BaseModal>
  );
};

export default forwardRef(CreateCertificateModal);
