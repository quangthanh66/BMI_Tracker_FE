import axiosClient from "../axiosClient";
import { END_POINTS } from "../endPoints";
import { AddNewTagRequest, ETagTypes } from "./type";

const TagsAPI = {
  addNewTag: (params: AddNewTagRequest) =>
    axiosClient.post(END_POINTS.TAGS.ADD_NEW, params),
  getAllTag: () => axiosClient.get(END_POINTS.TAGS.GET_ALL),
  getTagType: (tagType: ETagTypes) =>
    axiosClient.get(END_POINTS.TAGS.TAG_TYPE, { params: { tagType } }),
};

export default TagsAPI;
