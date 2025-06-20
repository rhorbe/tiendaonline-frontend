import axios, { AxiosInstance } from 'axios';
import { API_URL } from '../config/env';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// opcional: interceptores
import './interceptors';

export default api;