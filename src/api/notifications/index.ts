import axiosClient from '../axiosClient';
import { END_POINTS } from '../endPoints';

const NotificationAPI = {
  getNotificationsList: () => axiosClient.get(END_POINTS.NOTIFICATIONS),
};

export default NotificationAPI;
