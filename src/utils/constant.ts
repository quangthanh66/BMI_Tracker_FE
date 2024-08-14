export enum AUTH_TOKEN {
  TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkR1Y0hOSEBnbWFpbC5jb20iLCJpYXQiOjE2OTY5NDUxODQsImV4cCI6MTY5OTUzNzE4NH0.h78GE2JeCInk2a9_dchHQiLFK42zSMQ7SP05nlpPpTU",
}

export enum USER_ROLES_ENUM {
  ROLE_MEMBER = "ROLE_MEMBER",
  ROLE_ADMIN = "ROLE_ADMIN",
  ROLE_ADVISOR = "ROLE_ADVISOR",
  ROLE_MANAGER = "ROLE_MANAGER",
}

export enum USER_SEX_ENUM {
  MALE = "MALE",
  FEMALE = "FEMALE",
}
export enum PAYMENT_STATUS {
  PAID = "PAID",
  UNPAID = "UNPAID",
  PARTIALLY_PAID = "PARTIALLY_PAID",
}

export const USER_ROLES_VALUES = [
  {
    value: USER_ROLES_ENUM.ROLE_MEMBER,
    label: "Member",
  },
  {
    value: USER_ROLES_ENUM.ROLE_ADMIN,
    label: "Admin",
  },
  {
    value: USER_ROLES_ENUM.ROLE_ADVISOR,
    label: "Advisor",
  },
  {
    value: USER_ROLES_ENUM.ROLE_MANAGER,
    label: "Manager",
  },
];
export enum PLAN_STATUS {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export const PLAN_STATUS_LABEL = [
  {
    value: PLAN_STATUS.PENDING,
    label: "Pending",
  },
  {
    value: PLAN_STATUS.APPROVED,
    label: "Approved",
  },
  {
    value: PLAN_STATUS.REJECTED,
    label: "Rejected",
  },
];

export const ADD_USER_ROLES = [
  {
    value: USER_ROLES_ENUM.ROLE_MEMBER,
    label: "Member",
  },
  {
    value: USER_ROLES_ENUM.ROLE_ADVISOR,
    label: "Advisor",
  },
  {
    value: USER_ROLES_ENUM.ROLE_MANAGER,
    label: "Manager",
  },
  {
    value: USER_ROLES_ENUM.ROLE_ADMIN,
    label: "Admin",
  },
];
export const USER_SEX_VALUES = [
  {
    label: USER_SEX_ENUM.MALE,
    value: "Male",
  },
  {
    label: USER_SEX_ENUM.FEMALE,
    value: "Female",
  },
];

export enum CERTIFICATE_STATUS {
  hidden = "hidden",
  available_certificate = "available-certificate",
}

export enum BLOG_STATUS {
  true = "true",
  false = "false",
}

export enum DATE_TIME_FORMAT {
  FULL_DATE_TIME = "DD/MM/YYYY - HH:mm A",
}
