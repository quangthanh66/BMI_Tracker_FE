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
  user_id: string;
  email: string;
  user_full_name: string;
  sex: string;
  birth_day: string;
  phone_number: string;
  role_id: string;
  is_activate: boolean;
};

//constant
export const USER_LIST_DATA: UserItemTypes[] = [
  {
    email: 'XuanKhang171120@gmail.com',
    user_id: '1',
    birth_day: '13/10/2023',
    is_activate: true,
    phone_number: '0989787651',
    role_id: 'Admin',
    user_full_name: 'Le Anh Nguyen',
    sex: 'Male',
  },
  {
    email: 'XuanKhang171120@gmail.com',
    user_id: '1',
    birth_day: '13/10/2023',
    is_activate: true,
    phone_number: '0989787651',
    role_id: 'Admin',
    user_full_name: 'Nguyen Xuan Khang',
    sex: 'Male',
  },
  {
    email: 'XuanKhang171120@gmail.com',
    user_id: '1',
    birth_day: '13/10/2023',
    is_activate: true,
    phone_number: '0989787651',
    role_id: 'Admin',
    user_full_name: 'Nguyen Xuan Khang',
    sex: 'Male',
  },
  {
    email: 'XuanKhang171120@gmail.com',
    user_id: '1',
    birth_day: '13/10/2023',
    is_activate: true,
    phone_number: '0989787651',
    role_id: 'Admin',
    user_full_name: 'Nguyen Xuan Khang',
    sex: 'Male',
  },
  {
    email: 'XuanKhang171120@gmail.com',
    user_id: '1',
    birth_day: '13/10/2023',
    is_activate: true,
    phone_number: '0989787651',
    role_id: 'Admin',
    user_full_name: 'Nguyen Xuan Khang',
    sex: 'Male',
  },
  {
    email: 'XuanKhang171120@gmail.com',
    user_id: '1',
    birth_day: '13/10/2023',
    is_activate: true,
    phone_number: '0989787651',
    role_id: 'Admin',
    user_full_name: 'Nguyen Xuan Khang',
    sex: 'Male',
  },
  {
    email: 'XuanKhang171120@gmail.com',
    user_id: '1',
    birth_day: '13/10/2023',
    is_activate: true,
    phone_number: '0989787651',
    role_id: 'Admin',
    user_full_name: 'Nguyen Xuan Khang',
    sex: 'Male',
  },
  {
    email: 'XuanKhang171120@gmail.com',
    user_id: '1',
    birth_day: '13/10/2023',
    is_activate: true,
    phone_number: '0989787651',
    role_id: 'Admin',
    user_full_name: 'Nguyen Xuan Khang',
    sex: 'Male',
  },
  {
    email: 'XuanKhang171120@gmail.com',
    user_id: '1',
    birth_day: '13/10/2023',
    is_activate: true,
    phone_number: '0989787651',
    role_id: 'Admin',
    user_full_name: 'Nguyen Xuan Khang',
    sex: 'Male',
  },
  {
    email: 'XuanKhang171120@gmail.com',
    user_id: '1',
    birth_day: '13/10/2023',
    is_activate: true,
    phone_number: '0989787651',
    role_id: 'Admin',
    user_full_name: 'Nguyen Xuan Khang',
    sex: 'Male',
  },
  {
    email: 'XuanKhang171120@gmail.com',
    user_id: '1',
    birth_day: '13/10/2023',
    is_activate: true,
    phone_number: '0989787651',
    role_id: 'Admin',
    user_full_name: 'Nguyen Xuan Khang',
    sex: 'Male',
  },
  {
    email: 'XuanKhang171120@gmail.com',
    user_id: '1',
    birth_day: '13/10/2023',
    is_activate: true,
    phone_number: '0989787651',
    role_id: 'Admin',
    user_full_name: 'Nguyen Xuan Khang',
    sex: 'Male',
  },
];
