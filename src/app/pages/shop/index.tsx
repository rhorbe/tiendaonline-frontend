export default function ShopPage() {
  return (
    <section className="px-8 lg:px-14">
      <div className="shop-page-banner-bg min-h-[308px] md:h-[392px] max-h-[392px] flex justify-center items-center">
        <div className="max-w-fit flex flex-col items-center gap-4 md:gap-6">
          <div className="w-fit flex gap-4">
            <div className="flex items-center gap-1">
              <p className="text-grayish-brown font-inter text-sm/6 font-medium">Inicio</p>
              <img src="/images/right-icon.svg" alt="icono derecha" className="w-3 h-3 object-contain" />
            </div>
            <p className="text-app-black font-inter text-sm/[25px] font-medium">
              Tienda
            </p>
          </div>
          <h1 className="text-app-black font-poppins text-[40px]/[44px] md:text-[54px]/[58px] tracking-[-0.4px] md:tracking-[-1px] font-medium">
            Tienda
          </h1>
          <p className="text-app-black font-inter text-center text-base/[26px] md:text-xl/[32px] font-normal">
            Diseñemos el lugar que siempre imaginaste.
          </p>
        </div>
      </div>
      <div className="pt-8 md:pt-[60px] pb-[100px] grid md:grid-cols-4 gap-6">
        <div className="flex md:hidden border-y border-app-light-gray col-span-3 justify-between items-center py-2">
          <div className="flex items-center gap-2">
            <img src="/images/filter.svg" alt="icono filtro" className="h-6 w-6" />
            <p className="text-app-black font-inter text-base/[28px] md:text-xl/8 font-semibold">
              Filtro
            </p>
          </div>
          <div className="flex">
            <button className="py-2 px-3 bg-primary flex justify-center items-center border-r border-app-light-gray">
              {/* SVG */}
            </button>
            <button className="py-3 px-3 bg-primary flex justify-center items-center border-t border-app-light-gray rotate-90">
              {/* SVG */}
            </button>
          </div>
        </div>
        <div className="flex md:hidden col-span-3 justify-between items-center py-2">
          <p className="text-app-black font-inter text-base/[26px] md:text-xl/8 font-semibold">
            Filtro
          </p>
          <div className="relative inline-block w-fit">
            <select
              className="w-full appearance-none rounded-md border-none outline-none bg-white px-4 py-2 pr-10 text-gray-900 focus:border-none focus:outline-none focus:ring-0"
            >
              <option className="text-app-black font-inter text-base/[26px] font-semibold w-full">
                Ordenar por
              </option>
            </select>
          </div>
        </div>
        <div className="col-span-1 hidden md:flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <img src="/images/filter.svg" alt="icono filtro" className="h-6 w-6" />
            <p className="text-app-black font-inter text-xl/8 font-semibold">
              Filtro
            </p>
          </div>
          <div className="space-y-2">
            <h1 className="text-app-black font-inter text-base/[26px] font-semibold">
              CATEGORÍAS
            </h1>
            <div className="flex flex-col gap-2 max-h-[208px] overflow-y-scroll custom-categroy-scrollbar">
              {
                Array.from({ length: 10 }, (_, idx) =>
                (
                  <button key={idx} className={`font-inter w-fit text-sm/[22px] font-semibold ${idx === 1 ? 'text-app-black border-b border-app-black' : 'text-taup-gray'}`}>
                    Todos los ambientes
                  </button>
                )
                )
              }
            </div>
          </div>
          <div>
            <h1 className="text-app-black font-inter text-base/[26px] font-semibold mb-4">
              PRECIO
            </h1>
            <div className="flex flex-col gap-2">
              {
                [
                  "Todos los precios",
                  "$0,00 - 99,99",
                  "$100,00 - 199,99",
                  "$200,00 - 299,99",
                  "$300,00 - 399,99",
                  "$400,00+"
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <p className="text-app-gray font-inter text-sm/[22px] font-semibold">
                      {item}
                    </p>
                    <input
                      id="accept"
                      type="checkbox"
                      className="w-6 h-6 text-gray-500 border-2 rounded focus:ring-0 checked:bg-app-black checked:border-[#6C7275] cursor-pointer"
                    />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="hidden md:flex justify-between items-center mb-10">
            <p className="text-app-black font-inter text-xl/8 font-semibold">
              Filtro
            </p>
            <div className="flex gap-8">
              <div className="relative inline-block w-fit">
                <select
                  className="w-full appearance-none rounded-md border-none outline-none bg-white px-4 py-2 pr-10 text-gray-900 focus:border-none focus:outline-none focus:ring-0"
                >
                  <option className="text-app-black font-inter text-base/[26px] font-semibold">
                    Ordenar por
                  </option>
                </select>
              </div>
              <div className="flex">
                <button className="py-2 px-3 bg-primary flex justify-center items-center border-r border-app-light-gray">
                  {/* SVG */}
                </button>
                <button className="py-2 px-3 bg-primary flex justify-center items-center border-r border-app-light-gray">
                  {/* SVG */}
                </button>
                <button className="py-2 px-3 bg-primary flex justify-center items-center border-r border-app-light-gray">
                  {/* SVG */}
                </button>
                <button className="py-3 px-3 bg-primary flex justify-center items-center border-t border-app-light-gray rotate-90">
                  {/* SVG */}
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-20">
            {
              Array.from({ length: 9 }, (_, idx) =>
                <div key={idx}>
                  <div
                    style={{
                      background: 'url(/images/product-one.png)',
                      backgroundPosition: 'center',
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                    }}
                    className='bg-primary h-[308px] md:h-[349px] py-4 px-3 md:p-4 flex flex-col justify-between'
                  >
                    <div className='flex justify-between items-center '>
                      <div>
                        <div className='px-3 py-1 bg-white rounded'>
                          <p className='text-app-black font-inter text-base font-bold uppercase'>Nuevo</p>
                        </div>
                        <div className='px-3 py-1 bg-app-green rounded mt-2'>
                          <p className='text-white font-inter text-base font-bold uppercase'>-50%</p>
                        </div>
                      </div>
                      <div className='bg-white p-1.5 rounded-3xl h-8 w-8 shadow-wishlist-icon'>
                        <img src="/images/wishlist.svg" alt="favoritos" className='h-5 w-5' />
                      </div>
                    </div>
                    <button className='text-white text-center font-inter text-base/6 md:text-base/7 font-medium tracking-[-0.4px] bg-app-black rounded-lg w-full px-4 md:px-10 py-2 md:py-[10px]'>
                      Agregar al carrito
                    </button>
                  </div>
                  <div className='mt-3'>
                    <div className='flex gap-0.5 mb-2'>
                      {
                        Array.from({ length: 5 }, (_, idx) => (
                          <img key={idx} src="/images/star-icon.svg" alt="estrella" />
                        ))
                      }
                    </div>
                    <h3 className='mb-2 text-app-black font-inter text-base/[26px] font-medium'>
                      Sofá Loveseat
                    </h3>
                    <div className='flex gap-3.5 items-center'>
                      <p className='text-app-black font-inter text-sm/[22px] font-semibold'>
                        $199,00
                      </p>
                      <p className='text-app-gray font-inter text-sm/[22px] font-semibold'>
                        $400,00
                      </p>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
          <div className="flex justify-center">
            <button className="py-1.5 px-10 rounded-[80px] border border-app-black text-center font-inter text-base/7 font-semibold tracking-[-0.4px]">
              Ver más
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
