import { BaseTag } from '@app/components/common/BaseTag/BaseTag';
import { FeedbackItemTypes } from './type';
import { BaseTooltip } from '@app/components/common/BaseTooltip/BaseTooltip';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { BasePopconfirm } from '@app/components/common/BasePopconfirm/BasePopconfirm';
import { UserItemTypes } from '@app/api/users/type';
import { Tag, Typography } from 'antd';

type FeedbackColumnsTypes = {
  updateFeedbackModal: (feedback: FeedbackItemTypes) => void;
  deleteFeedBack: (feedId: string) => void;
};

export enum FeedbackStatus {
  available = 'available-feedback',
  hidden = 'hidden',
}

export const FeedbackColumns: any = ({ updateFeedbackModal, deleteFeedBack }: FeedbackColumnsTypes) => [
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
    render: (status: string) => <Tag color={status === 'hidden' ? 'volcano' : 'green'}>{status}</Tag>,
  },
  {
    title: 'User',
    dataIndex: 'users',
    render: (user: UserItemTypes) => <Typography.Text>{user.fullName}</Typography.Text>,
  },
  {
    title: 'Actions',
    dataIndex: 'feedbackId',
    render: (feedbackId: string, feedback: FeedbackItemTypes) => (
      <div className="flex items-center gap-x-4">
        <BaseTooltip title="Edit feedback information">
          <BaseButton
            onClick={() => updateFeedbackModal(feedback)}
            icon={<EditOutlined className="text-[24px]" />}
            type="text"
          ></BaseButton>
        </BaseTooltip>

        <BaseTooltip title="Delete feedback">
          <BasePopconfirm
            placement="rightTop"
            title="Delete the feedback"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteFeedBack(feedbackId)}
          >
            <BaseButton icon={<DeleteOutlined className="text-[24px]" />} danger type="text"></BaseButton>
          </BasePopconfirm>
        </BaseTooltip>
      </div>
    ),
  },
];
