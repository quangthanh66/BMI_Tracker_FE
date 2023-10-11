export type UpdateUserStatusTypes = {
  token: string;
  userId: string;
  status: number;
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
  user_id: string;
  email: string;
  user_full_name: string;
  sex: string;
  birth_day: string;
  phone_number: string;
  role_id: string;
  is_activate: boolean;
};
