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
