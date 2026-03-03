import axios from "../../../config/axios-config";
import { LoginData, RegistrationData } from "./types";

export const authApi = {
  registration: (data: RegistrationData) =>
    axios.post("auth/register", data, {
      withCredentials: true,
    }),
  login: (data: LoginData) =>
    axios.post("auth/login", data, {
      withCredentials: true,
    }),
};
