import { ID } from '../shared/ServicesBase';

export interface userRes {
  _id: ID;
  firstName: string;
  lastName: string;
  userName: string;
  role: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  image: string;
}

export interface userReq {
  firstName: string;
  lastName: string;
  userName: string;
  role: UserRole;
  email: string;
  password: string;
  image: string;
  confirmPassword: string;
}

export interface profileRes {
  _id: ID;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  password: string;
  image: string;
}
export interface ChangePassReq {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export enum UserRole {
  AUTHOR = 'author',
  ADMIN = 'admin',
}
