import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseSelect } from '@app/components/common/selects/BaseSelect/BaseSelect';
import { message } from 'antd';
import { useState, forwardRef, useImperativeHandle } from 'react';

const ChangeUserRole = ({}, ref: any) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = BaseForm.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const onCloseModal = () => setIsOpenModal(false);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  return (
    <BaseModal
      centered
      footer={null}
      open={isOpenModal}
      onCancel={onCloseModal}
      closeIcon
      title={<BaseTypography className="text-xl">Change user role</BaseTypography>}
    >
      <BaseForm layout="vertical" requiredMark={false} form={form}>
        <BaseRow gutter={[14, 14]}>
          <BaseCol span={24}>
            <BaseSelect
              placeholder="Choose your role"
              width="100%"
              options={[
                { value: 'ROLE_ADMIN', label: 'Admin' },
                { value: 'ROLE_MEMBER', label: 'Member' },
                { value: 'ROLE_ADVISOR', label: 'Advisor' },
              ]}
            ></BaseSelect>
          </BaseCol>
          <BaseCol span={24} className="flex justify-end w-full">
            <BaseButton className="flex items-center" htmlType="submit" loading={false} type="primary">
              Submit
            </BaseButton>
          </BaseCol>
        </BaseRow>
      </BaseForm>
    </BaseModal>
  );
};

export default forwardRef(ChangeUserRole);
