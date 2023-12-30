import axiosClient from '../axiosClient';
import { END_POINTS } from '../endPoints';
import { TAddNewIngredient, TUpdateIngredient } from './type';

const INGREDIENT_API = {
  GET_INGREDIENTS: () => axiosClient.get(END_POINTS.INGREDIENT),
  ADD_NEW_INGREDIENT: (params: TAddNewIngredient) => axiosClient.post(END_POINTS.INGREDIENT, params),
  UPDATE_INGREDIENT: (params: TUpdateIngredient) =>
    axiosClient.put(
      `${END_POINTS.INGREDIENT}?ingredientId=${params.ingredientId}&ingredientName=${params.ingredientName}&ingredientPhoto=${params.ingredientPhoto}`,
    ),
  DELETE_INGREDIENT: (ingredientId: string) =>
    axiosClient.delete(`${END_POINTS.INGREDIENT}/ingredient?ingId=${ingredientId}`),
};

export default INGREDIENT_API;
