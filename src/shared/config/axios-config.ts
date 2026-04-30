import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE || "/api/proxy";

type RetriableRequest = InternalAxiosRequestConfig & { _retry?: boolean };

interface FailedRequest {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown = null): void => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

const AUTH_REFRESH_FAILED_EVENT = "auth:refresh-failed";

export const onAuthRefreshFailed = (callback: () => void): (() => void) => {
  window.addEventListener(AUTH_REFRESH_FAILED_EVENT, callback);
  return () => window.removeEventListener(AUTH_REFRESH_FAILED_EVENT, callback);
};

const emitAuthRefreshFailed = (): void => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(AUTH_REFRESH_FAILED_EVENT));
  }
};

const isAuthRejection = (error: unknown): boolean => {
  if (!axios.isAxiosError(error)) return false;
  const status = error.response?.status;
  return status === 401 || status === 403;
};

const createAxios = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as RetriableRequest | undefined;

      if (
        !originalRequest ||
        error.response?.status !== 401 ||
        originalRequest._retry
      ) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
          originalRequest._retry = true;
          return instance(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axios.post(
          `${BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true },
        );
        processQueue(null);
        return instance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        if (isAuthRejection(refreshError)) {
          emitAuthRefreshFailed();
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    },
  );

  return instance;
};

export const axiosInstance = createAxios();
export default axiosInstance;
