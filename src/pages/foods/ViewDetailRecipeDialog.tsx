import { RecipeItem } from '@app/api/foods';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { Descriptions, Empty, Image, Tabs } from 'antd';
import _ from 'lodash';
import { forwardRef, useImperativeHandle, useState } from 'react';

const ViewDetailRecipeDialog = ({}, ref: any) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [recipeItem, setRecipeItem] = useState<RecipeItem[]>([]);

  useImperativeHandle(ref, () => {
    return {
      openModal: (recipes: RecipeItem[]) => {
        setRecipeItem(recipes);
        setIsOpenModal(true);
      },
    };
  });
  const onCloseModal = () => setIsOpenModal(false);

  const convertRecipeItem = (recipe: RecipeItem) => {
    return {
      key: String(recipe.ingredientID),
      label: recipe.ingredientName,
      children: (
        <Descriptions layout="vertical" bordered>
          <Descriptions.Item label="Ingredient Name">{recipe.ingredientName}</Descriptions.Item>
          <Descriptions.Item label="Image">
            <Image src={recipe.ingredientPhoto} alt="recipe-alt" />
          </Descriptions.Item>
          <Descriptions.Item label="Quantity">{recipe.quantity}</Descriptions.Item>
          <Descriptions.Item label="Unit">{recipe.unit}</Descriptions.Item>
        </Descriptions>
      ),
    };
  };

  return (
    <BaseModal title="Detail Recipe" open={isOpenModal} onCancel={onCloseModal} footer={null} width={800}>
      {recipeItem.length <= 0 ? (
        <div className="flex items-center w-full justify-center min-h-[50vh]">
          <Empty />
        </div>
      ) : (
        <Tabs
          defaultActiveKey={String(_.first(recipeItem)?.ingredientID) || ''}
          items={recipeItem.map((item) => convertRecipeItem(item))}
        />
      )}
    </BaseModal>
  );
};

export default forwardRef(ViewDetailRecipeDialog);
