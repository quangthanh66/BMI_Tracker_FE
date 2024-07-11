export type ExerciseTypes = {
  exerciseID: string;
  exerciseName: string;
  emoji: string;
  duration: number;
  caloriesBurned: number;
  isActive: boolean;
  distance: string;
  tags: {
    tagID: number;
    tagName: string;
  }[];
};
