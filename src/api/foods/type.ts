import { AddFoodRecipeRequest, TAddNewFood, TUpdateFood } from ".";
import axiosClient from "../axiosClient";
import { END_POINTS } from "../endPoints";

const FOOD_API = {
  GET_FOODS: () => axiosClient.get(END_POINTS.FOOD),
  ADD_NEW_FOOD: (params: TAddNewFood) =>
    axiosClient.post(END_POINTS.ADD_NEW_FOOD, params),
  UPDATE_FOOD: (params: TUpdateFood) => {
    return axiosClient.put(END_POINTS.UPDATE_FOOD, params);
  },
  DELETE_FOOD: (foodID: string) =>
    axiosClient.delete(`${END_POINTS.DELETE_FOOD}/${foodID}`),
  GET_TAGS_FOOD: () => axiosClient.get(END_POINTS.TAGS_FOOD),

  REMOVE_FOOD_RECIPE: (recipeId: number) =>
    axiosClient.delete(`${END_POINTS.DELETE_FOOD_RECIPE}?recipeID=${recipeId}`),
  ADD_FOOD_RECIPE: (params: AddFoodRecipeRequest) =>
    axiosClient.post(END_POINTS.ADD_FOOD_RECIPE, params),
};

export default FOOD_API;
