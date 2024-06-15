export type TMenuItem = {
  menuID: number;
  menuName: string;
  menuDescription: string;
  totalCalories: number;
  isActive: boolean;
  advisorID: number;
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
