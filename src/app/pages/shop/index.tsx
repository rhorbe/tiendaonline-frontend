
export default function ShopPage() {
  return (
    <section className="px-8 lg:px-14">
      <div className="shop-page-banner-bg min-h-[308px] md:h-[392px] max-h-[392px] flex justify-center items-center">
        <div className="max-w-fit flex flex-col items-center gap-4 md:gap-6">
          <div className="w-fit flex gap-4">
            <div className="flex items-center gap-1">
              <p className="text-grayish-brown font-inter text-sm/6 font-medium">Inicio</p>
              <img src="/images/right-icon.svg" alt="right icon" className="w-3 h-3 object-contain" />
            </div>
            <p className="text-app-black font-inter text-sm/[25px] font-medium">
              Tienda
            </p>
          </div>
          <h1 className="text-app-black font-poppins text-[40px]/[44px] md:text-[54px]/[58px] tracking-[-0.4px] md:tracking-[-1px] font-medium">
          Tienda
          </h1>
          <p className="text-app-black font-inter text-center text-base/[26px] md:text-xl/[32px] font-normal">
            Let’s design the place you always imagined.
          </p>
        </div>
      </div>
      <div className="pt-8 md:pt-[60px] pb-[100px] grid md:grid-cols-4 gap-6">
        <div className="flex md:hidden border-y border-app-light-gray col-span-3 justify-between items-center py-2">
          <div className="flex items-center gap-2">
            <img src="/images/filter.svg" alt="filter icon" className="h-6 w-6" />
            <p className="text-app-black font-inter text-base/[28px] md:text-xl/8 font-semibold">
              Filter
            </p>
          </div>
          <div className="flex">
            <button className="py-2 px-3 bg-primary flex justify-center items-center border-r border-app-light-gray">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M8.75 13C9.34674 13 9.91903 13.2371 10.341 13.659C10.7629 14.081 11 14.6533 11 15.25V18.75C11 19.3467 10.7629 19.919 10.341 20.341C9.91903 20.7629 9.34674 21 8.75 21H5.25C4.65326 21 4.08097 20.7629 3.65901 20.341C3.23705 19.919 3 19.3467 3 18.75V15.25C3 14.6533 3.23705 14.081 3.65901 13.659C4.08097 13.2371 4.65326 13 5.25 13H8.75ZM18.75 13C19.3467 13 19.919 13.2371 20.341 13.659C20.7629 14.081 21 14.6533 21 15.25V18.75C21 19.3467 20.7629 19.919 20.341 20.341C19.919 20.7629 19.3467 21 18.75 21H15.25C14.6533 21 14.081 20.7629 13.659 20.341C13.2371 19.919 13 19.3467 13 18.75V15.25C13 14.6533 13.2371 14.081 13.659 13.659C14.081 13.2371 14.6533 13 15.25 13H18.75ZM8.75 3C9.34674 3 9.91903 3.23705 10.341 3.65901C10.7629 4.08097 11 4.65326 11 5.25V8.75C11 9.34674 10.7629 9.91903 10.341 10.341C9.91903 10.7629 9.34674 11 8.75 11H5.25C4.65326 11 4.08097 10.7629 3.65901 10.341C3.23705 9.91903 3 9.34674 3 8.75V5.25C3 4.65326 3.23705 4.08097 3.65901 3.65901C4.08097 3.23705 4.65326 3 5.25 3H8.75ZM18.75 3C19.3467 3 19.919 3.23705 20.341 3.65901C20.7629 4.08097 21 4.65326 21 5.25V8.75C21 9.34674 20.7629 9.91903 20.341 10.341C19.919 10.7629 19.3467 11 18.75 11H15.25C14.6533 11 14.081 10.7629 13.659 10.341C13.2371 9.91903 13 9.34674 13 8.75V5.25C13 4.65326 13.2371 4.08097 13.659 3.65901C14.081 3.23705 14.6533 3 15.25 3H18.75Z" fill="#141718" />
                <path d="M3 6H10.998V18H3V6Z" fill="#141718" />
                <path d="M13.002 6H21V18H13.002V6Z" fill="#141718" />
              </svg>
            </button>
            <button className="py-3 px-3 bg-primary flex justify-center items-center border-t border-app-light-gray rotate-90">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M8.75 13C9.34674 13 9.91903 13.2371 10.341 13.659C10.7629 14.081 11 14.6533 11 15.25V18.75C11 19.3467 10.7629 19.919 10.341 20.341C9.91903 20.7629 9.34674 21 8.75 21H5.25C4.65326 21 4.08097 20.7629 3.65901 20.341C3.23705 19.919 3 19.3467 3 18.75V15.25C3 14.6533 3.23705 14.081 3.65901 13.659C4.08097 13.2371 4.65326 13 5.25 13H8.75ZM18.75 13C19.3467 13 19.919 13.2371 20.341 13.659C20.7629 14.081 21 14.6533 21 15.25V18.75C21 19.3467 20.7629 19.919 20.341 20.341C19.919 20.7629 19.3467 21 18.75 21H15.25C14.6533 21 14.081 20.7629 13.659 20.341C13.2371 19.919 13 19.3467 13 18.75V15.25C13 14.6533 13.2371 14.081 13.659 13.659C14.081 13.2371 14.6533 13 15.25 13H18.75ZM8.75 3C9.34674 3 9.91903 3.23705 10.341 3.65901C10.7629 4.08097 11 4.65326 11 5.25V8.75C11 9.34674 10.7629 9.91903 10.341 10.341C9.91903 10.7629 9.34674 11 8.75 11H5.25C4.65326 11 4.08097 10.7629 3.65901 10.341C3.23705 9.91903 3 9.34674 3 8.75V5.25C3 4.65326 3.23705 4.08097 3.65901 3.65901C4.08097 3.23705 4.65326 3 5.25 3H8.75ZM18.75 3C19.3467 3 19.919 3.23705 20.341 3.65901C20.7629 4.08097 21 4.65326 21 5.25V8.75C21 9.34674 20.7629 9.91903 20.341 10.341C19.919 10.7629 19.3467 11 18.75 11H15.25C14.6533 11 14.081 10.7629 13.659 10.341C13.2371 9.91903 13 9.34674 13 8.75V5.25C13 4.65326 13.2371 4.08097 13.659 3.65901C14.081 3.23705 14.6533 3 15.25 3H18.75Z" fill="#6C7275" />
                <path d="M3 6H10.998V18H3V6Z" fill="#6C7275" />
                <path d="M13.002 6H21V18H13.002V6Z" fill="#6C7275" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex md:hidden col-span-3 justify-between items-center py-2">
          <p className="text-app-black font-inter text-base/[26px] md:text-xl/8 font-semibold">
            Filter
          </p>
          <div className="relative inline-block w-fit">
            <select
              className="w-full appearance-none rounded-md border-none outline-none bg-white px-4 py-2 pr-10 text-gray-900 focus:border-none focus:outline-none focus:ring-0"
            >
              <option className="text-app-black font-inter text-base/[26px] font-semibold w-full">
                Sort by
              </option>
            </select>
          </div>
        </div>
        <div className="col-span-1 hidden md:flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <img src="/images/filter.svg" alt="filter icon" className="h-6 w-6" />
            <p className="text-app-black font-inter text-xl/8 font-semibold">
              Filtro
            </p>
          </div>
          <div className="space-y-2">
            <h1 className="text-app-black font-inter text-base/[26px] font-semibold">
              CATEGORIAS
            </h1>
            <div className="flex flex-col gap-2 max-h-[208px] overflow-y-scroll custom-categroy-scrollbar">
              {
                Array.from({ length: 10 }, (_, idx) =>
                (
                  <button key={idx} className={`font-inter w-fit text-sm/[22px] font-semibold ${idx === 1 ? 'text-app-black border-b border-app-black' : 'text-taup-gray'}`}>
                    All Rooms
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
                  "All Price",
                  "$0.00 - 99.99",
                  "$100.00 - 199.99",
                  "$200.00 - 299.99",
                  "$300.00 - 399.99",
                  "$400.00+"
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
                      Sort by
                    </option>
                </select>
              </div>
              <div className="flex">
                <button className="py-2 px-3 bg-primary flex justify-center items-center border-r border-app-light-gray">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M1.5 3C1.5 2.60218 1.65804 2.22064 1.93934 1.93934C2.22064 1.65804 2.60218 1.5 3 1.5H6C6.39782 1.5 6.77936 1.65804 7.06066 1.93934C7.34196 2.22064 7.5 2.60218 7.5 3V6C7.5 6.39782 7.34196 6.77936 7.06066 7.06066C6.77936 7.34196 6.39782 7.5 6 7.5H3C2.60218 7.5 2.22064 7.34196 1.93934 7.06066C1.65804 6.77936 1.5 6.39782 1.5 6V3ZM9 3C9 2.60218 9.15804 2.22064 9.43934 1.93934C9.72064 1.65804 10.1022 1.5 10.5 1.5H13.5C13.8978 1.5 14.2794 1.65804 14.5607 1.93934C14.842 2.22064 15 2.60218 15 3V6C15 6.39782 14.842 6.77936 14.5607 7.06066C14.2794 7.34196 13.8978 7.5 13.5 7.5H10.5C10.1022 7.5 9.72064 7.34196 9.43934 7.06066C9.15804 6.77936 9 6.39782 9 6V3ZM16.5 3C16.5 2.60218 16.658 2.22064 16.9393 1.93934C17.2206 1.65804 17.6022 1.5 18 1.5H21C21.3978 1.5 21.7794 1.65804 22.0607 1.93934C22.342 2.22064 22.5 2.60218 22.5 3V6C22.5 6.39782 22.342 6.77936 22.0607 7.06066C21.7794 7.34196 21.3978 7.5 21 7.5H18C17.6022 7.5 17.2206 7.34196 16.9393 7.06066C16.658 6.77936 16.5 6.39782 16.5 6V3ZM1.5 10.5C1.5 10.1022 1.65804 9.72064 1.93934 9.43934C2.22064 9.15804 2.60218 9 3 9H6C6.39782 9 6.77936 9.15804 7.06066 9.43934C7.34196 9.72064 7.5 10.1022 7.5 10.5V13.5C7.5 13.8978 7.34196 14.2794 7.06066 14.5607C6.77936 14.842 6.39782 15 6 15H3C2.60218 15 2.22064 14.842 1.93934 14.5607C1.65804 14.2794 1.5 13.8978 1.5 13.5V10.5ZM9 10.5C9 10.1022 9.15804 9.72064 9.43934 9.43934C9.72064 9.15804 10.1022 9 10.5 9H13.5C13.8978 9 14.2794 9.15804 14.5607 9.43934C14.842 9.72064 15 10.1022 15 10.5V13.5C15 13.8978 14.842 14.2794 14.5607 14.5607C14.2794 14.842 13.8978 15 13.5 15H10.5C10.1022 15 9.72064 14.842 9.43934 14.5607C9.15804 14.2794 9 13.8978 9 13.5V10.5ZM16.5 10.5C16.5 10.1022 16.658 9.72064 16.9393 9.43934C17.2206 9.15804 17.6022 9 18 9H21C21.3978 9 21.7794 9.15804 22.0607 9.43934C22.342 9.72064 22.5 10.1022 22.5 10.5V13.5C22.5 13.8978 22.342 14.2794 22.0607 14.5607C21.7794 14.842 21.3978 15 21 15H18C17.6022 15 17.2206 14.842 16.9393 14.5607C16.658 14.2794 16.5 13.8978 16.5 13.5V10.5ZM1.5 18C1.5 17.6022 1.65804 17.2206 1.93934 16.9393C2.22064 16.658 2.60218 16.5 3 16.5H6C6.39782 16.5 6.77936 16.658 7.06066 16.9393C7.34196 17.2206 7.5 17.6022 7.5 18V21C7.5 21.3978 7.34196 21.7794 7.06066 22.0607C6.77936 22.342 6.39782 22.5 6 22.5H3C2.60218 22.5 2.22064 22.342 1.93934 22.0607C1.65804 21.7794 1.5 21.3978 1.5 21V18ZM9 18C9 17.6022 9.15804 17.2206 9.43934 16.9393C9.72064 16.658 10.1022 16.5 10.5 16.5H13.5C13.8978 16.5 14.2794 16.658 14.5607 16.9393C14.842 17.2206 15 17.6022 15 18V21C15 21.3978 14.842 21.7794 14.5607 22.0607C14.2794 22.342 13.8978 22.5 13.5 22.5H10.5C10.1022 22.5 9.72064 22.342 9.43934 22.0607C9.15804 21.7794 9 21.3978 9 21V18ZM16.5 18C16.5 17.6022 16.658 17.2206 16.9393 16.9393C17.2206 16.658 17.6022 16.5 18 16.5H21C21.3978 16.5 21.7794 16.658 22.0607 16.9393C22.342 17.2206 22.5 17.6022 22.5 18V21C22.5 21.3978 22.342 21.7794 22.0607 22.0607C21.7794 22.342 21.3978 22.5 21 22.5H18C17.6022 22.5 17.2206 22.342 16.9393 22.0607C16.658 21.7794 16.5 21.3978 16.5 21V18Z" className="fill-app-black" />
                  </svg>
                </button>
                  <button className="py-2 px-3 bg-primary flex justify-center items-center border-r border-app-light-gray">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                    <path d="M8.75 13.5C9.34674 13.5 9.91903 13.7371 10.341 14.159C10.7629 14.581 11 15.1533 11 15.75V19.25C11 19.8467 10.7629 20.419 10.341 20.841C9.91903 21.2629 9.34674 21.5 8.75 21.5H5.25C4.65326 21.5 4.08097 21.2629 3.65901 20.841C3.23705 20.419 3 19.8467 3 19.25V15.75C3 15.1533 3.23705 14.581 3.65901 14.159C4.08097 13.7371 4.65326 13.5 5.25 13.5H8.75ZM18.75 13.5C19.3467 13.5 19.919 13.7371 20.341 14.159C20.7629 14.581 21 15.1533 21 15.75V19.25C21 19.8467 20.7629 20.419 20.341 20.841C19.919 21.2629 19.3467 21.5 18.75 21.5H15.25C14.6533 21.5 14.081 21.2629 13.659 20.841C13.2371 20.419 13 19.8467 13 19.25V15.75C13 15.1533 13.2371 14.581 13.659 14.159C14.081 13.7371 14.6533 13.5 15.25 13.5H18.75ZM8.75 3.5C9.34674 3.5 9.91903 3.73705 10.341 4.15901C10.7629 4.58097 11 5.15326 11 5.75V9.25C11 9.84674 10.7629 10.419 10.341 10.841C9.91903 11.2629 9.34674 11.5 8.75 11.5H5.25C4.65326 11.5 4.08097 11.2629 3.65901 10.841C3.23705 10.419 3 9.84674 3 9.25V5.75C3 5.15326 3.23705 4.58097 3.65901 4.15901C4.08097 3.73705 4.65326 3.5 5.25 3.5H8.75ZM18.75 3.5C19.3467 3.5 19.919 3.73705 20.341 4.15901C20.7629 4.58097 21 5.15326 21 5.75V9.25C21 9.84674 20.7629 10.419 20.341 10.841C19.919 11.2629 19.3467 11.5 18.75 11.5H15.25C14.6533 11.5 14.081 11.2629 13.659 10.841C13.2371 10.419 13 9.84674 13 9.25V5.75C13 5.15326 13.2371 4.58097 13.659 4.15901C14.081 3.73705 14.6533 3.5 15.25 3.5H18.75Z" fill="#6C7275" />
                  </svg>
                </button>
                <button className="py-2 px-3 bg-primary flex justify-center items-center border-r border-app-light-gray">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M8.75 13C9.34674 13 9.91903 13.2371 10.341 13.659C10.7629 14.081 11 14.6533 11 15.25V18.75C11 19.3467 10.7629 19.919 10.341 20.341C9.91903 20.7629 9.34674 21 8.75 21H5.25C4.65326 21 4.08097 20.7629 3.65901 20.341C3.23705 19.919 3 19.3467 3 18.75V15.25C3 14.6533 3.23705 14.081 3.65901 13.659C4.08097 13.2371 4.65326 13 5.25 13H8.75ZM18.75 13C19.3467 13 19.919 13.2371 20.341 13.659C20.7629 14.081 21 14.6533 21 15.25V18.75C21 19.3467 20.7629 19.919 20.341 20.341C19.919 20.7629 19.3467 21 18.75 21H15.25C14.6533 21 14.081 20.7629 13.659 20.341C13.2371 19.919 13 19.3467 13 18.75V15.25C13 14.6533 13.2371 14.081 13.659 13.659C14.081 13.2371 14.6533 13 15.25 13H18.75ZM8.75 3C9.34674 3 9.91903 3.23705 10.341 3.65901C10.7629 4.08097 11 4.65326 11 5.25V8.75C11 9.34674 10.7629 9.91903 10.341 10.341C9.91903 10.7629 9.34674 11 8.75 11H5.25C4.65326 11 4.08097 10.7629 3.65901 10.341C3.23705 9.91903 3 9.34674 3 8.75V5.25C3 4.65326 3.23705 4.08097 3.65901 3.65901C4.08097 3.23705 4.65326 3 5.25 3H8.75ZM18.75 3C19.3467 3 19.919 3.23705 20.341 3.65901C20.7629 4.08097 21 4.65326 21 5.25V8.75C21 9.34674 20.7629 9.91903 20.341 10.341C19.919 10.7629 19.3467 11 18.75 11H15.25C14.6533 11 14.081 10.7629 13.659 10.341C13.2371 9.91903 13 9.34674 13 8.75V5.25C13 4.65326 13.2371 4.08097 13.659 3.65901C14.081 3.23705 14.6533 3 15.25 3H18.75Z" fill="#6C7275" />
                    <path d="M3 6H10.998V18H3V6Z" fill="#6C7275" />
                    <path d="M13.002 6H21V18H13.002V6Z" fill="#6C7275" />
                  </svg>
                </button>
                <button className="py-3 px-3 bg-primary flex justify-center items-center border-t border-app-light-gray rotate-90">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M8.75 13C9.34674 13 9.91903 13.2371 10.341 13.659C10.7629 14.081 11 14.6533 11 15.25V18.75C11 19.3467 10.7629 19.919 10.341 20.341C9.91903 20.7629 9.34674 21 8.75 21H5.25C4.65326 21 4.08097 20.7629 3.65901 20.341C3.23705 19.919 3 19.3467 3 18.75V15.25C3 14.6533 3.23705 14.081 3.65901 13.659C4.08097 13.2371 4.65326 13 5.25 13H8.75ZM18.75 13C19.3467 13 19.919 13.2371 20.341 13.659C20.7629 14.081 21 14.6533 21 15.25V18.75C21 19.3467 20.7629 19.919 20.341 20.341C19.919 20.7629 19.3467 21 18.75 21H15.25C14.6533 21 14.081 20.7629 13.659 20.341C13.2371 19.919 13 19.3467 13 18.75V15.25C13 14.6533 13.2371 14.081 13.659 13.659C14.081 13.2371 14.6533 13 15.25 13H18.75ZM8.75 3C9.34674 3 9.91903 3.23705 10.341 3.65901C10.7629 4.08097 11 4.65326 11 5.25V8.75C11 9.34674 10.7629 9.91903 10.341 10.341C9.91903 10.7629 9.34674 11 8.75 11H5.25C4.65326 11 4.08097 10.7629 3.65901 10.341C3.23705 9.91903 3 9.34674 3 8.75V5.25C3 4.65326 3.23705 4.08097 3.65901 3.65901C4.08097 3.23705 4.65326 3 5.25 3H8.75ZM18.75 3C19.3467 3 19.919 3.23705 20.341 3.65901C20.7629 4.08097 21 4.65326 21 5.25V8.75C21 9.34674 20.7629 9.91903 20.341 10.341C19.919 10.7629 19.3467 11 18.75 11H15.25C14.6533 11 14.081 10.7629 13.659 10.341C13.2371 9.91903 13 9.34674 13 8.75V5.25C13 4.65326 13.2371 4.08097 13.659 3.65901C14.081 3.23705 14.6533 3 15.25 3H18.75Z" fill="#6C7275" />
                    <path d="M3 6H10.998V18H3V6Z" fill="#6C7275" />
                    <path d="M13.002 6H21V18H13.002V6Z" fill="#6C7275" />
                  </svg>
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
                          <p className='text-app-black font-inter text-base font-bold uppercase'>New</p>
                        </div>
                        <div className='px-3 py-1 bg-app-green rounded mt-2'>
                          <p className='text-white font-inter text-base font-bold uppercase'>-50%</p>
                        </div>
                      </div>
                      <div className='bg-white p-1.5 rounded-3xl h-8 w-8 shadow-wishlist-icon'>
                        <img src="/images/wishlist.svg" alt="whishlist" className='h-5 w-5' />
                      </div>
                    </div>
                    <button className='text-white text-center font-inter text-base/6 md:text-base/7 font-medium tracking-[-0.4px] bg-app-black rounded-lg w-full px-4 md:px-10 py-2 md:py-[10px]'>
                      Agregar al Carrito
                    </button>
                  </div>
                  <div className='mt-3'>
                    <div className='flex gap-0.5 mb-2'>
                      {
                        Array.from({ length: 5 }, (_, idx) => (
                          <img key={idx} src="/images/star-icon.svg" alt="star icon" />
                        ))
                      }
                    </div>
                    <h3 className='mb-2 text-app-black font-inter text-base/[26px] font-medium'>
                      Loveseat Sofa
                    </h3>
                    <div className='flex gap-3.5 items-center'>
                      <p className='text-app-black font-inter text-sm/[22px] font-semibold'>
                        $199.00
                      </p>
                      <p className='text-app-gray font-inter text-sm/[22px] font-semibold'>
                        $400.00
                      </p>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
          <div className="flex justify-center">
            <button className="py-1.5 px-10 rounded-[80px] border border-app-black text-center font-inter text-base/7 font-semibold tracking-[-0.4px]">
              Show more
          </button>
          </div>
        </div>
      </div>
    </section>
  )
}
