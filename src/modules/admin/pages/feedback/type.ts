import { UserItemTypes } from '@app/api/users/type';

export type FeedbackItemTypes = {
  feedbackId: string;
  title: string;
  description: string;
  status: string;
  type: string;
  users: UserItemTypes;
};
