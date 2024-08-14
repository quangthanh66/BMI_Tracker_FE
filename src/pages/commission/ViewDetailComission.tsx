import COMMISSION_API from "@app/api/commission";
import { BaseModal } from "@app/components/common/BaseModal/BaseModal";
import { CommissionColumns, DetailCommissionItemResponse } from "@app/models";
import { useMutation } from "@tanstack/react-query";
import { message, Spin, Table } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";

const ViewDetailCommission = ({}, ref: any) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [commissionDetail, setCommissionDetail] = useState<
    DetailCommissionItemResponse[]
  >([]);

  const { isLoading: isLoadingViewDetail, mutate: viewDetailMutation } =
    useMutation(COMMISSION_API.GET_DETAILS, {
      onSuccess: (response: any) =>
        setCommissionDetail(response.data === "" ? [] : response),
      onError: () => {
        messageApi.open({
          type: "error",
          content: "Get commission detail is failed",
        });
      },
    });

  useImperativeHandle(ref, () => {
    return {
      openModal: (id: number) => {
        viewDetailMutation(id);
        setIsOpenModal(true);
      },
    };
  });

  const onCloseModal = () => setIsOpenModal(false);

  return (
    <BaseModal
      title="Detail Commissions"
      open={isOpenModal}
      onCancel={onCloseModal}
      closeIcon
      footer={null}
      width={1000}
    >
      <Spin spinning={isLoadingViewDetail}>
        <Table columns={CommissionColumns()} dataSource={commissionDetail} />
      </Spin>
    </BaseModal>
  );
};

export default forwardRef(ViewDetailCommission);
