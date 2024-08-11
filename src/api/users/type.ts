import { USER_ROLES_ENUM } from "@app/utils/constant";

export type UserItemTypes = {
  accountID: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  role: string;
  isActive: boolean;
  birthday: string;
};

export type UserProfileResponse = {
  accountID: number;
  email: string;
  fullName: string;
  accountPhoto: string;
  phoneNumber: string;
  roleNames: string[];
  gender: string;
  birthday: string;
  isActive: boolean;
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

export type DeleteUserRoleRequest = {
  accountID: number;
  roleName: USER_ROLES_ENUM;
};
