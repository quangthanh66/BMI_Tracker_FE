import axiosClient from '../axiosClient';
import { END_POINTS } from '../endPoints';
import { TAddNewMenu, TUpdateMenu } from './type';

const MENU_API = {
  GET_MENU: () => axiosClient.get(END_POINTS.MENU),
  GET_MENU_ADVISOR: () => axiosClient.get(END_POINTS.MENU_ADVISOR),
  ADD_NEW_MENU: (params: TAddNewMenu) => axiosClient.post(END_POINTS.ADD_NEW_MENU, params),
  DELETE_MENU: (menuID: number) => axiosClient.delete(`${END_POINTS.DELETE_MENU}/${menuID}`),
  UPDATE_MENU: (params: TUpdateMenu) => {
    return axiosClient.put(`${END_POINTS.UPDATE_MENU}`, params);
  },

  getDetailMenu: (menuID: number) => axiosClient.get(END_POINTS.MENU_MANAGEMENT.VIEW_DETAIL, { params: { menuID } }),
  deActiveFoodMenu: (params: { menuID: number; foodID: number }) =>
    axiosClient.delete(`${END_POINTS.MENU_MANAGEMENT.DEACTIVE}/${params.menuID}/${params.foodID}`),
};

export default MENU_API;
