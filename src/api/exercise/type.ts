export type TExerciseItem = {
  exerciseID: string;
  exerciseName: string;
  exercisePhoto: string;
  exerciseVideo: string;
  met: number;
  exerciseDescription: string;
  tagID: number;
  tagName: string;
  isActive: boolean;
};

export type TAddNewExercise = {
  exerciseName: string;
  emoji: string;
  duration: number;
  distance: number;
  caloriesBurned: number;
  tagIDs: number;
};

export type TUpdateExercise = TAddNewExercise & {
  isActive: true;
  exerciseID: number;
};
