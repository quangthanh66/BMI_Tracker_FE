export type TMenuItem = {
  menuId: string;
  menuName: string;
  menuDescription: string;
  menuType: string;
  menuPhoto: string;
  categoryId: string;
  status: string;
  schedules: [];
  meals: { menuId: string; foodId: string }[];
};

export type TAddNewMenu = {
  menuName: string;
  menuDescription: string;
  menuType: string;
  menuPhoto: string;
  categoryId: string;
  foods: any;
};

export type TUpdateMenu = TAddNewMenu & {
  menuId: string;
};
