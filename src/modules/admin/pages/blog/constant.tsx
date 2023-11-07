import { BaseTag } from '@app/components/common/BaseTag/BaseTag';
import { BlogItemTypes } from './type';
import { MdOutlineDescription } from 'react-icons/md';
import { BaseTooltip } from '@app/components/common/BaseTooltip/BaseTooltip';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { BasePopconfirm } from '@app/components/common/BasePopconfirm/BasePopconfirm';

export const BLOG_TABLE_DATA: BlogItemTypes[] = [
  {
    Id: '001',
    Name: 'Fast food menu',
    Description: 'This is a description of the menu',
    Type: 'Fast food',
  },
  {
    Id: '001',
    Name: 'Fast food menu',
    Description: 'This is a description of the menu',
    Type: 'Fast food',
  },
  {
    Id: '001',
    Name: 'Fast food menu',
    Description: 'This is a description of the menu',
    Type: 'Fast food',
  },
  {
    Id: '001',
    Name: 'Fast food menu',
    Description: 'This is a description of the menu',
    Type: 'Fast food',
  },
  {
    Id: '001',
    Name: 'Fast food menu',
    Description: 'This is a description of the menu',
    Type: 'Fast food',
  },
  {
    Id: '001',
    Name: 'Fast food menu',
    Description: 'This is a description of the menu',
    Type: 'Fast food',
  },
  {
    Id: '001',
    Name: 'Fast food menu',
    Description: 'This is a description of the menu',
    Type: 'Fast food',
  },
];

type BlogColumnsTypes = {
  updateBlogModal: () => void;
  descriptionModal: () => void;
  viewDetailModal: () => void;
};

export const BlogColumns: any = ({ updateBlogModal, descriptionModal, viewDetailModal }: BlogColumnsTypes) => [
  {
    title: 'Name',
    dataIndex: 'Name',
    sorter: (a: BlogItemTypes, b: BlogItemTypes) => a.Name.length - b.Name.length,
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
        <BaseTooltip title="View detail">
          <BaseButton onClick={viewDetailModal} icon={<EyeOutlined className="text-[24px]" />} type="text"></BaseButton>
        </BaseTooltip>

        <BaseTooltip title="Edit blog content">
          <BaseButton
            onClick={updateBlogModal}
            icon={<EditOutlined className="text-[24px]" />}
            type="text"
          ></BaseButton>
        </BaseTooltip>

        <BaseTooltip title="Delete blog">
          <BasePopconfirm placement="rightTop" title="Delete the blog" okText="Yes" cancelText="No">
            <BaseButton icon={<DeleteOutlined className="text-[24px]" />} danger type="text"></BaseButton>
          </BasePopconfirm>
        </BaseTooltip>
      </div>
    ),
  },
];
