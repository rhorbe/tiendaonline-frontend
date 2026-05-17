import Button from "../Button/Button";
import {FC, useEffect, useState} from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    buttonText?: string;
    secondaryButtonText?: string;
    secondaryOnClick?: () => void;
    iconSrc?: string;
    iconAlt?: string;
    showIcon?: boolean;
};

const Modal: FC<ModalProps> = (
    {
        isOpen,
        onClose,
        title = "",
        description = "",
        buttonText = "",
        secondaryButtonText = "",
        secondaryOnClick,
        iconSrc = "/images/warning.svg",
        iconAlt = "",
        showIcon = true,
    }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
        } else {
            const timer = setTimeout(() => setIsAnimating(false), 300); // Match this with the CSS transition duration
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isAnimating && !isOpen) return null;

    return (
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <div
                className={`bg-white rounded-lg shadow-lg px-5 pt-8 pb-5 max-w-sm w-full mx-auto transform transition-transform duration-300 ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}>
                {showIcon && (
                    <div className="flex justify-center items-center mb-5">
                        <img
                            src={iconSrc}
                            alt={iconAlt}
                            className="h-[108px] w-[108px] object-contain object-center"
                        />
                    </div>
                )}
                <p className="text-app-black font-inter text-2xl font-bold text-center mb-2.5">
                    {title}
                </p>
                <p className="text-app-black font-inter text-base text-center mb-4">
                    {description}
                </p>
                {secondaryButtonText ? (
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={secondaryOnClick}
                            className="text-app-black text-center font-inter text-base font-medium leading-[28px] tracking-[-0.4px] bg-white border border-app-gray rounded-lg w-full px-10 py-[10px] hover:bg-app-light-gray/20 transition-colors"
                        >
                            {secondaryButtonText}
                        </button>
                        <Button text={buttonText} onClick={onClose}/>
                    </div>
                ) : (
                    <Button text={buttonText} onClick={onClose}/>
                )}
            </div>
        </div>
    );
};

export default Modal;
