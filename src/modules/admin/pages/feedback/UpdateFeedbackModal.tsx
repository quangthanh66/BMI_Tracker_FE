import { PlusOutlined } from "@ant-design/icons";
import FEEDBACK_API from "@app/api/feedbacks";
import { BaseButton } from "@app/components/common/BaseButton/BaseButton";
import { BaseCol } from "@app/components/common/BaseCol/BaseCol";
import { BaseModal } from "@app/components/common/BaseModal/BaseModal";
import { BaseRow } from "@app/components/common/BaseRow/BaseRow";
import { BaseForm } from "@app/components/common/forms/BaseForm/BaseForm";
import { BaseInput } from "@app/components/common/inputs/BaseInput/BaseInput";
import { BaseSelect } from "@app/components/common/selects/BaseSelect/BaseSelect";
import { PLAN_STATUS, PLAN_STATUS_LABEL } from "@app/utils/constant";
import { fieldValidate } from "@app/utils/helper";
import { useMutation } from "@tanstack/react-query";
import { Col, Form, Typography, message } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { FeedbackItemTypes } from "./type";

type UpdateFeedbackTypes = {
  feedbackUpdate: FeedbackItemTypes;
  onRefreshPage: () => void;
};

const UpdateFeedbackModal = (
  { feedbackUpdate, onRefreshPage }: UpdateFeedbackTypes,
  ref: any
) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = BaseForm.useForm();
  const { isLoading: isLoadingUpdateFeedback, mutate: mutateUpdateFeedback } =
    useMutation(FEEDBACK_API.UPDATE_FEEDBACK, {
      onSuccess: () => {
        messageApi.open({
          type: "success",
          content: "Update feedback is successful",
        });

        onCloseModal();
        onRefreshPage();
      },
      onError: () => {
        messageApi.open({
          type: "error",
          content: "Update feedback is failed",
        });
      },
    });

  useEffect(() => {
    if (feedbackUpdate) {
      form.setFieldsValue({
        userRequestID: feedbackUpdate.userRequestID,
        processNote: feedbackUpdate.processNote,
        status: feedbackUpdate.status,
      });
    }
  }, [feedbackUpdate]);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  const onCloseModal = () => setIsOpenModal(false);
  const onSubmit = (values: FeedbackItemTypes) =>
    mutateUpdateFeedback({
      ...values,
      userRequestID: feedbackUpdate.userRequestID,
    });

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
      <BaseForm
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={onSubmit}
      >
        <BaseRow gutter={[20, 20]}>
          <BaseCol span={24}>
            <BaseForm.Item
              name="processNote"
              label="Process Note"
              rules={[fieldValidate.required]}
            >
              <BaseInput placeholder="Enter your note" />
            </BaseForm.Item>
          </BaseCol>

          <Col span={24}>
            <Form.Item label="Status" name="status">
              <BaseSelect
                options={PLAN_STATUS_LABEL.filter(
                  (item) => item.value !== PLAN_STATUS.PENDING
                )}
              />
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
