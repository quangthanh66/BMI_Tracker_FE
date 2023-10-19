import { BaseTag } from '@app/components/common/BaseTag/BaseTag';
import { FeedbackItemTypes } from './type';
import { MdOutlineDescription } from 'react-icons/md';
import { BaseTooltip } from '@app/components/common/BaseTooltip/BaseTooltip';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { BasePopconfirm } from '@app/components/common/BasePopconfirm/BasePopconfirm';

export const FEEDBACK_TABLE_DATA: FeedbackItemTypes[] = [
  {
    Id: '001',
    Name: 'Thanh',
    Description: 'This is a description of the menu',
    Type: 'Accept',
  },
  {
    Id: '001',
    Name: 'Bao',
    Description: 'This is a description of the menu',
    Type: 'Accept',
  },
  {
    Id: '001',
    Name: 'Duc',
    Description: 'This is a description of the menu',
    Type: 'Reject',
  },
  {
    Id: '001',
    Name: 'Long',
    Description: 'This is a description of the menu',
    Type: 'Reject',
  },
  {
    Id: '001',
    Name: 'Kha',
    Description: 'This is a description of the menu',
    Type: 'Accept',
  },
  {
    Id: '001',
    Name: 'Tan',
    Description: 'This is a description of the menu',
    Type: 'Accept',
  },
  {
    Id: '001',
    Name: 'Tien',
    Description: 'This is a description of the menu',
    Type: 'Reject',
  },
];

type FeedbackColumnsTypes = {
  updateFeedbackModal: () => void;
  descriptionModal: () => void;
};

export const FeedbackColumns: any = ({ updateFeedbackModal, descriptionModal }: FeedbackColumnsTypes) => [
  {
    title: 'Name',
    dataIndex: 'Name',
    sorter: (a: FeedbackItemTypes, b: FeedbackItemTypes) => a.Name.length - b.Name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Type',
    dataIndex: 'Type',
    render: (type: string) => <BaseTag color="geekblue">{type}</BaseTag>,
  },
  {
    title: 'Description',
    dataIndex: 'Description',
    render: (desc: string) => (
      <BaseTooltip title="Read all description">
        <MdOutlineDescription size={'32px'} className="cursor-pointer" onClick={descriptionModal} />
      </BaseTooltip>
    ),
  },
  {
    title: 'Actions',
    dataIndex: 'Id',
    render: () => (
      <div className="flex items-center gap-x-4">
        <BaseTooltip title="Edit feedback information">
          <BaseButton
            onClick={updateFeedbackModal}
            icon={<EditOutlined className="text-[24px]" />}
            type="text"
          ></BaseButton>
        </BaseTooltip>

        <BaseTooltip title="Delete feedback">
          <BasePopconfirm placement="rightTop" title="Delete the feedback" okText="Yes" cancelText="No">
            <BaseButton icon={<DeleteOutlined className="text-[24px]" />} danger type="text"></BaseButton>
          </BasePopconfirm>
        </BaseTooltip>
      </div>
    ),
  },
];
