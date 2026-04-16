import api from './axiosInstance';

const VAPID_PUBLIC_KEY_ENDPOINT = '/push/public-key';
const PUSH_SUBSCRIBE_ENDPOINT = '/push/subscribe';
const PUSH_UNSUBSCRIBE_ENDPOINT = '/push/unsubscribe';

let cachedVapidPublicKey: string | null = null;

const VAPID_KEY_CANDIDATE_PATHS: ReadonlyArray<ReadonlyArray<string>> = [
  ['publicKey'],
  ['vapidPublicKey'],
  ['vapid_public_key'],
  ['key'],
  ['vapidKey'],
  ['data', 'publicKey'],
  ['data', 'vapidPublicKey'],
  ['data', 'vapid_public_key'],
  ['result', 'publicKey'],
  ['result', 'vapid_public_key'],
  ['payload', 'publicKey'],
  ['payload', 'vapid_public_key'],
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
  console.log('Serializando suscripción push para enviarla al backend...', subscription);
  const payload = serializePushSubscription(subscription);
  console.log('Payload serializado de la suscripción push:', payload);
  if (!payload.endpoint || !payload.keys?.auth || !payload.keys?.p256dh) {
    throw new Error('La suscripción push no es valida para enviarla al backend.');
  }
  console.log('Enviando suscripción push al backend para guardarla...', payload);
  await api.post(PUSH_SUBSCRIBE_ENDPOINT, payload);
  console.log('Suscripción push enviada al backend exitosamente.');
};

export const eliminarSuscripcionEnBackend = async (subscription: PushSubscription): Promise<void> => {
  const payload = serializePushSubscription(subscription);
  const endpoint = payload.endpoint?.trim();

  if (!endpoint) {
    throw new Error('No se encontro el endpoint de la suscripción push para eliminarla.');
  }

  await api.delete(PUSH_UNSUBSCRIBE_ENDPOINT, {
    data: { endpoint },
  });
};

export const vapidPublicKeyToUint8Array = (publicKey: string): Uint8Array<ArrayBuffer> => {
  const padding = '='.repeat((4 - (publicKey.length % 4)) % 4);
  const base64 = (publicKey + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  console.log('Clave VAPID pública convertida a Uint8Array:', rawData);

  // Fuerza un buffer ArrayBuffer concreto para cumplir BufferSource en libs DOM nuevas.
  const bytes = Uint8Array.from(rawData, (char) => char.charCodeAt(0));
  return new Uint8Array(bytes);
};
