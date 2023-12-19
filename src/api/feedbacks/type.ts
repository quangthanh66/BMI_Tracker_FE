import { UserItemTypes } from '../users/type';

export type FeedbackItemTypes = {
  feedbackId: string;
  title: string;
  description: string;
  status: string;
  type: string;
  userId: string;
  users: UserItemTypes;
};

export type CreateNewFeedbackTypes = {
  title: string;
  description: string;
  type: string;
  userId: string;
};

export type UpdateFeedbackTypes = {
  feedId: string;
  title: string;
  desc: string;
};
