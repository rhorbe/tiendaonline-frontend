import Button from "@/core/components/Button/Button";
import Process from "@/core/components/Process";
import { useState } from "react";
import { useProductContext } from "@/store/useProductContext";
import { formatCurrency } from "@/core/utils/formatCurrency";

export default function CheckOutPage() {
    const [selectedOption, setSelectedOption] = useState('');
    const { state } = useProductContext();
    const { cartItems } = state;
    const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
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
                        <div className="space-y-3 w-full">
                            <label htmlFor="streetAddress" className="text-app-gray font-inter text-sm/3 font-bold uppercase">Dirección *</label>
                            <input placeholder="Dirección" type="text" name="streetAddress" id="streetAddress" className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md" />
                        </div>
                        <div className="space-y-3 w-full">
                            <label htmlFor="country" className="text-app-gray font-inter text-sm/3 font-bold uppercase">País *</label>
                            <select name="country" id="country" className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md">
                                <option value="" disabled selected>Seleccioná tu país</option>
                                <option value="US">Estados Unidos</option>
                                <option value="CA">Canadá</option>
                                <option value="GB">Reino Unido</option>
                                <option value="DE">Alemania</option>
                                <option value="IN">India</option>
                                <option value="AU">Australia</option>
                                <option value="FR">Francia</option>
                                <option value="JP">Japón</option>
                                <option value="CN">China</option>
                                <option value="ZA">Sudáfrica</option>
                            </select>
                        </div>
                        <div className="space-y-3 w-full">
                            <label htmlFor="townCity" className="text-app-gray font-inter text-sm/3 font-bold uppercase">Ciudad *</label>
                            <input placeholder="Ciudad" type="text" name="townCity" id="townCity" className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md" />
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 items-center justify-between" >
                            <div className="space-y-3 w-full">
                                <label htmlFor="state" className="text-app-gray font-inter text-sm/3 font-bold uppercase">Provincia</label>
                                <input placeholder="Provincia" type="text" name="state" id="state" className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md" />
                            </div>
                            <div className="space-y-3 w-full">
                                <label htmlFor="zip" className="text-app-gray font-inter text-sm/3 font-bold uppercase">Código postal</label>
                                <input placeholder="Código postal" type="text" name="zip" id="zip" className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md" />
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-nowrap flex-wrap">
                            <input
                                id="accept"
                                type="checkbox"
                                className="w-5 h-5 text-gray-500 border-2 rounded focus:ring-0 checked:bg-app-black checked:border-[#6C7275] cursor-pointer"
                            />
                            <label htmlFor="accept" className="flex text-xs md:text-base font-inter leading-[26px] text-app-gray">
                                Usar una dirección de facturación diferente (opcional)
                            </label>
                        </div>
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

                        <p className="text-app-black font-inter text-base/[26px] font-normal py-3">Forma de envío</p>

                        <div className="border-b border-app-light-gray py-3" />

                        <div className="flex justify-between items-center pb-3">
                            <p className="text-app-black font-inter text-xl/8 font-semibold ">
                                Total
                            </p>
                            <p className="text-app-black text-right font-inter text-xl/8 font-semibold">
                                {formatCurrency(subtotal)}
                            </p>
                        </div>

                        <div className="pt-2">
                            <Button text="Realizar pedido" type="submit" disabled={cartItems.length === 0} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
