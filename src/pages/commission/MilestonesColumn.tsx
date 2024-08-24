
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
export const milestonesColumn = () => [
   {
    title: "Milestone date",
    dataIndex: "milestoneDate",
    render: (text: string) => convertDateFormat(text),
    width: 150,
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
    width: 350,
  },
];
