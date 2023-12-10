export type BlogItemTypes = {
  bolgId: string;
  blogName: string;
  blogContent: string;
  blogPhoto: string;
  link: string;
  tag: string;
  dateTime: string;
  status: string;
  userId: string;
  users: {
    userId: string;
    email: string;
    fullName: string;
    password: string;
    phoneNumber: string;
    certificateId: string;
    certificateName: string;
    status: string;
    roleId: string;
  };
};

export type CreateNewBlogTypes = {
  blogName: string;
  blogContent: string;
  blogPhoto: string;
  link: string;
  tag: string;
  userId: string;
};

export type UpdateBlogTypes = {
  blogId: string;
  blogName: string;
  blogContent: string;
  blogPhoto: string;
  link: string;
};
