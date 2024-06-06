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
  tagDescription: string;
  tagTypeID: number;
  isActive: boolean;
};


export type TAddNewFood = {
  foodName: string;
  foodCalories: number;
  description: string;
  foodPhoto: string;
  foodVideo: string;
  foodTimeProcess: number;
  foodTags: FoodTags[];
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
