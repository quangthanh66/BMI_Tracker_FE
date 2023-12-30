import { BaseImage } from '@app/components/common/BaseImage/BaseImage';
import { IngredientTypes } from './type';
import { BaseTooltip } from '@app/components/common/BaseTooltip/BaseTooltip';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { BasePopconfirm } from '@app/components/common/BasePopconfirm/BasePopconfirm';
import { BaseTag } from '@app/components/common/BaseTag/BaseTag';

type IngredientColumnsTypes = {
  updateIngredientModal: () => void;
};

export const IngredientColumns: any = ({ updateIngredientModal }: IngredientColumnsTypes) => [
  {
    title: 'Name',
    dataIndex: 'Name',
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
