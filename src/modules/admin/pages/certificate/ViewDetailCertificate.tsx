import { CertificateItemTypes } from '@app/api/certificate/type';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { Image } from 'antd';
import { useState, useImperativeHandle, forwardRef } from 'react';
import errorImage from 'assets/error-image-alt.png';

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
    <BaseModal centered footer={null} open={isOpenModal} onCancel={onCloseModal} closeIcon width={500}>
      {certificateProps && (
        <BaseRow gutter={[14, 14]}>
          <BaseCol span={24}>
            <BaseTypography.Title level={3}>{certificateProps.certificateName}</BaseTypography.Title>
          </BaseCol>

          <BaseCol span={24}>
            <Image
              alt="blog-photo-alt"
              src={certificateProps.certificateLink}
              className="h-[500px] w-full object-cover"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = errorImage;
              }}
            />
          </BaseCol>
        </BaseRow>
      )}
    </BaseModal>
  );
};

export default forwardRef(ViewDetailCertificate);
