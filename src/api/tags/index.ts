import axiosClient from '../axiosClient';
import { END_POINTS } from '../endPoints';
import { AddNewTagRequest } from './type';

const TagsAPI = {
  addNewTag: (params: AddNewTagRequest) => axiosClient.post(END_POINTS.TAGS.ADD_NEW, params),
  getAllTag: () => axiosClient.get(END_POINTS.TAGS.GET_ALL),
};

export default TagsAPI;
