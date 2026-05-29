import {CustomInput} from "@/core/components";
import PasswordInput from "@/core/components/PasswordInput";
import {ROUTES} from "@/core/enum/common";
import api from "@/core/api/axiosInstance";
import {FC, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "../auth.css";

const Register: FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [dni, setDni] = useState("");
    const [telefono, setTelefono] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (loading) {
            return;
        }

        if (password !== passwordConfirmation) {
            setMessage("Las contraseñas no coinciden.");
            return;
        }

        if (!acceptedTerms) {
            setMessage(
                "Debes aceptar la Política de privacidad y los Términos de uso para continuar."
            );
            return;
        }

        try {
            setLoading(true);
            setMessage(null);

            await api.post("/register", {
                name,
                last_name: lastName,
                email,
                dni,
                telefono,
                password,
                password_confirmation: passwordConfirmation,
            });

            setMessage("Registro realizado correctamente. Ya puedes iniciar sesión.");
            navigate(ROUTES.LOGIN, {replace: true});
        } catch (error) {
            const fallback = "No se pudo completar el registro.";
            const serverMessage =
                (error as { response?: { data?: { message?: string; error?: string } } })
                    ?.response?.data?.message ||
                (error as { response?: { data?: { message?: string; error?: string } } })
                    ?.response?.data?.error;

            setMessage(serverMessage ?? fallback);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid md:grid-cols-2 h-screen text-app-black">
            <div className="hidden md:block login-background login-background-sm min-h-[437px]">
                <div className="flex justify-center items-center mt-8">
                    <Link to={ROUTES.HOME}>
                        <img
                            src="/images/logo_essences.svg"
                            alt="Essences"
                            className="h-auto w-auto scale-50 origin-center"
                        />
                    </Link>
                </div>
            </div>

            <div className="flex items-center justify-center px-10">
                <form className="bg-white w-full max-w-[486px] space-y-8 py-10" onSubmit={handleSubmit}>
                    <h2 className="text-[40px]/[44px] font-poppins font-medium tracking-[-0.4px]">
                        Registro
                    </h2>
                    <p className="text-app-gray font-inter text-base/[26px] font-semibold">
                        ¿Ya tiene una cuenta?{" "}
                        <Link to={ROUTES.LOGIN} className="text-app-green cursor-pointer">
                            Iniciar Sesión
                        </Link>
                    </p>
                    {message && (
                        <div className="rounded-md bg-app-light-gray px-4 py-3 text-sm font-inter text-app-black">
                            {message}
                        </div>
                    )}

                    <CustomInput id="name" type="text" placeholder="Nombre" required onChange={setName}/>

                    <CustomInput
                        id="last_name"
                        type="text"
                        placeholder="Apellido"
                        required
                        onChange={setLastName}
                    />

                    <CustomInput
                        id="email"
                        type="email"
                        placeholder="Correo electrónico"
                        required
                        onChange={setEmail}
                    />

                    <CustomInput
                        id="dni"
                        type="text"
                        placeholder="DNI"
                        required
                        onChange={setDni}
                    />

                    <CustomInput
                        id="telefono"
                        type="tel"
                        placeholder="Teléfono"
                        onChange={setTelefono}
                    />

                    <PasswordInput
                        id="password"
                        placeholder="Contraseña"
                        showIcon="/images/eye.svg"
                        hideIcon="/images/eye-off.svg"
                        required
                        onChange={setPassword}
                    />

                    <PasswordInput
                        id="password_confirmation"
                        placeholder="Confirmar contraseña"
                        showIcon="/images/eye.svg"
                        hideIcon="/images/eye-off.svg"
                        required
                        onChange={setPasswordConfirmation}
                    />

                    <div
                        className="flex items-start gap-3 rounded-md border border-app-light-gray bg-app-light-gray/30 px-4 py-3">
                        <input
                            id="accept"
                            type="checkbox"
                            checked={acceptedTerms}
                            onChange={(e) => setAcceptedTerms(e.target.checked)}
                            className="mt-1 h-5 w-5 cursor-pointer rounded border-2 border-app-black text-app-black focus:ring-0 checked:bg-app-black checked:border-app-black"
                        />
                        <label htmlFor="accept"
                               className="text-xs md:text-base font-inter leading-[26px] text-app-gray whitespace-normal">
                            Estoy de acuerdo con la{" "}
                            <Link
                                to="#"
                                className="text-app-black font-inter hover:underline font-bold"
                            >
                                Política de privacidad
                            </Link>{" "}
                            y los{" "}
                            <Link
                                to="#"
                                className="text-app-black font-inter hover:underline font-bold"
                            >
                                Términos de uso
                            </Link>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="text-white text-center font-inter text-base font-medium leading-[28px] tracking-[-0.4px] bg-app-black rounded-lg w-full px-10 py-[10px] disabled:opacity-70"
                    >
                        {loading ? "Registrando..." : "Registrarse"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
