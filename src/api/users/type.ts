export type UpdateUserStatusTypes = {
  token: string;
  userId: string;
  status: number;
};

export type GetUsersTypes = {
  token: string;
};

export type UpdateUserRoleTypes = {
  token: string;
  userId: string;
  role_name: string;
};

export type CreateUserTypes = {
  email: string;
  user_full_name: string;
  sex: string;
  birth_day: string;
  phone_number: string;
  role_name: string;
};

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
