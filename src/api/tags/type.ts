export type AddNewTagRequest = {
  tagName: string;
  tagDescription: string;
  tagTypeID: number;
};

export type TagsRequest = {
  tagID: number;
  tagName: string;
  tagDescription: string;
  tagTypeID: number;
  isActive: boolean;
};

export enum ETagTypes {
  MEAL_TYPE = "MEAL_TYPE",
  SPECIAL_DIET = "SPECIAL_DIET",
  ALLERGY = "ALLERGY",
  DISH_TYPE = "DISH_TYPE",
  EXERCISE_TYPE = "EXERCISE_TYPE",
  INGREDIENT_TYPE = "INGREDIENT_TYPE",
  BMI_CATEGORY = "BMI_CATEGORY",
}

export enum ETagTypesWithNumber {
  MEAL_TYPE = 1,
  SPECIAL_DIET,
  ALLERGY,
  DISH_TYPE,
  EXERCISE_TYPE,
  INGREDIENT_TYPE,
  BMI_CATEGORY,
}

export type CreateNewTagRequest = {
  tagName: string;
  tagDescription: string;
  tagTypeID: ETagTypesWithNumber;
};
