import { FC, useState } from "react";
import MobileMenu from "./MobileMenu";
import { Flayout } from "../../Cart/Flayout";
import { ROUTES } from "@/core/enum/common";
import UserDropdown from "../../UserDropdown";

const Header: FC = () => {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const navLinks = [
    { name: "Tienda", url: ROUTES.SHOP },
    { name: "Contacto", url: ROUTES.CONTACT },
  ];

  return (
    <header className="relative">
      <div className="hidden md:flex justify-between items-center mx-auto px-4 md:px-7 lg:px-14 py-4">
        <div className="flex items-center">
          <a href={ROUTES.HOME}>
            <img
              src="/images/logo_lessence_negro.png"
              alt="L'Essence Perfumes"
              className="h-8 w-auto"
            />
          </a>
        </div>
        <nav className="flex-grow text-center">
          <ul className="flex justify-center items-center space-x-10">
            {navLinks.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  className="text-app-black font-inter text-sm font-semibold"
                >
                  {link.name}
                </a>
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
                {" "}
                {/* Vista grande */}2
              </p>
            </div>
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center md:hidden py-4 px-8">
        <div className="flex items-center gap-1">
          <button onClick={() => setOpen(!open)}>
            <img src="/images/menu.svg" alt="Abrir menú" />
          </button>
          <img
            src="/images/logo_lessence_negro.png"
            alt="L'Essence Perfumes"
            className="h-6 w-auto"
          />
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
                  22
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
      {open && <MobileMenu setOpen={setOpen} />}
      <div
        className={`cart-transition ${
          cartOpen ? "cart-open absolute top-0 right-0 z-50" : ""
        }`}
      >
        {cartOpen && <Flayout setOpen={setCartOpen} />}
      </div>
    </header>
  );
};

export default Header;
