export type TPlanItem = {
  planID: number;
  planName: string;
  price: number;
  description: string;
  planDuration: number;
  advisorID: number;
  active: boolean;
  popular: boolean;
};

export type TAddNewPlan = {
  planName: string;
  price: number;
  description: string;
  planDuration: number;
};

export type TUpdatePlan = TAddNewPlan & {
  menuID: number;
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
