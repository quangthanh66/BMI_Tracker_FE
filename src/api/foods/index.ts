export type TFoodItem = {
  foodID: string;
  foodName: string;
  foodCalories: string;
  description: string;
  foodPhoto: string;
  foodVideo: string;
  foodNutrition: string;
  foodTimeProcess: number;
  creationDate: string;
  foodTags: FoodTags[];
  active: boolean;
};
export type FoodTags = {
  tagID: number;
  tagName: string;
};

export type TAddNewFood = {
  foodName: string;
  foodCalories: number;
  description: string;
  foodPhoto: string;
  foodVideo: string;
  foodNutrition: string;
  serving: string;
  foodTimeProcess: number;
  tagIDs: string;
  ingredientIDs: string;
};

export type RecipeRequest = {
  ingredientID: number;
  quantity: number;
};

export type TUpdateFood = TAddNewFood & {
  foodID: string;
};
