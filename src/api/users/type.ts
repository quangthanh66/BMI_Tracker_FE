import { SignUpAccountTypes } from '../auth/type';

export type UserItemTypes = {
  userId: string;
  email: string;
  fullName: string;
  password: string;
  sex: string;
  phoneNumber: string;
  certificateId: string;
  certificateName: string;
  status: string;
  roleId: string;
  roles: {
    roleId: string;
    roleName: string;
    status: string;
  };
};

export type UpdateUserTypesAPI = SignUpAccountTypes & {
  userId: string;
};

export type ProveCertiTrainerTypes = {
  userId: string;
  certificateId: string;
  certificateName: string;
};
