import { ROUTES } from "@/core/enum/common";
import { Link } from "react-router-dom";

interface MobileMenuProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function MobileMenu({ setOpen }: MobileMenuProps) {
  const navLinks = [
    { name: "Inicio", url: ROUTES.HOME },
    { name: "Tienda", url: ROUTES.SHOP },
    { name: "Contacto", url: ROUTES.CONTACT },
  ];

  return (
    <div className="p-6 bg-app-black text-white absolute top-0 left-0 z-50 w-full h-screen flex flex-col justify-between md:hidden">
      <div>
        <div className="flex justify-between items-center self-stretch">
          <img src="/images/logo_essences_blanco.svg" alt="Essence Perfumes" className="h-8 w-auto" />

          <button onClick={() => setOpen(false)}>
            <img src="/images/close.svg" alt="Cerrar" className="h-6 w-auto invert" />
          </button>
        </div>
        <input
          type="text"
          className="border border-app-gray bg-app-black rounded-lg p-2 text-base w-full mt-4 text-white placeholder:text-app-light-gray"
          placeholder="Buscar..."
        />

        <nav>
          <ul className="">
            {navLinks.map((link, index) => (
              <li
                key={index}
                className="pt-4 w-full text-white font-inter text-sm font-semibold pb-2 border-b border-app-gray"
              >
                <Link to={link.url} className="w-full">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div>
        <div className="flex justify-between pb-3 border-b border-app-gray">
          <Link
            className="text-lg/[32px] font-inter font-medium tracking-[-0.4px] text-white"
            to="/cart"
          >
            Carrito
          </Link>
          <div className="flex items-center gap-1.5">
            <img
              src="/images/shopping bag.svg"
              alt="Carrito"
              className="h-6 w-6 invert"
            />
            <div className="bg-white h-5 w-5 rounded-full flex justify-center items-center">
              <p className="text-app-black text-center font-inter text-xs font-bold leading-[10px]"> {/* Vista mobile */}
                222
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          <Link to="https://www.instagram.com/ditunpsjb/">
            <img
              src="/images/instagram.svg"
              alt="Instagram"
              className="w-6 h-6"
            />
          </Link>
          <Link to="https://www.facebook.com/ditunpsjb">
            <img
              src="/images/facebook.svg"
              alt="Facebook"
              className="w-6 h-6"
            />
          </Link>
          <Link to="https://www.youtube.com/@comunicaciondigitalunpsjb">
            <img
              src="/images/youtube.svg"
              alt="YouTube"
              className="w-6 h-6"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
