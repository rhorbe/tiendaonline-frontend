import {useCallback, useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";

import Button from "@/core/components/Button/Button";
import Process from "@/core/components/Process";
import shippingApi, {type CotizarEnvioResponse} from "@/core/api/shippingApi";
import {fetchPerfil} from "@/core/api/perfilApi";
import {MetodoEnvio} from "@/core/enum/MetodoEnvio";
import {ROUTES} from "@/core/enum/common";
import {formatCurrency} from "@/core/utils/formatCurrency";
import {useProductContext} from "@/store/useProductContext";
import type {PerfilDireccion, PerfilResponse} from "@/core/models/Perfil";
import AddressForm from "@/core/components/AddressForm";
import {formatearDireccion} from "@/core/utils/formatDireccion";

const esDireccionPrincipal = (direccion: PerfilDireccion): boolean =>
    direccion.esPrincipal ?? direccion.es_principal ?? false;

const getShippingMethodLabel = (method: MetodoEnvio): string => {
    switch (method) {
        case MetodoEnvio.RETIRO_LOCAL:
            return "Retira en tienda";
        case MetodoEnvio.ENVIO_ESTANDAR:
            return "Envío estándar";
        case MetodoEnvio.ENVIO_EXPRESS:
            return "Envío express";
        default:
            return "Método de envío";
    }
};

const shippingMethodOptions = [
    {
        value: MetodoEnvio.RETIRO_LOCAL,
        label: "Retira en tienda",
        detail: "",
        iconSrc: "/images/store.svg",
        iconAlt: "Retiro en tienda",
    },
    {
        value: MetodoEnvio.ENVIO_ESTANDAR,
        label: "Envío estándar",
        detail: "",
        iconSrc: "/images/shipping.svg",
        iconAlt: "Envío estándar",
    },
    {
        value: MetodoEnvio.ENVIO_EXPRESS,
        label: "Envío express",
        detail: "",
        iconSrc: "/images/shipping.svg",
        iconAlt: "Envío express",
    },
] satisfies Array<{
    value: MetodoEnvio;
    label: string;
    detail: string;
    iconSrc: string;
    iconAlt: string;
}>;

export default function ShippingPage() {
    const navigate = useNavigate();
    const {state, dispatch} = useProductContext();
    const {cartItems, selectedShippingMethod, selectedShippingAddressId} = state;
    const [perfil, setPerfil] = useState<PerfilResponse | null>(null);
    const [perfilLoading, setPerfilLoading] = useState(true);
    const [perfilError, setPerfilError] = useState<string | null>(null);
    const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
    const [shippingQuotes, setShippingQuotes] = useState<Partial<Record<MetodoEnvio, CotizarEnvioResponse>>>({});
    const [shippingQuoteErrors, setShippingQuoteErrors] = useState<Partial<Record<MetodoEnvio, string>>>({});
    const [shippingQuoteLoading, setShippingQuoteLoading] = useState(false);

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
        return [...(perfil?.direcciones ?? [])].sort(
            (a, b) => Number(esDireccionPrincipal(b)) - Number(esDireccionPrincipal(a)),
        );
    }, [perfil]);

    useEffect(() => {
        if (!direccionesOrdenadas.length) {
            dispatch({type: "SET_SHIPPING_ADDRESS", payload: {selectedShippingAddressId: ""}});
            return;
        }

        const existeSeleccionada = direccionesOrdenadas.some((direccion) => direccion.id === selectedShippingAddressId);
        if (existeSeleccionada) {
            return;
        }

        const principal = direccionesOrdenadas.find(esDireccionPrincipal) ?? direccionesOrdenadas[0];
        dispatch({type: "SET_SHIPPING_ADDRESS", payload: {selectedShippingAddressId: principal.id}});
    }, [dispatch, direccionesOrdenadas, selectedShippingAddressId]);

    useEffect(() => {
        if (cartItems.length === 0) {
            setShippingQuotes({});
            setShippingQuoteErrors({});
            setShippingQuoteLoading(false);
            return;
        }

        if (!selectedShippingAddressId) {
            setShippingQuotes({});
            setShippingQuoteErrors({});
            setShippingQuoteLoading(false);
            return;
        }

        let cancelled = false;

        const cotizarEnvios = async () => {
            setShippingQuoteLoading(true);
            setShippingQuoteErrors({});

            const resultados = await Promise.allSettled(
                shippingMethodOptions.map(async (option) => {
                    const quote = await shippingApi.cotizarEnvio({
                        metodo_envio: option.value,
                        direccion_id: option.value === MetodoEnvio.RETIRO_LOCAL ? undefined : selectedShippingAddressId,
                    });
                    return [option.value, quote] as const;
                }),
            );

            if (cancelled) {
                return;
            }

            const nextQuotes: Partial<Record<MetodoEnvio, CotizarEnvioResponse>> = {};
            const nextErrors: Partial<Record<MetodoEnvio, string>> = {};

            resultados.forEach((result, index) => {
                const method = shippingMethodOptions[index].value;

                if (result.status === "fulfilled") {
                    const [methodValue, quote] = result.value;
                    nextQuotes[methodValue] = quote;
                    return;
                }

                nextErrors[method] = result.reason instanceof Error
                    ? result.reason.message
                    : "No se pudo cotizar el envío.";
            });

            setShippingQuotes(nextQuotes);
            setShippingQuoteErrors(nextErrors);
            setShippingQuoteLoading(false);
        };

        void cotizarEnvios();

        return () => {
            cancelled = true;
        };
    }, [cartItems, selectedShippingAddressId]);

    const showShippingAddressBlock = selectedShippingMethod !== MetodoEnvio.RETIRO_LOCAL;
    const shippingMethodLabel = getShippingMethodLabel(selectedShippingMethod);
    const selectedShippingQuote = shippingQuotes[selectedShippingMethod] ?? null;
    const selectedShippingQuoteError = shippingQuoteErrors[selectedShippingMethod] ?? null;
    const costoEnvio = selectedShippingQuote?.costo_envio ?? 0;
    const totalCompra = selectedShippingQuote?.total ?? subtotal + costoEnvio;

    return (
        <section className="px-8 lg:px-14 py-20">
            <div className="">
                <h1 className="text-app-black font-poppins text-center text-[54px]/[58px] font-medium tracking-[-1px] mb-10">
                    Forma de envío
                </h1>
                <Process activeStep={2} completedStep={1}/>
            </div>
            <div className="pt-20 grid md:grid-cols-[3fr_2fr] gap-16 items-start">
                <div className="space-y-6">
                    <div className="rounded-md border border-app-gray bg-white py-10 px-6 space-y-5">
                        <p className="text-app-black font-poppins text-xl/7 font-medium">
                            Seleccionar forma de envío
                        </p>
                        <div className="space-y-3">
                            {shippingMethodOptions.map((option) => {
                                const isSelected = selectedShippingMethod === option.value;

                                return (
                                    <div
                                        key={option.value}
                                        role="button"
                                        tabIndex={0}
                                        className={`w-full py-3 px-4 flex justify-between items-center rounded-[4px] border border-app-black text-left transition-colors cursor-pointer ${
                                            isSelected ? "bg-primary" : "bg-white"
                                        }`}
                                        onClick={() => dispatch({type: "SET_SHIPPING_METHOD", payload: {selectedShippingMethod: option.value}})}
                                        onKeyDown={(event) => {
                                            if (event.key === "Enter" || event.key === " ") {
                                                event.preventDefault();
                                                dispatch({type: "SET_SHIPPING_METHOD", payload: {selectedShippingMethod: option.value}});
                                            }
                                        }}
                                    >
                                        <div className="flex gap-3 items-center min-w-0">
                                            <input
                                                type="radio"
                                                name="shippingMethod"
                                                id={option.value}
                                                checked={isSelected}
                                                readOnly
                                                className="appearance-none w-5 h-5 border border-app-black rounded-full checked:bg-app-black checked:border-app-black text-app-black"
                                            />
                                            <div className="min-w-0">
                                                <p className="text-app-black font-inter text-base/[26px]">
                                                    {option.label}
                                                </p>
                                                <p className="text-app-gray font-inter text-xs/[18px]">
                                                    {option.detail}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 shrink-0">
                                            <p className="text-right font-inter text-base/[26px]">
                                                {option.value === MetodoEnvio.RETIRO_LOCAL
                                                    ? formatCurrency(0)
                                                    : shippingQuoteLoading
                                                        ? "Cotizando..."
                                                        : shippingQuoteErrors[option.value]
                                                            ? "No disponible"
                                                            : shippingQuotes[option.value]
                                                                ? formatCurrency(shippingQuotes[option.value]!.costo_envio)
                                                                : "Cotizar"}
                                            </p>
                                            <img
                                                src={option.iconSrc}
                                                alt={option.iconAlt}
                                                className="h-6 w-6 object-contain"
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

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
                                            const isSelected = selectedShippingAddressId === direccion.id;
                                            const isPrincipal = esDireccionPrincipal(direccion);

                                            return (
                                                <button
                                                    key={direccion.id}
                                                    type="button"
                                                    className={`w-full py-3 px-4 flex justify-between items-center rounded-md border border-app-gray text-left transition-colors cursor-pointer ${
                                                        isSelected ? "bg-primary" : "bg-white"
                                                    }`}
                                                    onClick={() => dispatch({type: "SET_SHIPPING_ADDRESS", payload: {selectedShippingAddressId: direccion.id}})}
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
                                {shippingMethodLabel}
                            </p>
                            <p className="text-app-black text-right font-inter text-base/[26px] font-semibold">
                                {selectedShippingMethod === MetodoEnvio.RETIRO_LOCAL
                                    ? formatCurrency(0)
                                    : shippingQuoteLoading
                                        ? "Cotizando..."
                                        : selectedShippingQuoteError
                                            ? "Sin cotización"
                                            : formatCurrency(costoEnvio)}
                            </p>
                        </div>
                        {selectedShippingQuoteError && (
                            <p className="text-red-500 font-inter text-sm/[22px]">
                                {selectedShippingQuoteError}
                            </p>
                        )}
                        <div className="flex justify-between items-center pb-3">
                            <p className="text-app-black font-inter text-xl/8 font-semibold">
                                Total
                            </p>
                            <p className="text-app-black text-right font-inter text-xl/8 font-semibold">
                                {shippingQuoteLoading && selectedShippingMethod !== MetodoEnvio.RETIRO_LOCAL
                                    ? "Cotizando..."
                                    : formatCurrency(totalCompra)}
                            </p>
                        </div>
                        <div className="pt-2">
                            <Button
                                text="Continuar al pago"
                                onClick={() => navigate(ROUTES.CHECKOUT)}
                                disabled={cartItems.length === 0 || shippingQuoteLoading || (selectedShippingMethod !== MetodoEnvio.RETIRO_LOCAL && !selectedShippingQuote) || Boolean(selectedShippingQuoteError)}
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

