import Button from "@/core/components/Button/Button";
import Process from "@/core/components/Process";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useProductContext } from "@/store/useProductContext";
import { formatCurrency } from "@/core/utils/formatCurrency";
import { fetchPerfil } from "@/core/api/perfilApi";
import shippingApi, { type CotizarEnvioResponse } from "@/core/api/shippingApi";
import { MetodoEnvio } from "@/core/enum/MetodoEnvio";
import type { PerfilDireccion, PerfilResponse } from "@/core/models/Perfil";
import AddressForm from "@/core/components/AddressForm";
import { formatearDireccion } from "@/core/utils/formatDireccion";
const esDireccionPrincipal = (direccion: PerfilDireccion): boolean =>
    direccion.esPrincipal ?? direccion.es_principal ?? false;
export default function CheckOutPage() {
    const [selectedOption, setSelectedOption] = useState("");
    const [perfil, setPerfil] = useState<PerfilResponse | null>(null);
    const [perfilLoading, setPerfilLoading] = useState(true);
    const [perfilError, setPerfilError] = useState<string | null>(null);
    const [selectedDireccionId, setSelectedDireccionId] = useState<string>("");
    const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
    const [shippingQuote, setShippingQuote] = useState<CotizarEnvioResponse | null>(null);
    const [shippingQuoteLoading, setShippingQuoteLoading] = useState(false);
    const [shippingQuoteError, setShippingQuoteError] = useState<string | null>(null);
    const { state } = useProductContext();
    const { cartItems, selectedShippingMethod } = state;
    const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
    const cargarPerfil = useCallback(async () => {
        try {
            setPerfilLoading(true);
            setPerfilError(null);
            const perfilData = await fetchPerfil();
            setPerfil(perfilData);
        } catch (error) {
            setPerfilError(error instanceof Error ? error.message : "No se pudo cargar el perfil.");
        } finally {
            setPerfilLoading(false);
        }
    }, []);
    useEffect(() => {
        void cargarPerfil();
    }, [cargarPerfil]);
    const direccionesOrdenadas = useMemo(() => {
        return [...(perfil?.direcciones ?? [])].sort((a, b) => Number(esDireccionPrincipal(b)) - Number(esDireccionPrincipal(a)));
    }, [perfil]);
    useEffect(() => {
        if (!direccionesOrdenadas.length) {
            setSelectedDireccionId("");
            return;
        }
        const existeSeleccionada = direccionesOrdenadas.some((direccion) => direccion.id === selectedDireccionId);
        if (existeSeleccionada) {
            return;
        }
        const principal = direccionesOrdenadas.find(esDireccionPrincipal) ?? direccionesOrdenadas[0];
        setSelectedDireccionId(principal.id);
    }, [direccionesOrdenadas, selectedDireccionId]);
    useEffect(() => {
        if (cartItems.length === 0 || selectedShippingMethod === MetodoEnvio.RETIRO_LOCAL) {
            setShippingQuote(null);
            setShippingQuoteLoading(false);
            setShippingQuoteError(null);
            return;
        }
        let cancelled = false;
        const calcularCotizacion = async () => {
            try {
                setShippingQuoteLoading(true);
                setShippingQuoteError(null);
                const response = await shippingApi.cotizarEnvio({
                    metodo_envio: selectedShippingMethod,
                    direccion_id: selectedDireccionId || undefined,
                });
                if (!cancelled) {
                    setShippingQuote(response);
                }
            } catch (error) {
                if (!cancelled) {
                    setShippingQuote(null);
                    setShippingQuoteError(error instanceof Error ? error.message : "No se pudo cotizar el envío.");
                }
            } finally {
                if (!cancelled) {
                    setShippingQuoteLoading(false);
                }
            }
        };
        void calcularCotizacion();
        return () => {
            cancelled = true;
        };
    }, [cartItems, selectedDireccionId, selectedShippingMethod]);
    const showShippingAddressBlock = selectedShippingMethod !== MetodoEnvio.RETIRO_LOCAL;
    const costoEnvio = shippingQuote?.costo_envio ?? 0;
    const totalCompra = shippingQuote?.total ?? subtotal + costoEnvio;
    return (
        <section className="px-8 lg:px-14 py-20">
            <div className="">
                <h1 className="text-app-black font-poppins text-center text-[54px]/[58px] font-medium tracking-[-1px] mb-10">
                    Finalizar compra
                </h1>
                <Process activeStep={2} completedStep={1} />
            </div>
            <div className="pt-20 grid md:grid-cols-[3fr_2fr] gap-16 items-start">
                <div className="space-y-6">
                    {showShippingAddressBlock && (
                        <div className="rounded-md border border-app-gray bg-white py-10 px-6 space-y-5">
                            <p className="text-app-black font-poppins text-xl/7 font-medium">
                                Dirección de envío
                            </p>
                            {perfilLoading && (
                                <p className="text-app-gray font-inter text-sm/[22px]">Cargando direcciones...</p>
                            )}
                            {!perfilLoading && perfilError && (
                                <p className="text-red-500 font-inter text-sm/[22px]">{perfilError}</p>
                            )}
                            {!perfilLoading && !perfilError && direccionesOrdenadas.length > 0 && (
                                <div className="space-y-3 w-full">
                                    <p className="text-app-gray font-inter text-sm/3 font-bold uppercase">
                                        Seleccionar una dirección
                                    </p>

                                    <div className="space-y-3">
                                        {direccionesOrdenadas.map((direccion) => {
                                            const isSelected = selectedDireccionId === direccion.id;
                                            const isPrincipal = esDireccionPrincipal(direccion);

                                            return (
                                                <button
                                                    key={direccion.id}
                                                    type="button"
                                                    className={`w-full py-3 px-4 flex justify-between items-center rounded-md border border-app-gray text-left transition-colors cursor-pointer ${
                                                        isSelected ? "bg-primary" : "bg-white"
                                                    }`}
                                                    onClick={() => setSelectedDireccionId(direccion.id)}
                                                >
                                                    <div className="flex gap-3 items-start min-w-0">
                                                        <input
                                                            type="radio"
                                                            name="direccionEnvio"
                                                            id={direccion.id}
                                                            checked={isSelected}
                                                            readOnly
                                                            className="appearance-none w-5 h-5 border border-app-black rounded-full checked:bg-app-black checked:border-app-black text-app-black mt-1 shrink-0"
                                                        />
                                                        <div className="min-w-0">
                                                            <div className="flex items-center gap-2 flex-wrap">
                                                                <p className="text-app-black font-inter text-base/[26px] font-medium">
                                                                    {direccion.etiqueta || "Dirección"}
                                                                </p>
                                                                {isPrincipal && (
                                                                    <span className="px-2 py-0.5 rounded-full bg-app-black text-white text-[10px] leading-4 font-semibold uppercase tracking-wide">
                                                                        Principal
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className="text-app-gray font-inter text-xs/[18px]">
                                                                {formatearDireccion(direccion)}
                                                            </p>
                                                            {direccion.observaciones && (
                                                                <p className="text-app-gray font-inter text-xs/[18px] mt-1">
                                                                    {direccion.observaciones}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>

                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                            {!perfilLoading && !perfilError && direccionesOrdenadas.length === 0 && (
                                <div className="rounded-md border border-dashed border-app-gray bg-white p-4">
                                    <p className="text-app-gray font-inter text-sm/[22px]">
                                        No tenés direcciones cargadas. Agregá una dirección para continuar con la compra.
                                    </p>
                                </div>
                            )}
                            {!perfilLoading && !perfilError && (
                                <button
                                    type="button"
                                    onClick={() => setIsAddressFormOpen(true)}
                                    className="px-4 py-2 bg-app-black text-white rounded-md font-inter text-sm font-semibold hover:bg-opacity-90"
                                >
                                    {direccionesOrdenadas.length === 0 ? "Agregar dirección" : "Agregar otra dirección"}
                                </button>
                            )}
                        </div>
                    )}
                    <div className="p-6 rounded-md border border-app-gray bg-white space-y-5 mb-4">
                        <p className="text-app-black font-poppins text-xl/7 font-medium">
                            Método de pago
                        </p>
                        <div className="space-y-3 w-full">
                            <label htmlFor="streetAddress" className="text-app-gray font-inter text-sm/3 font-bold uppercase">
                                Dirección *
                            </label>
                            <input
                                placeholder="Dirección"
                                type="text"
                                name="streetAddress"
                                id="streetAddress"
                                className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md"
                            />
                        </div>
                        <div
                            className={`py-3 px-4 flex justify-between items-center rounded-[4px] border border-app-black ${selectedOption === 'card' ? 'bg-primary' : 'bg-white'}`}
                            onClick={() => setSelectedOption('card')}
                        >
                            <div className="flex gap-3 items-center">
                                <input
                                    type="radio"
                                    name="shipping"
                                    id="card"
                                    checked={selectedOption === 'card'}
                                    className="appearance-none w-5 h-5 border border-app-black rounded-full checked:bg-app-black checked:border-app-black text-app-black"
                                />
                                <p className="text-app-black font-inter text-base/[26px]">
                                    Tarjeta de crédito
                                </p>
                            </div>
                            <img src="/images/finance.svg" alt="finance" className="h-6 w-6 object-contain" />
                        </div>
                        <div
                            className={`py-3 px-4 flex justify-between items-center rounded-[4px] border border-app-black ${selectedOption === 'paypal' ? 'bg-primary' : 'bg-white'}`}
                            onClick={() => setSelectedOption('paypal')}
                        >
                            <div className="flex gap-3 items-center">
                                <input
                                    type="radio"
                                    name="payment"
                                    id="paypal"
                                    checked={selectedOption === 'paypal'}
                                    className="appearance-none w-5 h-5 border border-app-black rounded-full checked:bg-app-black checked:border-app-black text-app-black"
                                />
                                <p className="text-app-black font-inter text-base/[26px]">
                                    Mercado Pago
                                </p>
                            </div>
                        </div>
                        <div className="w-full pt-3">
                            <div className="h-[1px] bg-app-black"></div>
                        </div>
                        <div className="space-y-3 w-full">
                            <label htmlFor="cardnumber" className="text-app-gray font-inter text-sm/3 font-bold uppercase">
                                Número de tarjeta
                            </label>
                            <input
                                placeholder="Número de tarjeta"
                                type="text"
                                name="cardnumber"
                                id="cardnumber"
                                className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md"
                            />
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                            <div className="space-y-3 w-full">
                                <label htmlFor="expiredate" className="text-app-gray font-inter text-sm/3 font-bold uppercase">
                                    Fecha de vencimiento
                                </label>
                                <input
                                    placeholder="Fecha de vencimiento"
                                    type="text"
                                    name="expiredate"
                                    id="expiredate"
                                    className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md"
                                />
                            </div>
                            <div className="space-y-3 w-full">
                                <label htmlFor="cvc" className="text-app-gray font-inter text-sm/3 font-bold uppercase">
                                    CVC
                                </label>
                                <input
                                    placeholder="CVC"
                                    type="text"
                                    name="cvc"
                                    id="cvc"
                                    className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="p-6 rounded-md border border-app-gray bg-white space-y-3 mb-4">
                        <p className="text-app-black font-poppins text-xl/7 font-medium mb-4">
                            Resumen de la compra
                        </p>
                        <div className="space-y-6">
                            {cartItems.length === 0 ? (
                                <p className="py-6 text-app-gray font-inter text-sm/[22px]">Tu carrito está vacío.</p>
                            ) : (
                                <div className="w-full border-b border-app-light-gray">
                                    {cartItems.map((item) => (
                                        <div key={item.varianteId} className="flex justify-between py-6 border-b border-app-light-gray">
                                            <div className="flex gap-4 items-center">
                                                <div className="bg-primary w-20 h-24">
                                                    <img
                                                        src={item.imageUrl}
                                                        alt="Imagen del producto"
                                                        className="object-contain object-center h-auto max-h-full w-full"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="text-app-black font-inter text-sm/[22px] font-semibold">
                                                        {item.nombre}
                                                    </p>
                                                    {item.varianteLabel && (
                                                        <p className="text-app-gray font-inter text-xs/[18px] font-normal">
                                                            {item.varianteLabel} ML
                                                        </p>
                                                    )}
                                                    <p className="text-app-black font-inter font-semibold text-sm/[20px]">
                                                        Cantidad: {item.quantity}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right flex flex-col items-end gap-2">
                                                <p className="text-app-black font-inter text-lg/[30px] font-semibold">
                                                    {formatCurrency(item.unitPrice * item.quantity)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="flex justify-between items-center border-b border-app-light-gray py-3">
                            <p className="text-app-black font-inter text-base/[26px] font-normal">
                                Subtotal
                            </p>
                            <p className="text-app-black text-right font-inter text-base/[26px] font-semibold">
                                {formatCurrency(subtotal)}
                            </p>
                        </div>
                        <div className="flex justify-between items-center border-b border-app-light-gray py-3">
                            <p className="text-app-black font-inter text-base/[26px] font-normal">
                                Costo de envío
                            </p>
                            <p className="text-app-black text-right font-inter text-base/[26px] font-semibold">
                                {shippingQuoteLoading
                                    ? "Cotizando..."
                                    : shippingQuoteError
                                        ? "Sin cotización"
                                        : formatCurrency(costoEnvio)}
                            </p>
                        </div>
                        {shippingQuoteError && (
                            <p className="text-red-500 font-inter text-sm/[22px]">
                                {shippingQuoteError}
                            </p>
                        )}
                        {shippingQuote && (
                            <div className="rounded-md border border-app-light-gray p-4 space-y-2">
                                <div className="flex justify-between items-center">
                                    <p className="text-app-gray font-inter text-sm/[22px]">Subtotal</p>
                                    <p className="text-app-black font-inter text-sm/[22px] font-semibold">
                                        {formatCurrency(shippingQuote.subtotal)}
                                    </p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-app-gray font-inter text-sm/[22px]">Envío</p>
                                    <p className="text-app-black font-inter text-sm/[22px] font-semibold">
                                        {formatCurrency(shippingQuote.costo_envio)}
                                    </p>
                                </div>
                                <div className="flex justify-between items-center border-t border-app-light-gray pt-2">
                                    <p className="text-app-black font-inter text-sm/[22px] font-semibold">
                                        Total cotizado
                                    </p>
                                    <p className="text-app-black font-inter text-sm/[22px] font-semibold">
                                        {formatCurrency(shippingQuote.total)}
                                    </p>
                                </div>
                            </div>
                        )}
                        <div className="border-b border-app-light-gray py-3" />
                        <div className="flex justify-between items-center pb-3">
                            <p className="text-app-black font-inter text-xl/8 font-semibold">
                                Total
                            </p>
                            <p className="text-app-black text-right font-inter text-xl/8 font-semibold">
                                {shippingQuoteLoading ? "Cotizando..." : formatCurrency(totalCompra)}
                            </p>
                        </div>
                        <div className="pt-2">
                            <Button
                                text="Realizar pedido"
                                type="submit"
                                disabled={cartItems.length === 0 || shippingQuoteLoading || Boolean(shippingQuoteError)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <AddressForm
                isOpen={isAddressFormOpen}
                onClose={() => setIsAddressFormOpen(false)}
                onDireccionSaved={() => {
                    setIsAddressFormOpen(false);
                    void cargarPerfil();
                }}
            />
        </section>
    );
}
