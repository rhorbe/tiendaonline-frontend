import { useState } from "react";
import AddressForm from "../AddressForm";
import { deleteDireccion } from "@/core/api/perfilApi";
import { PerfilDireccion, PerfilResponse } from "@/core/models/Perfil";
import { formatearDireccion } from "@/core/utils/formatDireccion";

type AddressProps = {
    perfil: PerfilResponse | null;
    onAddressUpdate?: () => void;
};

export default function Address({ perfil, onAddressUpdate }: AddressProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDireccion, setEditingDireccion] = useState<PerfilDireccion | null>(null);
    const [eliminando, setEliminando] = useState<string | null>(null);
    const [mensaje, setMensaje] = useState<{tipo: 'exito' | 'error', texto: string} | null>(null);

    const openModal = (direccion?: PerfilDireccion) => {
        setEditingDireccion(direccion || null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingDireccion(null);
    };

    const handleEliminar = async (id: string) => {
        if (!confirm('¿Estás seguro de que deseas eliminar esta dirección?')) {
            return;
        }

        try {
            setEliminando(id);
            setMensaje(null);
            await deleteDireccion(id);
            setMensaje({tipo: 'exito', texto: 'Dirección eliminada correctamente'});
            onAddressUpdate?.();
        } catch (error) {
            console.error(error);
            setMensaje({tipo: 'error', texto: 'Error al eliminar la dirección'});
        } finally {
            setEliminando(null);
        }
    };

    const direcciones = [...(perfil?.direcciones ?? [])].sort((a, b) => Number(b.esPrincipal) - Number(a.esPrincipal));

    return (
        <div className="w-full py-10 md:py-0 md:px-[72px]">
            {mensaje && (
                <div className={`p-4 rounded-md mb-5 ${mensaje.tipo === 'exito' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {mensaje.texto}
                </div>
            )}
            <div className="space-y-5">
                <p className="text-app-black font-poppins text-xl/7 font-semibold">
                    Direcciones
                </p>
                <button
                    type="button"
                    onClick={() => openModal()}
                    className="px-4 py-2 bg-app-black text-white rounded-md font-inter text-sm font-semibold hover:bg-opacity-90"
                >
                    Agregar nueva dirección
                </button>
            </div>
            <div className="grid md:grid-cols-2 mt-5 gap-6">
                {direcciones.length > 0 ? (
                    direcciones.map((direccion) => (
                        <div key={direccion.id} className="p-4 rounded-lg border border-app-gray space-y-3">
                            <div className="flex items-center justify-between gap-3">
                                <div className="space-y-1">
                                    <p className="text-app-black font-inter text-base/[26px] font-semibold">
                                        {direccion.etiqueta ?? "Dirección"}
                                    </p>
                                    {direccion.esPrincipal && (
                                        <span className="inline-flex w-fit rounded-full bg-app-light-gray px-3 py-1 text-app-black font-inter text-xs font-semibold">
                                            Principal
                                        </span>
                                    )}
                                </div>
                                <div className="flex gap-2 items-center">
                                    <button
                                        type="button"
                                        onClick={() => openModal(direccion)}
                                        className="flex gap-1 items-center"
                                    >
                                        <img src="/images/edit.svg" alt="Editar" className="w-4 h-4 object-contain object-center" />
                                        <p className="text-app-gray font-inter text-base/[26px] font-semibold">
                                            Editar
                                        </p>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleEliminar(direccion.id)}
                                        disabled={eliminando === direccion.id}
                                        className="flex gap-1 items-center ml-2"
                                    >
                                        <img src="/images/trash.svg" alt="Eliminar" className="w-4 h-4 object-contain object-center" />
                                        <p className="text-red-500 font-inter text-base/[26px] font-semibold">
                                            {eliminando === direccion.id ? 'Eliminando...' : 'Eliminar'}
                                        </p>
                                    </button>
                                </div>
                            </div>
                            <div className="text-app font-inter text-sm/[22px] space-y-1">
                                <p>{formatearDireccion(direccion)}</p>
                                {direccion.observaciones && <p>{direccion.observaciones}</p>}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="md:col-span-2 p-4 rounded-lg border border-dashed border-app-gray text-app-gray font-inter text-sm/[22px]">
                        No hay direcciones registradas para esta cuenta.
                    </div>
                )}
            </div>
            <AddressForm
                isOpen={isModalOpen}
                onClose={closeModal}
                direccionEdit={editingDireccion}
                onDireccionSaved={() => {
                    closeModal();
                    onAddressUpdate?.();
                }}
            />
        </div>
    )
}
