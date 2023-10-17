import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseSelect } from '@app/components/common/selects/BaseSelect/BaseSelect';
import { fieldValidate } from '@app/utils/helper';
import { forwardRef, useImperativeHandle, useState } from 'react';

const CreateFood = ({}, ref: any) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = BaseForm.useForm();

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
      title={<BaseTypography className="text-xl">Create a new food</BaseTypography>}
    >
      <BaseForm layout="vertical" requiredMark={false} form={form}>
        <BaseRow gutter={[20, 20]}>
          <BaseCol span="24">
            <BaseForm.Item name="menu" label="Name" rules={[fieldValidate.required]}>
              <BaseInput placeholder="Enter your food name" required maxLength={50} />
            </BaseForm.Item>
          </BaseCol>

          <BaseCol span={24}>
            <BaseForm.Item name="category" label="Category" rules={[fieldValidate.required]}>
              <BaseSelect
                placeholder="Choose your category"
                options={[
                  { label: 'Fast food', value: 'FastFood' },
                  { label: 'Vegererian', value: 'Vegererian' },
                ]}
              />
            </BaseForm.Item>
          </BaseCol>

          <BaseCol span={24}>
            <BaseForm.Item name="photo" label="Photo" rules={[fieldValidate.required]} className="w-full">
              <BaseButton className="w-full" icon={<UploadOutlined />}>
                Upload
              </BaseButton>
            </BaseForm.Item>
          </BaseCol>

          <BaseCol span={24} className="flex items-center justify-end gap-2">
            <BaseButton danger>Clear</BaseButton>
            <BaseButton
              icon={<PlusOutlined />}
              className="flex items-center"
              htmlType="submit"
              loading={false}
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

export default forwardRef(CreateFood);
