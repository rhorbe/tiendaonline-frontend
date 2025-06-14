import CustomAccordion from "@/core/components/Accordian";
import ProductSlider from "@/core/components/ProductSlider/indext";


export default function ProductPage() {

  return (
      <section className="px-8 lg:px-14 border-t border-app-light-gray">
          <div className="w-fit flex gap-3 md:gap-4 py-4">
              <div className="flex items-center gap-1">
                  <p className="text-grayish-brown font-inter text-xs/5 md:text-sm/6 font-medium">Home</p>
                  <img src="/images/right-icon.svg" alt="right icon" className="w-3 h-3 object-contain" />
              </div>
              <p className="text-app-black font-inter text-sm/[25px] font-medium">
                  Shop
              </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className=''>
                  <ProductSlider />
              </div>
              <div>
                  <div className="space-y-4 pb-6 border-b border-app-light-gray">
                      <div className="flex gap-[10px] items-center">
                          <div className='flex gap-0.5'>
                              {
                                  Array.from({ length: 5 }, (_, idx) => (
                                      <img key={idx} src="/images/star-icon.svg" alt="star icon" className="h-4 w-4" />
                                  ))
                              }
                          </div>
                      </div>
                      <h1 className="text-app-black font-poppins text-[40px]/[44px] font-medium tracking-[-0.4px]">
                          Tray Table
                      </h1>
                      <p className="text-app-gray text-base/[26px] font-inter">
                          Buy one or buy a few and make every space where you sit more convenient. Light and easy to move around with removable tray top, handy for serving snacks.
                      </p>
                      <div className='flex gap-3 items-center'>
                          <p className='text-app-black font-poppins text-[28px]/[34px] font-semibold tracking-[-0.6px]'>
                              $199.00
                          </p>
                          <p className='text-app-gray font-poppins text-[28px]/[34px] font-semibold tracking-[-0.6px]'>
                              $400.00
                          </p>
                      </div>
                      <div className="py-6 border-b border-app-light-gray">
                          <p className="font-inter text-base/6 mb-3">
                              Offer expires in:
                          </p>
                          <div className="flex gap-4 items-center">
                              {
                                  Array.from({ length: 4 }, (_, idx) => (
                                  <div key={idx}>
                                      <p className="text-app-black font-poppins text-[34px]/[38px] font-medium tracking-[-0.6px] bg-primary py-3 px-2">
                                          02
                                      </p>
                                      <p className="text-app-gray text-center font-inter text-xs/5">
                                          Days
                                      </p>
                                  </div>
                                  ))
                             }
                          </div>
                      </div>
                      <div className="py-6">
                          <p className="text-app-gray font-inter text-base/[26px] font-semibold mb-2">
                              Measurements
                          </p>
                          <p className="text-app-black font-inter text-xl/8 mb-6">
                              17 1/2x20 5/8 "
                          </p>
                          <div className="flex gap-1 items-center mb-2">
                              <p className="font-inter text-app-gray text-base/[26px] font-semibold">
                                  Choose Color
                              </p>
                              <img src="/images/right-icon.svg" alt="right icon" className="w-5 h-5 object-contain" />
                          </div>
                          <p className="text-app-black font-inter text-xl/8 font-normal mb-4">
                              Black
                          </p>
                          <div className="flex gap-4 items-center overflow-x-scroll hide-scrollbar">
                              {
                                  Array.from({ length: 4 }, (_, idx) => (
                                      <img key={idx} src="/images/product-color.png" alt="product" className="w-[72px] h-[72px] object-contain" />
                                  ))
                            }                              
                          </div>
                          <div className="py-8">
                              <div className="flex gap-6 items-center mb-4">
                                  <div className="flex flex-shrink-0 gap-6 items-center bg-primary rounded py-3 px-4 w-fit">
                                      <button>
                                          <img src="/images/minus.svg" alt="" className="h-5 w-5" />
                                      </button>
                                      <p className="text-app-black font-inter font-semibold text-base/[26px]">2</p>
                                      <button>
                                          <img src="/images/add.svg" alt="" className="h-5 w-5" />
                                      </button>
                                  </div>
                                  <button className="flex w-full justify-center items-center gap-2 py-[10px] px-10 rounded-lg border border-app-black">
                                      <img src="/images/wishlist-dark.svg" alt="whishlist" className='h-6 w-6' />
                                      <p className="text-app-black font-inter text-lg/8 font-medium tracking-[-0.4px]">
                                          Wishlist
                                      </p>
                                  </button>
                              </div>
                              <button className='text-white text-center font-inter text-base font-medium leading-[28px] tracking-[-0.4px] bg-app-black rounded-lg w-full px-10 py-[10px]'>
                                  Agregar al Carrito
                              </button>
                          </div>
                          <div className="py-6 border-t space-y-2 border-app-light-gray">
                              <div className="flex items-center gap-24">
                                  <p className="text-app-gray font-inter text-xs/5 font-normal">
                                      SKU
                                  </p>
                                  <p className="text-app-black font-inter text-xs/5 font-normal">
                                      1117
                                  </p>
                              </div>
                              <div className="flex items-center gap-24">
                                  <p className="text-app-gray font-inter text-xs/5 font-normal">
                                      CATEGORY
                                  </p>
                                  <p className="text-app-black font-inter text-xs/5 font-normal">
                                      Living Room, Bedroom
                                  </p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="py-10 hidden md:block">
              <div className="flex gap-20 border-b border-app-light-gray mb-12">
                  <button className="text-app-gray font-inter text-lg/8 font-medium tracking-[-0.4px]">
                      Additional Info
                  </button>
                  <button className="text-app-gray font-inter text-lg/8 font-medium tracking-[-0.4px]">
                      Questions
                  </button>
                  <button className="text-app-black border-b border-app-black font-inter text-lg/8 font-medium tracking-[-0.4px]">
                      Reviews
                  </button>
              </div>
              <p className="text-app-black font-poppins text-[28px]/[34px] font-medium tracking-[-0.6px] mb-6">
                  Customer Reviews
              </p>
              <div className="flex gap-2 items-center mb-2">
                  <div className='flex gap-0.5'>
                      {
                          Array.from({ length: 5 }, (_, idx) => (
                              <img key={idx} src="/images/star-icon.svg" alt="star icon" className="h-4 w-4" />
                          ))
                      }
                  </div>
                  <p className="text-app-black font-inter text-xs/5 font-normal">11 reviews</p>
              </div>
              <div className="flex gap-2 items-center mb-7">
                  <p className="text-app-black font-inter text-base/[26px] font-normal">Be the first to review</p>
                  <p className="text-app-black font-inter text-base/[26px] font-semibold">
                      Tray Table
                  </p>
              </div>
              <div className="relative items-center mb-10">
                  <input
                      type="email"
                      id="default-email"
                      className="block w-full p-4 ps-6 text-sm text-app-black bg-white border border-app-light-gray rounded-2xl md:rounded-[32px] focus:ring-0"
                      placeholder="Enter your email here..."
                      required
                  />
                  <button
                      type="submit"
                      className="hidden md:block absolute right-2.5 top-1.5 py-1.5 px-10 bg-app-black rounded-[80px] text-white text-center font-inter font-medium text-base/8 tracking-[-0.4px]"
                  >
                      Write Review
                  </button>
                  <button className="block md:hidden absolute right-3 top-2.5 p-1 rounded-[100px] bg-app-black">
                      <img src="/images/right-icon-white.svg" alt="" className="h-6 w-6" />
                  </button>
              </div>
              <div className="flex flex-col md:flex-row justify-between gap-6 md:items-center mb-10">
                  <p className="text-app-black font-poppins text-[28px]/[34px] font-medium tracking-[-0.6px]">
                      11 Reviews
                  </p>
                  <select
                      className="w-full md:max-w-[256px] appearance-none rounded-md border-b-2 border-app-light-gray md:border-none outline-none bg-white px-4 py-2 pr-10 text-gray-900 focus:border-none focus:outline-none focus:ring-0"
                  >
                      <option className="text-app-black font-inter text-base/[26px] font-semibold">
                          Sort by
                      </option>
                  </select>
              </div>
              <div className="space-y-6">
                  {
                      Array.from({ length: 6 }, (_, idx) => (
                          <div key={idx}>
                          <div  className="flex gap-10 pb-6">
                              <img src="/images/avatar_placeholder.png" alt="avatar" className="rounded-[40px] h-[72px] w-[72px] object-contain" />
                              <div className="w-full space-y-4">
                                  <p className="text-app-black font-inter text-xl/8 font-semibold">
                                      Sofia Sofia
                                  </p>
                                  <div className='flex gap-0.5'>
                                      {
                                          Array.from({ length: 5 }, (_, idx) => (
                                              <img key={idx} src="/images/star-icon.svg" alt="star icon" className="h-4 w-4" />
                                          ))
                                      }
                                  </div>
                                  <p className="hidden md:block text-app-slate-gray font-inter text-base/[26px] font-normal">
                                      I bought it 3 weeks ago and now come back just to say “Awesome Product”. I really enjoy it. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupt et quas molestias excepturi sint non provident.
                                  </p>
                                  <div className="hidden md:flex gap-4 mt-2">
                                      <p className="text-app-gray font-inter text-xs/5 font-normal">
                                          about 1 hour ago
                                      </p>
                                      <p className="text-app-black font-inter text-xs/5 font-semibold">
                                          Like
                                      </p>
                                      <p className="text-app-black font-inter text-xs/5 font-semibold">
                                          Reply
                                      </p>
                                  </div>
                              </div>
                              </div>
                              <div>
                                  <p className="block md:hidden text-app-slate-gray font-inter text-base/[26px] font-normal">
                                      I bought it 3 weeks ago and now come back just to say “Awesome Product”. I really enjoy it. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupt et quas molestias excepturi sint non provident.
                                  </p>
                                  <div className="flex md:hidden gap-4 mt-2">
                                      <p className="text-app-gray font-inter text-xs/5 font-normal">
                                          about 1 hour ago
                                      </p>
                                      <p className="text-app-black font-inter text-xs/5 font-semibold">
                                          Like
                                      </p>
                                      <p className="text-app-black font-inter text-xs/5 font-semibold">
                                          Reply
                                      </p>
                                  </div>
                              </div>
                              </div>
                      ))
                  }
                  <div className="flex justify-center">
                      <button className="py-1.5 px-10 rounded-[80px] border border-app-black text-center font-inter text-base/7 font-semibold tracking-[-0.4px]">
                          Show more
                      </button>
                  </div>
              </div>
          </div>
          <div className="block md:hidden py-10">
              <CustomAccordion
                  id="1"
                  title="Additional Info"
                  content={
                      <>
                          <p className="text-app-black font-poppins text-[28px]/[34px] font-medium tracking-[-0.6px] mb-6">
                              Additional Info
                          </p>
                          <div className="flex gap-2 items-center mb-2">
                              <div className='flex gap-0.5'>
                                  {
                                      Array.from({ length: 5 }, (_, idx) => (
                                          <img key={idx} src="/images/star-icon.svg" alt="star icon" className="h-4 w-4" />
                                      ))
                                  }
                              </div>
                              <p className="text-app-black font-inter text-xs/5 font-normal">11 reviews</p>
                          </div>
                          <div className="flex gap-2 items-center mb-7">
                              <p className="text-app-black font-inter text-base/[26px] font-normal">Be the first to review</p>
                              <p className="text-app-black font-inter text-base/[26px] font-semibold">
                                  Tray Table
                              </p>
                          </div>
                          <div className="relative items-center mb-10">
                              <input
                                  type="email"
                                  id="default-email"
                                  className="block w-full p-4 ps-6 text-sm text-app-black bg-white border border-app-light-gray rounded-2xl md:rounded-[32px] focus:ring-0"
                                  placeholder="Enter your email here..."
                                  required
                              />
                              <button
                                  type="submit"
                                  className="hidden md:block absolute right-2.5 top-1.5 py-1.5 px-10 bg-app-black rounded-[80px] text-white text-center font-inter font-medium text-base/8 tracking-[-0.4px]"
                              >
                                  Write Review
                              </button>
                              <button className="block md:hidden absolute right-3 top-2.5 p-1 rounded-[100px] bg-app-black">
                                  <img src="/images/right-icon-white.svg" alt="" className="h-6 w-6" />
                              </button>
                          </div>
                          <div className="flex flex-col md:flex-row justify-between gap-6 md:items-center mb-10">
                              <p className="text-app-black font-poppins text-[28px]/[34px] font-medium tracking-[-0.6px]">
                                  11 Reviews
                              </p>
                              <select
                                  className="w-full md:max-w-[256px] appearance-none rounded-md border-b-2 border-app-light-gray md:border-none outline-none bg-white px-4 py-2 pr-10 text-gray-900 focus:border-none focus:outline-none focus:ring-0"
                              >
                                  <option className="text-app-black font-inter text-base/[26px] font-semibold">
                                      Sort by
                                  </option>
                              </select>
                          </div>
                          <div className="space-y-6">
                              {
                                  Array.from({ length: 6 }, (_, idx) => (
                                      <div key={idx}>
                                          <div className="flex gap-10 pb-6">
                                              <img src="/images/avatar_placeholder.png" alt="avatar" className="rounded-[40px] h-[72px] w-[72px] object-contain" />
                                              <div className="w-full space-y-4">
                                                  <p className="text-app-black font-inter text-xl/8 font-semibold">
                                                      Sofia Sofia
                                                  </p>
                                                  <div className='flex gap-0.5'>
                                                      {
                                                          Array.from({ length: 5 }, (_, idx) => (
                                                              <img key={idx} src="/images/star-icon.svg" alt="star icon" className="h-4 w-4" />
                                                          ))
                                                      }
                                                  </div>
                                                  <p className="hidden md:block text-app-slate-gray font-inter text-base/[26px] font-normal">
                                                      I bought it 3 weeks ago and now come back just to say “Awesome Product”. I really enjoy it. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupt et quas molestias excepturi sint non provident.
                                                  </p>
                                                  <div className="hidden md:flex gap-4 mt-2">
                                                      <p className="text-app-gray font-inter text-xs/5 font-normal">
                                                          about 1 hour ago
                                                      </p>
                                                      <p className="text-app-black font-inter text-xs/5 font-semibold">
                                                          Like
                                                      </p>
                                                      <p className="text-app-black font-inter text-xs/5 font-semibold">
                                                          Reply
                                                      </p>
                                                  </div>
                                              </div>
                                          </div>
                                          <div>
                                              <p className="block md:hidden text-app-slate-gray font-inter text-base/[26px] font-normal">
                                                  I bought it 3 weeks ago and now come back just to say “Awesome Product”. I really enjoy it. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupt et quas molestias excepturi sint non provident.
                                              </p>
                                              <div className="flex md:hidden gap-4 mt-2">
                                                  <p className="text-app-gray font-inter text-xs/5 font-normal">
                                                      about 1 hour ago
                                                  </p>
                                                  <p className="text-app-black font-inter text-xs/5 font-semibold">
                                                      Like
                                                  </p>
                                                  <p className="text-app-black font-inter text-xs/5 font-semibold">
                                                      Reply
                                                  </p>
                                              </div>
                                          </div>
                                      </div>
                                  ))
                              }
                              <div className="flex justify-center">
                                  <button className="py-1.5 px-10 rounded-[80px] border border-app-black text-center font-inter text-base/7 font-semibold tracking-[-0.4px]">
                                      Show more
                                  </button>
                              </div>
                          </div>
                      </>
                  }
              />
              <CustomAccordion
                  id="2"
                  title="Questions"
                  content={
                      <>
                          <p className="text-app-black font-poppins text-[28px]/[34px] font-medium tracking-[-0.6px] mb-6">
                              Questions
                          </p>
                          <div className="flex gap-2 items-center mb-2">
                              <div className='flex gap-0.5'>
                                  {
                                      Array.from({ length: 5 }, (_, idx) => (
                                          <img key={idx} src="/images/star-icon.svg" alt="star icon" className="h-4 w-4" />
                                      ))
                                  }
                              </div>
                              <p className="text-app-black font-inter text-xs/5 font-normal">11 reviews</p>
                          </div>
                          <div className="flex gap-2 items-center mb-7">
                              <p className="text-app-black font-inter text-base/[26px] font-normal">Be the first to review</p>
                              <p className="text-app-black font-inter text-base/[26px] font-semibold">
                                  Tray Table
                              </p>
                          </div>
                          <div className="relative items-center mb-10">
                              <input
                                  type="email"
                                  id="default-email"
                                  className="block w-full p-4 ps-6 text-sm text-app-black bg-white border border-app-light-gray rounded-2xl md:rounded-[32px] focus:ring-0"
                                  placeholder="Enter your email here..."
                                  required
                              />
                              <button
                                  type="submit"
                                  className="hidden md:block absolute right-2.5 top-1.5 py-1.5 px-10 bg-app-black rounded-[80px] text-white text-center font-inter font-medium text-base/8 tracking-[-0.4px]"
                              >
                                  Write Review
                              </button>
                              <button className="block md:hidden absolute right-3 top-2.5 p-1 rounded-[100px] bg-app-black">
                                  <img src="/images/right-icon-white.svg" alt="" className="h-6 w-6" />
                              </button>
                          </div>
                          <div className="flex flex-col md:flex-row justify-between gap-6 md:items-center mb-10">
                              <p className="text-app-black font-poppins text-[28px]/[34px] font-medium tracking-[-0.6px]">
                                  11 Reviews
                              </p>
                              <select
                                  className="w-full md:max-w-[256px] appearance-none rounded-md border-b-2 border-app-light-gray md:border-none outline-none bg-white px-4 py-2 pr-10 text-gray-900 focus:border-none focus:outline-none focus:ring-0"
                              >
                                  <option className="text-app-black font-inter text-base/[26px] font-semibold">
                                      Sort by
                                  </option>
                              </select>
                          </div>
                          <div className="space-y-6">
                              {
                                  Array.from({ length: 6 }, (_, idx) => (
                                      <div key={idx}>
                                          <div className="flex gap-10 pb-6">
                                              <img src="/images/avatar_placeholder.png" alt="avatar" className="rounded-[40px] h-[72px] w-[72px] object-contain" />
                                              <div className="w-full space-y-4">
                                                  <p className="text-app-black font-inter text-xl/8 font-semibold">
                                                      Sofia Sofia
                                                  </p>
                                                  <div className='flex gap-0.5'>
                                                      {
                                                          Array.from({ length: 5 }, (_, idx) => (
                                                              <img key={idx} src="/images/star-icon.svg" alt="star icon" className="h-4 w-4" />
                                                          ))
                                                      }
                                                  </div>
                                                  <p className="hidden md:block text-app-slate-gray font-inter text-base/[26px] font-normal">
                                                      I bought it 3 weeks ago and now come back just to say “Awesome Product”. I really enjoy it. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupt et quas molestias excepturi sint non provident.
                                                  </p>
                                                  <div className="hidden md:flex gap-4 mt-2">
                                                      <p className="text-app-gray font-inter text-xs/5 font-normal">
                                                          about 1 hour ago
                                                      </p>
                                                      <p className="text-app-black font-inter text-xs/5 font-semibold">
                                                          Like
                                                      </p>
                                                      <p className="text-app-black font-inter text-xs/5 font-semibold">
                                                          Reply
                                                      </p>
                                                  </div>
                                              </div>
                                          </div>
                                          <div>
                                              <p className="block md:hidden text-app-slate-gray font-inter text-base/[26px] font-normal">
                                                  I bought it 3 weeks ago and now come back just to say “Awesome Product”. I really enjoy it. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupt et quas molestias excepturi sint non provident.
                                              </p>
                                              <div className="flex md:hidden gap-4 mt-2">
                                                  <p className="text-app-gray font-inter text-xs/5 font-normal">
                                                      about 1 hour ago
                                                  </p>
                                                  <p className="text-app-black font-inter text-xs/5 font-semibold">
                                                      Like
                                                  </p>
                                                  <p className="text-app-black font-inter text-xs/5 font-semibold">
                                                      Reply
                                                  </p>
                                              </div>
                                          </div>
                                      </div>
                                  ))
                              }
                              <div className="flex justify-center">
                                  <button className="py-1.5 px-10 rounded-[80px] border border-app-black text-center font-inter text-base/7 font-semibold tracking-[-0.4px]">
                                      Show more
                                  </button>
                              </div>
                          </div>
                      </>
                  }
              />
              <CustomAccordion
                  id="3"
                  title="Reviews"
                  content={
                      <>
                          <p className="text-app-black font-poppins text-[28px]/[34px] font-medium tracking-[-0.6px] mb-6">
                              Customer Reviews
                          </p>
                          <div className="flex gap-2 items-center mb-2">
                              <div className='flex gap-0.5'>
                                  {
                                      Array.from({ length: 5 }, (_, idx) => (
                                          <img key={idx} src="/images/star-icon.svg" alt="star icon" className="h-4 w-4" />
                                      ))
                                  }
                              </div>
                              <p className="text-app-black font-inter text-xs/5 font-normal">11 reviews</p>
                          </div>
                          <div className="flex gap-2 items-center mb-7">
                              <p className="text-app-black font-inter text-base/[26px] font-normal">Be the first to review</p>
                              <p className="text-app-black font-inter text-base/[26px] font-semibold">
                                  Tray Table
                              </p>
                          </div>
                          <div className="relative items-center mb-10">
                              <input
                                  type="email"
                                  id="default-email"
                                  className="block w-full p-4 ps-6 text-sm text-app-black bg-white border border-app-light-gray rounded-2xl md:rounded-[32px] focus:ring-0"
                                  placeholder="Enter your email here..."
                                  required
                              />
                              <button
                                  type="submit"
                                  className="hidden md:block absolute right-2.5 top-1.5 py-1.5 px-10 bg-app-black rounded-[80px] text-white text-center font-inter font-medium text-base/8 tracking-[-0.4px]"
                              >
                                  Write Review
                              </button>
                              <button className="block md:hidden absolute right-3 top-2.5 p-1 rounded-[100px] bg-app-black">
                                  <img src="/images/right-icon-white.svg" alt="" className="h-6 w-6" />
                              </button>
                          </div>
                          <div className="flex flex-col md:flex-row justify-between gap-6 md:items-center mb-10">
                              <p className="text-app-black font-poppins text-[28px]/[34px] font-medium tracking-[-0.6px]">
                                  11 Reviews
                              </p>
                              <select
                                  className="w-full md:max-w-[256px] appearance-none rounded-md border-b-2 border-app-light-gray md:border-none outline-none bg-white px-4 py-2 pr-10 text-gray-900 focus:border-none focus:outline-none focus:ring-0"
                              >
                                  <option className="text-app-black font-inter text-base/[26px] font-semibold">
                                      Sort by
                                  </option>
                              </select>
                          </div>
                          <div className="space-y-6">
                              {
                                  Array.from({ length: 6 }, (_, idx) => (
                                      <div key={idx}>
                                          <div className="flex gap-10 pb-6">
                                              <img src="/images/avatar_placeholder.png" alt="avatar" className="rounded-[40px] h-[72px] w-[72px] object-contain" />
                                              <div className="w-full space-y-4">
                                                  <p className="text-app-black font-inter text-xl/8 font-semibold">
                                                      Sofia Sofia
                                                  </p>
                                                  <div className='flex gap-0.5'>
                                                      {
                                                          Array.from({ length: 5 }, (_, idx) => (
                                                              <img key={idx} src="/images/star-icon.svg" alt="star icon" className="h-4 w-4" />
                                                          ))
                                                      }
                                                  </div>
                                                  <p className="hidden md:block text-app-slate-gray font-inter text-base/[26px] font-normal">
                                                      I bought it 3 weeks ago and now come back just to say “Awesome Product”. I really enjoy it. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupt et quas molestias excepturi sint non provident.
                                                  </p>
                                                  <div className="hidden md:flex gap-4 mt-2">
                                                      <p className="text-app-gray font-inter text-xs/5 font-normal">
                                                          about 1 hour ago
                                                      </p>
                                                      <p className="text-app-black font-inter text-xs/5 font-semibold">
                                                          Like
                                                      </p>
                                                      <p className="text-app-black font-inter text-xs/5 font-semibold">
                                                          Reply
                                                      </p>
                                                  </div>
                                              </div>
                                          </div>
                                          <div>
                                              <p className="block md:hidden text-app-slate-gray font-inter text-base/[26px] font-normal">
                                                  I bought it 3 weeks ago and now come back just to say “Awesome Product”. I really enjoy it. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupt et quas molestias excepturi sint non provident.
                                              </p>
                                              <div className="flex md:hidden gap-4 mt-2">
                                                  <p className="text-app-gray font-inter text-xs/5 font-normal">
                                                      about 1 hour ago
                                                  </p>
                                                  <p className="text-app-black font-inter text-xs/5 font-semibold">
                                                      Like
                                                  </p>
                                                  <p className="text-app-black font-inter text-xs/5 font-semibold">
                                                      Reply
                                                  </p>
                                              </div>
                                          </div>
                                      </div>
                                  ))
                              }
                              <div className="flex justify-center">
                                  <button className="py-1.5 px-10 rounded-[80px] border border-app-black text-center font-inter text-base/7 font-semibold tracking-[-0.4px]">
                                      Show more
                                  </button>
                              </div>
                          </div>
                      </>
                  }
              />
          </div>
    </section>
  )
}
