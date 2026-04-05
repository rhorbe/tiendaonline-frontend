import axios, { AxiosInstance } from 'axios';
import { API_URL } from '../config/env';
import { setupInterceptors } from './interceptors';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

setupInterceptors(api);

export default api;