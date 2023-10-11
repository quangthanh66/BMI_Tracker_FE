import axiosClient from '../axiosClient';
import { END_POINTS } from '../endPoints';
import { CreateUserTypes, UpdateUserRoleTypes, UpdateUserStatusTypes } from './type';

const USERS_API = {
  GET_LIST: () => axiosClient.get(END_POINTS.USERS.GET_LIST),
  CREATE_USER: (params: CreateUserTypes) => axiosClient.post(END_POINTS.USERS.CREATE, params),
  UPDATE_USER_STATUS: (params: UpdateUserStatusTypes) => axiosClient.put(END_POINTS.USERS.UPDATE_STATUS, params),
  UPDATE_USER_ROLE: (params: UpdateUserRoleTypes) => axiosClient.put(END_POINTS.USERS.UPDATE_ROLE, params),
  DELETE_USER: (userId: string) => axiosClient.delete(`${END_POINTS.USERS.DELETE}/${userId}`),
};

export default USERS_API;
