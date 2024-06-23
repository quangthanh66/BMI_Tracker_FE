export type TWorkoutItem = {
  workoutID: string;
  workoutName: string;
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

export type TAddNewWorkout = {
  foodName: string;
  foodCalories: number;
  description: string;
  foodPhoto: string;
  foodVideo: string;
  foodTimeProcess: number;
  tagIDs: string;
  ingredientIDs: string;
  foodNutrition: string;
};

export type RecipeRequest = {
  ingredientID: number;
  quantity: number;
};

export type TUpdateWorkout = TAddNewWorkout & {
  foodID: string;
};
