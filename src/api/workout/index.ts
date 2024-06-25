export type TWorkoutItem = {
  workoutID: string;
  workoutName: string;
  workoutDescription: string;
  totalCloriesBurned: number;
  isActive: boolean;
  advisorID: number;
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
