import COMMISSION_API from "@app/api/commission";
import { BaseModal } from "@app/components/common/BaseModal/BaseModal";
import { DetailCommissionItemResponse } from "@app/models";
import { useMutation } from "@tanstack/react-query";
import { message, Spin } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";

const ViewDetailCommission = ({}, ref: any) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [commissionDetail, setCommissionDetail] = useState<
    DetailCommissionItemResponse[]
  >([]);

  const { isLoading: isLoadingViewDetail, mutate: viewDetailMutation } =
    useMutation(COMMISSION_API.GET_DETAILS, {
      onSuccess: (response: any) => setCommissionDetail(response),
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

  console.log("Commission: ", commissionDetail);

  return (
    <BaseModal
      title="Detail Commission"
      open={isOpenModal}
      onCancel={onCloseModal}
      closeIcon
      footer={null}
    >
      <Spin spinning={isLoadingViewDetail}></Spin>
    </BaseModal>
  );
};

export default forwardRef(ViewDetailCommission);
