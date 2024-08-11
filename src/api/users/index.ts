import { UpdateUserProfileRequest } from "@app/models";
import { USER_ROLES_ENUM } from "@app/utils/constant";
import { SignUpAccountTypes } from "../auth/type";
import axiosClient from "../axiosClient";
import { END_POINTS } from "../endPoints";
import {
  DeleteUserRoleRequest,
  ProveCertiTrainerTypes,
  UpdateUserTypesAPI,
} from "./type";

const USERS_API = {
  GET_LIST: () => axiosClient.get(END_POINTS.USERS.MAIN),
  CREATE_USER: (params: SignUpAccountTypes) =>
    axiosClient.post(END_POINTS.CREATE_USER, params),
  UPDATE_USER: (params: UpdateUserTypesAPI) =>
    axiosClient.put(END_POINTS.UPDATE_USER, params),
  DELETE_USER: (userId: string) =>
    axiosClient.delete(`${END_POINTS.USERS.MAIN}?userId=${userId}`),
  PROVIDE_TRAINER_CERTIFICATE: (params: ProveCertiTrainerTypes) =>
    axiosClient.put(
      `${END_POINTS.USERS.MAIN}/Trainer?userId=${params.userId}&certificateId=${params.certificateId}&certificateName=${params.certificateName}`
    ),
  APPROVE_TRAINER: (userId: string) =>
    axiosClient.put(`${END_POINTS.USERS.MAIN}/TrainerApprove?userId=${userId}`),

  UPDATE_PROFILE: (values: UpdateUserProfileRequest) =>
    axiosClient.put(END_POINTS.USERS.UPDATE_PROFILE, values),
  GET_PROFILE: () => axiosClient.get(END_POINTS.GET_PROFILE),
  ADD_MORE_ACCOUNT: (params: {
    accountID: number;
    roleName: USER_ROLES_ENUM;
  }) => axiosClient.post(END_POINTS.ADD_MORE_ACCOUNT, null, { params }),
  DELETE_ROLE: (params: DeleteUserRoleRequest) =>
    axiosClient.delete(END_POINTS.USERS.DELETE_ROLE, { params }),
};

export default USERS_API;
