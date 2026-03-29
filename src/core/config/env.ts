// export const API_URL = import.meta.env.VITE_API_URL as string;

const defaultApiUrl = '/backend';

const rawApiUrl = import.meta.env.VITE_API_URL?.trim() || defaultApiUrl;

const isLocalBackendUrl =
  rawApiUrl.startsWith('http://127.0.0.1:8000/backend') ||
  rawApiUrl.startsWith('http://localhost:8000/backend');

const resolvedApiUrl = import.meta.env.DEV && isLocalBackendUrl ? '/backend' : rawApiUrl;

// Evita errores de rutas al componer endpoints con "/recurso".
export const API_URL = resolvedApiUrl.replace(/\/$/, '');
