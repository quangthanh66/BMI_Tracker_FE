export type BlogItemTypes = {
  blogID: number;
  blogName: string;
  blogContent: string;
  blogPhoto: string;
  link: string;
  advisorID: string;
  active: boolean;
  advisorName: string;

};

export type CreateNewBlogTypes = {
  blogName: string;
  blogContent: string;
  blogPhoto: string;
  link: string;
};

export type UpdateBlogTypes = {
  blogID: number;
  blogName: string;
  blogContent: string;
  blogPhoto: string;
  link: string;
  isActive: boolean;
};
