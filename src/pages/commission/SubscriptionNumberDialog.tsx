import SUBSCRIPTION_API from "@app/api/subscription";
import { MilestonesItemResponse } from "@app/api/subscription/type";
import { BaseModal } from "@app/components/common/BaseModal/BaseModal";
import { useMutation } from "@tanstack/react-query";
import { message, Spin, Table } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";
import { milestonesColumn } from "./MilestonesColumn";

const SubscriptionNumberDialog = ({}, ref: any) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [milestones, setMilestones] = useState<MilestonesItemResponse[]>([]);

  const { isLoading: isLoadingGetData, mutate: getMilestones } = useMutation(
    SUBSCRIPTION_API.GET_MILESTONES,
    {
      onSuccess: (result: any) => setMilestones(result),
      onError: () =>
        messageApi.open({
          type: "error",
          content: "Your request is fail",
        }),
    }
  );

  useImperativeHandle(ref, () => {
    return {
      openModal: (value: number) => {
        getMilestones(value);
        setIsOpenModal(true);
      },
    };
  });

  const onCloseModal = () => setIsOpenModal(false);

  return (
    <BaseModal
      title="Detail commission"
      open={isOpenModal}
      onCancel={onCloseModal}
      footer={null}
      width={800}
    >
      {contextHolder}
      <Spin tip="Loading..." spinning={isLoadingGetData}>
        <Table
          dataSource={milestones}
          columns={milestonesColumn()}
          pagination={{
            pageSize: 5,
          }}
        />
      </Spin>
    </BaseModal>
  );
};

export default forwardRef(SubscriptionNumberDialog);
