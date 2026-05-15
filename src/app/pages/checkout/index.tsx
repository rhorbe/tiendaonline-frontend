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

const metodosEnvio = [
    { value: MetodoEnvio.RETIRO_LOCAL, label: "Retiro en local" },
    { value: MetodoEnvio.ENVIO_ESTANDAR, label: "Envío estándar" },
    { value: MetodoEnvio.ENVIO_EXPRESS, label: "Envío express" },
] as const;


export default function CheckOutPage() {
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedShippingMethod, setSelectedShippingMethod] = useState<MetodoEnvio>(MetodoEnvio.RETIRO_LOCAL);
    const [perfil, setPerfil] = useState<PerfilResponse | null>(null);
    const [perfilLoading, setPerfilLoading] = useState(true);
    const [perfilError, setPerfilError] = useState<string | null>(null);
    const [selectedDireccionId, setSelectedDireccionId] = useState<string>("");
    const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
    const [shippingQuote, setShippingQuote] = useState<CotizarEnvioResponse | null>(null);
    const [shippingQuoteLoading, setShippingQuoteLoading] = useState(false);
    const [shippingQuoteError, setShippingQuoteError] = useState<string | null>(null);
    const { state } = useProductContext();
    const { cartItems } = state;
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
        if (cartItems.length === 0) {
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

    const direccionSeleccionada = direccionesOrdenadas.find((direccion) => direccion.id === selectedDireccionId) ?? null;
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
                    <div className="rounded-md border border-app-black py-10 px-6 space-y-5">
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
                            <>
                                <div className="space-y-3 w-full">
                                    <label htmlFor="direccionEnvio" className="text-app-gray font-inter text-sm/3 font-bold uppercase">Seleccionar una dirección</label>
                                    <select
                                        id="direccionEnvio"
                                        value={selectedDireccionId}
                                        onChange={(e) => setSelectedDireccionId(e.target.value)}
                                        className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md"
                                    >
                                        {direccionesOrdenadas.map((direccion) => (
                                            <option key={direccion.id} value={direccion.id}>
                                                {(direccion.etiqueta || "Dirección") + (esDireccionPrincipal(direccion) ? " (Principal)" : "")}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {direccionSeleccionada && (
                                    <div className="rounded-md border border-app-gray p-4 space-y-1">
                                        <p className="text-app-black font-inter text-sm/[22px] font-semibold">
                                            {direccionSeleccionada.etiqueta || "Dirección seleccionada"}
                                        </p>
                                        <p className="text-app-gray font-inter text-sm/[22px]">
                                            {formatearDireccion(direccionSeleccionada)}
                                        </p>
                                        {direccionSeleccionada.observaciones && (
                                            <p className="text-app-gray font-inter text-xs/[18px]">{direccionSeleccionada.observaciones}</p>
                                        )}
                                    </div>
                                )}
                            </>
                        )}

                        {!perfilLoading && !perfilError && direccionesOrdenadas.length === 0 && (
                            <div className="rounded-md border border-dashed border-app-gray p-4">
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
                    <div className="rounded-md border border-app-black py-10 px-6 space-y-5">
                        <p className="text-app-black font-poppins text-xl/7 font-medium">
                            Método de pago
                        </p>
                        <div className="space-y-3 w-full">
                            <label htmlFor="streetAddress" className="text-app-gray font-inter text-sm/3 font-bold uppercase">Dirección *</label>
                            <input placeholder="Dirección" type="text" name="streetAddress" id="streetAddress" className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md" />
                        </div>
                        <div
                            className={`py-3 px-4 flex justify-between items-center rounded-[4px] border border-app-black ${selectedOption === 'card' ? 'bg-primary' : 'bg-white'
                                }`}
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
                            className={`py-3 px-4 flex justify-between items-center rounded-[4px] border border-app-black ${selectedOption === 'paypal' ? 'bg-primary' : 'bg-white'
                                }`}
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
                            {/* <img src="/images/finance.svg" alt="finance" className="h-6 w-6 object-contain" /> */}
                        </div>
                        <div className="w-full pt-3">
                            <div className="h-[1px] bg-app-black"></div>
                        </div>
                        <div className="space-y-3 w-full">
                            <label htmlFor="cardnumber" className="text-app-gray font-inter text-sm/3 font-bold uppercase">Número de tarjeta</label>
                            <input placeholder="Número de tarjeta" type="text" name="cardnumber" id="cardnumber" className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md" />
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 items-center justify-between" >
                            <div className="space-y-3 w-full">
                                <label htmlFor="expiredate" className="text-app-gray font-inter text-sm/3 font-bold uppercase">Fecha de vencimiento</label>
                                <input placeholder="Fecha de vencimiento" type="text" name="expiredate" id="expiredate" className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md" />
                            </div>
                            <div className="space-y-3 w-full">
                                <label htmlFor="cvc" className="text-app-gray font-inter text-sm/3 font-bold uppercase">CVC</label>
                                <input placeholder="CVC" type="text" name="cvc" id="cvc" className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md" />
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
                            {/* Mostrar items del carrito (no editables) */}
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
                                                        alt={"Imagen del producto"}
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
                            <p className="text-app-black font-inter text-base/[26px] font-normal ">
                                Subtotal
                            </p>
                            <p className="text-app-black text-right font-inter text-base/[26px] font-semibold">
                                {formatCurrency(subtotal)}
                            </p>
                        </div>

                        <div className="space-y-3 py-3">
                            <label htmlFor="shippingMethod" className="text-app-black font-inter text-base/[26px] font-normal block">
                                Forma de envío
                            </label>
                            <select
                                id="shippingMethod"
                                value={selectedShippingMethod}
                                onChange={(e) => setSelectedShippingMethod(e.target.value as MetodoEnvio)}
                                className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md"
                            >
                                {metodosEnvio.map((metodo) => (
                                    <option key={metodo.value} value={metodo.value}>
                                        {metodo.label}
                                    </option>
                                ))}
                            </select>
                            {selectedShippingMethod !== MetodoEnvio.RETIRO_LOCAL && !direccionSeleccionada && (
                                <p className="text-app-gray font-inter text-xs/[18px]">
                                    Seleccioná una dirección para envíos a domicilio.
                                </p>
                            )}
                        </div>

                        <div className="flex justify-between items-center border-b border-app-light-gray py-3">
                            <p className="text-app-black font-inter text-base/[26px] font-normal ">
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
                                    <p className="text-app-black font-inter text-sm/[22px] font-semibold">Total cotizado</p>
                                    <p className="text-app-black font-inter text-sm/[22px] font-semibold">
                                        {formatCurrency(shippingQuote.total)}
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="border-b border-app-light-gray py-3" />

                        <div className="flex justify-between items-center pb-3">
                            <p className="text-app-black font-inter text-xl/8 font-semibold ">
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
    )
}
