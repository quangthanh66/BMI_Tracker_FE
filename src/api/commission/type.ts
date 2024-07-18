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


export type UpdateCommissionTypes = {
  commissionID: string;
  paidDate: string;
  paidAmount: number;
  paymentStatus: string;
  commissionDescription: string;
};
