export type UserItemTypes = {
  accountID: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  roleName: string;
  isActive: string;
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
