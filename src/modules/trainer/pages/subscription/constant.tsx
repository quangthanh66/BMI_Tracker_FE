import { BaseTag } from '@app/components/common/BaseTag/BaseTag';
import { SubscriptionItemTypes } from './type';
import { BaseTooltip } from '@app/components/common/BaseTooltip/BaseTooltip';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { CheckCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { BasePopconfirm } from '@app/components/common/BasePopconfirm/BasePopconfirm';
import { UserItemTypes } from '@app/api/users/type';
import { Tag, Typography } from 'antd';
import dayjs from 'dayjs';

type SubscriptionColumnsTypes = {
  updateSubscriptionModal: (subscription: SubscriptionItemTypes) => void;
  approveSubscription: (subscriptionId: string) => void;
};

export enum SubscriptionStatus {
  NOT_START = "NOT_START",
  PENDING = "PENDING",
  CANCELED = "CANCELED",
  FINISHED = "FINISHED",
}
function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function convertDateFormat(inputDate: string): string {
  // Split the input date into year, month, and day
  const parts = inputDate.split('-');
  if (parts.length === 3) {
    // Reorder the parts and join them with "-"
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  } else {
    // If the input date is not in the expected format, return an error message
    return 'Invalid date format';
  }
}

export const SubscriptionColumns: any = ({ updateSubscriptionModal, approveSubscription }: SubscriptionColumnsTypes) => [
  {
    title: 'Advisor',
    dataIndex: 'advisorName',
  },
  {
    title: 'Member',
    dataIndex: 'memberName',
  },
  {
    title: 'Start Date',
    dataIndex: 'startDate',
    render: (text: string) => convertDateFormat(text),
  },
  {
    title: 'End Date',
    dataIndex: 'endDate',
    render: (text: string) => convertDateFormat(text),
  },
  {
    title: 'Subscription Date',
    dataIndex: 'subscriptionDate',
    render: (text: string) => convertDateFormat(text),
    sorter: (a: SubscriptionItemTypes, b: SubscriptionItemTypes) => {
      const dateA = new Date(a.subscriptionDate).getTime();
      const dateB = new Date(b.subscriptionDate).getTime();
      return dateA - dateB;
    },
    sortDirections: ["ascend", "descend"],
  },
  {
    title: 'Amount (VND)',
    dataIndex: 'amount',
    sortDirections: ['descend'],
    render: (text: number) => formatNumber(text),
  },
  {
    title: 'Description',
    dataIndex: 'subscriptionDescription',
    sortDirections: ['descend'],
    render: (text: string) => (
      <div style={{ whiteSpace: 'normal', overflowWrap: 'break-word' }}>{text}</div>
  ),
  },
  {
    title: 'Status',
    dataIndex: 'subscriptionStatus',
    render: (type: string) => 
    <BaseTag color={type === 'FINISHED' ? 'green':
    type === 'CANCELED' ? 'red': 
    type === 'PENDING' ? 'blue': 
    type === 'NOT_START' ? 'silver':
    ''}>  
        {type}</BaseTag>,
  },

];
