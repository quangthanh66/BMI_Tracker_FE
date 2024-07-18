import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { useState, useImperativeHandle, forwardRef } from 'react';

type DescriptionTypes = {
  content: string;
};

const DescriptionModal = ({ content }: DescriptionTypes, ref: any) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  const onCloseModal = () => setIsOpenModal(false);

  return (
    <BaseModal
      centered
      footer={null}
      open={isOpenModal}
      onCancel={onCloseModal}
      closeIcon
      title={<BaseTypography className="text-xl">Description</BaseTypography>}
    >
      <BaseTypography>{content}</BaseTypography>
    </BaseModal>
  );
};

export default forwardRef(DescriptionModal);
