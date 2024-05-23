export type LoginAccountTypes = {
  email: string;
  password: string;
};

export type SignUpAccountTypes = {
  fullname: string;
  password: string;
  email: string;
  phoneNumber: string;
};

export type UserTypes = {
  accountID: string;
  email: string;
  role: string;
  refreshToken: string;
  accessToken: string;
};
