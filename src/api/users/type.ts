import { SignUpAccountTypes } from '../auth/type';

export type UserItemTypes = {
  accountID: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  roleName: string;
  isActive: string;
};

export type UpdateUserTypesAPI = SignUpAccountTypes & {
  userId: string;
};

export type ProveCertiTrainerTypes = {
  userId: string;
  certificateId: string;
  certificateName: string;
};
