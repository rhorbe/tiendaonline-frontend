import {ROUTES} from "@/core/enum/common";
import {useAuth} from "@/store/useAuth";
import {useProductContext} from "@/store/useProductContext";
import {Link} from "react-router-dom";

interface MobileMenuProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onRequestLogout: () => void;
}

export default function MobileMenu({setOpen, onRequestLogout}: MobileMenuProps) {
    const {user} = useAuth();
    const {state} = useProductContext();

    const navLinks = [
        {name: "Inicio", url: ROUTES.HOME},
        {name: "Tienda", url: ROUTES.SHOP},
        {name: "Contacto", url: ROUTES.CONTACT},
    ];

    const cartItemsCount = state.cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const closeMenu = () => setOpen(false);

    const handleRequestLogout = () => {
        closeMenu();
        onRequestLogout();
    };

    return (
        <div
            className="p-6 bg-app-black text-white absolute top-0 left-0 z-50 w-full h-screen flex flex-col justify-between md:hidden">
            <div>
                <div className="flex justify-between items-center self-stretch">
                   <img src="/images/logo_essences_blanco.svg" alt="Essence Perfumes" className="h-10 w-auto"/>

                    <button onClick={() => setOpen(false)}>
                        <img src="/images/close.svg" alt="Cerrar" className="h-6 w-auto invert"/>
                    </button>
                </div>

                <nav className="mt-6">
                    <ul className="">
                        {navLinks.map((link, index) => (
                            <li
                                key={index}
                                className="pt-4 w-full text-white font-inter text-sm font-semibold pb-2 border-b border-app-gray"
                            >
                                <Link to={link.url} onClick={closeMenu} className="w-full">
                                    {link.name}
                                </Link>
                            </li>
                        ))}

                        <li

                            className="pt-4 w-full text-white font-inter text-sm font-semibold pb-2 border-b border-app-gray"
                        >
                            {user ? (
                                <Link
                                    to={ROUTES.PROFILE}
                                    onClick={closeMenu}
                                    className="w-full"
                                >
                                    <span>Perfil de usuario</span>

                                </Link>
                            ) : (
                                <Link
                                    to={ROUTES.LOGIN}
                                    onClick={closeMenu}
                                    className="flex w-full items-center justify-between rounded-lg px-1 py-2 text-lg/[32px] font-inter font-medium tracking-[-0.4px] text-white hover:bg-white/10 transition"
                                >
                                    <span>Iniciar sesión</span>
                                    <img src="/images/user-circle.svg" alt="Iniciar sesión" className="h-5 w-5 invert"/>
                                </Link>
                            )}
                        </li>

                        <li>
                            <Link
                                to={ROUTES.CART}
                                onClick={closeMenu}
                                className="flex w-full items-center justify-between pt-4 pb-2 border-b border-app-gray text-white font-inter text-sm font-semibold text-left"
                            >
                                <span>Carrito</span>
                                <span className="flex items-center gap-1.5">
                                    <img
                                        src="/images/shopping bag.svg"
                                        alt="Carrito"
                                        className="h-5 w-5 invert"
                                    />
                                    <div
                                        className="bg-white h-5 min-w-[20px] px-1 rounded-full flex justify-center items-center">
                                        <p className="text-app-black text-center font-inter text-[10px] font-bold leading-[10px]">
                                            {cartItemsCount}
                                        </p>
                                    </div>
                                </span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div>
                <div className="space-y-2 pb-3">

                    {user && (
                        <button
                            type="button"
                            onClick={handleRequestLogout}
                            className="flex w-full items-center justify-between pt-4 pb-2 border-b border-app-gray text-white font-inter text-sm font-semibold text-left"
                        >
                            <span>Cerrar sesión</span>
                            <span className="flex items-center gap-1.5">
                                <img
                                    src="/images/arrow-right-from-bracket-solid-full.svg"
                                    alt="Cerrar sesión"
                                    className="h-5 w-5 invert"
                                />
                            </span>
                        </button>
                    )}
                </div>


            </div>
        </div>
    );
}
