import { PlusOutlined } from "@ant-design/icons";
import COMMISSION_API from "@app/api/commission";
import { BaseButton } from "@app/components/common/BaseButton/BaseButton";
import { BaseCol } from "@app/components/common/BaseCol/BaseCol";
import { BaseModal } from "@app/components/common/BaseModal/BaseModal";
import { BaseRow } from "@app/components/common/BaseRow/BaseRow";
import { BaseForm } from "@app/components/common/forms/BaseForm/BaseForm";
import { BaseInput } from "@app/components/common/inputs/BaseInput/BaseInput";
import { fieldValidate } from "@app/utils/helper";
import { useMutation } from "@tanstack/react-query";
import { Col, DatePicker, Select, Typography, message } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { CommissionItemTypes } from "./type";

dayjs.extend(utc);

type UpdateCommissionTypes = {
  commissionUpdate: CommissionItemTypes;
  onRefreshPage: () => void;
};

const UpdateCommissionModal = (
  { commissionUpdate, onRefreshPage }: UpdateCommissionTypes,
  ref: any
) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = BaseForm.useForm();
  const {
    isLoading: isLoadingUpdateCommission,
    mutate: mutateUpdateCommission,
  } = useMutation(COMMISSION_API.UPDATE_COMMISSION, {
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Update commission is successful",
      });

      onCloseModal();
      onRefreshPage();
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Update commission is failed",
      });
    },
  });

  useEffect(() => {
    if (commissionUpdate) {
      console.log(commissionUpdate);

      form.setFieldsValue({
        ...commissionUpdate,
        paidDate: dayjs(commissionUpdate.paidDate, "YYYY-MM-DD"),
      });
    }
  }, [commissionUpdate]);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  const onCloseModal = () => setIsOpenModal(false);

  const onSubmit = (values: CommissionItemTypes) => {
    mutateUpdateCommission({
      ...values,
      paidDate: dayjs(values.paidDate).format("YYYY-MM-DD"),
      commissionID: String(commissionUpdate.commissionID),
    });
  };

  return (
    <BaseModal
      centered
      footer={null}
      open={isOpenModal}
      onCancel={onCloseModal}
      closeIcon
      title={
        <Typography className="text-xl">
          Update commission information
        </Typography>
      }
    >
      {contextHolder}
      <BaseForm
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={onSubmit}
      >
        <BaseRow gutter={[20, 20]}>
          <BaseCol span={12}>
            <BaseForm.Item
              name="paidDate"
              label={<span style={{ fontWeight: "bold" }}>Paid Date</span>}
              rules={[fieldValidate.required]}
            >
              <DatePicker style={{ width: "100%" }} />
            </BaseForm.Item>
          </BaseCol>

          <BaseCol span={12}>
            <BaseForm.Item
              name="paidAmount"
              label={
                <span style={{ fontWeight: "bold" }}>Paid amount (VND)</span>
              }
              rules={[fieldValidate.required]}
            >
              <BaseInput
                placeholder="Enter your paid amount"
                required
                maxLength={50}
              />
            </BaseForm.Item>
          </BaseCol>

          <BaseCol span={24}>
            <BaseForm.Item
              name="commissionDescription"
              label={<span style={{ fontWeight: "bold" }}>Description</span>}
              rules={[fieldValidate.required]}
            >
              <BaseInput
                placeholder="Enter description"
                required
                maxLength={1000}
              />
            </BaseForm.Item>
          </BaseCol>

          <Col span={24}>
            <BaseForm.Item
              label={<span style={{ fontWeight: "bold" }}>Status</span>}
              name="paymentStatus"
            >
              <Select
                options={[
                  {
                    label: "PAID",
                    value: "PAID",
                  },
                  {
                    label: "UNPAID",
                    value: "UNPAID",
                  },
                ]}
              />
            </BaseForm.Item>
          </Col>

          <BaseCol span={24} className="flex items-center justify-end gap-2">
            <BaseButton danger onClick={() => form.resetFields()}>
              Clear
            </BaseButton>
            <BaseButton
              icon={<PlusOutlined />}
              className="flex items-center"
              htmlType="submit"
              loading={isLoadingUpdateCommission}
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

export default forwardRef(UpdateCommissionModal);
