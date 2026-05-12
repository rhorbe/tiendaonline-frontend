import {useState, useEffect} from 'react';
import {isAxiosError} from 'axios';
import type {PerfilResponse} from '@/core/models/Perfil';
import Button from "../Button/Button";
import { updatePerfil, changePassword } from '@/core/api/perfilApi';

const obtenerMensajeErrorPush = (error: unknown): string => {
    if (isAxiosError(error)) {
        const status = error.response?.status;
        const backendMessage =
            (error.response?.data as { message?: string } | undefined)?.message?.trim() ||
            (error.response?.data as { detail?: string } | undefined)?.detail?.trim();

        if (backendMessage) {
            return backendMessage;
        }

        if (status === 401 || status === 403) {
            return 'Debes iniciar sesión para activar notificaciones.';
        }

        if (status) {
            return `El servidor rechazó la solicitud de notificaciones (HTTP ${status}).`;
        }

        return 'No hubo respuesta del servidor. Revisa tu conexión e intenta de nuevo.';
    }

    if (error instanceof Error && error.message.trim()) {
        return error.message;
    }

    return 'No se pudo activar la notificación.';
};

const obtenerMensajeError = (error: unknown): string => {
    if (isAxiosError(error)) {
        const backendMessage =
            (error.response?.data as { message?: string } | undefined)?.message?.trim() ||
            (error.response?.data as { detail?: string } | undefined)?.detail?.trim();

        if (backendMessage) {
            return backendMessage;
        }

        return `Error del servidor (HTTP ${error.response?.status}).`;
    }

    if (error instanceof Error && error.message.trim()) {
        return error.message;
    }

    return 'Ocurrió un error inesperado.';
};

type AccountDetailsProps = {
    perfil: PerfilResponse | null;
    onPerfidUpdate?: () => void;
    onPerfilChange?: (perfil: PerfilResponse) => void;
    showDatos?: boolean;
    showPassword?: boolean;
    showNotificaciones?: boolean;
};

