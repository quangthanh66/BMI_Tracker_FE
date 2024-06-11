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
  menuType: string;
  menuPhoto: string;
  categoryId: string;
  userId: string;
  foods: any;
};

export type TUpdateMenu = TAddNewMenu & {
  menuId: string;
};
