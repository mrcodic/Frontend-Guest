import { ID } from '../shared/ServicesBase';

export interface CategoryRes {
  _id: ID;
  name: string;
  parentCategory: string;
}

export interface addCategoryReq {
  name: string;
  parentCategory: ID;
}
