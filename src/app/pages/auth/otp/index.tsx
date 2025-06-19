import Modal from "@/core/components/Modal";
import { useState } from "react";

export default function OtpPage() {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleModalClose = () => {
        setModalOpen(false);
    };

  return (
      <div className='grid md:grid-cols-2 h-screen text-app-black'>
          <div className='login-background min-h-[437px]'>
              <h1 className='text-center font-poppins font-medium text-2xl mt-8'>L'Essence.</h1>
          </div>

          <div className='flex items-center justify-center px-10'>
              <form className='bg-white w-full max-w-[486px] space-y-8 py-10'>
                  <div>
                      <h2 className='text-[40px]/[44px] font-poppins font-medium tracking-[-0.4px]'>Enter OTP</h2>
                      <p className="text-app-gray font-inter text-base/[26px] font-normal mt-2">
                          We have share a code of your registered email address
                          robertfox@example.com
                      </p>
                  </div>
                  <form className="flex gap-2 md:gap-5 items-center">
                      <div className="">
                          <input type="number" name="fullname" id="fullname" className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md max-w-[60px] h-[60px] hide-spinner" />
                      </div>
                      <div className="">
                          <input type="number" name="fullname" id="fullname" className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md max-w-[60px] h-[60px] hide-spinner" />
                      </div>
                      <div className="">
                          <input type="number" name="fullname" id="fullname" className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md max-w-[60px] h-[60px] hide-spinner" />
                      </div>
                      <div className="">
                          <input type="number" name="fullname" id="fullname" className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md max-w-[60px] h-[60px] hide-spinner" />
                      </div>
                      <div className="">
                          <input type="number" name="fullname" id="fullname" className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md max-w-[60px] h-[60px] hide-spinner" />
                      </div>
                  </form>
                  <button type="button" onClick={() => setModalOpen(true)} className='text-white text-center font-inter text-base font-medium leading-[28px] tracking-[-0.4px] bg-app-black rounded-lg w-full px-10 py-[10px]'>
                      Send OTP
                  </button>
              </form>
          </div>
          <Modal isOpen={isModalOpen} onClose={handleModalClose} />
      </div>
  )
}
