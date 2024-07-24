import axiosClient from '../axiosClient';
import { END_POINTS } from '../endPoints';

export const StatisticAPI = {
  getTotalWorkout: () => axiosClient.get(END_POINTS.STATISTIC.TOTAL_WORKOUT),
  getTotalSubscription: () => axiosClient.get(END_POINTS.STATISTIC.TOTAL_SUBSCRIPTION),
  getTotalMenu: () => axiosClient.get(END_POINTS.STATISTIC.TOTAL_MENU),
  getTotalAdvisorMember: () => axiosClient.get(END_POINTS.STATISTIC.TOTAL_ADVISOR_MEMBER),
  getTotalCommissionSummary: () => axiosClient.get(END_POINTS.STATISTIC.COMMISSION_SUMMARY),
};
