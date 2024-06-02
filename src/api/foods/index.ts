export type TFoodItem = {
  foodId: string;
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
  recipeRequests: { ingredientID: number; quantity: number }[];
};

export type TUpdateFood = TAddNewFood & {
  foodId: string;
};
