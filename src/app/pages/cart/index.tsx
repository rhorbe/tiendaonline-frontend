import {useState, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {
    getRemoveItemCartErrorMessage,
    getUpdateCartItemErrorMessage,
    removeItemFromUserCart,
    updateItemQuantityInUserCart,
} from "@/core/api/cartItemRemoveApi";
import Button from "@/core/components/Button/Button";
import Modal from "@/core/components/Modal";
import Process from "@/core/components/Process";
import {ROUTES} from "@/core/enum/common";
import {formatCurrency} from "@/core/utils/formatCurrency";
import {useAuth} from "@/store/useAuth";
import {useProductContext} from "@/store/useProductContext";

export default function CartPage() {
    const [selectedOption, setSelectedOption] = useState("standard-shipping");
    const {state, dispatch} = useProductContext();
    const {user} = useAuth();
    const [isCartErrorModalOpen, setIsCartErrorModalOpen] = useState(false);
    const [cartErrorMessage, setCartErrorMessage] = useState("");
    const [cartErrorTitle, setCartErrorTitle] = useState("No se pudo quitar del carrito");
    const [pendingVariantIds, setPendingVariantIds] = useState<string[]>([]);
    const {cartItems} = state;
    const navigate = useNavigate();
    const quantityRequestSeqRef = useRef<Record<string, number>>({});

    const markVariantAsPending = (varianteId: string) => {
        setPendingVariantIds((prev) => (prev.includes(varianteId) ? prev : [...prev, varianteId]));
    };

    const unmarkVariantAsPending = (varianteId: string) => {
        setPendingVariantIds((prev) => prev.filter((id) => id !== varianteId));
    };

    const isVariantPending = (varianteId: string) => pendingVariantIds.includes(varianteId);

    const handleRemoveItem = async (varianteId: string) => {
        const removedItem = cartItems.find((item) => item.varianteId === varianteId);
        if (!removedItem) {
            return;
        }

        if (user?.id) {
            dispatch({
                type: "REMOVE_FROM_CART",
                payload: {varianteId},
            });

            markVariantAsPending(varianteId);

            try {
                const result = await removeItemFromUserCart(user.id, varianteId);
                if (!result.removed) {
                    dispatch({
                        type: "ADD_TO_CART",
                        payload: removedItem,
                    });
                    setCartErrorTitle("No se pudo quitar del carrito");
                    setCartErrorMessage("No se encontró el item del carrito para quitarlo.");
                    setIsCartErrorModalOpen(true);
                }
            } catch (error: unknown) {
                dispatch({
                    type: "ADD_TO_CART",
                    payload: removedItem,
                });
                setCartErrorTitle("No se pudo quitar del carrito");
                setCartErrorMessage(getRemoveItemCartErrorMessage(error));
                setIsCartErrorModalOpen(true);
            } finally {
                unmarkVariantAsPending(varianteId);
            }

            return;
        }

        dispatch({
            type: "REMOVE_FROM_CART",
            payload: {varianteId},
        });
    };

    const handleUpdateQty = async (varianteId: string, nextQty: number) => {
        const previousItem = cartItems.find((item) => item.varianteId === varianteId);
        if (!previousItem) {
            return;
        }

        const previousQty = previousItem.quantity;
        if (previousQty === nextQty) {
            return;
        }

        const requestId = (quantityRequestSeqRef.current[varianteId] ?? 0) + 1;
        quantityRequestSeqRef.current[varianteId] = requestId;

        dispatch({
            type: "UPDATE_CART_QTY",
            payload: {varianteId, quantity: nextQty},
        });

        if (!user?.id) {
            return;
        }

        if (user?.id) {
            try {
                const result = await updateItemQuantityInUserCart(user.id, varianteId, nextQty);
                if (quantityRequestSeqRef.current[varianteId] !== requestId) {
                    return;
                }

                if (!result.updated) {
                    dispatch({
                        type: "UPDATE_CART_QTY",
                        payload: {varianteId, quantity: previousQty},
                    });
                    setCartErrorTitle("No se pudo actualizar el carrito");
                    setCartErrorMessage("No se encontró el item del carrito para actualizar su cantidad.");
                    setIsCartErrorModalOpen(true);
                    return;
                }
            } catch (error: unknown) {
                if (quantityRequestSeqRef.current[varianteId] !== requestId) {
                    return;
                }

                dispatch({
                    type: "UPDATE_CART_QTY",
                    payload: {varianteId, quantity: previousQty},
                });
                setCartErrorTitle("No se pudo actualizar el carrito");
                setCartErrorMessage(getUpdateCartItemErrorMessage(error));
                setIsCartErrorModalOpen(true);
                return;
            } finally {
                if (quantityRequestSeqRef.current[varianteId] === requestId) {
                    delete quantityRequestSeqRef.current[varianteId];
                }
            }
        }
    };

    const handleDecrease = (varianteId: string, currentQty: number) => {
        const nextQty = Math.max(1, currentQty - 1);
        void handleUpdateQty(varianteId, nextQty);
    };

    const handleIncrease = (varianteId: string, currentQty: number, stock: number) => {
        const nextQty = Math.min(stock || 1, currentQty + 1);
        void handleUpdateQty(varianteId, nextQty);
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
            <div className="grid md:grid-cols-[3fr_2fr] gap-16 py-20 items-start">
                <div className="p-6 rounded-md border border-app-black bg-white space-y-3 mb-4">
                    <p className="text-app-black font-poppins text-xl/7 font-medium mb-4">Productos seleccionados</p>
                    <div className="overflow-x-auto hidden md:block">
                        <table className="min-w-full border-collapse border-b">
                            <thead>
                            <tr className="">
                                <th className="py-3 px-4 text-center text-app-black font-inter text-base/[26px] font-normal border-app-light-gray border-b">
                                    Producto
                                </th>
                                <th className="py-3 px-4 text-center text-app-black font-inter text-base/[26px] font-normal border-app-light-gray border-b">
                                    Cantidad
                                </th>
                                <th className="py-3 px-4 text-center text-app-black font-inter text-base/[26px] font-normal border-app-light-gray border-b">
                                    Precio
                                </th>
                                <th className="py-3 px-4 text-center text-app-black font-inter text-base/[26px] font-normal border-app-light-gray border-b">
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
                                        Tu carrito está vacío.
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
                                                    onClick={() => void handleRemoveItem(item.varianteId)}
                                                    disabled={isVariantPending(item.varianteId)}
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
                        {cartItems.length === 0 ? (
                            <p className="py-6 text-app-gray font-inter text-sm/[22px]">Tu carrito está vacío.</p>
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
                                                onClick={() => void handleRemoveItem(item.varianteId)}
                                                disabled={isVariantPending(item.varianteId)}
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
                            Subtotal de la compra
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


                    <div className="border-b border-app-light-gray py-3"/>

                    <div className="flex justify-between items-center pb-3">
                        <p className="text-app-black font-inter text-xl/8 font-semibold ">
                            Total
                        </p>
                        <p className="text-app-black text-right font-inter text-xl/8 font-semibold">
                            {formatCurrency(subtotal)}
                        </p>
                    </div>

                    <div className="pt-2">
                        <Button
                            text="Continuar"
                            onClick={() => navigate(ROUTES.CHECKOUT)}
                            disabled={cartItems.length === 0}
                        />
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isCartErrorModalOpen}
                onClose={() => setIsCartErrorModalOpen(false)}
                title={cartErrorTitle}
                description={cartErrorMessage}
                buttonText="Entendido"
                iconSrc="images/warning.svg"
                iconAlt="Error al quitar producto"
            />
        </section>
    );
}
