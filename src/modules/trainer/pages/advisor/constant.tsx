import { BaseButton } from "@app/components/common/BaseButton/BaseButton";
import { Image, Tag } from "antd";
import errorImage from "assets/error-image-alt.png";
import { AdvisorItemTypes } from "./type";

type AdvisorColumnsTypes = {
  updateAdvisorModal: (advisor: AdvisorItemTypes) => void;
  approveAdvisor: (advisorId: string) => void;
  activeAdvisor: (id: number) => void;
};

export enum AdvisorStatus {
  active = "true",
  deactive = "false",
}

function convertDateFormat(inputDate: string): string {
  // Split the input date into year, month, and day
  const parts = inputDate.split("-");
  if (parts.length === 3) {
    // Reorder the parts and join them with "-"
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  } else {
    // If the input date is not in the expected format, return an error message
    return "Invalid date format";
  }
}

export const AdvisorColumns: any = ({
  updateAdvisorModal,
  approveAdvisor,
  activeAdvisor,
}: AdvisorColumnsTypes) => [
  {
    title: "Name",
    dataIndex: "fullName",
  },
  {
    title: "Photo",
    dataIndex: "accountPhoto",
    render: (accountPhoto: string) => (
      <Image
        alt="advisor-photo-alt"
        src={accountPhoto}
        className="h-[100px] w-full object-cover"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = errorImage;
        }}
      />
    ),
  },
  {
    title: "Phone",
    dataIndex: "phoneNumber",
  },
  {
    title: "Email",
    dataIndex: "email",
    sortDirections: ["descend"],
  },
  {
    title: "Bank name",
    dataIndex: "bankName",
    sortDirections: ["descend"],
  },
  {
    title: "Bank number",
    dataIndex: "bankNumber",
    sortDirections: ["descend"],
  },
  {
    title: "Total subscription",
    dataIndex: "totalSubscription",
    sortDirections: ["descend"],
  },
  {
    title: "Active",
    dataIndex: "isActive",
    render: (isACtive: boolean) => (
      <Tag color={isACtive ? "green" : "red"}>
        {isACtive ? "Active" : "InActive"}
      </Tag>
    ),
  },
  {
    title: "Status",
    dataIndex: "advisorID",
    render: (id: number, info: AdvisorItemTypes) => (
      <>
        <BaseButton
          type="primary"
          size="small"
          onClick={() => activeAdvisor(id)}
          disabled={info.isActive}
        >
          Confirm
        </BaseButton>
      </>
    ),
  },
];
