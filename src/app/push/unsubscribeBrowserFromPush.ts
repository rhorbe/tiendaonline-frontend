import { eliminarSuscripcionEnBackend } from '@/core/api/pushApi';

export async function desuscribirseDePush(): Promise<boolean> {
  if (!('PushManager' in window) || !('serviceWorker' in navigator)) {
    throw new Error('Este navegador no soporta Push API.');
  }

  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();

  if (!subscription) {
    return false;
  }

  await eliminarSuscripcionEnBackend(subscription);

  const unsubscribed = await subscription.unsubscribe();
  if (!unsubscribed) {
    throw new Error('No fue posible eliminar la suscripción push del navegador.');
  }

  return true;
}

