import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { Typography } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { FeedbackItemTypes } from './type';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { fieldValidate } from '@app/utils/helper';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseSelect } from '@app/components/common/selects/BaseSelect/BaseSelect';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { SaveOutlined } from '@ant-design/icons';

const UpdateFeedbackModal = ({}, ref: any) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = BaseForm.useForm();

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  const onCloseModal = () => setIsOpenModal(false);
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
      title={<Typography className="text-xl">Update feedback information</Typography>}
      width={800}
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
              { value: 'Vegetarian', label: 'Vegetarian' },
              { value: 'Salty ', label: 'Salty' },
              { value: 'Weight gain', label: 'Weight gain' },
              { value: 'Weight loss ', label: 'Weight loss' },
              { value: 'Muscle gain', label: 'Muscle gain' },
              { value: 'Muscle loss', label: 'Muscle loss' },
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
            <BaseButton danger>Reset form</BaseButton>
            <BaseButton
              icon={<SaveOutlined />}
              className="flex items-center"
              htmlType="submit"
              loading={false}
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

export default forwardRef(UpdateFeedbackModal);
