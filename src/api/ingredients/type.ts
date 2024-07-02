export type TIngredientItem = {
  ingredientID: string;
  ingredientName: string;
  ingredientPhoto: string;
  quantity: number;
  unitOfMeasurement: number;
  ingredientCalories: number;
  tagID: number;
  isActive: boolean;
};

export type TAddNewIngredient = {
  ingredientName: string;
  unitOfMeasurement: string;
  quantity: number;
  ingredientCalories: number;
  tagID: number;
  ingredientPhotoUrl: string;
};

export type TUpdateIngredient = TAddNewIngredient & {
  ingredientID: string;
  ingredientName: string;
  ingredientPhoto: string;
  quantity: number;
  unit: string;
  ingredientCalories: number;
  tagID: number;
  isActive: boolean;
};
