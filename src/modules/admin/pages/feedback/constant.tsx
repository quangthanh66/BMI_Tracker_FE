import { BaseTag } from '@app/components/common/BaseTag/BaseTag';
import { FeedbackItemTypes } from './type';
import { BaseTooltip } from '@app/components/common/BaseTooltip/BaseTooltip';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { CheckCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { BasePopconfirm } from '@app/components/common/BasePopconfirm/BasePopconfirm';
import { UserItemTypes } from '@app/api/users/type';
import { Tag, Typography } from 'antd';

type FeedbackColumnsTypes = {
  updateFeedbackModal: (feedback: FeedbackItemTypes) => void;
  approveFeedback: (feedId: string) => void;
};

export enum FeedbackStatus {
  active = 'true',
  deactive = 'false',
}

export const FeedbackColumns: any = ({ updateFeedbackModal, approveFeedback }: FeedbackColumnsTypes) => [
  {
    title: 'Member',
    dataIndex: 'memberName',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    sorter: (a: FeedbackItemTypes, b: FeedbackItemTypes) => a.title.length - b.title.length,
    sortDirections: ['descend'],
  },

  {
    title: 'Type',
    dataIndex: 'type',
    render: (type: string) => <BaseTag color="geekblue">{type}</BaseTag>,
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (status: boolean) => (
      <Tag color={status === true ? 'green' : status === false ? 'volcano' : 'geekblue'}>
        {status ? 'Completed' : 'Waitting'}
      </Tag>
    ),
    sortDirections: ['descend'],
  },

  {
    title: 'Actions',
    dataIndex: 'feedbackID',
    render: (feedbackID: string, feedback: FeedbackItemTypes) => (
      <div className="flex items-center gap-x-4">
        {/* <BaseTooltip title="Edit feedback information">
          <BaseButton
            onClick={() => updateFeedbackModal(feedback)}
            icon={<EditOutlined className="text-[24px]" />}
            type="text"
          ></BaseButton>
        </BaseTooltip> */}

        {!feedback.status && (
          <BaseTooltip title="Active">
            <BaseButton
              onClick={() => approveFeedback(feedbackID)}
              icon={<CheckCircleOutlined className="text-[24px]" />}
              type="text"
            ></BaseButton>
          </BaseTooltip>
        )}
      </div>
    ),
  },
];
