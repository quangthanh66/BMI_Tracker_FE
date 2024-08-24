export type SubcriptionItemTypes = {
  subscriptionID: string;
  subscriptionNumber: string;
  subscriptionDescription: string;
  amount: string;
  subscriptionDate: string;
  startDate: string;
  endDate: string;
  commissionDescription: string;
  memberID: string;
  memberName: string;
  advisorName: string;
  subscriptionStatus: string;
};

export type MilestonesItemResponse = {
  commissionAllocationID: number;
  amount: number;
  description: string;
  milestone: string;
  milestoneDate: string;
};
