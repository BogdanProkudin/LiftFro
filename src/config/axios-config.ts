import axios, { AxiosInstance } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE || "/api/proxy";

const createAxios = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });
  return instance;
};

export const axiosInstance = createAxios();
export default axiosInstance;
