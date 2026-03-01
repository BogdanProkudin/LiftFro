export type LoginData = {
  email: string;
  password: string;
};
export type LoginResponse = {
  message: string;
};

export type AuthData = {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
};
