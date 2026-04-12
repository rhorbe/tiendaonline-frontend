import { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getOfflineBlockingMessage, isOfflineRequestError } from './networkError';

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
      if (isOfflineRequestError(err)) {
        err.message = getOfflineBlockingMessage('completar esta accion');
      }

      if (err.response?.status === 401) {
        localStorage.removeItem('token');
      }
      return Promise.reject(err);
    }
  );
};
