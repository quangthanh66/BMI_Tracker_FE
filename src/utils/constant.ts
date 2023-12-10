export enum AUTH_TOKEN {
  TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkR1Y0hOSEBnbWFpbC5jb20iLCJpYXQiOjE2OTY5NDUxODQsImV4cCI6MTY5OTUzNzE4NH0.h78GE2JeCInk2a9_dchHQiLFK42zSMQ7SP05nlpPpTU',
}

export enum USER_ROLES_ENUM {
  USER = 'User',
  ADMIN = 'Admin',
  TRAINER = 'Trainer',
}

export enum USER_SEX_ENUM {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export const USER_ROLES_VALUES = [
  {
    label: USER_ROLES_ENUM.USER,
    value: 'User',
  },
  {
    label: USER_ROLES_ENUM.ADMIN,
    value: 'Admin',
  },
  {
    label: USER_ROLES_ENUM.TRAINER,
    value: 'Trainer',
  },
];

export const USER_SEX_VALUES = [
  {
    label: USER_SEX_ENUM.MALE,
    value: 'Male',
  },
  {
    label: USER_SEX_ENUM.FEMALE,
    value: 'Female',
  },
];

export enum USER_STATUS {
  available = 'available',
  hidden = 'hidden',
  waiting_trainer = 'watting-trainer',
  available_trainer = 'available-trainer',
}

export enum BLOG_STATUS {
  hidden = 'hidden',
  available_blog = 'available-blog',
}
