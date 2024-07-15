import { ID } from '../shared/ServicesBase';

//login
export interface LoginResponse {
  user: IUserLogin;
  token: string;
}
export interface IUserLogin {
  _id: ID;
  userName: string;
  email: string;
  password: string;
  role: AuthRoles;
  image: string;
  createdAt: string;
  updatedAt: string;
}
export enum AuthRoles {
  ADMIN = 'admin',
  AUTHOR = 'author',
}

export interface ILoginRequest {
  email: string | undefined;
  password: string | undefined;
}
export class LoginRequest implements ILoginRequest {
  email: string | undefined;
  password: string | undefined;
}

// export interface ILoginResponse {
//   id: string;
//   token: string;
//   employeeID: number;
//   role: string;
//   permissions: string[];
//   modules: string[] | undefined;
//   userName: string | undefined;
//   guid: string | undefined;
//   userID: number;
//   isUsingOTP: boolean;
// }

//forget password
// export interface IforgotPassResponse {
//   userID: string;
//   otp: string;
// }

//logout
// export interface ILogoutResponse {
//   userID: string;
//   otp: string;
// }

//otp form
// export interface IOtpResponse {
//   id: string;
//   userName: string;
//   email: string;
//   token: string;
// }

// export interface IOtpRequest {
//   userID: string | undefined;
//   otp: string | undefined;
// }

// export class OtpRequest implements IOtpRequest {
//   userID: string | undefined;
//   otp: string | undefined;
// }

//new password
// export interface IChangePassResponse {
//   id: string;
//   currentPassword: string;
//   newPassword: string;
//   confirmPassword: string;
//   token: string;
// }

// export interface IChangePassRequest {
//   id: string | undefined;
//   currentPassword: string | undefined;
//   newPassword: string | undefined;
//   confirmPassword: string | undefined;
//   token?: string | undefined;
// }

// export class ChangePassRequest implements IChangePassRequest {
//   id: string | undefined;
//   currentPassword: string | undefined;
//   newPassword: string | undefined;
//   confirmPassword: string | undefined;
//   token?: string | undefined;
// }
