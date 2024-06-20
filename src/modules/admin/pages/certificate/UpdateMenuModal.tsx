import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { Typography, message } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { fieldValidate } from '@app/utils/helper';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { SaveOutlined } from '@ant-design/icons';
import { CertificateItemTypes, UpdateCertificateTypes } from '@app/api/certificate/type';
import CERTIFICATE_API from '@app/api/certificate';
import { useMutation } from '@tanstack/react-query';
import { BaseSelect } from '@app/components/common/selects/BaseSelect/BaseSelect';

type UpdateCertificateTypesParams = {
  certificateUpdateProps: CertificateItemTypes;
  onRefreshPage: () => void;
};

const UpdateMenuModal = ({ certificateUpdateProps, onRefreshPage }: UpdateCertificateTypesParams, ref: any) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { isLoading, mutate: updateCertificateMutate } = useMutation(CERTIFICATE_API.UPDATE_CERTIFICATE, {
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Update Certificate is successful',
      });

      onCloseModal();
      onRefreshPage();
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Update Certificate is fail',
      });
    },
  });

  const [form] = BaseForm.useForm();

  useEffect(() => {
    if (certificateUpdateProps) {
      form.setFieldsValue({
        certificateName: certificateUpdateProps.certificateName,
        certificateLink: certificateUpdateProps.certificateLink,
        isActive: certificateUpdateProps.isActive,
      });
    }
  }, [certificateUpdateProps]);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  const onCloseModal = () => setIsOpenModal(false);
  const onSubmit = (values: UpdateCertificateTypes) => {
    updateCertificateMutate({ ...values, certificateID: Number(certificateUpdateProps.certificateID) });
  };

  return (
    <BaseModal
      centered
      footer={null}
      open={isOpenModal}
      onCancel={onCloseModal}
      closeIcon
      title={<Typography className="text-xl">Update Certificate</Typography>}
      width={800}
    >
      {contextHolder}
      <BaseForm form={form} layout="vertical" requiredMark={false} onFinish={onSubmit}>
        <BaseRow gutter={[20, 20]}>
          <BaseCol span={24}>
            <BaseForm.Item name="certificateName" label="Name" rules={[fieldValidate.required]}>
              <BaseInput placeholder="Enter your Certificate name" required maxLength={50} />
            </BaseForm.Item>
          </BaseCol>

          <BaseCol span={24}>
            <BaseForm.Item name="certificateLink" label="Link" rules={[fieldValidate.required]}>
              <BaseInput.TextArea rows={3} placeholder="Enter your Certificate link" required />
            </BaseForm.Item>
          </BaseCol>

          {/* <BaseCol span={24}>
            <BaseForm.Item name="isActive" label="Status" rules={[fieldValidate.required]}>
              <BaseSelect
                defaultValue={true}
                options={[
                  { label: 'Active', value: true },
                  { label: 'DeActive', value: false },
                ]}
              />
            </BaseForm.Item>
          </BaseCol> */}

          <BaseCol span={24} className="flex items-center justify-end gap-2">
            <BaseButton danger>Reset</BaseButton>
            <BaseButton
              icon={<SaveOutlined />}
              className="flex items-center"
              htmlType="submit"
              loading={isLoading}
              type="primary"
            >
              Save
            </BaseButton>
          </BaseCol>
        </BaseRow>
      </BaseForm>
    </BaseModal>
  );
};

export default forwardRef(UpdateMenuModal);
