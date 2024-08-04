import { BaseButton } from "@app/components/common/BaseButton/BaseButton";
import { Button, Image, Tooltip } from "antd";
import { BiTrash } from "react-icons/bi";

interface IFoodRecipeEvents {
  onDeleteFoodRecipe: (id: number) => void;
}

export const FoodRecipeColumns: any = ({
  onDeleteFoodRecipe,
}: IFoodRecipeEvents) => [
  {
    title: "Name",
    dataIndex: "ingredientName",
    key: "name",
  },
  {
    title: "Photo",
    dataIndex: "ingredientPhoto",
    key: "photo",
    render: (photo: string) => (
      <Image
        src={photo}
        alt=""
        width={100}
        height={100}
        className="object-contain rounded-md"
      />
    ),
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Unit",
    dataIndex: "unit",
    key: "unit",
  },
  {
    title: "Action",
    dataIndex: "recipeID",
    key: "recipeID",
    render: (id: number) => (
      <div className="flex items-center gap-2">
        <Tooltip title="Delete Recipe">
          <BaseButton
            icon={<BiTrash color="red" />}
            size="small"
            onClick={() => onDeleteFoodRecipe(id)}
          />
        </Tooltip>
      </div>
    ),
  },
];
