import {FC, Suspense, lazy, useState} from "react";
import {Link} from "react-router-dom";
import MobileMenu from "./MobileMenu";
import {ROUTES} from "@/core/enum/common";
import {useAuth} from "@/store/useAuth";
import Modal from "@/core/components/Modal";
import {useProductContext} from "@/store/useProductContext";

const Flayout = lazy(() =>
    import("../../Cart/Flayout").then((module) => ({default: module.Flayout}))
);

const navLinks = [
    {name: "Tienda", url: ROUTES.SHOP},
    {name: "Contacto", url: ROUTES.CONTACT},
] as const;

const cartButtonClass =
    "flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-white/10 transition";

type CartButtonProps = {
    onClick: () => void;
    count: number;
    buttonLabel: string;
    buttonTitle: string;
    imageAlt: string;
    className?: string;
};

const CartButton: FC<CartButtonProps> = ({
                                             onClick,
                                             count,
                                             buttonLabel,
                                             buttonTitle,
                                             imageAlt,
                                             className = cartButtonClass,
                                         }) => (
    <button
        type="button"
        onClick={onClick}
        className={className}
        aria-label={buttonLabel}
        title={buttonTitle}
    >
        <img src="/images/shopping bag.svg" alt={imageAlt} className="h-6 w-6 invert"/>
        <div className="bg-white h-5 w-5 rounded-full flex justify-center items-center">
            <p className="text-app-black text-center font-inter text-xs font-bold leading-[10px]">
                {count}
            </p>
        </div>
    </button>
);

type HeaderUserActionsProps = {
    user: ReturnType<typeof useAuth>["user"];
    onRequestLogout: () => void;
};

const HeaderUserActions: FC<HeaderUserActionsProps> = ({user, onRequestLogout}) => {

    if (!user) {
        return (
            <Link
                to={ROUTES.LOGIN}
                className="inline-flex items-center justify-center p-2 rounded-full text-white hover:bg-white/10 transition"
                aria-label="Iniciar sesión"
                title="Iniciar sesión"
            >
                <img src="/images/user-circle.svg" alt="Usuario" className="w-6 h-6 invert"/>
            </Link>
        );
    }

    return (
        <>
            <div className="flex items-center gap-2 text-white">
                <Link
                    to={ROUTES.PROFILE}
                    className="p-2 rounded-full hover:bg-white/10 transition font-inter font-medium"
                    aria-label="Ir al perfil"
                    title="Perfil del usuario"
                >
                    <span>{user.name}</span>
                </Link>
                <button
                    type="button"
                    onClick={onRequestLogout}
                    className="inline-flex items-center justify-center p-2 rounded-full hover:bg-white/10 transition"
                    aria-label="Cerrar sesión"
                    title="Cerrar sesión"
                >
                    <img
                        src="/images/arrow-right-from-bracket-solid-full.svg"
                        alt="Cerrar sesión"
                        className="w-6 h-6 invert"
                    />
                </button>
            </div>
        </>
    );
};

const Header: FC = () => {
    const [open, setOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const {state} = useProductContext();
    const {logout, user} = useAuth();
    const cartItemsCount = state.cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const handleLogoutConfirm = async () => {
        setIsLogoutModalOpen(false);
        await logout();
    };

    return (
        <header className="sticky top-0 z-40 bg-app-black border-b border-app-gray/40">

            {/* Desktop */}
            <div className="hidden md:flex justify-between items-center mx-auto px-4 md:px-7 lg:px-14 py-4">
                <div className="flex items-center">
                    <Link to={ROUTES.HOME}>
                        <img
                            src="/images/logo_essences_blanco.svg"
                            alt="Essences"
                            width={75}
                            height={21}
                            className="h-12 w-auto p-2"
                        />
                    </Link>
                </div>
                <nav className="flex-grow text-center">
                    <ul className="flex justify-center items-center space-x-10">
                        {navLinks.map((link) => (
                            <li key={link.url}>
                                <Link
                                    to={link.url}
                                    className="inline-flex items-center px-3 py-2 rounded-full text-white font-inter font-semibold hover:bg-white/10 transition"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="flex items-center gap-4">
                    <CartButton
                        onClick={() => setCartOpen((prev) => !prev)}
                        count={cartItemsCount}
                        buttonLabel="Carrito de compras"
                        buttonTitle="Carrito de compras"
                        imageAlt="Carrito de compras"
                    />
                    <HeaderUserActions
                        user={user}
                        onRequestLogout={() => setIsLogoutModalOpen(true)}
                    />
                </div>
            </div>

            {/* Mobile */}
            <div className="flex justify-between items-center md:hidden py-4 px-8">
                <div className="flex items-center gap-1">
                    <button type="button" onClick={() => setOpen((prev) => !prev)}>
                        <img src="/images/menu.svg" alt="Abrir menú" className="invert"/>
                    </button>
                    <Link to={ROUTES.HOME}>
                        <img
                            src="/images/logo_essences_blanco.svg"
                            alt="Essences Perfumes"
                            className="h-6 w-auto"
                        />
                    </Link>
                </div>
                <div className="flex items-center gap-4 shrink-0 flex-nowrap">
                    <CartButton
                        onClick={() => setCartOpen(true)}
                        count={cartItemsCount}
                        buttonLabel="Carrito de compras"
                        buttonTitle="Abrir carrito de compras"
                        imageAlt="Ícono de carrito"
                    />
                    <HeaderUserActions
                        user={user}
                        onRequestLogout={() => setIsLogoutModalOpen(true)}
                    />
                </div>
            </div>

            {/* Menú móvil */}
            {open && <MobileMenu setOpen={setOpen}/>}

            {/* Carrito */}
            {cartOpen && (
                <div className="fixed inset-0 z-50 bg-gray-200/70">
                    <div className="absolute top-0 right-0 h-full cart-transition cart-open">
                        <Suspense
                            fallback={<div className="h-full w-[320px] bg-white animate-pulse" aria-hidden="true"/>}
                        >
                            <Flayout setOpen={setCartOpen}/>
                        </Suspense>
                    </div>
                </div>
            )}

            <Modal
                isOpen={isLogoutModalOpen}
                onClose={handleLogoutConfirm}
                title="Cerrar sesión"
                description="¿Estás seguro de cerrar sesión?"
                buttonText="Confirmar"
                secondaryButtonText="Cancelar"
                secondaryOnClick={() => setIsLogoutModalOpen(false)}
                iconSrc="/images/warning.svg"
                iconAlt="Confirmar cierre de sesión"
            />
        </header>
    );
};

export default Header;
