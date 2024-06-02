export type TFoodItem = {
  foodID: string;
  foodName: string;
  foodCalories: number;
  description: string;
  foodPhoto: string;
  foodVideo: string;
  foodTimeProcess: number;
  creationDate: string;
  isActive: boolean;
};

export type TAddNewFood = {
  foodName: string;
  foodCalories: number;
  description: string;
  foodPhoto: string;
  foodVideo: string;
  foodTimeProcess: number;
  tagIDs: number[];
  recipeRequests: RecipeRequest[];
};

export type RecipeRequest = {
  ingredientID: number;
  quantity: number;
};

export type TUpdateFood = TAddNewFood & {
  foodID: string;
  creationDate: string;
};