export default function AccountDetails({perfil, onPerfidUpdate, onPerfilChange, showDatos = true, showPassword = true, showNotificaciones = true}: AccountDetailsProps) {
    const [activandoPush, setActivandoPush] = useState(false);
    const [desactivandoPush, setDesactivandoPush] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
    const [checkingSubscription, setCheckingSubscription] = useState(true);
    const [guardandoDatos, setGuardandoDatos] = useState(false);
    const [nombre, setNombre] = useState(perfil?.name ?? '');
    const [apellido, setApellido] = useState(perfil?.last_name ?? '');
    const [contrasenaActual, setContrasenaActual] = useState('');
    const [contrasenaNueva, setContrasenaNueva] = useState('');
    const [contrasenaRepetida, setContrasenaRepetida] = useState('');
    const [mensaje, setMensaje] = useState<{tipo: 'exito' | 'error', texto: string} | null>(null);

    // Sincronizar campos cuando cambia el perfil prop
    useEffect(() => {
        setNombre(perfil?.name ?? '');
        setApellido(perfil?.last_name ?? '');
    }, [perfil]);

    // Comprobar si hay suscripción push activa
    useEffect(() => {
        let mounted = true;

        const check = async () => {
            try {
                setCheckingSubscription(true);

                if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
                    if (mounted) setIsSubscribed(false);
                    return;
                }

                const registration = await navigator.serviceWorker.ready;
                const subscription = await registration.pushManager.getSubscription();
                if (mounted) setIsSubscribed(Boolean(subscription));
            } catch (err) {
                console.error('Error comprobando suscripción push', err);
                if (mounted) setIsSubscribed(false);
            } finally {
                if (mounted) setCheckingSubscription(false);
            }
        };

        void check();

        return () => { mounted = false };
    }, []);

    const handleActivarNotificaciones = async (): Promise<boolean> => {
        if (activandoPush) {
            return false;
        }

        try {
            setActivandoPush(true);
            const {suscribirseAPush} = await import('@/app/push/subscribeBrowserToPush');
            const subscription = await suscribirseAPush();
            // si devuelve una suscripción la consideramos activada
            if (subscription) {
                setIsSubscribed(true);
            }
            setMensaje({tipo: 'exito', texto: 'Notificaciones activadas'});
            return true;
        } catch (error) {
            console.error(error);
            setMensaje({tipo: 'error', texto: obtenerMensajeErrorPush(error)});
            return false;
        } finally {
            setActivandoPush(false);
        }
    };

    const handleDesactivarNotificaciones = async (): Promise<boolean> => {
        if (desactivandoPush) {
            return false;
        }

        try {
            setDesactivandoPush(true);
            const {desuscribirseDePush} = await import('@/app/push/unsubscribeBrowserFromPush');
            const desuscrito = await desuscribirseDePush();
            if (desuscrito) {
                setIsSubscribed(false);
                setMensaje({tipo: 'exito', texto: 'Notificaciones desactivadas'});
            } else {
                setIsSubscribed(false);
                setMensaje({tipo: 'exito', texto: 'No había una suscripción push activa.'});
            }
            return true;
        } catch (error) {
            console.error(error);
            setMensaje({tipo: 'error', texto: obtenerMensajeErrorPush(error)});
            return false;
        } finally {
            setDesactivandoPush(false);
        }
    };

    const handleToggleNotificaciones = async (enabled: boolean) => {
        if (checkingSubscription || activandoPush || desactivandoPush) {
            return;
        }

        const estadoAnterior = isSubscribed;

        setIsSubscribed(enabled);

        const success = enabled
            ? await handleActivarNotificaciones()
            : await handleDesactivarNotificaciones();

        if (!success) {
            setIsSubscribed(estadoAnterior);
        }
    };

    const handleGuardarDatos = async () => {
        if (guardandoDatos) {
            return;
        }

        try {
            setGuardandoDatos(true);
            setMensaje(null);

            // Validar que al menos un campo haya cambiado
            const nombreCambio = nombre !== (perfil?.name ?? '');
            const apellidoCambio = apellido !== (perfil?.last_name ?? '');

            if (nombreCambio || apellidoCambio) {
                const actualizado = await updatePerfil({
                    name: nombre,
                    last_name: apellido || undefined,
                });

                // Actualizar inmediatamente la vista con la respuesta del backend si está disponible
                if (actualizado) {
                    const perfilActualizado = {
                        ...(perfil ?? actualizado),
                        ...actualizado,
                    };

                    setNombre(perfilActualizado.name);
                    setApellido(perfilActualizado.last_name ?? '');
                    onPerfilChange?.(perfilActualizado);
                } else {
                    onPerfidUpdate?.();
                }
            } else {
                // Si no hubo cambios en nombre/apellido simplemente forzamos recarga si hace falta
                onPerfidUpdate?.();
            }

            setMensaje({tipo: 'exito', texto: 'Datos actualizados correctamente'});
        } catch (error) {
            console.error(error);
            setMensaje({tipo: 'error', texto: obtenerMensajeError(error)});
        } finally {
            setGuardandoDatos(false);
        }
    };

    const handleCambiarContrasena = async () => {
        if (guardandoDatos || !contrasenaActual || !contrasenaNueva || !contrasenaRepetida) {
            if (!contrasenaActual || !contrasenaNueva || !contrasenaRepetida) {
                setMensaje({tipo: 'error', texto: 'Completa todos los campos de contraseña'});
            }
            return;
        }

        if (contrasenaNueva !== contrasenaRepetida) {
            setMensaje({tipo: 'error', texto: 'Las contraseñas nuevas no coinciden'});
            return;
        }

        if (contrasenaNueva.length < 8) {
            setMensaje({tipo: 'error', texto: 'La contraseña debe tener al menos 8 caracteres'});
            return;
        }

        try {
            setGuardandoDatos(true);
            await changePassword({
                current_password: contrasenaActual,
                new_password: contrasenaNueva,
                new_password_confirmation: contrasenaRepetida,
            });

            setMensaje({tipo: 'exito', texto: 'Contraseña actualizada correctamente'});
            setContrasenaActual('');
            setContrasenaNueva('');
            setContrasenaRepetida('');
        } catch (error) {
            console.error(error);
            setMensaje({tipo: 'error', texto: obtenerMensajeError(error)});
        } finally {
            setGuardandoDatos(false);
        }
    };

    return (
        <form className="space-y-10 w-full py-10 md:py-0 md:px-[72px]" onSubmit={(e) => e.preventDefault()}>
            {mensaje && (
                <div className={`p-4 rounded-md ${mensaje.tipo === 'exito' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {mensaje.texto}
                </div>
            )}
            {showDatos && (
                <div className="space-y-5">
                    <p className="text-app-black font-poppins text-xl/7 font-semibold">Datos del usuario</p>

                    <div className="space-y-3 w-full">
                        <label htmlFor="email" className="text-app-gray font-inter text-sm/3 font-bold uppercase">Correo Electrónico</label>
                        <input
                            placeholder="Correo electrónico"
                            type="email"
                            name="email"
                            id="email"
                            value={perfil?.email ?? ''}
                            disabled
                            className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
                        />
                    </div>
                    <div className="space-y-3 w-full">
                        <label htmlFor="firstname" className="text-app-gray font-inter text-sm/3 font-bold uppercase">Nombre</label>
                        <input
                            placeholder="Nombre"
                            type="text"
                            name="firstname"
                            id="firstname"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md"
                        />
                    </div>
                    <div className="space-y-3 w-full">
                        <label htmlFor="lastname" className="text-app-gray font-inter text-sm/3 font-bold uppercase">Apellido</label>
                        <input
                            placeholder="Apellido"
                            type="text"
                            name="lastname"
                            id="lastname"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                            className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md"
                        />
                    </div>

                    <div className="flex gap-3 items-center pt-5">
                        <Button
                            text={guardandoDatos ? 'Guardando...' : 'Guardar cambios'}
                            className="max-w-fit"
                            onClick={handleGuardarDatos}
                            disabled={guardandoDatos || activandoPush || desactivandoPush}
                        />
                    </div>
                </div>
            )}

            {showPassword && (
                <div className="space-y-5">
                    <p className="text-app-black font-poppins text-xl/7 font-semibold">Contraseña</p>
                    <div className="space-y-3 w-full">
                        <label htmlFor="oldPassword" className="text-app-gray font-inter text-sm/3 font-bold uppercase">Contraseña actual</label>
                        <input
                            placeholder="Contraseña actual"
                            type="password"
                            name="oldPassword"
                            id="oldPassword"
                            value={contrasenaActual}
                            onChange={(e) => setContrasenaActual(e.target.value)}
                            className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md"
                        />
                    </div>
                    <div className="space-y-3 w-full">
                        <label htmlFor="newPassword" className="text-app-gray font-inter text-sm/3 font-bold uppercase">Nueva contraseña</label>
                        <input
                            placeholder="Nueva contraseña"
                            type="password"
                            name="newpassword"
                            id="newPassword"
                            value={contrasenaNueva}
                            onChange={(e) => setContrasenaNueva(e.target.value)}
                            className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md"
                        />
                    </div>
                    <div className="space-y-3 w-full">
                        <label htmlFor="repeatNewPassword" className="text-app-gray font-inter text-sm/3 font-bold uppercase">Repetir nueva contraseña</label>
                        <input
                            placeholder="Repetir nueva contraseña"
                            type="password"
                            name="repeatNewPassword"
                            id="repeatNewPassword"
                            value={contrasenaRepetida}
                            onChange={(e) => setContrasenaRepetida(e.target.value)}
                            className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md"
                        />
                    </div>

                    <div className="flex gap-3 items-center pt-5">
                        <Button
                            text={guardandoDatos ? 'Actualizando...' : 'Cambiar contraseña'}
                            className="max-w-fit"
                            onClick={handleCambiarContrasena}
                            disabled={guardandoDatos || activandoPush || desactivandoPush}
                        />
                    </div>
                </div>
            )}

            {showNotificaciones && (
                <div className="space-y-5">
                    <p className="text-app-black font-poppins text-xl/7 font-semibold">Notificaciones</p>

                    <div className="flex items-center justify-between gap-4 rounded-lg border border-muted-gray px-4 py-3">
                        <div>
                            <div className="text-app-black font-inter text-sm font-semibold">Recibir notificaciones del sitio</div>
                            <div className="text-app-gray font-inter text-xs mt-1">
                                {checkingSubscription
                                    ? 'Comprobando estado...'
                                    : isSubscribed
                                        ? 'Las notificaciones están activadas.'
                                        : 'Las notificaciones están desactivadas.'}
                            </div>
                        </div>

                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={Boolean(isSubscribed)}
                                onChange={(e) => void handleToggleNotificaciones(e.target.checked)}
                                disabled={checkingSubscription || activandoPush || desactivandoPush || guardandoDatos}
                            />
                            <span className="w-12 h-7 bg-app-gray rounded-full peer peer-focus:ring-2 peer-focus:ring-app-black/30 peer-checked:bg-green-600 transition-colors"></span>
                            <span className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5"></span>
                        </label>
                    </div>
                </div>
            )}
        </form>
    )
}
