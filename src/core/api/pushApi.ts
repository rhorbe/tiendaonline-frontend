import api from './axiosInstance';

const VAPID_PUBLIC_KEY_ENDPOINT = '/webpush/vapid-public-key';
const PUSH_SUBSCRIBE_ENDPOINT = '/push/subscribe';

let cachedVapidPublicKey: string | null = null;

const VAPID_KEY_CANDIDATE_PATHS: ReadonlyArray<ReadonlyArray<string>> = [
  ['publicKey'],
  ['vapidPublicKey'],
  ['key'],
  ['vapidKey'],
  ['data', 'publicKey'],
  ['data', 'vapidPublicKey'],
  ['result', 'publicKey'],
  ['payload', 'publicKey'],
];

const isObjectRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};

const readTrimmedString = (value: unknown): string | null => {
  if (typeof value !== 'string') {
    return null;
  }

  const normalized = value.trim();
  return normalized ? normalized : null;
};

const getValueFromPath = (payload: unknown, path: ReadonlyArray<string>): unknown => {
  return path.reduce<unknown>((current, segment) => {
    if (!isObjectRecord(current)) {
      return undefined;
    }

    return current[segment];
  }, payload);
};

const extractVapidPublicKey = (payload: unknown): string | null => {
  const directValue = readTrimmedString(payload);
  if (directValue) {
    return directValue;
  }

  for (const path of VAPID_KEY_CANDIDATE_PATHS) {
    const candidate = readTrimmedString(getValueFromPath(payload, path));
    if (candidate) {
      return candidate;
    }
  }

  return null;
};

const isBase64Url = (value: string): boolean => {
  return /^[A-Za-z0-9_-]+$/.test(value);
};

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

  const response = await api.get<unknown>(VAPID_PUBLIC_KEY_ENDPOINT);
  const publicKey = extractVapidPublicKey(response.data);

  if (!publicKey) {
    throw new Error('La API no devolvió una clave VAPID publica válida.');
  }

  if (!isBase64Url(publicKey)) {
    throw new Error('La API devolvió una clave VAPID con formato inválido.');
  }

  cachedVapidPublicKey = publicKey;
  return publicKey;
};

export const guardarSuscripcionEnBackend = async (subscription: PushSubscription): Promise<void> => {
  const payload = serializePushSubscription(subscription);

  if (!payload.endpoint || !payload.keys?.auth || !payload.keys?.p256dh) {
    throw new Error('La suscripción push no es valida para enviarla al backend.');
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
