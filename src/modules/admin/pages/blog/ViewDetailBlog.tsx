import { BlogItemTypes } from '@app/api/blogs/type';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { useState, useImperativeHandle, forwardRef } from 'react';

type ViewDetailBlogTypes = {
  blogProps: BlogItemTypes;
};

const ViewDetailBlog = ({ blogProps }: ViewDetailBlogTypes, ref: any) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  const onCloseModal = () => setIsOpenModal(false);

  return (
    <BaseModal centered footer={null} open={isOpenModal} onCancel={onCloseModal} closeIcon width={1000}>
      {blogProps && (
        <BaseRow gutter={[14, 14]}>
          <BaseCol span={24}>
            <BaseTypography.Title level={3}>{blogProps.blogName}</BaseTypography.Title>
          </BaseCol>

          <BaseCol span={24}>
            <BaseTypography.Paragraph>{blogProps.blogContent}</BaseTypography.Paragraph>
          </BaseCol>
        </BaseRow>
      )}
    </BaseModal>
  );
};

export default forwardRef(ViewDetailBlog);
