import { PlusOutlined } from '@ant-design/icons';
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
import { FeedbackItemTypes } from './type';

const CreateFeedbackModal = ({}, ref: any) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = BaseForm.useForm();

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  const onCloseModal = () => setIsOpenModal(false);
  const onResetForm = () => {
    form.resetFields();
  };

  const onSubmit = (values: FeedbackItemTypes) => {
    console.log(values);
  };

  return (
    <BaseModal
      centered
      footer={null}
      open={isOpenModal}
      onCancel={onCloseModal}
      closeIcon
      title={<BaseTypography className="text-xl">Create a new feedback</BaseTypography>}
    >
      <BaseForm form={form} layout="vertical" requiredMark={false} onFinish={onSubmit}>
        <BaseRow gutter={[20, 20]}>
          <BaseCol span={24}>
            <BaseForm.Item name="menu" label="Name" rules={[fieldValidate.required]}>
              <BaseInput placeholder="Enter your feedback name" required maxLength={50} />
            </BaseForm.Item>
          </BaseCol>

          <BaseCol span={24}>
            <BaseForm.Item name="type" label="Type" rules={[fieldValidate.required]}>
              <BaseSelect
                placeholder="Choose your feedback type"
                options={[
                  { label: 'Fast food', value: 'FastFood' },
                  { label: 'Vegererian', value: 'Vegererian' },
                ]}
              />
            </BaseForm.Item>
          </BaseCol>

          <BaseCol span={24}>
            <BaseForm.Item name="description" label="Description" rules={[fieldValidate.required]}>
              <BaseInput.TextArea placeholder="Enter your description of the feedback" rows={5}></BaseInput.TextArea>
            </BaseForm.Item>
          </BaseCol>

          <BaseCol span={24} className="flex items-center justify-end gap-2">
            <BaseButton danger onClick={onResetForm}>
              Clear
            </BaseButton>
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

export default forwardRef(CreateFeedbackModal);
