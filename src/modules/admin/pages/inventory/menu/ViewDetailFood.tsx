import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { useState, useImperativeHandle, forwardRef } from 'react';

const ViewDetailFood = ({}, ref: any) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  const onCloseModal = () => setIsOpenModal(false);

  return (
    <BaseModal centered footer={null} open={isOpenModal} onCancel={onCloseModal} closeIcon width={1000}>
      <BaseRow gutter={[14, 14]}>
        <BaseCol span={24}>
          <div className="w-full h-[350px] bg-center bg-cover bg-no-repeat bg-[url('https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VzaGl8ZW58MHx8MHx8fDA%3D')]" />
        </BaseCol>

        <BaseCol span={24}>
          <BaseTypography.Title level={3}>Sushi</BaseTypography.Title>
        </BaseCol>
        <BaseCol span={24}>
          <BaseTypography>Cooking instructors</BaseTypography>
        </BaseCol>

        <BaseCol span={24}>
          <BaseTypography.Paragraph>
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
            Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at
            Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem
            Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable
            source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes
            of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular
            during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in
            section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those
            interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in
            their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
          </BaseTypography.Paragraph>
        </BaseCol>

        <BaseCol span={24}>
          <BaseButton type="primary" className="w-full">
            Original source
          </BaseButton>
        </BaseCol>
      </BaseRow>
    </BaseModal>
  );
};

export default forwardRef(ViewDetailFood);
