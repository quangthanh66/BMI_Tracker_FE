import { BaseTag } from '@app/components/common/BaseTag/BaseTag';
import { AdvisorItemTypes } from './type';
import { BaseTooltip } from '@app/components/common/BaseTooltip/BaseTooltip';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { CheckCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { BasePopconfirm } from '@app/components/common/BasePopconfirm/BasePopconfirm';
import { UserItemTypes } from '@app/api/users/type';
import { Image, Tag, Typography } from 'antd';
import errorImage from 'assets/error-image-alt.png';
import dayjs from 'dayjs';


type AdvisorColumnsTypes = {
  updateAdvisorModal: (advisor: AdvisorItemTypes) => void;
  approveAdvisor: (advisorId: string) => void;
};

export enum AdvisorStatus {
  active = 'true',
  deactive = 'false',
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

export const AdvisorColumns: any = ({ updateAdvisorModal, approveAdvisor }: AdvisorColumnsTypes) => [
  {
    title: 'Name',
    dataIndex: 'fullName',
  },
  {
    title: 'Photo',
    dataIndex: 'accountPhoto',
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
    title: 'Phone',
    dataIndex: 'phoneNumber',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    sortDirections: ['descend'],
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
  },
  {
    title: 'Birthday',
    dataIndex: 'birthday',
    render: (text: string) => convertDateFormat(text),
    sorter: (a: string, b: string) => dayjs(a).unix() - dayjs(b).unix(),
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: 'Total subscription',
    dataIndex: 'totalSubscription',
    sortDirections: ['descend'],
  },
];
