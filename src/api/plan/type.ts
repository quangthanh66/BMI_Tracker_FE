export type TPlanItem = {
  planID: number;
  planName: string;
  price: number;
  planDuration: number;
  fullName: string;
  advisorID: number;
  isActive: boolean;
  description: string;
  numberOfUses: number;
  planStatus: string;
  planCode: string;
};

export type TAddNewPlan = TPlanItem & {

};

export type TUpdatePlan = {
  planID: number;
  planStatus: string;
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
