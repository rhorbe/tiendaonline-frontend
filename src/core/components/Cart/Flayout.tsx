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
        if (user?.id) {
            try {
                const result = await updateItemQuantityInUserCart(user.id, varianteId, nextQty);
                if (!result.updated) {
                    setCartErrorTitle("No se pudo actualizar el carrito");
                    setCartErrorMessage("No se encontro el item del carrito para actualizar su cantidad.");
                    setIsCartErrorModalOpen(true);
                    return;
                }
            } catch (error: unknown) {
                setCartErrorTitle("No se pudo actualizar el carrito");
                setCartErrorMessage(getUpdateCartItemErrorMessage(error));
                setIsCartErrorModalOpen(true);
                return;
            }
        }

        dispatch({
            type: "UPDATE_CART_QTY",
            payload: {varianteId, quantity: nextQty},
        });
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
        if (user?.id) {
            try {
                await removeItemFromUserCart(user.id, varianteId);
            } catch (error: unknown) {
                setCartErrorTitle("No se pudo quitar del carrito");
                setCartErrorMessage(getRemoveItemCartErrorMessage(error));
                setIsCartErrorModalOpen(true);
                return;
            }
        }

        dispatch({
            type: "REMOVE_FROM_CART",
            payload: {varianteId},
        });
    };

    return (
        <div
            ref={flayoutRef}
            className="h-screen bg-white py-10 px-6 flex flex-col justify-between w-full md:w-[413px] max-w-[413px]"
        >
            <div className="relative">
                <button onClick={() => setOpen(false)} className="absolute right-0 top-0.5">
                    <img src="/images/close.svg" alt=""/>
                </button>
                <h3 className="text-app-black font-poppins text-[28px]/34px font-medium tracking-[-0.6px] mb-4">
                    Carrito
                </h3>
                <div className="flex flex-col gap-6">
                    {cartItems.length === 0 ? (
                        <p className="py-6 text-app-gray font-inter text-sm/[22px]">
                            Tu carrito esta vacío.
                        </p>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.varianteId} className="py-6 flex justify-between">
                                <div className="flex gap-4">
                                    <img src={item.imageUrl} alt="producto en carrito" className="w-20 h-24"/>
                                    <div>
                                        <p className="text-app-gray font-inter text-sm/[20px] mb-1">
                                            {item.marca}
                                        </p>

                                        {item.varianteLabel && (
                                            <p className="text-app-gray font-inter text-sm/[20px] mb-2">
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
                                            <p className="text-app-black font-inter font-semibold text-sm/[20px]">{item.quantity}</p>
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
                                <div className="flex flex-col">
                                    <h3 className="max-w-[210px] text-app-black font-inter text-sm/[22px] font-semibold mb-2">
                                        {item.nombre}
                                    </h3>
                                    <p className="text-app-black font-inter text-sm/[22px] font-semibold text-right mb-2">
                                        {formatCurrency(item.unitPrice * item.quantity)}
                                    </p>
                                    <button
                                        className="flex justify-end"
                                        onClick={() => void handleRemoveItem(item.varianteId)}
                                    >
                                        <img src="/images/trash.svg" alt="" className="w-5 h-5"/>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div>
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
