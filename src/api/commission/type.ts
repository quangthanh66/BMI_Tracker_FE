export type CommissionItemTypes = {
  commissionID: string;
  commissionAmout: string;
  commissionRate: string;
  paidDate: string;
  expectedPaymentDate: string;
  paidAmount: string;
  paymentStatus: boolean;
  commissionDescription: number;
  memberName: string;
  advisorID: number;
  advisorName: string;
};

export type CommissionDetailsTypes = {
  commission(commission: any): unknown;
  commissionAllocationID: number;
  amount: number;
  description: string;
  milestone: string;
  milestoneDate: string;
  subscriptionNumber: string;
};

export type UpdateCommissionTypes = {
  commissionID: string;
  paidDate: string;
  paidAmount: number;
  paymentStatus: string;
  commissionDescription: string;
};
