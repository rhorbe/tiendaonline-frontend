import { FC, useState } from "react";
import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import { Flayout } from "../../Cart/Flayout";
import { ROUTES } from "@/core/enum/common";
import UserDropdown from "../../UserDropdown";
import { useProductContext } from "@/store/useProductContext";

const Header: FC = () => {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { state } = useProductContext();
  const cartItemsCount = state.cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: "Tienda", url: ROUTES.SHOP },
    { name: "Contacto", url: ROUTES.CONTACT },
  ];

  return (
    <header className="relative">
      {/* Desktop */}
      <div className="hidden md:flex justify-between items-center mx-auto px-4 md:px-7 lg:px-14 py-4">
        <div className="flex items-center">
          <Link to={ROUTES.HOME}>
            <img
              src="/images/logo_essences.svg"
              alt="Essences"
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
                  className="text-app-black font-inter font-semibold"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <UserDropdown />
          <button
            onClick={() => setCartOpen(!cartOpen)}
            className="flex items-center gap-1.5"
          >
            <img
              src="/images/shopping bag.svg"
              alt="Carrito de compras"
              className="h-6 w-6"
            />
            <div className="bg-app-black h-5 w-5 rounded-full flex justify-center items-center">
              <p className="text-white text-center font-inter text-xs font-bold leading-[10px]">
                {cartItemsCount}
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex justify-between items-center md:hidden py-4 px-8">
        <div className="flex items-center gap-1">
          <button onClick={() => setOpen(!open)}>
            <img src="/images/menu.svg" alt="Abrir menú" />
          </button>
          <Link to={ROUTES.HOME}>
            <img
              src="/images/logo_essences.svg"
              alt="Essences Perfumes"
              className="h-6 w-auto"
            />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <UserDropdown />
          <div className="px-[1px] py-0.5">
            <button
              onClick={() => setCartOpen(true)}
              className="flex items-center gap-1.5"
            >
              <img
                src="/images/shopping bag.svg"
                alt="Ícono de carrito"
                className="h-6 w-6"
              />
              <div className="bg-app-black h-5 w-5 rounded-full flex justify-center items-center">
                <p className="text-white text-center font-inter text-xs font-bold leading-[10px]">
                  {cartItemsCount}
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {open && <MobileMenu setOpen={setOpen} />}

      {/* Carrito */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-gray-200/70">
          <div className="absolute top-0 right-0 h-full cart-transition cart-open">
            <Flayout setOpen={setCartOpen} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
