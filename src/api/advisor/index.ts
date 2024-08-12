import axiosClient from "../axiosClient";
import { END_POINTS } from "../endPoints";

export const ADVISOR_API = {
  GET_LIST: () => axiosClient.get(END_POINTS.ADVISOR.MAIN),
  UPDATE_STATUS: (id: number) =>
    axiosClient.put(`${END_POINTS.ADVISOR.UPDATE_STATUS}/${id}`),
};
export default ADVISOR_API;
