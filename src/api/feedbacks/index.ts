import axiosClient from '../axiosClient';
import { END_POINTS } from '../endPoints';
import { CreateNewFeedbackTypes, UpdateFeedbackTypes } from './type';

const FEEDBACK_API = {
  GET_LIST: () => axiosClient.get(END_POINTS.FEEDBACKS),
  CREATE_FEEDBACK: (params: CreateNewFeedbackTypes) => axiosClient.post(END_POINTS.FEEDBACKS, params),
  UPDATE_FEEDBACK: (params: UpdateFeedbackTypes) =>
    axiosClient.put(`${END_POINTS.FEEDBACKS}?feedId=${params.feedId}&title=${params.title}&desc=${params.desc}`),
  DELETE_FEEDBACK: (feedId: string) => axiosClient.delete(`${END_POINTS.FEEDBACKS}/feedback?feedId=${feedId}`),
};

export default FEEDBACK_API;
