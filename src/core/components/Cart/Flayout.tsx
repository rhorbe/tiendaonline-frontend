import Button from "../Button/Button";
import { ROUTES } from "@/core/enum/common";

interface FlayoutMenuProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Flayout = ({ setOpen }: FlayoutMenuProps) => {
    return (
        <div className="h-screen bg-white py-10 px-6 flex flex-col justify-between w-full md:w-[413px] max-w-[413px]">
            <div className="relative">
                <button onClick={() => setOpen(false)} className="absolute right-0 top-0.5">
                    <img src="/images/close.svg" alt="" />
                </button>
                <h3 className="text-app-black font-poppins text-[28px]/34px font-medium tracking-[-0.6px] mb-4">
                    Carrito
                </h3>
                <div className="flex flex-col gap-6">
                    <div className="py-6 flex justify-between">
                        <div className="flex gap-4">
                            <img src="/images/cart-product.png" alt="producto en carrito" className="w-20" />
                            <div>
                                <h3 className="max-w-[210px] text-app-black font-inter text-sm/[22px] font-semibold mb-2">
                                    Mesa Auxiliar
                                </h3>
                                <p className="text-app-gray font-inter text-sm/[20px] mb-2">
                                    Color: Negro
                                </p>
                                <div className="flex gap-3 items-center border border-app-gray rounded py-3 px-2 w-fit">
                                    <button>
                                        <img src="/images/minus.svg" alt="" className="h-4 w-4" />
                                    </button>
                                    <p className="text-app-black font-inter font-semibold text-sm/[20px]">2</p>
                                    <button>
                                        <img src="/images/add.svg" alt="" className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-app-black font-inter text-sm/[22px] font-semibold text-right mb-2">
                                $19.19
                            </p>
                            <button className="flex justify-end">
                                <img src="/images/close.svg" alt="" className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex justify-between items-center border-b border-app-light-gray py-3">
                    <p className="text-app-black font-inter text-base/[26px]">
                        Subtotal
                    </p>
                    <p className="text-app-black text-right font-inter text-base/[26px] font-semibold">
                        $99.00
                    </p>
                </div>
                <div className="flex justify-between items-center py-3">
                    <p className="text-app-black font-medium font-inter text-[20px]/[28px]">
                        Total
                    </p>
                    <p className="text-app-black text-right font-inter text-base/[26px] font-semibold">
                        $234.00
                    </p>
                </div>
                <div className="py-[18px]">
                    <Button
                        text="Finalizar compra"
                        onClick={() => {
                            window.location.href = ROUTES.CHECKOUT;
                        }}
                    />
                </div>
                <a
                    href={ROUTES.CART}
                    className="inline-flex justify-center text-center w-full py-2"
                >
                    <p className="border-b border-app-black font-inter text-sm/[22px] font-semibold text-app-black">
                        Ver carrito
                    </p>
                </a>
            </div>
        </div>
    );
};
