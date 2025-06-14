import AccountDetails from "@/core/components/Account/Account";
import Address from "@/core/components/Account/Address";
import Orders from "@/core/components/Account/Orders";
import Wishlist from "@/core/components/Account/Wishlist";
import { useState } from "react";

export default function ProfilePage() {
    const [activeIndex, setActiveIndex] = useState(0);
  return (
      <section className="px-8 lg:px-14 pb-20">
          <h1 className="py-10 md:py-20 font-poppins text-[40px]/[44px] md:text-[54px]/[58px] text-center font-medium">
              Mi Cuenta
          </h1>
          <div className="flex flex-col md:flex-row">
              <div className="py-10 px-4 w-full md:w-fit bg-app-light-gray rounded-lg space-y-10 h-fit">
                  <div className="flex flex-col items-center gap-[6px]">
                      <div className="w-[82px] h-[82px] relative">
                          <img src="/images/avatar_placeholder.png" alt="Avatar" className="w-full h-full object-contain object-center" />
                          <div className="absolute bottom-0 right-0 p-[7px] rounded-full border-[1.5px] border-white bg-app-black">
                              <img src="/images/camera.svg" alt="Cámara" className="w-4 h-4 object-contain object-center" />
                          </div>
                      </div>
                      <p className="text-app-black font-inter text-xl/8 font-semibold">
                          Sofía Havertz
                      </p>
                  </div>
                  <ul className="space-y-2 min-w-[230px] hidden md:block">
                      {['Cuenta', 'Dirección', 'Pedidos', 'Favoritos', 'Cerrar sesión'].map((item, index) => (
                          <li
                              key={index}
                              onClick={() => setActiveIndex(index)} 
                              className={`py-2 font-inter text-base font-semibold leading-[26px] cursor-pointer ${activeIndex === index ? 'text-app-black border-b border-app-black' : 'text-app-gray'
                                  }`}>
                              {item}
                          </li>
                      ))}
                  </ul>
                  <div className="min-w-[230px] block md:hidden">
                      <select
                          className="w-full py-2 font-inter text-base font-semibold leading-[26px] cursor-pointer border border-app-gray rounded-md"
                          value={activeIndex}
                          onChange={(e) => setActiveIndex(parseInt(e.target.value))}
                      >
                          {['Cuenta', 'Dirección', 'Pedidos', 'Favoritos', 'Cerrar sesión'].map((item, index) => (
                              <option
                                  key={index}
                                  value={index}
                                  className={`font-inter text-base font-semibold leading-[26px] ${activeIndex == index ? 'text-app-black' : 'text-app-gray'
                                      }`}
                              >
                                  {item}
                              </option>
                          ))}
                      </select>
                  </div>
              </div>
              {
                  activeIndex == 0 &&
                  <AccountDetails />
              }
              {
                  activeIndex == 1 &&
                  <Address />
              }
              {
                  activeIndex == 2 &&
                  <Orders />
              }
              {
                  activeIndex == 3 && 
                  <Wishlist />
              }
          </div>
    </section>
  )
}
