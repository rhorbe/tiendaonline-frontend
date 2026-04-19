import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "../Button/Button";
import {ROUTES} from "@/core/enum/common";
import {formatCurrency} from "@/core/utils/formatCurrency";
import {useProductContext} from "@/store/useProductContext";
import {useAuth} from "@/store/useAuth";
import Modal from "@/core/components/Modal";
import {
    getRemoveItemCartErrorMessage,
    getUpdateCartItemErrorMessage,
    removeItemFromUserCart,
    updateItemQuantityInUserCart,
} from "@/core/api/cartItemRemoveApi";


interface FlayoutMenuProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Flayout = ({setOpen}: FlayoutMenuProps) => {
    const {state, dispatch} = useProductContext();
    const {user} = useAuth();
    const [isCartErrorModalOpen, setIsCartErrorModalOpen] = useState(false);
    const [cartErrorMessage, setCartErrorMessage] = useState("");
    const [cartErrorTitle, setCartErrorTitle] = useState("No se pudo quitar del carrito");
    const navigate = useNavigate();
    const {cartItems} = state;
    const flayoutRef = useRef<HTMLDivElement>(null);
    const [pendingVariantIds, setPendingVariantIds] = useState<string[]>([]);

    const markVariantAsPending = (varianteId: string) => {
        setPendingVariantIds((prev) => (prev.includes(varianteId) ? prev : [...prev, varianteId]));
    };

    const unmarkVariantAsPending = (varianteId: string) => {
        setPendingVariantIds((prev) => prev.filter((id) => id !== varianteId));
    };

    const isVariantPending = (varianteId: string) => pendingVariantIds.includes(varianteId);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (flayoutRef.current && !flayoutRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setOpen]);

    const handleUpdateQty = async (varianteId: string, nextQty: number) => {
        const previousItem = cartItems.find((item) => item.varianteId === varianteId);
        if (!previousItem) {
            return;
        }

        const previousQty = previousItem.quantity;
        if (previousQty === nextQty) {
            return;
        }

        dispatch({
            type: "UPDATE_CART_QTY",
            payload: {varianteId, quantity: nextQty},
        });

        if (!user?.id) {
            return;
        }

        markVariantAsPending(varianteId);

        if (user?.id) {
            try {
                const result = await updateItemQuantityInUserCart(user.id, varianteId, nextQty);
                if (!result.updated) {
                    dispatch({
                        type: "UPDATE_CART_QTY",
                        payload: {varianteId, quantity: previousQty},
                    });
                    setCartErrorTitle("No se pudo actualizar el carrito");
                    setCartErrorMessage("No se encontro el item del carrito para actualizar su cantidad.");
                    setIsCartErrorModalOpen(true);
                    return;
                }
            } catch (error: unknown) {
                dispatch({
                    type: "UPDATE_CART_QTY",
                    payload: {varianteId, quantity: previousQty},
                });
                setCartErrorTitle("No se pudo actualizar el carrito");
                setCartErrorMessage(getUpdateCartItemErrorMessage(error));
                setIsCartErrorModalOpen(true);
                return;
            } finally {
                unmarkVariantAsPending(varianteId);
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
                    setCartErrorMessage("No se encontro el item del carrito para quitarlo.");
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

    return (
        <div
            ref={flayoutRef}
            className="h-screen bg-white py-10 px-6 flex flex-col w-full md:w-[413px] max-w-[413px]"
        >
            <div className="relative flex flex-col flex-1 min-h-0">
                <button onClick={() => setOpen(false)} className="absolute right-0 top-0.5">
                    <img src="/images/close.svg" alt=""/>
                </button>
                <h3 className="text-app-black font-poppins text-[28px]/34px font-medium tracking-[-0.6px] mb-4">
                    Carrito
                </h3>
                <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-y-auto pr-1">
                    {cartItems.length === 0 ? (
                        <p className="py-6 text-app-gray font-inter text-sm/[22px]">
                            Tu carrito esta vacío.
                        </p>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.varianteId} className="py-3 border-b border-app-light-gray last:border-b-0">
                                <div className="flex gap-3">
                                    <img src={item.imageUrl} alt="producto en carrito" className="w-20 h-24 object-contain"/>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 text-sm/[20px]">
                                            <p className="text-app-gray font-inter truncate">{item.marca}</p>
                                            <h3 className="text-app-black font-inter font-semibold truncate">{item.nombre}</h3>
                                            {item.varianteLabel && (
                                                <p className="text-app-gray font-inter whitespace-nowrap">{item.varianteLabel} ML</p>
                                            )}
                                        </div>

                                        <div className="mt-2 flex items-center justify-between gap-2">
                                            <div className="flex gap-3 items-center border border-app-gray rounded py-2 px-2 w-fit">
                                                <button
                                                    type="button"
                                                    onClick={() => handleDecrease(item.varianteId, item.quantity)}
                                                    aria-label="Disminuir cantidad"
                                                    disabled={item.quantity <= 1 || isVariantPending(item.varianteId)}
                                                >
                                                    <img src="/images/minus.svg" alt="" className="h-4 w-4"/>
                                                </button>
                                                <p className="text-app-black font-inter font-semibold text-sm/[20px]">{item.quantity}</p>
                                                <button
                                                    type="button"
                                                    onClick={() => handleIncrease(item.varianteId, item.quantity, item.stock)}
                                                    aria-label="Aumentar cantidad"
                                                    disabled={item.quantity >= (item.stock || 1) || isVariantPending(item.varianteId)}
                                                >
                                                    <img src="/images/add.svg" alt="" className="h-4 w-4"/>
                                                </button>
                                            </div>

                                            <p className="text-app-black font-inter text-sm/[22px] font-semibold whitespace-nowrap">
                                                {formatCurrency(item.unitPrice * item.quantity)}
                                            </p>

                                            <button
                                                className="shrink-0"
                                                onClick={() => void handleRemoveItem(item.varianteId)}
                                                aria-label="Quitar producto del carrito"
                                                disabled={isVariantPending(item.varianteId)}
                                            >
                                                <img src="/images/trash.svg" alt="" className="w-5 h-5"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className="pt-4">
                <div className="flex justify-between items-center py-3">
                    <p className="text-app-black font-medium font-inter text-[20px]/[28px]">
                        Total
                    </p>
                    <p className="text-app-black text-right font-inter text-base/[26px] font-semibold">
                        {formatCurrency(subtotal)}
                    </p>
                </div>
                <div className="py-[18px]">
                    <Button
                        text="Continuar"
                        onClick={() => {
                            setOpen(false);
                            navigate(user ? ROUTES.CART : ROUTES.LOGIN);
                        }}
                    />
                </div>
            </div>
            <Modal
                isOpen={isCartErrorModalOpen}
                onClose={() => setIsCartErrorModalOpen(false)}
                title={cartErrorTitle}
                description={cartErrorMessage}
                buttonText="Entendido"
                iconSrc="/images/warning.svg"
                iconAlt="Error al quitar producto"
            />
        </div>
    );
};
