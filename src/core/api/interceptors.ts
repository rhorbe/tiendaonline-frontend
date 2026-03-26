import { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export const setupInterceptors = (api: AxiosInstance): void => {
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('token');
      if (token) config.headers.Authorization = `Bearer ${token}`;
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
};
