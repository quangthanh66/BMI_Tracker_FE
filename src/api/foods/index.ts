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
  isActive: boolean;
  serving: string;
};
export type FoodTags = {
  tagID: number;
  tagName: string;
};

export type RecipeItem = {
  ingredientID: number;
  unit: string;
  quantity: number;
  isActive: boolean;
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
  recipeRequests: RecipeItem[];
};

export type RecipeRequest = {
  ingredientID: number;
  quantity: number;
};

export type TUpdateFood = TAddNewFood & {
  foodID: string;
};
