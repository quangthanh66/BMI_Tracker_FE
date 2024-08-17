import { EditOutlined, EyeOutlined } from "@ant-design/icons";

import { BaseButton } from "components/common/BaseButton/BaseButton";
import { BaseTag } from "components/common/BaseTag/BaseTag";
import { BaseTooltip } from "components/common/BaseTooltip/BaseTooltip";
import { CommissionItemTypes } from "./type";

type CommissionColumnsTypes = {
  updateCommissionModal: (commission: CommissionItemTypes) => void;
  viewDetailFn: (id: number) => void;
};
function convertDateFormat(inputDate: string): string {
  // Check if inputDate is valid
  if (!inputDate) {
    return 'Invalid date';
  }

  // Split the input date into year, month, and day
  const parts = inputDate.split('-');
  if (parts.length === 3) {
    // Reorder the parts and join them with "-"
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  } else {
    // If the input date is not in the expected format, return an error message
    return 'Invalid date format';
  }
}
function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
export enum CommissionStatus {
  active = "true",
  deactive = "false",
}

export const CommissionColumns: any = ({
  updateCommissionModal,
  viewDetailFn,
}: CommissionColumnsTypes) => [
  {
    title: "Advisor",
    dataIndex: "advisorName",
  },
  {
    title: "Commission Amount (VND)",
    dataIndex: "commissionAmount",
    sortDirections: ["descend"],
    render: (text: number) => formatNumber(text),
  },

  {
    title: "Paid Date",
    dataIndex: "paidDate",
    render: (text: string) => convertDateFormat(text),
  },
  {
    title: "Deadline",
    dataIndex: "expectedPaymentDate",
    sorter: (a: CommissionItemTypes, b: CommissionItemTypes) => {
      const dateA = new Date(a.expectedPaymentDate).getTime();
      const dateB = new Date(b.expectedPaymentDate).getTime();
      return dateA - dateB;
    },
    sortDirections: ["ascend", "descend"],
  },
  {
    title: "Paid Amount (VND)",
    dataIndex: "paidAmount",
    sortDirections: ["descend"],
    render: (text: number) => formatNumber(text),
  },
  {
    title: "Payment Status",
    dataIndex: "paymentStatus",
    //render: (type: string) => <BaseTag color={type === 'PAID' ? 'green' : 'red'}>{type}</BaseTag>,
    render: (type: string) => {
      let color = "";
      switch (type) {
        case "PAID":
          color = "green";
          break;
        case "UNPAID":
          color = "red";
          break;
        default:
          color = "geekblue";
      }
      return <BaseTag color={color}>{type}</BaseTag>;
    },
  },
  {
    title: "Description",
    dataIndex: "commissionDescription",
    sortDirections: ["descend"],
  },

  {
    title: "Actions",
    dataIndex: "commissionID",
    render: (commissionID: number, commission: CommissionItemTypes) => (
      <div className="flex items-center gap-x-4">
        <BaseTooltip title="Edit commission information">
          <BaseButton
            onClick={() => updateCommissionModal(commission)}
            icon={<EditOutlined className="text-[24px]" />}
            type="text"
          ></BaseButton>
        </BaseTooltip>

        <BaseTooltip title="View detail">
          <BaseButton
            onClick={() => viewDetailFn(commissionID)}
            icon={<EyeOutlined className="text-[24px]" />}
            type="text"
          ></BaseButton>
        </BaseTooltip>

        {/* {!commission.status && (
          <BaseTooltip title="Active">
            <BaseButton
              onClick={() => approveCommission(commissionID)}
              icon={<CheckCircleOutlined className="text-[24px]" />}
              type="text"
            ></BaseButton>
          </BaseTooltip>
        )} */}
      </div>
    ),
  },
];
