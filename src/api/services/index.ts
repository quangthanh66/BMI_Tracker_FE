import axiosClient from '../axiosClient';
import { END_POINTS } from '../endPoints';
import { TAddNewService, TUpdateService } from './type';

const SERVICE_API = {
  GET_LIST: () => axiosClient.get(END_POINTS.SERVICES),
  ADD_NEW: (params: TAddNewService) => axiosClient.post(END_POINTS.SERVICES, params),
  UPDATE: (params: TUpdateService) =>
    axiosClient.put(
      `${END_POINTS.SERVICES}?serviceId=${params.serviceId}&nameService=${params.nameService}&descriptionService=${params.descriptionService}`,
    ),
  DELETE: (serviceId: string) => axiosClient.delete(`${END_POINTS.SERVICES}/service`, { params: { foo: serviceId } }),
};

export default SERVICE_API;
