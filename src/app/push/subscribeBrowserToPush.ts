import {
    fetchVapidPublicKey,
    guardarSuscripcionEnBackend,
    vapidPublicKeyToUint8Array,
} from '@/core/api/pushApi';
import {registrarServiceWorker} from '@/app/registerServiceWorker';

export async function pedirPermisoNotificaciones(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
        throw new Error('Este navegador no soporta notificaciones.');
    }

    if (Notification.permission === 'granted') {
        return 'granted';
    }

    const permission = await Notification.requestPermission();
    console.warn('Permiso de notificaciones solicitado, resultado:', permission);
    if (permission !== 'granted') {
        throw new Error('Permiso de notificaciones no concedido.');
    }

    return permission;
}

export async function suscribirseAPush(): Promise<PushSubscription> {
    if (!('PushManager' in window)) {
        throw new Error('Este navegador no soporta Push API.');
    }

    const registration = await registrarServiceWorker();
    if (!registration) {
        throw new Error('No fue posible registrar el service worker para push.');
    }
    await pedirPermisoNotificaciones();

    const publicKey = await fetchVapidPublicKey();

    const existingSubscription = await registration.pushManager.getSubscription();

    console.warn('existingSubscription', existingSubscription);

    if (existingSubscription) {
        await guardarSuscripcionEnBackend(existingSubscription);
        console.warn('guardarSuscripcionEnBackend realizada')

        return existingSubscription;
    }

    console.warn('existingSubscription salteada')

    const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapidPublicKeyToUint8Array(publicKey),
    });
    console.warn('subscription realizada')

    await guardarSuscripcionEnBackend(subscription);
    console.warn('subscription');
    return subscription;
}

