import axiosClient from '../axiosClient';
import { END_POINTS } from '../endPoints';
import { TAddNewExercise, TUpdateExercise } from './type';

const EXERCISE_API = {
  GET_EXERCISE: () => axiosClient.get(END_POINTS.EXERCISE),
  ADD_NEW_EXERCISE: (params: TAddNewExercise) => axiosClient.post(END_POINTS.ADD_NEW_EXERCISE, params),
  UPDATE_EXERCISE: (params: TUpdateExercise) => {
    return axiosClient.put(END_POINTS.UPDATE_EXERCISE, params);
  },
  DELETE_EXERCISE: (exerciseId: string) => axiosClient.delete(`${END_POINTS.DELETE_EXERCISE}/${exerciseId}`),
  GET_EXERCISE_TAGS: () => axiosClient.get(END_POINTS.TAG_EXERCISE),
};

export default EXERCISE_API;
