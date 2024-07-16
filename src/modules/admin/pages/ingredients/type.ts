export type IngredientTypes = {
  ingredientID: string;
  ingredientName: string;
  ingredientPhoto: string;
  nutritionalInformation: string;
  quantity: number;
  unit: number;
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
