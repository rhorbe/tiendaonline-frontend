import { AxiosError } from 'axios';

const GENERIC_OFFLINE_MESSAGE =
  'No hay conexión a internet. No es posible continuar hasta recuperar la conexión.';

export const getOfflineBlockingMessage = (actionDescription?: string): string => {
  if (!actionDescription) {
    return GENERIC_OFFLINE_MESSAGE;
  }

  return `No hay conexión a internet. No es posible ${actionDescription} sin conexión.`;
};

export const isOfflineByNavigator = (): boolean => {
  return typeof navigator !== 'undefined' && !navigator.onLine;
};

const hasNoHttpResponse = (error: AxiosError): boolean => {
  return !error.response;
};

export const isOfflineRequestError = (error: unknown): boolean => {
  const axiosError = error as AxiosError;

  if (axiosError?.response?.status) {
    return false;
  }

  if (isOfflineByNavigator()) {
    return true;
  }

  const errorCode = axiosError?.code ?? '';
  const errorMessage = String(axiosError?.message ?? '').toLowerCase();

  return (
    hasNoHttpResponse(axiosError) &&
    (errorCode === 'ERR_NETWORK' ||
      errorMessage.includes('network error') ||
      errorMessage.includes('failed to fetch'))
  );
};

export const getOfflineErrorFromUnknown = (
  error: unknown,
  actionDescription?: string,
): string | null => {
  if (!isOfflineRequestError(error)) {
    return null;
  }

  return getOfflineBlockingMessage(actionDescription);
};

