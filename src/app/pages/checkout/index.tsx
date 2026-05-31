import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import Button from "@/core/components/Button/Button";
import Process from "@/core/components/Process";
import {useProductContext} from "@/store/useProductContext";
import {formatCurrency} from "@/core/utils/formatCurrency";
import shippingApi, {type CotizarEnvioResponse} from "@/core/api/shippingApi";
import {MetodoEnvio} from "@/core/enum/MetodoEnvio";
import {ROUTES} from "@/core/enum/common";

const getShippingMethodLabel = (method: MetodoEnvio): string => {
    switch (method) {
        case MetodoEnvio.RETIRO_LOCAL:
            return "Retira en tienda";
        case MetodoEnvio.ENVIO_ESTANDAR:
            return "Envío estándar";
        case MetodoEnvio.ENVIO_EXPRESS:
            return "Envío express (24hs)";
        default:
            return "Método de envío";
    }
};

export default function CheckOutPage() {
    const [selectedOption, setSelectedOption] = useState("");
    const [shippingQuote, setShippingQuote] = useState<CotizarEnvioResponse | null>(null);
    const [shippingQuoteLoading, setShippingQuoteLoading] = useState(false);
    const [shippingQuoteError, setShippingQuoteError] = useState<string | null>(null);
    const { state } = useProductContext();
    const { cartItems, selectedShippingMethod, selectedShippingAddressId } = state;
    const navigate = useNavigate();
    const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
    useEffect(() => {
        if (selectedShippingMethod !== MetodoEnvio.RETIRO_LOCAL && !selectedShippingAddressId) {
            navigate(ROUTES.SHIPPING, {replace: true});
        }
    }, [navigate, selectedShippingAddressId, selectedShippingMethod]);
    useEffect(() => {
        if (cartItems.length === 0 || selectedShippingMethod === MetodoEnvio.RETIRO_LOCAL) {
            setShippingQuote(null);
            setShippingQuoteLoading(false);
            setShippingQuoteError(null);
            return;
        }
        if (!selectedShippingAddressId) {
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
                    direccion_id: selectedShippingAddressId,
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
    }, [cartItems, selectedShippingAddressId, selectedShippingMethod]);
    const shippingMethodLabel = getShippingMethodLabel(selectedShippingMethod);
    const costoEnvio = shippingQuote?.costo_envio ?? 0;
    const totalCompra = shippingQuote?.total ?? subtotal + costoEnvio;
    return (
        <section className="px-8 lg:px-14 py-20">
            <div className="">
                <h1 className="text-app-black font-poppins text-center text-[54px]/[58px] font-medium tracking-[-1px] mb-10">
                    Finalizar compra
                </h1>
                <Process activeStep={3} completedStep={2} />
            </div>
            <div className="pt-20 grid md:grid-cols-[3fr_2fr] gap-16 items-start">
                <div className="space-y-6">
                    <div className="p-6 rounded-md border border-app-gray bg-white space-y-5 mb-4">
                        <p className="text-app-black font-poppins text-xl/7 font-medium">
                            Método de pago
                        </p>
                        <div
                            className={`py-3 px-4 flex justify-between items-center rounded-[4px] border border-app-black ${selectedOption === 'card' ? 'bg-primary' : 'bg-white'}`}
                            onClick={() => setSelectedOption('card')}
                        >
                            <div className="flex gap-3 items-center">
                                <input
                                    type="radio"
                                    name="payment"
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
                                {shippingMethodLabel}
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
        </section>
    );
}
