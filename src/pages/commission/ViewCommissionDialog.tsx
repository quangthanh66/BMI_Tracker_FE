import { CommissionDetailsTypes } from "@app/api/commission/type";
import { BaseModal } from "@app/components/common/BaseModal/BaseModal";
import { BaseTable } from "@app/components/common/BaseTable/BaseTable";
import _ from "lodash";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { CommissionColumns } from "./CommissionColumn";
import { useMutation } from "@tanstack/react-query";
import COMMISSION_API from "@app/api/commission";
import { message, Spin } from "antd";
import { BaseButton } from "@app/components/common/BaseButton/BaseButton";
import { PlusOutlined } from "@ant-design/icons";


type ViewDetailProps = {
  refreshCommmissions: () => void;
};

const ViewCommissionDialog = (
  { refreshCommmissions }: ViewDetailProps,
  ref: any
) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [commissionItem, setCommissionItem] = useState<CommissionDetailsTypes[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [foodId, setFoodId] = useState("");


  useImperativeHandle(ref, () => {
    return {
      openModal: (value: CommissionDetailsTypes) => {
       // setCommissionItem(value.commission);
        setIsOpenModal(true);
      },
    };
  });
  const onCloseModal = () => {
    refreshCommmissions();
    setIsOpenModal(false);
  };



  return (
    <BaseModal
      title="Detail commission"
      open={isOpenModal}
      onCancel={onCloseModal}
      footer={
        <div className="flex items-center justify-end gap-2 w-full py-2">

        </div>
      }
      width={1000}
      bodyStyle={{
        margin: 30,
        height: '525px',
      }}
    >
      {contextHolder}

 
      <Spin spinning tip="Loading...">
        <BaseTable
          dataSource={CommissionColumns}
          pagination={{
            pageSize: 3,
          }}
        />
      </Spin>
    </BaseModal>
  );
};

export default forwardRef(ViewCommissionDialog);
