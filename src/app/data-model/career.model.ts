import { ID } from '../shared/ServicesBase';

export interface careerRes {
  _id: ID;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
  cvFile: string;
}

export interface careerReq {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
  cvFile: string;
}

// new career
export interface careerTitle {
  title: string;
  paragraph: string;
}
