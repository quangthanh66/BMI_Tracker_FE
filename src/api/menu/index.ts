import axiosClient from '../axiosClient';
import { END_POINTS } from '../endPoints';
import { TAddNewMenu, TUpdateMenu } from './type';

const MENU_API = {
  GET_MENU: () => axiosClient.get(END_POINTS.MENU),
  ADD_NEW_MENU: (params: TAddNewMenu) => axiosClient.post(END_POINTS.MENU, params),
  DELETE_MENU: (menuId: string) => axiosClient.delete(`${END_POINTS.MENU}/menu?menuId=${menuId}`),
  UPDATE_MENU: (params: TUpdateMenu) => {
    const { menuId, userId, ...rest } = params;
    return axiosClient.put(`${END_POINTS.MENU}?menuId=${menuId}&userId=${userId}`, rest);
  },
};

export default MENU_API;
