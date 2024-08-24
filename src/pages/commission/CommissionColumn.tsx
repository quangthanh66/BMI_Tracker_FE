import { EyeOutlined } from "@ant-design/icons";
import { BaseButton } from "@app/components/common/BaseButton/BaseButton";

export type DetailCommissionItemResponse = {
  commissionAllocationID: number;
  amount: number;
  description: string;
  milestone: string;
  milestoneDate: string;
  subscriptionNumber: string;
};
function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function convertDateFormat(inputDate: string): string {
  if (!inputDate) {
    return "";
  }
  const datePart = inputDate.split("T")[0]; // Lấy phần YYYY-MM-DD
  const parts = datePart.split("-"); // Tách thành mảng [YYYY, MM, DD]
  // Trả về định dạng DD-MM-YYYY
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
}

interface ICommission {
  viewDetailFn: (value: number) => void;
}

export const CommissionColumns = ({ viewDetailFn }: ICommission) => [
  {
    title: "Milestone Date",
    dataIndex: "milestoneDate",
    render: (text: string) => convertDateFormat(text),
  },
  {
    title: "Subscription number",
    dataIndex: "subscriptionNumber",
  },
  {
    title: "Milestone",
    dataIndex: "milestone",
  },
  {
    title: "Amount (VND)",
    dataIndex: "amount",
    render: (text: number) => formatNumber(text),
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Details",
    dataIndex: "subscriptionNumber",
    render: (value: number) => (
      <div className="flex items-center gap-x-2">
        <BaseButton
          icon={<EyeOutlined />}
          type="primary"
          onClick={() => viewDetailFn(value)}
        />
      </div>
    ),
  },
];
