import axiosClient from '../axiosClient';
import { END_POINTS } from '../endPoints';

export const AdvisorAPI = {
  getAllAdvisors: () => axiosClient.get(END_POINTS.ADVISOR.GET_ALL),
};
