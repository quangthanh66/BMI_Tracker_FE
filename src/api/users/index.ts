import { SignUpAccountTypes } from '../auth/type';
import axiosClient from '../axiosClient';
import { END_POINTS } from '../endPoints';
import { ProveCertiTrainerTypes, UpdateUserTypesAPI } from './type';

const USERS_API = {
  GET_LIST: () => axiosClient.get(END_POINTS.USERS.MAIN),
  CREATE_USER: (params: SignUpAccountTypes) => axiosClient.post(END_POINTS.CREATE_USER, params),
  UPDATE_USER: (params: UpdateUserTypesAPI) => axiosClient.put(END_POINTS.UPDATE_USER, params),
  DELETE_USER: (userId: string) => axiosClient.delete(`${END_POINTS.USERS.MAIN}?userId=${userId}`),
  PROVIDE_TRAINER_CERTIFICATE: (params: ProveCertiTrainerTypes) =>
    axiosClient.put(
      `${END_POINTS.USERS.MAIN}/Trainer?userId=${params.userId}&certificateId=${params.certificateId}&certificateName=${params.certificateName}`,
    ),
  APPROVE_TRAINER: (userId: string) => axiosClient.put(`${END_POINTS.USERS.MAIN}/TrainerApprove?userId=${userId}`),
};

export default USERS_API;
