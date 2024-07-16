export type TIngredientItem = {
  ingredientID: string;
  ingredientName: string;
  ingredientPhoto: string;
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

export type TAddNewIngredient = {
  ingredientName: string;
  unit: string;
  quantity: number;
  ingredientCalories: number;
  tagID: number;
  ingredientPhotoUrl: string;
  nutritionalInformation: string;
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
