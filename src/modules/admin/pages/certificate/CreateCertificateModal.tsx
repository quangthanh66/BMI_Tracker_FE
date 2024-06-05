import { PlusOutlined } from '@ant-design/icons';
import CERTIFICATE_API from '@app/api/certificate';
import { CertificateItemTypes } from '@app/api/certificate/type';
import USERS_API from '@app/api/users';
import { UserItemTypes } from '@app/api/users/type';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseSelect } from '@app/components/common/selects/BaseSelect/BaseSelect';
import { SelectTypes, fieldValidate } from '@app/utils/helper';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Select, Spin, message } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

type CreateCertificateTypes = {
  onRefreshPage: () => void;
};

const CreateCertificateModal = ({ onRefreshPage }: CreateCertificateTypes, ref: any) => {
  const [form] = BaseForm.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [userSelect, setUserSelect] = useState<SelectTypes[]>([]);
  const { isLoading: isLoadingGetUsers, refetch } = useQuery(['user-list'], USERS_API.GET_LIST, {
    enabled: false,
    onSuccess: (response: UserItemTypes[]) => {
      const convertUserSelect = response.map((user) => {
        return {
          label: user.fullName,
          value: user.accountID,
        };
      });

      setUserSelect(convertUserSelect);
    },
    onError: () => {},
  });

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
        content: 'Creat a new Certificate is failed',
      });
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  const onCloseModal = () => {
    setIsOpenModal(false);
    form.resetFields();
  };

  const onSubmit = (values: CertificateItemTypes) => {
    mutate({ ...values, certificateLink: values.certificateName });
  };

  return (
    <Spin spinning={isLoadingGetUsers} tip="Loading data ...">
      <BaseModal
        centered
        footer={null}
        open={isOpenModal}
        onCancel={onCloseModal}
        closeIcon
        title={<BaseTypography className="text-xl">Create a new certificate </BaseTypography>}
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
    </Spin>
  );
};

export default forwardRef(CreateCertificateModal);
