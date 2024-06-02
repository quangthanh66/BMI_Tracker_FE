export type TIngredientItem = {
  ingredientID: number;
  ingredientName: string;
  ingredientPhoto: string;
  quantity: number;
  unitOfMeasurement: string;
  ingredientCalories: number;
  tagID: number;
  isActive: boolean;
};

export type TAddNewIngredient = {
  ingredientName: string;
  ingredientPhoto: string;
};

export type TUpdateIngredient = TAddNewIngredient & {
  ingredientId: string;
};
