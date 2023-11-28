import { SignUpAccountTypes } from '../auth/type';
import axiosClient from '../axiosClient';
import { END_POINTS } from '../endPoints';
import { UpdateUserTypesAPI } from './type';

const USERS_API = {
  GET_LIST: () => axiosClient.get(END_POINTS.USERS.MAIN),
  CREATE_USER: (params: SignUpAccountTypes) => axiosClient.post(END_POINTS.AUTH.SIGN_UP, params),
  UPDATE_USER: (params: UpdateUserTypesAPI) => axiosClient.put(END_POINTS.USERS.MAIN, params),
};

export default USERS_API;
