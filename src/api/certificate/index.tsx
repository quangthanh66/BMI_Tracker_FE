import axiosClient from '../axiosClient';
import { END_POINTS } from '../endPoints';
import { CreateNewCertificateTypes, UpdateCertificateTypes } from './type';

const CERTIFICATE_API = {
  GET_LIST: () => axiosClient.get(END_POINTS.CERTIFICATE),
  CREATE_NEW_CERTIFICATE: (params: CreateNewCertificateTypes) => axiosClient.post(END_POINTS.CERTIFICATE, params),
  UPDATE_CERTIFICATE: (params: UpdateCertificateTypes) => {
    return axiosClient.put(END_POINTS.UPDATE_CERTIFICATE, params);
  },
  DELETE_CERTIFICATE: (certificateID: string) =>
    axiosClient.delete(`${END_POINTS.DELETE_CERTIFICATE}?certificateID=${certificateID}`),
};

export default CERTIFICATE_API;
