import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { Typography, message } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { FeedbackItemTypes } from './type';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { fieldValidate } from '@app/utils/helper';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { PlusOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import FEEDBACK_API from '@app/api/feedbacks';

type UpdateFeedbackTypes = {
  feedbackUpdate: FeedbackItemTypes;
  onRefreshPage: () => void;
};

const UpdateFeedbackModal = ({ feedbackUpdate, onRefreshPage }: UpdateFeedbackTypes, ref: any) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = BaseForm.useForm();
  const { isLoading: isLoadingUpdateFeedback, mutate: mutateUpdateFeedback } = useMutation(
    FEEDBACK_API.UPDATE_FEEDBACK,
    {
      onSuccess: () => {
        messageApi.open({
          type: 'success',
          content: 'Update feedback is successful',
        });

        onCloseModal();
        onRefreshPage();
      },
      onError: () => {
        messageApi.open({
          type: 'error',
          content: 'Update feedback is failed',
        });
      },
    },
  );

  useEffect(() => {
    if (feedbackUpdate) {
      form.setFieldsValue({
        title: feedbackUpdate.purpose,
        description: feedbackUpdate.processNote,
        type: feedbackUpdate.type,
      });
    }
  }, [feedbackUpdate]);

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
    >
      {contextHolder}
      <BaseForm form={form} layout="vertical" requiredMark={false} onFinish={onSubmit}>
        <BaseRow gutter={[20, 20]}>
          <BaseCol span={24}>
            <BaseForm.Item name="title" label="Title" rules={[fieldValidate.required]}>
              <BaseInput placeholder="Enter your title" required maxLength={50} />
            </BaseForm.Item>
          </BaseCol>

          <BaseCol span={24}>
            <BaseForm.Item name="description" label="Description" rules={[fieldValidate.required]}>
              <BaseInput placeholder="Enter your description" required maxLength={50} />
            </BaseForm.Item>
          </BaseCol>

          {/* <BaseCol span={24}>
              <BaseForm.Item name="type" label="Type" rules={[fieldValidate.required]}>
                <BaseInput placeholder="Enter your type" required maxLength={50} />
              </BaseForm.Item>
            </BaseCol>

            <BaseCol span={24}>
              <BaseForm.Item name="userId" label="User" rules={[fieldValidate.required]}>
                <Select placeholder="Choose the user that make the feedback" options={userSelect} />
              </BaseForm.Item>
            </BaseCol> */}

          <BaseCol span={24} className="flex items-center justify-end gap-2">
            <BaseButton danger onClick={() => form.resetFields()}>
              Clear
            </BaseButton>
            <BaseButton
              icon={<PlusOutlined />}
              className="flex items-center"
              htmlType="submit"
              loading={isLoadingUpdateFeedback}
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

export default forwardRef(UpdateFeedbackModal);
