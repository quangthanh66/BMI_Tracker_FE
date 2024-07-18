import axiosClient from '../axiosClient';
import { END_POINTS } from '../endPoints';

export const ADVISOR_API = {
  GET_LIST: () => axiosClient.get(END_POINTS.ADVISOR.MAIN),
};
export default ADVISOR_API;

