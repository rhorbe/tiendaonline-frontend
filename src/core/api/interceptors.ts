import { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getOfflineBlockingMessage, isOfflineRequestError } from './networkError';
import { isTokenExpired } from '@/core/utils/jwt';

let onUnauthorized: (() => void) | null = null;

export const setUnauthorizedHandler = (handler: (() => void) | null): void => {
  onUnauthorized = handler;
};

export const setupInterceptors = (api: AxiosInstance): void => {
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('token');

      if (!token) {
        localStorage.removeItem('user');
        return config;
      }

      if (isTokenExpired(token, 30)) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        onUnauthorized?.();
        return Promise.reject(new Error('Token expirado'));
      }

      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (err) => Promise.reject(err)
  );

  api.interceptors.response.use(
    (res: AxiosResponse) => res,
    (err) => {
      if (isOfflineRequestError(err)) {
        err.message = getOfflineBlockingMessage('completar esta acción');
      }

      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        onUnauthorized?.();
      }
      return Promise.reject(err);
    }
  );
};
