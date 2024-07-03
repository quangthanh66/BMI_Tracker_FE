import axiosClient from '../axiosClient';
import { END_POINTS } from '../endPoints';
import { TAddNewIngredient, TUpdateIngredient } from './type';

const INGREDIENT_API = {
  GET_INGREDIENTS: () => axiosClient.get(END_POINTS.INGREDIENT),
  ADD_NEW_INGREDIENT: (params: TAddNewIngredient) => axiosClient.post(END_POINTS.ADD_NEW_INGREDIENTS, params),
  UPDATE_INGREDIENT: (params: TUpdateIngredient) => {
    return axiosClient.put(END_POINTS.UPDATE_INGREDIENT, params);
  },
  DELETE_INGREDIENT: (ingredientId: string) => axiosClient.delete(`${END_POINTS.DELETE_INGREDIENTS}/${ingredientId}`),
  GET_INGREDIENT_TAGS: () => axiosClient.get(END_POINTS.TAG_INGREDIENT),
};

export default INGREDIENT_API;
