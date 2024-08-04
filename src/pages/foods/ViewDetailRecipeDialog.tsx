import { RecipeItem } from "@app/api/foods";
import { BaseModal } from "@app/components/common/BaseModal/BaseModal";
import _ from "lodash";
import { forwardRef, useImperativeHandle, useState } from "react";

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

  return (
    <BaseModal
      title="Detail Recipe"
      open={isOpenModal}
      onCancel={onCloseModal}
      footer={null}
      width={800}
    ></BaseModal>
  );
};

export default forwardRef(ViewDetailRecipeDialog);
