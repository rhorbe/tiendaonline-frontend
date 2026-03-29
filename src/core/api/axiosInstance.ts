import axios, { AxiosInstance } from 'axios';
// import { API_URL } from '../config/env';
import { setupInterceptors } from './interceptors';

const api: AxiosInstance = axios.create({
  // baseURL: API_URL,
  baseURL: 'https://tiendaonline-backend-git-dev-rhorbes-projects.vercel.app/backend',
  headers: { 'Content-Type': 'application/json' },
});

setupInterceptors(api);

export default api;