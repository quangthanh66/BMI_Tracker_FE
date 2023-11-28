import axiosClient from '../axiosClient';
import { END_POINTS } from '../endPoints';
import { LoginAccountTypes, SignUpAccountTypes } from './type';

const AUTH_API = {
  LOGIN_ACCOUNT: (params: LoginAccountTypes) => axiosClient.post(END_POINTS.AUTH.LOGIN, params),
  SIGN_UP_ACCOUNT: (params: SignUpAccountTypes) => axiosClient.post(END_POINTS.AUTH.SIGN_UP, params),
};

export default AUTH_API;
