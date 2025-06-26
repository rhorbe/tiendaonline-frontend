import { CustomInput } from "@/core/components";
import { ROUTES } from "@/core/enum/common";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <div className="grid md:grid-cols-2 h-screen text-app-black">
      <div className="hidden md:block login-background min-h-[437px]">
        <div className="flex justify-center items-center mt-8">
          <Link to={ROUTES.HOME}>
            <img
              src="/images/logo_lessence_negro.png"
              alt="L'Essence Perfumes"
              className="h-14 w-auto"
            />
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-center px-10">
        <form className="bg-white w-full max-w-[486px] space-y-8 py-10">
          <div>
            <h2 className="text-[40px]/[44px] font-poppins font-medium tracking-[-0.4px]">
              Olvidé mi contraseña
            </h2>
            <p className="text-app-gray font-inter text-base/[26px] font-normal mt-2">
              Ingresa tu correo electrónico registrado. Te enviaremos un código
              para restablecer tu contraseña.
            </p>
          </div>
          <CustomInput
            id="email"
            type="email"
            placeholder="Your Email"
            required
          />
          <button className="text-white text-center font-inter text-base font-medium leading-[28px] tracking-[-0.4px] bg-app-black rounded-lg w-full px-10 py-[10px]">
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
}
