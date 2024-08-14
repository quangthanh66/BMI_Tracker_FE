export type DetailCommissionItemResponse = {
  commissionAllocationID: number;
  amount: number;
  description: string;
  milestone: string;
  milestoneDate: string;
  subscriptionNumber: string;
};
function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
export const CommissionColumns = () => [
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
    title: "Milestone",
    dataIndex: "milestone",
  },
  {
    title: "Milestone Date",
    dataIndex: "milestoneDate",
  },
  {
    title: "Subscription number",
    dataIndex: "subscriptionNumber",
  },
];
