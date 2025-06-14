export default function Footer() {
  const navLinks = [
    { name: "Inicio", url: "/" },
    { name: "Tienda", url: "/shop" },
    { name: "Productos", url: "/product/1" },
    { name: "Contacto", url: "/contact" },
  ];
  return (
    <footer className="px-8 md:px-7 lg:px-14 py-12 md:pt-20 md:pb-8 bg-app-black">
      <div className="flex flex-col md:flex-row justify-between items-center mb-[49px] 2xl:container mx-auto gap-10">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex items-center">
            <img
              src="/images/logo_lessence_blanco.png"
              alt="L'Essence Perfumes"
              className="h-7 w-auto"
            />
          </div>
          <div className="h-[1px] w-6 md:min-h-6 md:w-[1px] bg-app-gray" />
          <p className="max-w-[350px] flex-shrink-0 text-white font-inter text-sm/[22px]">
            Parfums
          </p>
        </div>
        <div>
          <nav className="text-center">
            <ul className="flex flex-col md:flex-row justify-center items-center gap-8">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-white font-inter text-sm font-semibold"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className="py-4 flex flex-col-reverse md:flex-row justify-between items-center 2xl:container mx-auto border-t-[0.5px] border-app-gray gap-8">
        <div className="flex flex-col md:flex-row gap-7 items-center">
          <p className="max-w-[350px] flex-shrink-0 text-app-light-gray font-poppins text-sm/[20px]">
            Copyright © 2025 - Universidad Nacional de la Patagonia
          </p>
        </div>

        <div className="flex gap-6 items-center">
          <a href="https://www.instagram.com/ditunpsjb/">
            <img
              src="/images/instagram.svg"
              alt="Instagram del Departamento de Informática Trelew de la Univarsidad Nacional de la Patagonia"
              className="h-6 w-6 object-contain"
            />
          </a>
          <a href="https://www.facebook.com/ditunpsjb">
            <img
              src="/images/facebook.svg"
              alt="Facebook del Departamento de Informática Trelew de la Univarsidad Nacional de la Patagonia"
              className="h-6 w-6 object-contain"
            />
          </a>

          <a href="https://www.youtube.com/@comunicaciondigitalunpsjb">
            <img
              alt="DIT en Youtube"
              src="/images/youtube.svg"
              className="h-6 w-6 object-contain"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
