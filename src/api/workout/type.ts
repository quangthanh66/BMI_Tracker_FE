import { TAddNewWorkout, TUpdateWorkout } from '.';
import axiosClient from '../axiosClient';
import { END_POINTS } from '../endPoints';

const WORKOUT_API = {
  GET_WORKOUT: () => axiosClient.get(END_POINTS.WORKOUT),
  ADD_NEW_WORKOUT: (params: TAddNewWorkout) => axiosClient.post(END_POINTS.ADD_NEW_WORKOUT, params),
  UPDATE_WORKOUT: (params: TUpdateWorkout) => {
    return axiosClient.put(END_POINTS.UPDATE_WORKOUT, params);
  },
  DELETE_WORKOUT: (workoutID: string) => axiosClient.delete(`${END_POINTS.DELETE_WORKOUT}/${workoutID}`),
};

export default WORKOUT_API;
