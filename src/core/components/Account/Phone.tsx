import { useState } from 'react';
import { isAxiosError } from 'axios';
import type { PerfilResponse } from '@/core/models/Perfil';
import Button from "../Button/Button";
import { updatePhone } from '@/core/api/perfilApi';

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

type PhoneProps = {
    perfil: PerfilResponse | null;
    onPhoneUpdate?: () => void;
};

export default function Phone({ perfil, onPhoneUpdate }: PhoneProps) {
    const [telefono, setTelefono] = useState(perfil?.telefono ?? '');
    const [guardando, setGuardando] = useState(false);
    const [mensaje, setMensaje] = useState<{tipo: 'exito' | 'error', texto: string} | null>(null);

    const handleGuardar = async () => {
        if (guardando) {
            return;
        }

        if (!telefono.trim()) {
            setMensaje({tipo: 'error', texto: 'El número de teléfono no puede estar vacío'});
            return;
        }

        try {
            setGuardando(true);
            setMensaje(null);

            await updatePhone({
                telefono: telefono,
            });

            setMensaje({tipo: 'exito', texto: 'Teléfono actualizado correctamente'});
            onPhoneUpdate?.();
        } catch (error) {
            console.error(error);
            setMensaje({tipo: 'error', texto: obtenerMensajeError(error)});
        } finally {
            setGuardando(false);
        }
    };

    return (
        <div className="w-full space-y-10 py-10 md:py-0 md:px-[72px]">
            {mensaje && (
                <div className={`p-4 rounded-md ${mensaje.tipo === 'exito' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {mensaje.texto}
                </div>
            )}
            <div className="space-y-5">
                <p className="text-app-black font-poppins text-xl/7 font-semibold">
                    Teléfono
                </p>
            </div>
            <div className="space-y-3 w-full max-w-md">
                <label htmlFor="phone" className="text-app-gray font-inter text-sm/3 font-bold uppercase">
                    Número de teléfono
                </label>
                <input
                    placeholder="Número de teléfono"
                    type="tel"
                    name="phone"
                    id="phone"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md"
                />
            </div>
            <div className="flex gap-3 items-center">
                <Button
                    text={guardando ? 'Guardando...' : 'Guardar teléfono'}
                    className="max-w-fit"
                    onClick={handleGuardar}
                    disabled={guardando}
                />
            </div>
        </div>
    )
}

