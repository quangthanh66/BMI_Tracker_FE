export type DetailCommissionItemResponse = {
  commissionAllocationID: number;
  amount: number;
  description: string;
  milestone: string;
  milestoneDate: string;
  subscriptionNumber: string;
};

export const CommissionColumns = () => [
  {
    title: "Amount",
    dataIndex: "amount",
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
