export const milestonesColumn = () => [
  {
    title: "Amount",
    dataIndex: "amount",
    render: (value: number) => value.toLocaleString(),
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
    title: "Date",
    dataIndex: "milestoneDate",
  },
];
