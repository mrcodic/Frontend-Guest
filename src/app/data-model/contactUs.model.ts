import { ID } from '../shared/ServicesBase';

export interface contactUsRes {
  _id: ID;
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

export interface contactUsReq {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}
