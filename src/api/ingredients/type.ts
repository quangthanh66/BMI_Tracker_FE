export type TIngredientItem = {
  ingredientId: string;
  ingredientName: string;
  ingredientPhoto: string;
  status: string;
  categoryId: string;
};

export type TAddNewIngredient = {
  ingredientName: string;
  ingredientPhoto: string;
};

export type TUpdateIngredient = TAddNewIngredient & {
  ingredientId: string;
};
