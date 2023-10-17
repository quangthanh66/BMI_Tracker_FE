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
    email: 'BaoDang55200@gmail.com',
    user_id: '1',
    birth_day: '1/1/2000',
    is_activate: true,
    phone_number: '0989787651',
    role_id: 'Admin',
    user_full_name: 'Dang Viet Quoc Bao',
    sex: 'Male',
  },
  {
    email: 'QuangThanh662000@gmail.com',
    user_id: '1',
    birth_day: '06/06/2000',
    is_activate: true,
    phone_number: '0989787651',
    role_id: 'User',
    user_full_name: 'Tran Quang Thanh',
    sex: 'Male',
  },
  {
    email: 'HiepDuc222000@gmail.com',
    user_id: '1',
    birth_day: '02/02/2000',
    is_activate: true,
    phone_number: '0989787651',
    role_id: 'Trainer',
    user_full_name: 'Huynh Nguyen Hiep Duc',
    sex: 'Male',
  },
  {
    email: 'XuanBach332000@gmail.com',
    user_id: '1',
    birth_day: '03/03/2000',
    is_activate: true,
    phone_number: '0989787651',
    role_id: 'Admin',
    user_full_name: 'Luong Xuan Bach',
    sex: 'Male',
  },
  
];
