import { BaseImage } from '@app/components/common/BaseImage/BaseImage';
import { IngredientTypes } from './type';
import { BaseTooltip } from '@app/components/common/BaseTooltip/BaseTooltip';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { BasePopconfirm } from '@app/components/common/BasePopconfirm/BasePopconfirm';
import { BaseTag } from '@app/components/common/BaseTag/BaseTag';

export const INGREDIENTS_DATA: IngredientTypes[] = [
  {
    Id: '001',
    Name: 'Ingredient 1',
    Category: 'Ingredient category',
    Photo:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    Id: '001',
    Name: 'Ingredient 1',
    Category: 'Ingredient category',
    Photo:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },

  {
    Id: '001',
    Name: 'Ingredient 1',
    Category: 'Ingredient category',
    Photo:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },

  {
    Id: '001',
    Name: 'Ingredient 1',
    Category: 'Ingredient category',
    Photo:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },

  {
    Id: '001',
    Name: 'Ingredient 1',
    Category: 'Ingredient category',
    Photo:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
];

type IngredientColumnsTypes = {
  updateIngredientModal: () => void;
};

export const IngredientColumns: any = ({ updateIngredientModal }: IngredientColumnsTypes) => [
  {
    title: 'Name',
    dataIndex: 'Name',
    sorter: (a: IngredientTypes, b: IngredientTypes) => a.Name.length - b.Name.length,
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
        <BaseTooltip title="Edit ingredient information">
          <BaseButton
            onClick={updateIngredientModal}
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
