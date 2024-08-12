import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { Col, Form, Select, Typography, message } from 'antd';
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
import { PLAN_STATUS_LABEL } from '@app/utils/constant';
import { BaseSelect } from '@app/components/common/selects/BaseSelect/BaseSelect';

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
      title={<Typography className="text-xl">Confirm user request</Typography>}
    >
      {contextHolder}
      <BaseForm form={form} layout="vertical" requiredMark={false} onFinish={onSubmit}>
        <BaseRow gutter={[20, 20]}>
          <BaseCol span={24}>
            <BaseForm.Item name="processNote" label="Process Note" rules={[fieldValidate.required]}>
              <BaseInput placeholder="Enter your note" />
            </BaseForm.Item>
          </BaseCol>

          <Col span={24}>
            <Form.Item label="Status" name="status">
              <BaseSelect options={PLAN_STATUS_LABEL} />
            </Form.Item>
          </Col>


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
