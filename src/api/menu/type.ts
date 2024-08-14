export type TMenuItem = {
  menuID: number;
  menuName: string;
  menuPhoto: string;
  menuDescription: string;
  totalCalories: number;
  isActive: boolean;
  advisorID: number;
  advisorName: string; 
  membersUsing: string;
};
export type TAddNewMenu = {
  menuName: string;
  menuDescription: string;
  totalCalories: number;
  menuFoods: { foodID: number; mealType: string }[];
};

export type TUpdateMenu = TAddNewMenu & {
  menuID: number;
};

type MenuFoodItem = {
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
    isActive: boolean;
    serving: number;
    carbs: number
    protein: number;
    fat: number;
  };
  mealType: string;
};

export type MenuDetailResponse = {
  menuID: number;
  menuName: string;
  menuDescription: string;
  totalCalories: number;
  isActive: boolean;
  advisorID: number;
  menuFoods: MenuFoodItem[];
};
