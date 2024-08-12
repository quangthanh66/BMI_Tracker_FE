import { PlusOutlined } from "@ant-design/icons";
import PLAN_API from "@app/api/plan";
import { TUpdatePlan } from "@app/api/plan/type";
import { BaseButton } from "@app/components/common/BaseButton/BaseButton";
import { BaseModal } from "@app/components/common/BaseModal/BaseModal";
import { BaseTypography } from "@app/components/common/BaseTypography/BaseTypography";
import { BaseForm } from "@app/components/common/forms/BaseForm/BaseForm";
import { BaseSelect } from "@app/components/common/selects/BaseSelect/BaseSelect";
import { PLAN_STATUS, PLAN_STATUS_LABEL } from "@app/utils/constant";
import { useMutation } from "@tanstack/react-query";
import { Col, Form, Row, Space, message } from "antd";
import _ from "lodash";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

type TUpdatePlanProps = {
  refetchPage: () => void;
  planUpdate: TUpdatePlan;
};

const UpdatePlanModal = (
  { planUpdate, refetchPage }: TUpdatePlanProps,
  ref: any
) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = BaseForm.useForm();
  const { isLoading, mutate: updatePlanMutate } = useMutation(
    PLAN_API.UPDATE_PLAN,
    {
      onSuccess: () => {
        messageApi.open({
          type: "success",
          content: "Update plan is successfully",
        });

        refetchPage();
        onCloseModal();
      },
      onError: () => {
        messageApi.open({
          type: "error",
          content: "Cant update plan . Please try again !",
        });
      },
    }
  );

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  useEffect(() => {
    if (planUpdate) {
      const planWithoutId = _.omit(planUpdate, "planID");
      form.setFieldsValue({
        ...planWithoutId,
      });
    }
  }, [planUpdate]);

  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  const submitForm = (values: TUpdatePlan) => {
    updatePlanMutate({
      ...values,
      packageID: Number(planUpdate.packageID) || -1,
    });
  };

  return (
    <BaseModal
      centered
      footer={null}
      open={isOpenModal}
      onCancel={onCloseModal}
      title={<BaseTypography className="text-xl">Update plan</BaseTypography>}
      width={800}
      closeIcon
    >
      {contextHolder}
      <Form
        layout="vertical"
        form={form}
        requiredMark={false}
        onFinish={submitForm}
      >
        <Row gutter={[14, 14]}>
          <Col span={24}>
            <Form.Item label="Status" name="packageStatus">
              <BaseSelect
                options={PLAN_STATUS_LABEL.filter(
                  (item) => item.value !== PLAN_STATUS.PENDING
                )}
              />
            </Form.Item>
          </Col>

          <Col span={24} className="flex justify-end">
            <Space>
              <BaseButton onClick={onCloseModal}>Close</BaseButton>
              <BaseButton
                icon={<PlusOutlined />}
                className="flex items-center"
                htmlType="submit"
                loading={isLoading}
                type="primary"
              >
                Submit
              </BaseButton>
            </Space>
          </Col>
        </Row>
      </Form>
    </BaseModal>
  );
};

export default forwardRef(UpdatePlanModal);
