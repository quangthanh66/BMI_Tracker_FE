export type UserItemTypes = {
  accountID: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  roleNames: string;
  isActive: boolean;
  birthday: string;
};

export type UpdateUserTypesAPI = {
  accountID: string;
  fullName: string;
  phoneNumber: string;
  gender: string;
  birthday: string;
};

export type ProveCertiTrainerTypes = {
  userId: string;
  certificateId: string;
  certificateName: string;
};

export type CertificateDetailResponse = {
  certificateID: number;
  certificateName: string;
  certificateLink: string;
  isActive: boolean;
  advisor: {
    advisorID: number;
    accountID: number;
    height: number;
    weight: number;
    isActive: boolean;
  };
};
