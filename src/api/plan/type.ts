export type TPlanItem = {
  planID: number;
  planName: string;
  price: number;
  planDuration: number;

  advisorID: number;
  isActive: boolean;
  description: string;
  numberOfUsers: number;
};

export type TAddNewPlan = {
  planName: string;
  price: number;
  description: string;
  planDuration: number;
  popular: boolean;
};

export type TUpdatePlan = TAddNewPlan & {
  planID: number;
};

type PlanExerciseItem = {
  food: {
    foodID: number;
    foodName: string;
    foodCalories: number;
    description: string;
    foodPhoto: string;
    foodVideo: string;
    foodNutrition: string;
    foodTimeProcess: number;
    creationDate: string;
    active: boolean;
  };
  mealType: string;
};

export type PlanDetailResponse = {
  planID: number;
  planName: string;
  menuDescription: string;
  totalCalories: number;
  isActive: boolean;
  advisorID: number;
  menuFoods: PlanExerciseItem[];
};
