export type TExerciseItem = {
  exerciseID: string;
  exerciseName: string;
  emoji: string;
  duration: number;
  caloriesBurned: number;
  isActive: boolean;
  tags: {
    tagID: number;
    tagName: string;
  }[];
};

export type TAddNewExercise = {
  exerciseName: string;
  emoji: string;
  duration: number;
  distance: number;
  caloriesBurned: number;
};

export type TUpdateExercise = TAddNewExercise & {
  isActive: true;
  exerciseID: number;
};
