export type TPlanItem = {
  packageID: number;
  packageName: string;
  price: number;
  packageDuration: number;
  fullName: string;
  advisorID: number;
  isActive: boolean;
  description: string;
  numberOfUses: number;
  packageStatus: string;
  packageCode: string;
};

export type TAddNewPlan = TPlanItem & {

};

export type TUpdatePlan = {
  packageID: number;
  packageStatus: string;
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
