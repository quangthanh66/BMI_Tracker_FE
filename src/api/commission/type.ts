export type CommissionItemTypesItemTypes = {
  commissionID: string;
  commissionRate: string;
  paidDate: string;
  expectedPaymentDate: string;
  paidAmount: boolean;
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
