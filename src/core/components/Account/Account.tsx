import { useState } from 'react';
import { isAxiosError } from 'axios';
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
            return 'Debes iniciar sesion para activar notificaciones.';
        }

        if (status) {
            return `El servidor rechazo la solicitud de notificaciones (HTTP ${status}).`;
        }

        return 'No hubo respuesta del servidor. Revisa tu conexion e intenta de nuevo.';
    }

    if (error instanceof Error && error.message.trim()) {
        return error.message;
    }

    return 'No se pudo activar la notificacion.';
};

export default function AccountDetails() {
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
            alert(desuscrito ? 'Notificaciones desactivadas' : 'No habia una suscripcion push activa.');
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
                    <input placeholder="First name" type="text" name="firstname" id="firstname"
                           className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md"/>
                </div>
                <div className="space-y-3 w-full">
                    <label htmlFor="lastname" className="text-app-gray font-inter text-sm/3 font-bold uppercase">Apellido</label>
                    <input placeholder="Last name" type="text" name="lastname" id="firstname"
                           className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md"/>
                </div>
                <div className="space-y-3 w-full">
                    <label htmlFor="displayName" className="text-app-gray font-inter text-sm/3 font-bold uppercase">Display
                        Name</label>
                    <input placeholder="Display Name" type="text" name="Display Name" id="Display Name"
                           className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md"/>
                    <p className="text-app-gray font-inter text-xs/5 italic">
                        This will be how your name will be displayed in the account section and in reviews
                    </p>
                </div>
                <div className="space-y-3 w-full">
                    <label htmlFor="email" className="text-app-gray font-inter text-sm/3 font-bold uppercase">Correo Electrónico</label>
                    <input placeholder="Email Address" type="email" name="email" id="email"
                           className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md"/>
                </div>
            </div>
            <div className="space-y-5">
                <p className="text-app-black font-poppins text-xl/7 font-semibold">
                    Contraseña
                </p>
                <div className="space-y-3 w-full">
                    <label htmlFor="oldPassword" className="text-app-gray font-inter text-sm/3 font-bold uppercase">Contraseña actual</label>
                    <input placeholder="Old password" type="text" name="oldPassword" id="oldPassword"
                           className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md"/>
                </div>
                <div className="space-y-3 w-full">
                    <label htmlFor="newPassword" className="text-app-gray font-inter text-sm/3 font-bold uppercase">Nueva Contraseña</label>
                    <input placeholder="new password" type="text" name="newpassword" id="newPassword"
                           className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md"/>
                </div>
                <div className="space-y-3 w-full">
                    <label htmlFor="repeatNewPassword"
                           className="text-app-gray font-inter text-sm/3 font-bold uppercase">Repetir nueva contraseña</label>
                    <input placeholder="Repeat New Password" type="text" name="repeatNewPassword" id="repeatNewPassword"
                           className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md"/>
                </div>
                <div className="space-y-3 w-full">
                    <label htmlFor="email" className="text-app-gray font-inter text-sm/3 font-bold uppercase">Correo electrónico</label>
                    <input placeholder="Email Address" type="email" name="email" id="email"
                           className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md"/>
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
