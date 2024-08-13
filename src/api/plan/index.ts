import axiosClient from "../axiosClient";
import { END_POINTS } from "../endPoints";
import { TAddNewPlan, TUpdatePlan } from "./type";

const PLAN_API = {
  GET_PLAN: () => axiosClient.get(END_POINTS.PLAN),
  //GET_MENU_ADVISOR: () => axiosClient.get(END_POINTS.MENU_ADVISOR),
  ADD_NEW_PLAN: (params: TAddNewPlan) =>
    axiosClient.post(END_POINTS.ADD_NEW_PLAN, params),
  DELETE_PLAN: (planID: number) =>
    axiosClient.delete(`${END_POINTS.DELETE_PLAN}/${planID}`),
  UPDATE_PLAN: (params: TUpdatePlan) => {
    return axiosClient.put(
      `${END_POINTS.UPDATE_PLAN}?packageID=${params.packageID}&packageStatus=${params.packageStatus}`
    );
  },

  getDetailPlan: (planID: number) =>
    axiosClient.get(END_POINTS.PLAN_MANAGEMENT.VIEW_DETAIL, {
      params: { planID },
    }),
  deActiveFoodMenu: (params: { menuID: number; foodID: number }) =>
    axiosClient.delete(
      `${END_POINTS.MENU_MANAGEMENT.DEACTIVE}/${params.menuID}/${params.foodID}`
    ),
};

export default PLAN_API;
