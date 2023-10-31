import { BaseTag } from '@app/components/common/BaseTag/BaseTag';
import { MenuItemTypes } from './type';
import { MdOutlineDescription } from 'react-icons/md';
import { BaseTooltip } from '@app/components/common/BaseTooltip/BaseTooltip';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { BasePopconfirm } from '@app/components/common/BasePopconfirm/BasePopconfirm';

export const MENU_TABLE_DATA: MenuItemTypes[] = [
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

type MenuColumnsTypes = {
  updateMenuModal: () => void;
  descriptionModal: () => void;
  viewDetailModal: () => void;
};

export const MenuColumns: any = ({ updateMenuModal, descriptionModal, viewDetailModal }: MenuColumnsTypes) => [
  {
    title: 'Name',
    dataIndex: 'Name',
    sorter: (a: MenuItemTypes, b: MenuItemTypes) => a.Name.length - b.Name.length,
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

        <BaseTooltip title="Edit menu information">
          <BaseButton
            onClick={updateMenuModal}
            icon={<EditOutlined className="text-[24px]" />}
            type="text"
          ></BaseButton>
        </BaseTooltip>

        <BaseTooltip title="Delete menu">
          <BasePopconfirm placement="rightTop" title="Delete the menu" okText="Yes" cancelText="No">
            <BaseButton icon={<DeleteOutlined className="text-[24px]" />} danger type="text"></BaseButton>
          </BasePopconfirm>
        </BaseTooltip>
      </div>
    ),
  },
];
