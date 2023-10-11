import axiosClient from '../axiosClient';
import { END_POINTS } from '../endPoints';
import { LoginAccountTypes } from './type';

const AUTH_API = {
  LOGIN_ACCOUNT: (params: LoginAccountTypes) => axiosClient.post(END_POINTS.AUTH.LOGIN, params),
};

export default AUTH_API;
