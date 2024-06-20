export enum AUTH_TOKEN {
  TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkR1Y0hOSEBnbWFpbC5jb20iLCJpYXQiOjE2OTY5NDUxODQsImV4cCI6MTY5OTUzNzE4NH0.h78GE2JeCInk2a9_dchHQiLFK42zSMQ7SP05nlpPpTU',
}

export enum USER_ROLES_ENUM {
  ROLE_MEMBER = 'ROLE_MEMBER',
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_ADVISOR = 'ROLE_ADVISOR',
}

export enum USER_SEX_ENUM {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export const USER_ROLES_VALUES = [
  {
    label: USER_ROLES_ENUM.ROLE_MEMBER,
    value: 'Member',
  },
  {
    label: USER_ROLES_ENUM.ROLE_ADMIN,
    value: 'Admin',
  },
  {
    label: USER_ROLES_ENUM.ROLE_ADVISOR,
    value: 'Advisor',
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

// export enum USER_STATUS {
//   true = 'true',
//   false = 'false',
// }

export enum CERTIFICATE_STATUS {
  hidden = 'hidden',
  available_certificate = 'available-certificate',
}

export enum BLOG_STATUS {
  true = 'true',
  false = 'false',
}
