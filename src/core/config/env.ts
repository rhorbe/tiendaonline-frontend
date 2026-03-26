const defaultApiUrl = '/api';

const rawApiUrl = import.meta.env.VITE_API_URL?.trim() || defaultApiUrl;

const isLocalBackendUrl =
  rawApiUrl.startsWith('http://127.0.0.1:8001/api') ||
  rawApiUrl.startsWith('http://localhost:8001/api');

const resolvedApiUrl = import.meta.env.DEV && isLocalBackendUrl ? '/api' : rawApiUrl;

// Evita errores de rutas al componer endpoints con "/recurso".
export const API_URL = resolvedApiUrl.replace(/\/$/, '');
