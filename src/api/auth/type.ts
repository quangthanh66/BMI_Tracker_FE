export type LoginAccountTypes = {
  email: string;
  password: string;
};

export type SignUpAccountTypes = {
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  birthday: string;
  role: string;
};

export type UserTypes = {
  accountID: string;
  email: string;
  role: string;
  refreshToken: string;
  accessToken: string;
};
