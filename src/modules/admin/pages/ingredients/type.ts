export type IngredientTypes = {
  ingredientID: string;
  ingredientName: string;
  ingredientPhoto: string;
  status: string;
  quantity: number;
  unitOfMeasurement: number;
  ingredientCalories: number;
  tag: {
    isActive: boolean;
    tagDescription: string;
    tagID: number;
    tagName: string;
    tagTypeID: number;
  };
  isActive: boolean;
};
