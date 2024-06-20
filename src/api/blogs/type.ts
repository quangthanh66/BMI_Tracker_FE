export type BlogItemTypes = {
  blogID: number;
  blogName: string;
  blogContent: string;
  blogPhoto: string;
  link: string;
  advisorID: string;
  active: boolean;
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
