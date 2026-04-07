const isLocalhost =
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export async function registrarServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!('serviceWorker' in navigator)) {
    throw new Error('Este navegador no soporta service workers');
  }

  // En prod exige contexto seguro; en local permite http para desarrollo.
  if (!window.isSecureContext && !isLocalhost) {
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    return registration;
  } catch (error) {
    console.error('No se pudo registrar el service worker', error);
    return null;
  }
}

