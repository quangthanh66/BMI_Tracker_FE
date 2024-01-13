import axiosClient from '../axiosClient';
import { END_POINTS } from '../endPoints';
import { TAddNewNotifyState, TUpdateNotifyState } from './type';

const NotificationAPI = {
  getNotificationsList: () => axiosClient.get(END_POINTS.NOTIFICATIONS),
  addNewNotification: (params: TAddNewNotifyState) => axiosClient.post(END_POINTS.NOTIFICATIONS, params),
  updateNotification: (params: TUpdateNotifyState) => axiosClient.put(END_POINTS.NOTIFICATIONS, params),
  deleteNotification: (notifyId: string) => axiosClient.delete(`${END_POINTS.NOTIFICATIONS}/noti?foo=${notifyId}`),
};

export default NotificationAPI;
