import { BaseImage } from '@app/components/common/BaseImage/BaseImage';
import { FoodTypes } from './type';
import { BaseTooltip } from '@app/components/common/BaseTooltip/BaseTooltip';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { BasePopconfirm } from '@app/components/common/BasePopconfirm/BasePopconfirm';
import { BaseTag } from '@app/components/common/BaseTag/BaseTag';

export const FOODS_DATA: FoodTypes[] = [
  {
    Id: '001',
    Name: 'Beans',
    Category: 'Vegetable',
    Photo:
      'https://images.unsplash.com/photo-1564894809611-1742fc40ed80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80 870w',
  },
  {
    Id: '002',
    Name: 'Bananas',
    Category: 'Vegetable',
    Photo:
      'https://images.unsplash.com/photo-1526364163643-89e30b8fcb70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80 870w',
  },

  {
    Id: '003',
    Name: 'Hamburger',
    Category: 'Fast food',
    Photo:
      'https://images.unsplash.com/photo-1584178639036-613ba57e5e39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80 870w',
  },

  {
    Id: '004',
    Name: 'Fried',
    Category: 'Fast food',
    Photo:
      'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80 870w',
  },

];

type FoodColumnsTypes = {
  updateFoodModal: () => void;
};

export const FoodColumns: any = ({ updateFoodModal }: FoodColumnsTypes) => [
  {
    title: 'Name',
    dataIndex: 'Name',
    sorter: (a: FoodTypes, b: FoodTypes) => a.Name.length - b.Name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Category',
    dataIndex: 'Category',
    render: (category: string) => <BaseTag color="geekblue">{category}</BaseTag>,
  },

  {
    title: 'Photo',
    dataIndex: 'Photo',
    render: (photo: string) => (
      <BaseImage src={photo} alt="photo" loading="lazy" className="h-40 w-full object-cover" />
    ),
  },
  {
    title: 'Actions',
    dataIndex: 'Id',
    render: () => (
      <div className="flex items-center gap-x-4">
        <BaseTooltip title="Edit food information">
          <BaseButton
            onClick={updateFoodModal}
            icon={<EditOutlined className="text-[24px]" />}
            type="text"
          ></BaseButton>
        </BaseTooltip>

        <BaseTooltip title="Delete menu">
          <BasePopconfirm placement="rightTop" title="Delete ingredient" okText="Yes" cancelText="No">
            <BaseButton icon={<DeleteOutlined className="text-[24px]" />} danger type="text"></BaseButton>
          </BasePopconfirm>
        </BaseTooltip>
      </div>
    ),
  },
];
