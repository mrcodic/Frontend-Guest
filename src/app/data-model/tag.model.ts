import { ID } from '../shared/ServicesBase';

export interface tagRes {
  _id: ID;
  name: string;
}
export interface tagReq {
  name: string;
}
