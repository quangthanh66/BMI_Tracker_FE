import axiosClient from '../axiosClient';
import { END_POINTS } from '../endPoints';
import { UpdateFeedbackTypes } from './type';

const FEEDBACK_API = {
  GET_LIST: () => axiosClient.get(END_POINTS.FEEDBACKS.MAIN),
  UPDATE_FEEDBACK: (params: UpdateFeedbackTypes) =>
    axiosClient.put(`${END_POINTS.FEEDBACKS.UPDATE_FEEDBACK}?feedbackID=${params.feedbackID}&title=${params.title}&desc=${params.feedbackID}`),
};

export default FEEDBACK_API;
