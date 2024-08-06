import axiosClient from "../axiosClient";
import { END_POINTS } from "../endPoints";
import { UpdateCommissionTypes } from "./type";

const COMMISSION_API = {
  GET_LIST: () => axiosClient.get(END_POINTS.COMMISSION.MAIN),
  UPDATE_COMMISSION: (params: UpdateCommissionTypes) =>
    axiosClient.put(`${END_POINTS.COMMISSION.UPDATE_COMMISSION}`, params),
  APPROVE_COMMISSION: (commissionID: number) =>
    axiosClient.put(
      `${END_POINTS.COMMISSION.UPDATE_COMMISSION}/${commissionID}`
    ),
  GET_DETAILS: (id: number) =>
    axiosClient.get(END_POINTS.COMMISSION.DETAILS, {
      params: {
        commissionID: id,
      },
    }),
};

export default COMMISSION_API;
