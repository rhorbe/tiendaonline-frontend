import { useState } from "react";
import AddressForm from "../AddressForm";

export default function Address() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="w-full py-10 md:py-0 md:px-[72px]">
            <div className="space-y-5">
                <p className="text-app-black font-poppins text-xl/7 font-semibold">
                    Información de contacto
                </p>
            </div>
            <div className="grid md:grid-cols-2 mt-5 gap-6">
                {
                    Array.from({ length: 2 }, (_, idx) => (
                        <div key={idx} className="p-4 rounded-lg border border-app-gray">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-app-black font-inter text-base/[26px] font-semibold">
                                    Dirección de facturación
                                </p>
                                <button onClick={openModal} className="flex gap-1 items-center">
                                    <img src="/images/edit.svg" alt="Editar" className="w-4 h-4 object-contain object-center" />
                                    <p className="text-app-gray font-inter text-base/[26px] font-semibold">
                                        Editar
                                    </p>
                                </button>
                            </div>
                            <div className="text-app font-inter text-sm/[22px] sapce-y-1">
                                <p>
                                    Sofia Havertz
                                </p>
                                <p>
                                    (+1) 234 567 890
                                </p>
                                <p>
                                    345 Long Island, NewYork, United States
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <AddressForm isOpen={isModalOpen} onClose={closeModal} />
        </div>
    )
}
