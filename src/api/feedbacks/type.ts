export type FeedbackItemTypes = {
  feedbackID: string;
  title: string;
  type: string;
  description: string;
  status: boolean;
  memberID: number;
  memberName: string;
};


export type UpdateFeedbackTypes = {
  feedbackID: number;
  title: string;
  type: string;
  description: string;
  status: boolean;
  memberID: number;
  memberName: string;
};
