export type TFoodItem = {
  foodId: string;
  foodName: string;
  foodTag: string;
  foodNutrition: string;
  foodNotes: string;
  foodDesciption: string;
  foodPhoto: string;
  foodtimeProcess: number;
  foodCalorios: number;
  foodProcessingVideo: string;
  status: string;
  categoryId: string;
  recipes: { ingredientId: string; foodId: string }[];
};

export type TAddNewFood = {
  foodName: string;
  foodTag: string;
  foodNutrition: string;
  foodNotes: string;
  foodDesciption: string;
  foodPhoto: string;
  foodtimeProcess: number;
  foodCalorios: number;
  foodProcessingVideo: string;
  categoryId: string;
  ingredients: { ingredientId: string }[];
};

export type TUpdateFood = TAddNewFood & {
  foodId: string;
};
