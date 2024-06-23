export type TExerciseItem = {
  exerciseID: string;
  ingredientName: string;
  exercisePhoto: string;
  quantity: number;
  unitOfMeasurement: number;
  ingredientCalories: number;
  tagID: number;
  isActive: boolean;
};

export type TAddNewExercise = {
  ingredientName: string;
  unitOfMeasurement: string;
  quantity: number;
  ingredientCalories: number;
  tagID: number;
  ingredientPhotoUrl: string;
};

export type TUpdateExercise = TAddNewExercise & {
  ingredientID: string;
  ingredientName: string;
  ingredientPhoto: string;
  quantity: number;
  unitOfMeasurement: string;
  ingredientCalories: number;
  tagID: number;
  isActive: boolean;
};
