import Process from "@/core/components/Process";
import {useState} from "react";
import {useProductContext} from "@/store/useProductContext";
import {formatCurrency} from "@/core/utils/formatCurrency";

export default function CartPage() {
    const [selectedOption, setSelectedOption] = useState("standard-shipping");
    const {state, dispatch} = useProductContext();
    const {cartItems} = state;

    const handleDecrease = (varianteId: string, currentQty: number) => {
        dispatch({
            type: "UPDATE_CART_QTY",
            payload: {varianteId, quantity: Math.max(1, currentQty - 1)},
        });
    };

    const handleIncrease = (varianteId: string, currentQty: number, stock: number) => {
        dispatch({
            type: "UPDATE_CART_QTY",
            payload: {varianteId, quantity: Math.min(stock || 1, currentQty + 1)},
        });
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

    return (
        <section className="px-8 lg:px-14 py-20">
            <div className="">
                <h1 className="text-app-black font-poppins text-center text-[54px]/[58px] font-medium tracking-[-1px] mb-10">
                    Carrito
                </h1>
                <Process activeStep={1}/>
            </div>
            <div className="grid md:grid-cols-[3fr_2fr] gap-16 py-20">
                <div>
                    <div className="overflow-x-auto hidden md:block">
                        <table className="min-w-full border-collapse border-b">
                            <thead>
                            <tr className="">
                                <th className="pb-6 px-4 text-center text-app-black font-inter text-base/[26px] border-app-gray font-semibold border-b">
                                    Producto
                                </th>
                                <th className="pb-6 px-4 text-center text-app-black font-inter text-base/[26px] border-app-gray font-semibold border-b">
                                    Cantidad
                                </th>
                                <th className="pb-6 px-4 text-center text-app-black font-inter text-base/[26px] border-app-gray font-semibold border-b">
                                    Precio
                                </th>
                                <th className="pb-6 px-4 text-center text-app-black font-inter text-base/[26px] border-app-gray font-semibold border-b">
                                    Subtotal
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {cartItems.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="py-8 px-4 text-center text-app-gray font-inter text-sm/[22px]"
                                    >
                                        Tu carrito esta vacio.
                                    </td>
                                </tr>
                            ) : (
                                cartItems.map((item) => (
                                    <tr key={item.varianteId}>
                                        <td className="py-6 px-4 border-app-light-gray border-b flex gap-4 items-center">
                                            <div className="bg-primary w-20 h-24">
                                                <img
                                                    src={item.imageUrl}
                                                    alt="Producto en carrito"
                                                    className="object-contain object-center h-auto max-h-full w-full"
                                                />
                                            </div>
                                            <div className="flex-shrink-0 space-y-2">
                                                <p className="text-app-black font-inter text-sm/[22px] font-semibold">
                                                    {item.nombre}
                                                </p>
                                                {item.varianteLabel && (
                                                    <p className="text-app-gray font-inter text-xs/5 font-normal">
                                                        {item.varianteLabel} ML
                                                    </p>
                                                )}
                                                <button
                                                    type="button"
                                                    className="flex gap-1 items-center"
                                                    onClick={() =>
                                                        dispatch({
                                                            type: "REMOVE_FROM_CART",
                                                            payload: {varianteId: item.varianteId},
                                                        })
                                                    }
                                                >
                                                    <img
                                                        src={"/images/close.svg"}
                                                        alt=""
                                                        className="object-contain object-center h-6 w-6"
                                                    />
                                                    <p className="text-app-gray font-inter text-sm/[22px] font-semibold">
                                                        Quitar
                                                    </p>
                                                </button>
                                            </div>
                                        </td>
                                        <td className="py-6 px-4 border-app-light-gray border-b">
                                            <div
                                                className="flex gap-3 items-center border border-app-gray rounded py-3 px-2 w-fit">
                                                <button
                                                    type="button"
                                                    onClick={() => handleDecrease(item.varianteId, item.quantity)}
                                                    aria-label="Disminuir cantidad"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <img src="/images/minus.svg" alt="" className="h-4 w-4"/>
                                                </button>
                                                <p className="text-app-black font-inter font-semibold text-sm/[20px]">
                                                    {item.quantity}
                                                </p>
                                                <button
                                                    type="button"
                                                    onClick={() => handleIncrease(item.varianteId, item.quantity, item.stock)}
                                                    aria-label="Aumentar cantidad"
                                                    disabled={item.quantity >= (item.stock || 1)}
                                                >
                                                    <img src="/images/add.svg" alt="" className="h-4 w-4"/>
                                                </button>
                                            </div>
                                        </td>
                                        <td className="py-6 px-4 border-app-light-gray border-b">
                                            <p className="text-app-black font-inter text-lg/[30px] font-normal text-right">
                                                {formatCurrency(item.unitPrice)}
                                            </p>
                                        </td>
                                        <td className="py-6 px-4 border-app-light-gray border-b">
                                            <p className="text-app-black font-inter text-lg/[30px] font-semibold text-right">
                                                {formatCurrency(item.unitPrice * item.quantity)}
                                            </p>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                    <div className="md:hidden">
                        <h2 className="pb-6 text-app-black font-inter text-base/[26px] border-app-gray font-semibold border-b">
                            Producto
                        </h2>
                        {cartItems.length === 0 ? (
                            <p className="py-6 text-app-gray font-inter text-sm/[22px]">Tu carrito esta vacio.</p>
                        ) : (
                            <div className="w-full border-b border-app-light-gray mb-6">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.varianteId}
                                        className="flex justify-between py-6 border-b border-app-light-gray"
                                    >
                                        <div className="flex gap-4 items-center">
                                            <div className="bg-primary w-20 h-24">
                                                <img
                                                    src={item.imageUrl}
                                                    alt="Producto en carrito"
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
                                                <div
                                                    className="flex gap-3 items-center border border-app-gray rounded py-3 px-2 w-fit">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDecrease(item.varianteId, item.quantity)}
                                                        aria-label="Disminuir cantidad"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <img src="/images/minus.svg" alt="" className="h-4 w-4"/>
                                                    </button>
                                                    <p className="text-app-black font-inter font-semibold text-sm/[20px]">
                                                        {item.quantity}
                                                    </p>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleIncrease(item.varianteId, item.quantity, item.stock)}
                                                        aria-label="Aumentar cantidad"
                                                        disabled={item.quantity >= (item.stock || 1)}
                                                    >
                                                        <img src="/images/add.svg" alt="" className="h-4 w-4"/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right flex flex-col items-end gap-2">
                                            <p className="text-app-black font-inter text-lg/[30px] font-semibold">
                                                {formatCurrency(item.unitPrice * item.quantity)}
                                            </p>
                                            <button
                                                type="button"
                                                className="flex gap-1 items-center"
                                                onClick={() =>
                                                    dispatch({
                                                        type: "REMOVE_FROM_CART",
                                                        payload: {varianteId: item.varianteId},
                                                    })
                                                }
                                            >
                                                <img
                                                    src={"/images/close.svg"}
                                                    alt=""
                                                    className="object-contain object-center h-6 w-6"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="p-6 rounded-md border border-app-gray bg-white space-y-3 mb-4">
                    <p className="text-app-black font-poppins text-xl/7 font-medium mb-4">
                        Resumen del carrito
                    </p>

                    <div className="flex justify-between items-center border-b border-app-light-gray py-3">
                        <p className="text-app-black font-inter text-base/[26px] font-normal ">
                            Subtotal
                        </p>
                        <p className="text-app-black text-right font-inter text-base/[26px] font-semibold">
                            {formatCurrency(subtotal)}
                        </p>
                    </div>

                    <p className="text-app-black font-inter text-base/[26px] font-normal py-3">
                        Forma de envío
                    </p>

                    <div
                        className={`py-3 px-4 flex justify-between items-center rounded-[4px] border border-app-black ${
                            selectedOption === "pickup" ? "bg-primary" : "bg-white"
                        }`}
                        onClick={() => setSelectedOption("pickup")}
                    >
                        <div className="flex gap-3 items-center">
                            <input
                                type="radio"
                                name="pickup"
                                id="pickup"
                                checked={selectedOption === "pickup"}
                                className="appearance-none w-5 h-5 border border-app-black rounded-full checked:bg-app-black checked:border-app-black text-app-black"
                            />
                            <p className="text-app-black font-inter text-base/[26px]">
                                Retira en tienda
                            </p>
                        </div>
                        <p className="text-right font-inter text-base/[26px]">$0.00</p>
                    </div>

                    <div
                        className={`py-3 px-4 flex justify-between items-center rounded-[4px] border border-app-black ${
                            selectedOption === "standard-shipping" ? "bg-primary" : "bg-white"
                        }`}
                        onClick={() => setSelectedOption("standard-shipping")}
                    >
                        <div className="flex gap-3 items-center">
                            <input
                                type="radio"
                                name="shipping"
                                id="standard-shipping"
                                checked={selectedOption === "standard-shipping"}
                                className="appearance-none w-5 h-5 border border-app-black rounded-full checked:bg-app-black checked:border-app-black text-app-black"
                            />
                            <p className="text-app-black font-inter text-base/[26px]">
                                Envío estándar
                            </p>
                        </div>
                        <p className="text-right font-inter text-base/[26px]">+$10.000</p>
                    </div>

                    <div
                        className={`py-3 px-4 flex justify-between items-center rounded-[4px] border border-app-black ${
                            selectedOption === "express-shipping" ? "bg-primary" : "bg-white"
                        }`}
                        onClick={() => setSelectedOption("express-shipping")}
                    >
                        <div className="flex gap-3 items-center">
                            <input
                                type="radio"
                                name="shipping"
                                id="express-shipping"
                                checked={selectedOption === "express-shipping"}
                                className="appearance-none w-5 h-5 border border-app-black rounded-full checked:bg-app-black checked:border-app-black text-app-black"
                            />
                            <p className="text-app-black font-inter text-base/[26px]">
                                Envío express (menos de 24hs)
                            </p>
                        </div>
                        <p className="text-right font-inter text-base/[26px]">+$25.000</p>
                    </div>

                    <div className="border-b border-app-light-gray py-3"/>

                    <div className="flex justify-between items-center pb-3">
                        <p className="text-app-black font-inter text-xl/8 font-semibold ">
                            Total
                        </p>
                        <p className="text-app-black text-right font-inter text-xl/8 font-semibold">
                            {formatCurrency(subtotal)}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
