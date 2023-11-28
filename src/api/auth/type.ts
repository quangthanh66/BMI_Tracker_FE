export type LoginAccountTypes = {
  email: string;
  password: string;
};

export type SignUpAccountTypes = {
  fullname: string;
  password: string;
  email: string;
  phoneNumber: string;
  sex: string;
};

export type UserTypes = {
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
