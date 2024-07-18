import axiosClient from '../axiosClient';
import { END_POINTS } from '../endPoints';


const SUBSCRIPTION_API = {
  GET_LIST: () => axiosClient.get(END_POINTS.SUBSCRIPTION.MAIN),
};

export default SUBSCRIPTION_API;
