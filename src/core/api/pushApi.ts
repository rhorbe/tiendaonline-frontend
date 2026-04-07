import api from './axiosInstance';

interface VapidPublicKeyResponse {
  publicKey?: string;
}

const VAPID_PUBLIC_KEY_ENDPOINT = '/webpush/vapid-public-key';
const PUSH_SUBSCRIBE_ENDPOINT = '/push/subscribe';

let cachedVapidPublicKey: string | null = null;

const getCsrfToken = (): string => {
  if (typeof document === 'undefined') {
    return '';
  }

  const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute('content')
    ?.trim();

  return csrfToken ?? '';
};

const serializePushSubscription = (subscription: PushSubscription): PushSubscriptionJSON => {
  return subscription.toJSON();
};

export const fetchVapidPublicKey = async (forceRefresh = false): Promise<string> => {
  if (!forceRefresh && cachedVapidPublicKey) {
    return cachedVapidPublicKey;
  }

  const response = await api.get<VapidPublicKeyResponse>(VAPID_PUBLIC_KEY_ENDPOINT);
  const publicKey = response.data.publicKey?.trim();

  if (!publicKey) {
    throw new Error('La API no devolvio una clave VAPID publica valida.');
  }

  cachedVapidPublicKey = publicKey;
  return publicKey;
};

export const guardarSuscripcionEnBackend = async (subscription: PushSubscription): Promise<void> => {
  const payload = serializePushSubscription(subscription);

  if (!payload.endpoint || !payload.keys?.auth || !payload.keys?.p256dh) {
    throw new Error('La suscripcion push no es valida para enviarla al backend.');
  }

  const csrfToken = getCsrfToken();

  await api.post(PUSH_SUBSCRIBE_ENDPOINT, payload, {
    headers: csrfToken ? { 'X-CSRF-TOKEN': csrfToken } : undefined,
  });
};

export const vapidPublicKeyToUint8Array = (publicKey: string): Uint8Array => {
  const padding = '='.repeat((4 - (publicKey.length % 4)) % 4);
  const base64 = (publicKey + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);

  return Uint8Array.from(rawData, (char) => char.charCodeAt(0));
};
