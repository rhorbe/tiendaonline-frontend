const defaultApiUrl = '/backend';
const rawApiUrl = import.meta.env.VITE_API_URL?.trim() || defaultApiUrl;

// Evita dobles barras al usar endpoints como '/productos'.
export const API_URL = rawApiUrl.replace(/\/$/, '');
