import axiosClient from '../axiosClient';
import { END_POINTS } from '../endPoints';
import { CreateCertificateRequest, UpdateCertificateTypes } from './type';

const CERTIFICATE_API = {
  GET_LIST: () => axiosClient.get(END_POINTS.CERTIFICATE),
  GET_CERTIFICATE_DETAIL: (id: number) =>
    axiosClient.get(END_POINTS.CERTIFICATE_MANAGEMENT.DETAIL, {
      params: {
        id,
      },
    }),
  CREATE_NEW_CERTIFICATE: (params: CreateCertificateRequest) =>
    axiosClient.post(END_POINTS.CERTIFICATE_MANAGEMENT.CREATE_NEW, params),
  UPDATE_CERTIFICATE: (params: UpdateCertificateTypes) => {
    return axiosClient.put(END_POINTS.UPDATE_CERTIFICATE, params);
  },
  DELETE_CERTIFICATE: (certificateID: string) =>
    axiosClient.delete(`${END_POINTS.DELETE_CERTIFICATE}?certificateID=${certificateID}`),
  GET_CERTIFICATE_BY_ADVISOR: (advisorID: number) =>
    axiosClient.get(END_POINTS.GET_CERTIFICATE_BY_ADVISOR, {
      params: {
        advisorID,
      },
    }),
};

export default CERTIFICATE_API;
