export type TWorkoutItem = {
  workoutID: string;
  workoutName: string;
  workoutDescription: string;
  totalCloriesBurned: number;
  isActive: boolean;
  advisorID: number;
  workoutExercises: WorkoutExercise[];
};
export type FoodTags = {
  tagID: number;
  tagName: string;
};

export type TAddNewWorkout = {
  workoutName: string;
  workoutDescription: string;
  totalCaloriesBurned: number;
  isActive: boolean;
};

export type RecipeRequest = {
  ingredientID: number;
  quantity: number;
};

export type TUpdateWorkout = TAddNewWorkout & {
  workoutID: string;
};

export type WorkoutExercise = {
  caloriesBurned: number;
  distance: null;
  duration: number;
  emoji: string;
  exerciseID: number;
  exerciseName: string;
  isActive: boolean;
};
