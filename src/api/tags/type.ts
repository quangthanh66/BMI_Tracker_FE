export type AddNewTagRequest = {
  tagName: string;
  tagDescription: string;
  tagTypeID: number;
};

export type TagsRequest = {
  tagID: number;
  tagName: string;
  tagDescription: string;
  tagTypeID: number;
  isActive: boolean;
};
