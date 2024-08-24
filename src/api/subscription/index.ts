import axiosClient from "../axiosClient";
import { END_POINTS } from "../endPoints";

const SUBSCRIPTION_API = {
  GET_LIST: () => axiosClient.get(END_POINTS.SUBSCRIPTION.MAIN),
  GET_MILESTONES: (value: number) =>
    axiosClient.get(END_POINTS.SUBSCRIPTION.GET_PAYMENT_MILESTONES, {
      params: {
        subscriptionNumber: value,
      },
    }),
};

export default SUBSCRIPTION_API;
