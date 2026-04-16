import Button from "../Button/Button";
import { FC, useEffect, useState } from "react";
import "../custom-scrollbar.css";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const AddressForm: FC<ModalProps> = ({ isOpen, onClose }) => {
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
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <div className={`bg-white relative rounded-lg shadow-lg p-6 pt-10 pb-5 max-w-full w-full mx-auto transform transition-transform duration-300 ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'} max-h-[90vh] custom-category-scrollbar overflow-y-auto md:max-w-[440px]`}>
                <button onClick={onClose}>
                    <img src="/images/close.svg" alt="Close Button" className="w-5 h-5 object-contain object-center absolute top-4 right-4" />
                </button>
                <p className="text-app-black font-poppins text-xl font-medium">
                    Shipping Address
                </p>
                <div className="space-y-5 mt-5">
                    <div className="space-y-3 w-full">
                        <label htmlFor="name" className="text-app-gray font-inter text-sm font-bold uppercase">Name</label>
                        <input placeholder="Your Name" type="text" name="name" id="name" className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md" />
                    </div>
                    <div className="space-y-3 w-full">
                        <label htmlFor="phone" className="text-app-gray font-inter text-sm font-bold uppercase">Phone Number</label>
                        <input placeholder="Phone Number" type="tel" name="phone" id="phone" className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md" />
                    </div>
                    <div className="space-y-3 w-full">
                        <label htmlFor="email" className="text-app-gray font-inter text-sm font-bold uppercase">Email</label>
                        <input placeholder="Email" type="email" name="email" id="email" className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md" />
                    </div>
                    <div className="space-y-3 w-full">
                        <label htmlFor="flat" className="text-app-gray font-inter text-sm font-bold uppercase">Flat, House no, Building, Company, Apartment</label>
                        <input placeholder="Flat/ House no" type="text" name="flat" id="flat" className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md" />
                    </div>
                    <div className="space-y-3 w-full">
                        <label htmlFor="country" className="text-app-gray font-inter text-sm font-bold uppercase">Country *</label>
                        <select name="country" id="country" className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md">
                            <option value="" disabled selected>Select your country</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="GB">United Kingdom</option>
                            <option value="DE">Germany</option>
                            <option value="IN">India</option>
                            <option value="AU">Australia</option>
                            <option value="FR">France</option>
                            <option value="JP">Japan</option>
                            <option value="CN">China</option>
                            <option value="ZA">South Africa</option>
                        </select>
                    </div>
                    <div className="space-y-3 w-full">
                        <label htmlFor="zip" className="text-app-gray font-inter text-sm font-bold uppercase">Zip Code</label>
                        <input placeholder="Zip Code" type="text" name="zip" id="zip" className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md" />
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 pt-5">
                        <Button text="Cancel" className="bg-app-gray" onClick={onClose} />
                        <Button text="Add Address" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddressForm;
