import { CertificateItemTypes } from '@app/api/certificate/type';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { useState, useImperativeHandle, forwardRef } from 'react';

type ViewDetailCertificateTypes = {
  certificateProps: CertificateItemTypes;
};

const ViewDetailCertificate = ({ certificateProps }: ViewDetailCertificateTypes, ref: any) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  const onCloseModal = () => setIsOpenModal(false);

  return (
    <BaseModal centered footer={null} open={isOpenModal} onCancel={onCloseModal} closeIcon width={1000}>
      {certificateProps && (
        <BaseRow gutter={[14, 14]}>
          <BaseCol span={24}>
            <BaseTypography.Title level={3}>{certificateProps.certificateName}</BaseTypography.Title>
          </BaseCol>

          <BaseCol span={24}>
            <BaseTypography.Paragraph>{certificateProps.certificateLink}</BaseTypography.Paragraph>
          </BaseCol>
        </BaseRow>
      )}
    </BaseModal>
  );
};

export default forwardRef(ViewDetailCertificate);
