import { EditOutlined } from "@ant-design/icons";
import { BaseButton } from "@app/components/common/BaseButton/BaseButton";
import { BaseTag } from "@app/components/common/BaseTag/BaseTag";
import { BaseTooltip } from "@app/components/common/BaseTooltip/BaseTooltip";
import { PLAN_STATUS } from "@app/utils/constant";
import { FeedbackItemTypes } from "./type";

type FeedbackColumnsTypes = {
  updateFeedbackModal: (feedback: FeedbackItemTypes) => void;
  approveFeedback: (feedId: string) => void;
};

export enum FeedbackStatus {
  active = "true",
  deactive = "false",
}

export const FeedbackColumns: any = ({
  updateFeedbackModal,
  approveFeedback,
}: FeedbackColumnsTypes) => [
  {
    title: "Name",
    dataIndex: "fullName",
  },
  {
    title: "Type",
    dataIndex: "type",
    render: (type: string) => <BaseTag color="geekblue">{type}</BaseTag>,
  },
  {
    title: "Purpose",
    dataIndex: "purpose",
    sorter: (a: FeedbackItemTypes, b: FeedbackItemTypes) =>
      a.purpose.length - b.purpose.length,
    sortDirections: ["descend"],
  },

  {
    title: "Process Note",
    dataIndex: "processNote",
  },
  {
    title: "Creation Date",
    dataIndex: "creationDate",
  },
  {
    title: "Processing Date",
    dataIndex: "processingDate",
  },

  {
    title: "Status",
    dataIndex: "status",
    render: (status: string) => {
      let color;

      switch (status) {
        case "APPROVED":
          color = "green";
          break;
        case "REJECTED":
          color = "red";
          break;
        case "PENDING":
          color = "blue";
          break;
      }

      return <span style={{ color }}>{status}</span>;
    },
  },
  {
    title: "Actions",
    dataIndex: "status",
    render: (status: PLAN_STATUS, feedback: FeedbackItemTypes) => (
      <div className="flex items-center gap-x-4">
        {![PLAN_STATUS.APPROVED, PLAN_STATUS.REJECTED].includes(status) && (
          <BaseTooltip title="Edit feedback information">
            <BaseButton
              onClick={() => updateFeedbackModal(feedback)}
              icon={<EditOutlined className="text-[24px]" />}
              type="text"
            ></BaseButton>
          </BaseTooltip>
        )}

        {/* {!feedback.status && (
          <BaseTooltip title="Active">
            <BaseButton
              onClick={() => approveFeedback(feedbackID)}
              icon={<CheckCircleOutlined className="text-[24px]" />}
              type="text"
            ></BaseButton>
          </BaseTooltip>
        )} */}
      </div>
    ),
  },
];
