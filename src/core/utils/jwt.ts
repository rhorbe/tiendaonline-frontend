export interface JWTPayload {
  exp?: number;
  iat?: number;
  [key: string]: unknown;
}

const base64UrlToBase64 = (value: string): string => {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = base64.length % 4;

  if (padding === 0) return base64;

  return base64 + "=".repeat(4 - padding);
};

export const decodeJWT = (token: string): JWTPayload | null => {
  try {
    const parts = token.split(".");

    if (parts.length !== 3) {
      return null;
    }

    const payload = parts[1];
    const json = globalThis.atob(base64UrlToBase64(payload));
    return JSON.parse(json) as JWTPayload;
  } catch {
    return null;
  }
};

export const getTokenExpirationTime = (token: string): number | null => {
  const payload = decodeJWT(token);

  if (!payload?.exp) {
    return null;
  }

  return payload.exp - Math.floor(Date.now() / 1000);
};

export const isTokenExpired = (token: string, bufferSeconds = 0): boolean => {
  const secondsRemaining = getTokenExpirationTime(token);

  if (secondsRemaining === null) {
    return true;
  }

  return secondsRemaining <= bufferSeconds;
};
