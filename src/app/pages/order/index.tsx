import Button from "@/core/components/Button/Button";
import Process from "@/core/components/Process";

export default function OrderCompletePage() {
    return (
            <section className="px-8 lg:px-14 py-10 md:py-20 space-y-10 md:space-y-20">
                    <div className="">
                            <h1 className="text-app-black font-poppins text-center text-[54px]/[58px] font-medium tracking-[-1px] mb-10">
                                    ¡Completado!
                            </h1>
                            <Process activeStep={3} completedStep={2} />
                    </div>
                    <div className="p-4 md:py-20 md:px-24 max-w-fit mx-auto space-y-10 shadow-order-complete border border-app-light-gray rounded">
                            <div className="max-w-[546px]">
                                    <p className="text-app-gray font-poppins text-left md:text-center text-base/[26px] md:text-[28px]/[34px] font-medium tracking-[-0.6px] pb-4">
                                            ¡Gracias! 🎉
                                    </p>
                                    <h2 className="text-app-black text-left md:text-center font-poppins text-[34px]/[38px] md:text-[40px]/[44px] font-medium tracking-[-0.4px]">
                                            Tu pedido fue recibido
                                    </h2>
                            </div>
                            <div className="max-w-[546px] flex gap-2 md:gap-10 md:justify-center items-center">
                                    <div className="pt-4 pr-4 relative flex-shrink-0">
                                            <div className="absolute top-0 right-0 bg-app-black px-3 py-1 rounded-full text-white text-center font-inter text-base/6 font-semibold">2</div>
                                            <div className="bg-primary">
                                                    <img src="/images/product-one.png" alt="producto" className="w-20 h-24 object-contain object-center" />
                                            </div>
                                    </div>
                                    <div className="pt-4 pr-4 relative flex-shrink-0">
                                            <div className="absolute top-0 right-0 bg-app-black px-3 py-1 rounded-full text-white text-center font-inter text-base/6 font-semibold">2</div>
                                            <div className="bg-primary">
                                                    <img src="/images/product-one.png" alt="producto" className="w-20 h-24 object-contain object-center" />
                                            </div>
                                    </div>
                            </div>
                            <div className="md:w-fit mx-auto space-y-5">
                                    <div className="flex flex-col md:flex-row md:px-6">
                                            <p className="text-left text-app-gray font-inter text-sm/[22px] font-semibold w-40">Código de pedido:</p>
                                            <p className="text-app-black text-sm/[22px] font-semibold">#0123_45678</p>
                                    </div>
                                    <div className="flex flex-col md:flex-row md:px-6">
                                            <p className="text-left text-app-gray font-inter text-sm/[22px] font-semibold w-40">Fecha:</p>
                                            <p className="text-app-black text-sm/[22px] font-semibold">19 de octubre de 2023</p>
                                    </div>
                            </div>

                            <div className="w-fit mx-auto">
                                    <Button text="Historial de compras" className="max-w-fit" />
                            </div>
                    </div>
            </section>
    )
}
