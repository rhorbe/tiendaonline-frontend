import {
    fetchVapidPublicKey,
    guardarSuscripcionEnBackend,
    vapidPublicKeyToUint8Array,
} from '@/core/api/pushApi';
import {registrarServiceWorker} from '@/app/registerServiceWorker';

const PUSH_SERVICE_ERROR_REGEX = /push service error/i;

function esErrorRecuperableDeServicioPush(error: unknown): error is DOMException {
    return error instanceof DOMException && PUSH_SERVICE_ERROR_REGEX.test(error.message);
}

function mapearErrorSuscripcionPush(error: unknown): Error {
    if (error instanceof DOMException) {
        if (error.name === 'NotAllowedError') {
            return new Error('El navegador bloqueó la suscripción push. Revisa permisos de notificaciones.');
        }

        if (error.name === 'InvalidStateError') {
            return new Error('El service worker no está activo o no se puede usar para push todavía.');
        }

        if (error.name === 'AbortError') {
            return new Error('El servicio push del navegador rechazó la suscripción. Intenta nuevamente.');
        }

        return new Error(`No se pudo crear la suscripción push (${error.name}): ${error.message}`);
    }

    return new Error('No se pudo crear la suscripción push por un error inesperado.' + error);
}

function convertirClaveVapid(publicKey: string): Uint8Array {
    const vapidKey = vapidPublicKeyToUint8Array(publicKey);

    // Para Web Push, una clave pública P-256 suele tener 65 bytes descomprimidos.
    if (vapidKey.length !== 65) {
        throw new Error('La clave VAPID pública recibida no tiene un tamaño válido.');
    }

    return vapidKey;
}

async function obtenerClaveAplicacionPush(forceRefresh = false): Promise<Uint8Array> {
    const publicKey = await fetchVapidPublicKey(forceRefresh);
    return convertirClaveVapid(publicKey);
}

async function suscribirYGuardar(
    pushManager: PushManager,
    applicationServerKey: Uint8Array,
): Promise<PushSubscription> {
    const normalizedApplicationServerKey = new Uint8Array(applicationServerKey);

    const subscription = await pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: normalizedApplicationServerKey,
    });
    await guardarSuscripcionEnBackend(subscription);
    return subscription;
}

export async function pedirPermisoNotificaciones(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
        throw new Error('Este navegador no soporta notificaciones.');
    }

    if (Notification.permission === 'granted') {
        return 'granted';
    }

    const permission = await Notification.requestPermission();
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

    const readyRegistration = await navigator.serviceWorker.ready;
    const pushManager = readyRegistration.pushManager;

    const existingSubscription = await pushManager.getSubscription();

    if (existingSubscription) {
        await guardarSuscripcionEnBackend(existingSubscription);

        return existingSubscription;
    }

    const applicationServerKey = await obtenerClaveAplicacionPush();

    try {
        return await suscribirYGuardar(pushManager, applicationServerKey);
    } catch (error) {
        if (!esErrorRecuperableDeServicioPush(error)) {
            throw mapearErrorSuscripcionPush(error);
        }

        const refreshedApplicationServerKey = await obtenerClaveAplicacionPush(true);

        try {
            return await suscribirYGuardar(pushManager, refreshedApplicationServerKey);
        } catch (retryError) {
            throw mapearErrorSuscripcionPush(retryError);
        }
    }
}
