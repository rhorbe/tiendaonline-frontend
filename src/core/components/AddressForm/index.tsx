import Button from "../Button/Button";
import { FC, useEffect, useState } from "react";
import { createDireccion, updateDireccion } from "@/core/api/perfilApi";
import { PerfilDireccion } from "@/core/models/Perfil";
import { isAxiosError } from "axios";
import "../custom-scrollbar.css";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    direccionEdit?: PerfilDireccion | null;
    onDireccionSaved?: () => void;
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

const AddressForm: FC<ModalProps> = ({ isOpen, onClose, direccionEdit, onDireccionSaved }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [guardando, setGuardando] = useState(false);
    const [mensaje, setMensaje] = useState<{tipo: 'exito' | 'error', texto: string} | null>(null);

    const [etiqueta, setEtiqueta] = useState('');
    const [calle, setCalle] = useState('');
    const [numero, setNumero] = useState('');
    const [piso, setPiso] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [provincia, setProvincia] = useState('');
    const [codigoPostal, setCodigoPostal] = useState('');
    const [pais, setPais] = useState('');
    const [observaciones, setObservaciones] = useState('');
    const [esPrincipal, setEsPrincipal] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            if (direccionEdit) {
                setEtiqueta(direccionEdit.etiqueta || '');
                setCalle(direccionEdit.calle);
                setNumero(direccionEdit.numero);
                setPiso(direccionEdit.piso || '');
                setDepartamento(direccionEdit.departamento || '');
                setCiudad(direccionEdit.ciudad);
                setProvincia(direccionEdit.provincia);
                setCodigoPostal(direccionEdit.codigo_postal || direccionEdit.codigoPostal || '');
                setPais(direccionEdit.pais);
                setObservaciones(direccionEdit.observaciones || '');
                setEsPrincipal(direccionEdit.es_principal ?? direccionEdit.esPrincipal ?? false);
            } else {
                // Resetear el formulario para nueva dirección
                setEtiqueta('');
                setCalle('');
                setNumero('');
                setPiso('');
                setDepartamento('');
                setCiudad('');
                setProvincia('');
                setCodigoPostal('');
                setPais('');
                setObservaciones('');
                setEsPrincipal(false);
            }
            setMensaje(null);
        } else {
            const timer = setTimeout(() => setIsAnimating(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen, direccionEdit]);

    const handleGuardar = async () => {
        if (guardando) {
            return;
        }

        if (!calle.trim() || !numero.trim() || !ciudad.trim() || !provincia.trim() || !codigoPostal.trim() || !pais.trim()) {
            setMensaje({tipo: 'error', texto: 'Completa todos los campos requeridos'});
            return;
        }

        try {
            setGuardando(true);
            setMensaje(null);

            const datos = {
                etiqueta: etiqueta || undefined,
                calle,
                numero,
                piso: piso || undefined,
                departamento: departamento || undefined,
                ciudad,
                provincia,
                codigo_postal: codigoPostal,
                pais,
                observaciones: observaciones || undefined,
                es_principal: esPrincipal,
            };

            if (direccionEdit) {
                await updateDireccion(direccionEdit.id, datos);
                setMensaje({tipo: 'exito', texto: 'Dirección actualizada correctamente'});
            } else {
                await createDireccion(datos);
                setMensaje({tipo: 'exito', texto: 'Dirección creada correctamente'});
            }

            setTimeout(() => {
                onDireccionSaved?.();
            }, 500);
        } catch (error) {
            console.error(error);
            setMensaje({tipo: 'error', texto: obtenerMensajeError(error)});
        } finally {
            setGuardando(false);
        }
    };

    if (!isAnimating && !isOpen) return null;

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <div className={`bg-white relative rounded-lg shadow-lg p-6 pt-10 pb-5 max-w-full w-full mx-auto transform transition-transform duration-300 ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'} max-h-[90vh] custom-category-scrollbar overflow-y-auto md:max-w-[440px]`}>
                <button onClick={onClose} type="button">
                    <img src="/images/close.svg" alt="Cerrar" className="w-5 h-5 object-contain object-center absolute top-4 right-4" />
                </button>
                <p className="text-app-black font-poppins text-xl font-medium">
                    {direccionEdit ? 'Editar dirección' : 'Dirección de envío'}
                </p>
                {mensaje && (
                    <div className={`p-3 rounded-md mt-4 ${mensaje.tipo === 'exito' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} text-sm`}>
                        {mensaje.texto}
                    </div>
                )}
                <div className="space-y-5 mt-5">
                    <div className="space-y-3 w-full">
                        <label htmlFor="etiqueta" className="text-app-gray font-inter text-sm font-bold uppercase">Etiqueta (ej: Casa, Trabajo)</label>
                        <input placeholder="Etiqueta" type="text" name="etiqueta" id="etiqueta" value={etiqueta} onChange={(e) => setEtiqueta(e.target.value)} className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md" />
                    </div>
                    <div className="space-y-3 w-full">
                        <label htmlFor="calle" className="text-app-gray font-inter text-sm font-bold uppercase">Calle *</label>
                        <input placeholder="Calle" type="text" name="calle" id="calle" value={calle} onChange={(e) => setCalle(e.target.value)} className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md" />
                    </div>
                    <div className="space-y-3 w-full">
                        <label htmlFor="numero" className="text-app-gray font-inter text-sm font-bold uppercase">Número *</label>
                        <input placeholder="Número" type="text" name="numero" id="numero" value={numero} onChange={(e) => setNumero(e.target.value)} className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md" />
                    </div>
                    <div className="space-y-3 w-full">
                        <label htmlFor="piso" className="text-app-gray font-inter text-sm font-bold uppercase">Piso</label>
                        <input placeholder="Piso" type="text" name="piso" id="piso" value={piso} onChange={(e) => setPiso(e.target.value)} className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md" />
                    </div>
                    <div className="space-y-3 w-full">
                        <label htmlFor="departamento" className="text-app-gray font-inter text-sm font-bold uppercase">Departamento</label>
                        <input placeholder="Departamento" type="text" name="departamento" id="departamento" value={departamento} onChange={(e) => setDepartamento(e.target.value)} className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md" />
                    </div>
                    <div className="space-y-3 w-full">
                        <label htmlFor="ciudad" className="text-app-gray font-inter text-sm font-bold uppercase">Ciudad *</label>
                        <input placeholder="Ciudad" type="text" name="ciudad" id="ciudad" value={ciudad} onChange={(e) => setCiudad(e.target.value)} className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md" />
                    </div>
                    <div className="space-y-3 w-full">
                        <label htmlFor="provincia" className="text-app-gray font-inter text-sm font-bold uppercase">Provincia *</label>
                        <input placeholder="Provincia" type="text" name="provincia" id="provincia" value={provincia} onChange={(e) => setProvincia(e.target.value)} className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md" />
                    </div>
                    <div className="space-y-3 w-full">
                        <label htmlFor="codigoPostal" className="text-app-gray font-inter text-sm font-bold uppercase">Código postal *</label>
                        <input placeholder="Código postal" type="text" name="codigoPostal" id="codigoPostal" value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)} className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md" />
                    </div>
                    <div className="space-y-3 w-full">
                        <label htmlFor="pais" className="text-app-gray font-inter text-sm font-bold uppercase">País *</label>
                        <input placeholder="País" type="text" name="pais" id="pais" value={pais} onChange={(e) => setPais(e.target.value)} className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md" />
                    </div>
                    <div className="space-y-3 w-full">
                        <label htmlFor="observaciones" className="text-app-gray font-inter text-sm font-bold uppercase">Observaciones</label>
                        <textarea placeholder="Observaciones" name="observaciones" id="observaciones" value={observaciones} onChange={(e) => setObservaciones(e.target.value)} className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md resize-none" rows={3} />
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="esPrincipal"
                            checked={esPrincipal}
                            onChange={(e) => setEsPrincipal(e.target.checked)}
                            className="w-4 h-4 cursor-pointer"
                        />
                        <label htmlFor="esPrincipal" className="text-app-gray font-inter text-sm font-bold uppercase cursor-pointer">
                            Establecer como dirección principal
                        </label>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 pt-5">
                        <Button text="Cancelar" className="bg-app-gray" onClick={onClose} disabled={guardando} />
                        <Button text={guardando ? 'Guardando...' : (direccionEdit ? 'Actualizar dirección' : 'Agregar dirección')} onClick={handleGuardar} disabled={guardando} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddressForm;
