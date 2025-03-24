export interface loginData {
  email: string;
  password: string;
}
export interface reigisterData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}
export interface ForgetPasswordData {
  email: string;
}
export interface resetCodeData {
  resetCode: string;
}
export interface newPasswordData {
  email: string;
  newPassword: string;
}
