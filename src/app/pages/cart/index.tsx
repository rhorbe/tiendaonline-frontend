import Process from "@/core/components/Process";
import { useState } from "react";

export default function CartPage() {
  const [selectedOption, setSelectedOption] = useState("");
  return (
    <section className="px-8 lg:px-14 py-20">
      <div className="">
        <h1 className="text-app-black font-poppins text-center text-[54px]/[58px] font-medium tracking-[-1px] mb-10">
          Carrito
        </h1>
        <Process activeStep={1} />
      </div>
      <div className="grid md:grid-cols-2 gap-16 py-20">
        <div>
          <div className="overflow-x-auto hidden md:block">
            <table className="min-w-full border-collapse border-b">
              <thead>
                <tr className="">
                  <th className="pb-6 px-4 text-center text-app-black font-inter text-base/[26px] border-app-gray font-semibold border-b">
                    Producto
                  </th>
                  <th className="pb-6 px-4 text-center text-app-black font-inter text-base/[26px] border-app-gray font-semibold border-b">
                    Cantidad
                  </th>
                  <th className="pb-6 px-4 text-center text-app-black font-inter text-base/[26px] border-app-gray font-semibold border-b">
                    Precio
                  </th>
                  <th className="pb-6 px-4 text-center text-app-black font-inter text-base/[26px] border-app-gray font-semibold border-b">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-6 px-4 border-app-light-gray border-b flex gap-4 items-center">
                    <div className="bg-primary w-20 h-24">
                      <img
                        src={"/images/product-one.png"}
                        alt={"Product Img"}
                        className="object-contain object-center h-auto max-h-full w-full"
                      />
                    </div>
                    <div className="flex-shrink-0 space-y-2">
                      <p className="text-app-black font-inter text-sm/[22px] font-semibold">
                        Tray Table
                      </p>
                      <p className="text-app-gray font-inter text-xs/5 font-normal">
                        Color: Black
                      </p>
                      <button className="flex gap-1 items-center">
                        <img
                          src={"/images/close.svg"}
                          alt={"Product Img"}
                          className="object-contain object-center h-6 w-6"
                        />
                        <p className="text-app-gray font-inter text-sm/[22px] font-semibold">
                          Quitar
                        </p>
                      </button>
                    </div>
                  </td>
                  <td className="py-6 px-4 border-app-light-gray border-b">
                    <div className="flex gap-3 items-center border border-app-gray rounded py-3 px-2 w-fit">
                      <button>
                        <img
                          src="/images/minus.svg"
                          alt=""
                          className="h-4 w-4"
                        />
                      </button>
                      <p className="text-app-black font-inter font-semibold text-sm/[20px]">
                        2
                      </p>
                      <button>
                        <img src="/images/add.svg" alt="" className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                  <td className="py-6 px-4 border-app-light-gray border-b">
                    <p className="text-app-black font-inter text-lg/[30px] font-normal text-right">
                      $10.00
                    </p>
                  </td>
                  <td className="py-6 px-4 border-app-light-gray border-b">
                    <p className="text-app-black font-inter text-lg/[30px] font-semibold text-right">
                      $20.00
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="md:hidden">
            <h2 className="pb-6 text-app-black font-inter text-base/[26px] border-app-gray font-semibold border-b">
              Producto
            </h2>
            <div className="w-full border-b border-app-light-gray mb-6">
              <div className="flex justify-between py-6 border-b border-app-light-gray">
                <div className="flex gap-4 items-center">
                  <div className="bg-primary w-20 h-24">
                    <img
                      src={"/images/product-one.png"}
                      alt={"Product Img"}
                      className="object-contain object-center h-auto max-h-full w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-app-black font-inter text-sm/[22px] font-semibold">
                      Tray Table
                    </p>
                    <p className="text-app-gray font-inter text-xs/[18px] font-normal">
                      Color: Black
                    </p>
                    <div className="flex gap-3 items-center border border-app-gray rounded py-3 px-2 w-fit">
                      <button>
                        <img
                          src="/images/minus.svg"
                          alt=""
                          className="h-4 w-4"
                        />
                      </button>
                      <p className="text-app-black font-inter font-semibold text-sm/[20px]">
                        2
                      </p>
                      <button>
                        <img src="/images/add.svg" alt="" className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end gap-2">
                  <p className="text-app-black font-inter text-lg/[30px] font-semibold">
                    $20.00
                  </p>
                  <button className="flex gap-1 items-center">
                    <img
                      src={"/images/close.svg"}
                      alt={"Product Img"}
                      className="object-contain object-center h-6 w-6"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 rounded-md border border-app-gray bg-white space-y-3 mb-4">
          <p className="text-app-black font-poppins text-xl/7 font-medium mb-4">
            Resumen del carrito
          </p>
          <div
            className={`py-3 px-4 flex justify-between items-center rounded-[4px] border border-app-black ${
              selectedOption === "free-shipping" ? "bg-primary" : "bg-white"
            }`}
            onClick={() => setSelectedOption("free-shipping")}
          >
            <div className="flex gap-3 items-center">
              <input
                type="radio"
                name="shipping"
                id="free-shipping"
                checked={selectedOption === "free-shipping"}
                className="appearance-none w-5 h-5 border border-app-black rounded-full checked:bg-app-black checked:border-app-black text-app-black"
              />
              <p className="text-app-black font-inter text-base/[26px]">
                Free Shipping
              </p>
            </div>
            <p className="text-right font-inter text-base/[26px]">$0.00</p>
          </div>

          <div
            className={`py-3 px-4 flex justify-between items-center rounded-[4px] border border-app-black ${
              selectedOption === "express-shipping" ? "bg-primary" : "bg-white"
            }`}
            onClick={() => setSelectedOption("express-shipping")}
          >
            <div className="flex gap-3 items-center">
              <input
                type="radio"
                name="shipping"
                id="express-shipping"
                checked={selectedOption === "express-shipping"}
                className="appearance-none w-5 h-5 border border-app-black rounded-full checked:bg-app-black checked:border-app-black text-app-black"
              />
              <p className="text-app-black font-inter text-base/[26px]">
                Express Shipping
              </p>
            </div>
            <p className="text-right font-inter text-base/[26px]">+$15.00</p>
          </div>

          <div
            className={`py-3 px-4 flex justify-between items-center rounded-[4px] border border-app-black ${
              selectedOption === "express-shipping" ? "bg-primary" : "bg-white"
            }`}
            onClick={() => setSelectedOption("express-shipping")}
          >
            <div className="flex gap-3 items-center">
              <input
                type="radio"
                name="shipping"
                id="express-shipping"
                checked={selectedOption === "express-shipping"}
                className="appearance-none w-5 h-5 border border-app-black rounded-full checked:bg-app-black checked:border-app-black text-app-black"
              />
              <p className="text-app-black font-inter text-base/[26px]">
                Pick Up
              </p>
            </div>
            <p className="text-right font-inter text-base/[26px]">%21.00</p>
          </div>
          <div className="flex justify-between items-center border-b border-app-light-gray py-3">
            <p className="text-app-black font-inter text-base/[26px] font-normal ">
              Subtotal
            </p>
            <p className="text-app-black text-right font-inter text-base/[26px] font-semibold">
              $1234.00
            </p>
          </div>
          <div className="flex justify-between items-center pb-3">
            <p className="text-app-black font-inter text-xl/8 font-semibold ">
              Total
            </p>
            <p className="text-app-black text-right font-inter text-xl/8 font-semibold">
              $1345.00
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-[424px]">
        <p className="text-app-black font-poppins text-xl/7 font-medium mb-2">
          Have a coupon?
        </p>
        <p className="text-app-gray font-inter text-base/[26px] mb-4">
          Add your code for an instant cart discount
        </p>
        <div className="px-4 border border-app-black flex gap-2 items-center w-full">
          <img
            src="/images/ticket-percent.svg"
            alt=""
            className="h-4 md:h-6 w-4 md:w-6"
          />
          <input
            type="text"
            name="coupon"
            id="coupon"
            className="border-none outline-none ring-0 focus:ring-0 w-full"
          />
          <button className="text-app-black font-inter text-base/7 font-medium tracking-[-0.4px]">
            Apply
          </button>
        </div>
      </div>
    </section>
  );
}
