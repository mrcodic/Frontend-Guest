import { ID } from '../shared/ServicesBase';

//not yet
export interface BlogRes {
  _id: string;
  title: string;
  category: string;
  tags: string[];
  updatedAt: string;
  authorName: string;
}

export interface addBlogReq {
  title: string;
  content: string;
  image: string;
  mainCategory: string[];
  subCategory: string[];
  tags: string[];
  isPublished: boolean;
}
