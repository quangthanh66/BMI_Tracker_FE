import axiosClient from "../axiosClient";
import { END_POINTS } from "../endPoints";
import { UpdateFeedbackTypes } from "./type";

const FEEDBACK_API = {
  GET_LIST: () => axiosClient.get(END_POINTS.FEEDBACKS.MAIN),
  UPDATE_FEEDBACK: (params: UpdateFeedbackTypes) =>
    axiosClient.put(`${END_POINTS.FEEDBACKS.UPDATE_FEEDBACK}`, { ...params }),
  APPROVE_FEEDBACK: (feedbackId: number) =>
    axiosClient.put(`${END_POINTS.FEEDBACKS.UPDATE_FEEDBACK}/${feedbackId}`),
};

export default FEEDBACK_API;
