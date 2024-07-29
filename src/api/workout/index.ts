export type TWorkoutItem = {
  workoutID: string;
  workoutName: string;
  workoutDescription: string;
  totalCaloriesBurned: number;
  isActive: boolean;
  fullName: string;
  advisorID: number;
  workoutExercises: WorkoutExercise[];
  workoutTags: WorkoutTags[];
  standardWeight: string;
};
export type WorkoutTags = {
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
  standardWeight: string;
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
