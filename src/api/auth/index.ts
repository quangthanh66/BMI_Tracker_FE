import axiosClient from "../axiosClient";
import { END_POINTS } from "../endPoints";
import {
  ChangePasswordRequest,
  LoginAccountTypes,
  SignUpAccountTypes,
} from "./type";

const AUTH_API = {
  LOGIN_ACCOUNT: (params: LoginAccountTypes) =>
    axiosClient.post(END_POINTS.AUTH.LOGIN, params),
  SIGN_UP_ACCOUNT: (params: SignUpAccountTypes) =>
    axiosClient.post(END_POINTS.AUTH.SIGN_UP, params),

  CHANGE_PASSWORD: (params: ChangePasswordRequest) =>
    axiosClient.post(END_POINTS.AUTH.CHANGE_PASSWORD, null, { params }),

  FORGOT_PASSWORD: (email: string) =>
    axiosClient.post(END_POINTS.AUTH.FORGOT_PASSWORD, null, {
      params: { email },
    }),
};

export default AUTH_API;
