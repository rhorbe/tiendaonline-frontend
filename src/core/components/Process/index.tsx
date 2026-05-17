import {FC} from "react";
import {Link} from "react-router-dom";
import {ROUTES} from "@/core/enum/common.ts";

interface ProcessProps {
    activeStep: number;
    completedStep?: number;
}

const Process: FC<ProcessProps> = ({activeStep, completedStep}) => {
    const steps = [
        {id: 1, label: "Carrito de compras", link: ROUTES.CART},
        {id: 2, label: "Forma de envío", link: ROUTES.SHIPPING},
        {id: 3, label: "Detalles del pago", link:"#"},
        {id: 4, label: "Completar pedido" , link:"#"},
    ];

    return (
        <div className="flex gap-8 items-start w-fit md:mx-auto">
            {steps.map((step) => {
                const isActive = activeStep === step.id;
                const isCompleted = completedStep && step.id <= completedStep;

                return (
                    <div
                        key={step.id}
                        className={`pb-6 flex items-center gap-4 
                            ${
                            isActive
                                ? "border-b-2 border-app-black"
                                : isCompleted
                                    ? "border-b-2 border-app-green"
                                    : ""
                        } 
                            ${isActive ? "block" : "hidden"} 
                            md:flex`}
                    >
                        <p
                            className={`py-2 px-[17px] rounded-[40px] text-white text-center font-inter text-base/[26px] font-semibold 
                            ${
                                isActive
                                    ? "bg-app-black"
                                    : isCompleted
                                        ? "bg-app-green"
                                        : "bg-muted-gray"
                            }`}
                        >
                            {step.id}
                        </p>
                        <p
                            className={`font-inter text-base/[26px] font-semibold 
                            ${
                                isActive
                                    ? "text-app-black"
                                    : isCompleted
                                        ? "text-app-green"
                                        : "text-muted-gray"
                            }`}
                        >
                            <Link to={step.link}>
                                {step.label}
                            </Link>
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default Process;
