import { useState } from 'react';
import { isAxiosError } from 'axios';
import type { PerfilResponse } from '@/core/models/Perfil';
import Button from "../Button/Button";

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

type AccountDetailsProps = {
    perfil: PerfilResponse | null;
};

export default function AccountDetails({ perfil }: AccountDetailsProps) {
    const [activandoPush, setActivandoPush] = useState(false);
    const [desactivandoPush, setDesactivandoPush] = useState(false);

    const handleActivarNotificaciones = async () => {
        if (activandoPush) {
            return;
        }

        try {
            setActivandoPush(true);
            const { suscribirseAPush } = await import('@/app/push/subscribeBrowserToPush');
            await suscribirseAPush();
            alert('Notificaciones activadas');
        } catch (error) {
            console.error(error);
            alert(obtenerMensajeErrorPush(error));
        } finally {
            setActivandoPush(false);
        }
    };

    const handleDesactivarNotificaciones = async () => {
        if (desactivandoPush) {
            return;
        }

        try {
            setDesactivandoPush(true);
            const { desuscribirseDePush } = await import('@/app/push/unsubscribeBrowserFromPush');
            const desuscrito = await desuscribirseDePush();
            alert(desuscrito ? 'Notificaciones desactivadas' : 'No había una suscripción push activa.');
        } catch (error) {
            console.error(error);
            alert(obtenerMensajeErrorPush(error));
        } finally {
            setDesactivandoPush(false);
        }
    };

    return (
        <form className="space-y-10 w-full py-10 md:py-0 md:px-[72px]">
            <div className="space-y-5">
                <p className="text-app-black font-poppins text-xl/7 font-semibold">
                    Información de contacto
                </p>
                <div className="space-y-3 w-full">
                    <label htmlFor="firstname"
                           className="text-app-gray font-inter text-sm/3 font-bold uppercase">Nombre</label>
                    <input
                        placeholder="Nombre"
                        type="text"
                        name="firstname"
                        id="firstname"
                        value={perfil?.name ?? ''}
                        readOnly
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
                        value={perfil?.last_name ?? ''}
                        readOnly
                        className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md"
                    />
                </div>
                <div className="space-y-3 w-full">
                    <label htmlFor="email" className="text-app-gray font-inter text-sm/3 font-bold uppercase">Correo Electrónico</label>
                    <input
                        placeholder="Correo electrónico"
                        type="email"
                        name="email"
                        id="email"
                        value={perfil?.email ?? ''}
                        readOnly
                        className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md"
                    />
                </div>
            </div>
            <div className="space-y-5">
                <p className="text-app-black font-poppins text-xl/7 font-semibold">
                    Contraseña
                </p>
                <div className="space-y-3 w-full">
                    <label htmlFor="oldPassword" className="text-app-gray font-inter text-sm/3 font-bold uppercase">Contraseña actual</label>
                    <input placeholder="Contraseña actual" type="text" name="oldPassword" id="oldPassword"
                           className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md"/>
                </div>
                <div className="space-y-3 w-full">
                    <label htmlFor="newPassword" className="text-app-gray font-inter text-sm/3 font-bold uppercase">Nueva contraseña</label>
                    <input placeholder="Nueva contraseña" type="text" name="newpassword" id="newPassword"
                           className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md"/>
                </div>
                <div className="space-y-3 w-full">
                    <label htmlFor="repeatNewPassword"
                           className="text-app-gray font-inter text-sm/3 font-bold uppercase">Repetir nueva contraseña</label>
                    <input placeholder="Repetir nueva contraseña" type="text" name="repeatNewPassword" id="repeatNewPassword"
                           className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md"/>
                </div>
                <div className="space-y-3 w-full">
                    <label htmlFor="email" className="text-app-gray font-inter text-sm/3 font-bold uppercase">Correo electrónico</label>
                    <input
                        placeholder="Correo electrónico"
                        type="email"
                        name="passwordEmail"
                        id="passwordEmail"
                        value={perfil?.email ?? ''}
                        readOnly
                        className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md"
                    />
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <Button
                    text={activandoPush ? 'Activando...' : 'Activar notificaciones'}
                    className="max-w-fit"
                    onClick={handleActivarNotificaciones}
                    disabled={activandoPush || desactivandoPush}
                />
                <Button
                    text={desactivandoPush ? 'Desactivando...' : 'Desactivar notificaciones'}
                    className="max-w-fit"
                    onClick={handleDesactivarNotificaciones}
                    disabled={activandoPush || desactivandoPush}
                />
                <Button text="Guardar cambios" className="max-w-fit"/>
            </div>
        </form>
    )
}
