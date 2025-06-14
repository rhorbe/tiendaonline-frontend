import api from "./axiosInstance";
import { AxiosResponse, InternalAxiosRequestConfig } from "axios";

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (err) => Promise.reject(err)
);

api.interceptors.response.use(
  (res: AxiosResponse) => res,
  (err) => {
    if (err.response?.status === 401) {
      // ...
    }
    return Promise.reject(err);
  }
);
