import { CustomInput } from "@/core/components";
import PasswordInput from "@/core/components/PasswordInput";
import { ROUTES } from "@/core/enum/common";
import { FC } from "react";

const Register: FC = () => {
  return (
    <div className="grid md:grid-cols-2 h-screen text-app-black">
      <div className="login-background min-h-[437px]">
        <h1 className="text-center font-poppins font-medium text-2xl mt-8">
          L'Essence
        </h1>
      </div>

      <div className="flex items-center justify-center px-10">
        <form className="bg-white w-full max-w-[486px] space-y-8 py-10">
          <h2 className="text-[40px]/[44px] font-poppins font-medium tracking-[-0.4px]">
            Registro
          </h2>
          <p className="text-app-gray font-inter text-base/[26px] font-semibold">
            ¿Ya tiene una cuenta?{" "}
            <a href={ROUTES.LOGIN} className="text-app-green cursor-pointer">
              Iniciar Sesión
            </a>
          </p>
          <CustomInput id="name" type="text" placeholder="Nombre" required />

          <CustomInput
            id="email"
            type="email"
            placeholder="Correo electrónico"
            required
          />
          <PasswordInput
            id="password"
            placeholder="Contraseña"
            showIcon="/images/eye.svg"
            hideIcon="/images/eye-off.svg"
            required
          />

          <div className="flex items-start gap-2">
            <input
              id="accept"
              type="checkbox"
              className="w-5 h-5 mt-1 text-gray-500 border-2 rounded focus:ring-0 checked:bg-app-black checked:border-[#6C7275] cursor-pointer"
              defaultChecked
            />
            <label
              htmlFor="accept"
              className="text-xs md:text-base font-inter leading-[26px] text-app-gray whitespace-normal"
            >
              Estoy de acuerdo con la{" "}
              <a
                href="#"
                className="text-app-black font-inter hover:underline font-bold"
              >
                Política de privacidad
              </a>{" "}
              y los{" "}
              <a
                href="#"
                className="text-app-black font-inter hover:underline font-bold"
              >
                Términos de uso
              </a>
            </label>
          </div>

          <button className="text-white text-center font-inter text-base font-medium leading-[28px] tracking-[-0.4px] bg-app-black rounded-lg w-full px-10 py-[10px]">
            Inscribirse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
