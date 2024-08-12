export type FeedbackItemTypes = {
  userRequestID: string;
  purpose: string;
  type: string;
  processNote: string;
  status: string;
  fullName: string;
  creationDate: string;
  processingDate: string;
};


export type UpdateFeedbackTypes = {
  userRequestID: string;
  processNote: string;
  status: string;
};
