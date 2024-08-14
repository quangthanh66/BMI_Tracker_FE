interface ICommissionEvents {
  // onDeleteFoodRecipe: (id: number) => void;
}

export const CommissionColumns: any = ({}: ICommissionEvents) => [
  {
    title: "ID",
    dataIndex: "commissionAllocationID",
    key: "commissionAllocationID",
  },
  {
    title: "Amount (VND)",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Milestone",
    dataIndex: "milestone",
    key: "milestone",
  },
  {
    title: "MilestoneDate",
    dataIndex: "milestoneDate",
    key: "milestoneDate",
  },
  {
    title: "Subscription Number",
    dataIndex: "subscriptionNumber",
    key: "subscriptionNumber",
  },
];
