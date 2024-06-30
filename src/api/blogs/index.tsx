import axiosClient from '../axiosClient';
import { END_POINTS } from '../endPoints';
import { CreateNewBlogTypes, UpdateBlogTypes } from './type';

const BLOG_API = {
  GET_LIST: () => axiosClient.get(END_POINTS.BLOGS.MAIN),
  CREATE_NEW_BLOG: (params: CreateNewBlogTypes) => axiosClient.post(END_POINTS.BLOGS.MAIN, params),
  UPDATE_BLOG: (params: UpdateBlogTypes) =>
    axiosClient.put(
      `${END_POINTS.BLOGS.MAIN}?blogID=${params.blogID}&blogName=${params.blogName}&blogContent=${params.blogContent}&blogPhoto=${params.blogPhoto}&link=${params.link}&isActive={params.isActive}`,
    ),
  DELETE_BLOG: (blogID: string) => axiosClient.delete(`${END_POINTS.BLOGS.DELETE_BLOGS}/${blogID}`),
};

export default BLOG_API;
