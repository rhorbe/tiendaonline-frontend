import { ROUTES } from "@/core/enum/common";

interface MobileMenuProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function MobileMenu({ setOpen }: MobileMenuProps) {
  const navLinks = [
    { name: "Inicio", url: ROUTES.HOME },
    { name: "Tienda", url: ROUTES.SHOP },
    { name: "Productos", url: ROUTES.PRODUCT },
    { name: "Contacto", url: ROUTES.CONTACT },
  ];

  return (
    <div className="p-6 bg-white absolute top-0 left-0 z-50 w-full h-screen flex flex-col justify-between md:hidden">
      <div>
        <div className="flex justify-between items-center self-stretch">
          <img src="/images/logo_lessence_negro.png" alt="L'Essence Perfumes" className='h-8 w-auto' />

          <button onClick={() => setOpen(false)}>
            <img src="/images/close.svg" alt="Cerrar" className="h-6 w-auto" />
          </button>
        </div>
        <input
          type="text"
          className="border border-app-gray bg-white rounded-lg p-2 text-base w-full mt-4"
          placeholder="Buscar..."
        />

        <nav>
          <ul className="">
            {navLinks.map((link, index) => (
              <li
                key={index}
                className="pt-4 w-full text-app-black font-inter text-sm font-semibold pb-2 border-b border-app-light-gray"
              >
                <a href={link.url} className="w-full">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div>
        <div className="flex justify-between pb-3 border-b border-app-light-gray">
          <a
            className="text-lg/[32px] font-inter font-medium tracking-[-0.4px] text-app-gray"
            href="/cart"
          >
            Carrito
          </a>
          <div className="flex items-center gap-1.5">
            <img
              src="/images/shopping bag.svg"
              alt="Carrito"
              className="h-6 w-6"
            />
            <div className="bg-app-black h-5 w-5 rounded-full flex justify-center items-center">
              <p className="text-white text-center font-inter text-xs font-bold leading-[10px]">
                {/* TODO */}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          <a href="https://www.instagram.com/ditunpsjb/">
            <img
              src="/images/instagram-black.svg"
              alt="Instagram"
              className="w-6 h-6"
            />
          </a>
          <a href="https://www.facebook.com/ditunpsjb">
            <img
              src="/images/faceboo-black.svg"
              alt="Facebook"
              className="w-6 h-6"
            />
          </a>
          <a href="https://www.youtube.com/@comunicaciondigitalunpsjb">
            <img
              src="/images/youtube-black.svg"
              alt="YouTube"
              className="w-6 h-6"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
