import axiosClient from '../axiosClient';
import { END_POINTS } from '../endPoints';

const CATEGORIES_API = {
  GET_CATEGORIES: () => axiosClient.get(END_POINTS.CATEGORY),
  ADD_NEW_CATEGORY: (params: { categoryName: string }) => axiosClient.post(END_POINTS.CATEGORY, params),
  UPDATE_CATEGORY: (params: { cateId: string; categoryName: string }) =>
    axiosClient.put(`${END_POINTS.CATEGORY}?cateId=${params.cateId}&categoryName=${params.categoryName}`),
  DELETE_CATEGORY: (categoryId: string) => axiosClient.delete(`${END_POINTS.CATEGORY}/${categoryId}`),
};

export default CATEGORIES_API;
