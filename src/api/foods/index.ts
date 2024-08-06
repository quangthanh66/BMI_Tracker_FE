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
  carbs: number,
  protein: number,
  fat: number,
  foodTags: FoodTags[];
  isActive: boolean;
  serving: number;
  recipes: RecipeItem[];
};
export type FoodTags = {
  tagID: number;
  tagName: string;
};

export type RecipeItem = {
  recipeID: number;
  ingredientID: number;
  ingredientName: string;
  ingredientPhoto: string;
  unit: string;
  quantity: number;
};

export type TAddNewFood = {
  foodName: string;
  foodCalories: number;
  description: string;
  foodPhoto: string;
  foodVideo: string;
  serving: number;
  foodTimeProcess: number;
  carbs: number;
  protein: number;
  fat: number;
  tagIDs: string;
  recipeRequests?: RecipeItem[];
};

export type RecipeRequest = {
  ingredientID: number;
  unit: string;
  quantity: number;
};

export type TUpdateFood = TAddNewFood & {
  foodID: string;
};

export type AddFoodRecipeRequest = {
  foodID: number;
  ingredientID: number;
  unit: string;
  quantity: number;
};
