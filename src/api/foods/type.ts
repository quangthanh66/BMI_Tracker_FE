import { TAddNewFood, TUpdateFood } from '.';
import axiosClient from '../axiosClient';
import { END_POINTS } from '../endPoints';

const FOOD_API = {
  GET_FOODS: () => axiosClient.get(END_POINTS.FOOD),
  ADD_NEW_FOOD: (params: TAddNewFood) => axiosClient.post(END_POINTS.ADD_NEW_FOOD, params),
  UPDATE_FOOD: (params: TUpdateFood) => {
    return axiosClient.put(END_POINTS.UPDATE_FOOD, params);
  },
  DELETE_FOOD: (foodID: string) => axiosClient.delete(`${END_POINTS.DELETE_FOOD}/${foodID}`),
};

export default FOOD_API;
