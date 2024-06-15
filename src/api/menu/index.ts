import axiosClient from '../axiosClient';
import { END_POINTS } from '../endPoints';
import { TAddNewMenu, TUpdateMenu } from './type';

const MENU_API = {
  GET_MENU: () => axiosClient.get(END_POINTS.MENU),
  ADD_NEW_MENU: (params: TAddNewMenu) => axiosClient.post(END_POINTS.ADD_NEW_MENU, params),
  DELETE_MENU: (menuID: number) => axiosClient.delete(`${END_POINTS.DELETE_MENU}/${menuID}`),
  UPDATE_MENU: (params: TUpdateMenu) => {
    return axiosClient.put(`${END_POINTS.UPDATE_MENU}`, params);
  },
};

export default MENU_API;
