const defaultApiUrl = 'http://127.0.0.1:8001/api';

const rawApiUrl = import.meta.env.VITE_API_URL?.trim() || defaultApiUrl;

// Evita errores de rutas al componer endpoints con "/recurso".
export const API_URL = rawApiUrl.replace(/\/$/, '');
