import { useState } from "react";
import AddressForm from "../AddressForm";

type PerfilDireccion = {
    id: string;
    etiqueta: string | null;
    calle: string;
    numero: string;
    piso: string | null;
    departamento: string | null;
    ciudad: string;
    provincia: string;
    codigoPostal: string;
    pais: string;
    observaciones: string | null;
    esPrincipal: boolean;
};

type PerfilResponse = {
    direcciones: PerfilDireccion[];
};

type AddressProps = {
    perfil: PerfilResponse | null;
};

const formatDireccion = (direccion: PerfilDireccion): string => {
    const parts = [
        direccion.calle,
        direccion.numero,
        direccion.piso ? `Piso ${direccion.piso}` : null,
        direccion.departamento ? `Dpto. ${direccion.departamento}` : null,
        direccion.ciudad,
        direccion.provincia,
        direccion.codigoPostal,
        direccion.pais,
    ].filter((part): part is string => Boolean(part));

    return parts.join(", ");
};

export default function Address({ perfil }: AddressProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const direcciones = [...(perfil?.direcciones ?? [])].sort((a, b) => Number(b.esPrincipal) - Number(a.esPrincipal));

    return (
        <div className="w-full py-10 md:py-0 md:px-[72px]">
            <div className="space-y-5">
                <p className="text-app-black font-poppins text-xl/7 font-semibold">
                    Direcciones guardadas
                </p>
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
                                <button type="button" onClick={openModal} className="flex gap-1 items-center">
                                    <img src="/images/edit.svg" alt="Editar" className="w-4 h-4 object-contain object-center" />
                                    <p className="text-app-gray font-inter text-base/[26px] font-semibold">
                                        Editar
                                    </p>
                                </button>
                            </div>
                            <div className="text-app font-inter text-sm/[22px] space-y-1">
                                <p>{formatDireccion(direccion)}</p>
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
            <AddressForm isOpen={isModalOpen} onClose={closeModal} />
        </div>
    )
}
