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
  ingredientPhoto: string;
};

export type TUpdateIngredient = TAddNewIngredient & {
  ingredientID: string;
  ingredientName: string;
  ingredientPhoto: string;
  quantity: number;
  unitOfMeasurement: string;
  ingredientCalories: number;
  tagID: number;
  isActive: boolean;
};


