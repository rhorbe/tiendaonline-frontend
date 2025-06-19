import { CustomInput } from "@/core/components";

export default function ForgotPassword() {
  return (
    <div className='grid md:grid-cols-2 h-screen text-app-black'>
      <div className='login-background min-h-[437px]'>
        <h1 className='text-center font-poppins font-medium text-2xl mt-8'>L'Essence.</h1>
      </div>

      <div className='flex items-center justify-center px-10'>
        <form className='bg-white w-full max-w-[486px] space-y-8 py-10'>
          <div>
            <h2 className='text-[40px]/[44px] font-poppins font-medium tracking-[-0.4px]'>Forgot Password</h2>
            <p className="text-app-gray font-inter text-base/[26px] font-normal mt-2">
              Enter your registered email address. we’ll send you a code to reset your password.
            </p>
          </div>
          <CustomInput
            id="email"
            type="email"
            placeholder="Your Email"
            required
          />
          <button className='text-white text-center font-inter text-base font-medium leading-[28px] tracking-[-0.4px] bg-app-black rounded-lg w-full px-10 py-[10px]'>
            Send OTP
          </button>
        </form>
      </div>
    </div>
  )
}
