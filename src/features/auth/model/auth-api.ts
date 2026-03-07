import axios from "../../../config/axios-config";

import {
  ForgotPasswordData,
  LoginData,
  RegistrationData,
  ResetPasswordData,
  VerifyData,
} from "./types";

export const authApi = {
  registration: (data: RegistrationData) =>
    axios.post("auth/register", data, {
      withCredentials: true,
    }),
  login: (data: LoginData) =>
    axios.post("auth/login", data, {
      withCredentials: true,
    }),

  forgotPassword: (data: ForgotPasswordData) =>
    axios.post("auth/forgot-password", data),

  validateToken: (data: VerifyData) =>
    axios.get(`auth/validate-token?token=${data.token}`),
  resetPassword: (data: ResetPasswordData) =>
    axios.post("auth/reset-password", data, {
      withCredentials: true,
    }),
};
