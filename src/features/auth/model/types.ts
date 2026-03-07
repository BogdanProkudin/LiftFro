export type LoginData = {
  email: string;
  password: string;
};
export type LoginResponse = {
  message: string;
};

export type RegistrationData = {
  email: string;
  password: string;
  username: string;
};
export type RegistrationResponse = {
  message: string;
};

export type AuthData = {
  email: string;
  password: string;
  username: string;
  confirmPassword?: string;
};

export type ForgotPasswordData = {
  email: string;
};
export type ForgotPasswordResponse = {
  message: string;
};
export type VerifyData = {
  token: string;
};
export type VerifyResponse = {
  valid: boolean;
};
export type ResetPasswordData = {
  password: string;
  token: string;
};
export type ResetPasswordResponse = {
  message: string;
};
