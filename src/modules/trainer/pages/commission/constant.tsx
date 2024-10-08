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
  if (!inputDate) {
    return "";
  }
  const datePart = inputDate.split("T")[0]; // Lấy phần YYYY-MM-DD
  const parts = datePart.split("-"); // Tách thành mảng [YYYY, MM, DD]
  // Trả về định dạng DD-MM-YYYY
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
}

function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export enum CommissionStatus {
  PAID = "PAID",
  UNPAID = "UNPAID",
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
    title: "Paid Amount (VND)",
    dataIndex: "paidAmount",
    sortDirections: ["descend"],
    render: (text: number) => formatNumber(text),
  },

  {
    title: "Deadline",
    dataIndex: "expectedPaymentDate",
    render: (text: string) => convertDateFormat(text),
    sorter: (a: CommissionItemTypes, b: CommissionItemTypes) => {
      const dateA = new Date(a.expectedPaymentDate).getTime();
      const dateB = new Date(b.expectedPaymentDate).getTime();
      return dateA - dateB;
    },
    sortDirections: ["ascend", "descend"],
  },
  {
    title: "Paid Date",
    dataIndex: "paidDate",
    render: (text: string) => convertDateFormat(text),
  },
  {
    title: "Description",
    dataIndex: "commissionDescription",
    sortDirections: ["descend"],
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
      </div>
    ),
  },
];
