import { useSearchParams, useNavigate } from "react-router-dom";
import Button from "@/core/components/Button/Button";
import Process from "@/core/components/Process";
import { ROUTES } from "@/core/enum/common";

export default function OrderCompletePage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const paymentStatusLabels: Record<string, string> = {
        approved: "Aprobado",
        pending: "Pendiente",
        in_process: "En proceso",
        rejected: "Rechazado",
        cancelled: "Cancelado",
        refunded: "Reembolsado",
        charged_back: "Contracargo",
        in_mediation: "En mediación",
        authorized: "Autorizado",
    };

    // Capturar parámetros de Mercado Pago
    const merchantOrderId = searchParams.get("merchant_order_id");
    const paymentId = searchParams.get("payment_id");
    const status = searchParams.get("status");
    const translatedStatus = status
            ? paymentStatusLabels[status.toLowerCase()] ?? status
            : null;

    // Formato de fecha actual
    const currentDate = new Date().toLocaleDateString("es-AR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const handleGoToHistory = () => {
        navigate(ROUTES.PROFILE);
    };

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
                                            ¡Gracias!
                                    </p>
                                    <h2 className="text-app-black text-left md:text-center font-poppins text-[34px]/[38px] md:text-[40px]/[44px] font-medium tracking-[-0.4px]">
                                            Tu pedido fue recibido
                                    </h2>
                                    {status && (
                                            <p className="text-app-gray text-left md:text-center font-inter text-sm/[22px] mt-2">
                                                    Estado de pago: <span className="font-semibold">{translatedStatus}</span>
                                            </p>
                                    )}
                            </div>

                            <div className="md:w-fit mx-auto space-y-5">
                                    <div className="flex flex-col md:flex-row md:px-6">
                                            <p className="text-left text-app-gray font-inter text-sm/[22px] font-semibold w-40">Código de pedido:</p>
                                            <p className="text-app-black text-sm/[22px] font-semibold">
                                                    {merchantOrderId ? `#${merchantOrderId}` : "#0123_45678"}
                                            </p>
                                    </div>
                                    {paymentId && (
                                            <div className="flex flex-col md:flex-row md:px-6">
                                                    <p className="text-left text-app-gray font-inter text-sm/[22px] font-semibold w-40">ID Pago:</p>
                                                    <p className="text-app-black text-sm/[22px] font-semibold">{paymentId}</p>
                                            </div>
                                    )}
                                    <div className="flex flex-col md:flex-row md:px-6">
                                            <p className="text-left text-app-gray font-inter text-sm/[22px] font-semibold w-40">Fecha:</p>
                                            <p className="text-app-black text-sm/[22px] font-semibold">{currentDate}</p>
                                    </div>
                            </div>

                            <div className="w-fit mx-auto">
                                    <Button
                                            text="Historial de compras"
                                            className="max-w-fit"
                                            onClick={handleGoToHistory}
                                    />
                            </div>
                    </div>
            </section>
    )
}
