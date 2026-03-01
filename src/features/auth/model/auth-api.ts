import axios from "../../../config/axios-config";

export const authApi = {
  login: (data: { email: string; password: string }) =>
    axios.post("auth/login", data, {
      withCredentials: true,
    }),
};
