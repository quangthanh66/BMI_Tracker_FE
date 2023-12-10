export const fieldValidate = {
  required: {
    required: true,
    message: 'This field is required',
  },
  email: {
    type: 'email',
    message: 'The value is invalid email',
  } as any,
};

export type SelectTypes = {
  label: string;
  value: string;
};
