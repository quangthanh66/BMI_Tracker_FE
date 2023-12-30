import { TAddNewFood, TUpdateFood } from '.';
import axiosClient from '../axiosClient';
import { END_POINTS } from '../endPoints';

const FOOD_API = {
  GET_FOODS: () => axiosClient.get(END_POINTS.FOOD),
  ADD_NEW_FOOD: (params: TAddNewFood) => axiosClient.post(END_POINTS.FOOD, params),
  UPDATE_FOOD: (params: TUpdateFood) => {
    const { foodId, ...rest } = params;
    return axiosClient.put(`${END_POINTS.FOOD}?foodId=${foodId}`, rest);
  },
  DELETE_FOOD: (foodId: string) => axiosClient.delete(`${END_POINTS.FOOD}/food?foo=${foodId}`),
};

export default FOOD_API;
