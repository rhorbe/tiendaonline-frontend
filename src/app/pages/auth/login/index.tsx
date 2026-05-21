import {FC, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import api from "@/core/api/axiosInstance";
import {CustomInput} from "@/core/components";
import PasswordInput from "@/core/components/PasswordInput";
import Modal from "@/core/components/Modal";
import {ROUTES} from "@/core/enum/common";
import {useAuth} from "@/store/useAuth";
import {LoginResponse} from "@/core/models/User";
import {ErrorResponse} from "@/core/models/Error";
import {getOfflineErrorFromUnknown} from "@/core/api/networkError";
import "../auth.css";

interface LoginLocationState {
    from?: {
        pathname: string;
        search: string;
        hash: string;
    };
}

const Login: FC = () => {
    const {login} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [errorModalMessage, setErrorModalMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const from = (location.state as LoginLocationState | null)?.from;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const {data} = await api.post<LoginResponse>("/login", {
                email,
                password,
            });

            // Validación defensiva: asegurar que data y data.user existen
            if (!data || !data.user || !data.token) {
                //TODO capturar
                throw new Error("Respuesta incompleta del servidor: faltan campos requeridos");
            }

            const userId = data.user.id ?? "";

            if (!userId) {
                //TODO capturar
                throw new Error("No se encontró ID de usuario en la respuesta");
            }

            localStorage.setItem("token", data.token);

            login({
                id: userId,
                name: data.user.name,
                email: data.user.email,
                email_verified_at: data.user.email_verified_at ?? null,
                cliente_id: data.user.cliente_id,
                active: data.user.active,
            });


            // No bloquea el login si el usuario rechaza permisos o falla Push API.
            void import("@/app/push")
                .then(({suscribirseAPush}) => suscribirseAPush())
                .catch((pushError) => {
                    console.warn("No se pudo completar la suscripción push tras login", pushError);
                });

            if (from?.pathname) {
                navigate(`${from.pathname}${from.search ?? ""}${from.hash ?? ""}`, {replace: true});
                return;
            }

            navigate(ROUTES.SHOP);

        } catch (err: unknown) {
            const error = err as ErrorResponse;
            const status = error.response?.status;
            const offlineMessage = getOfflineErrorFromUnknown(err, "iniciar sesión");
            const errorMessage =
                offlineMessage ??
                (status === 401
                    ? "Correo o contraseña inválidos"
                    : error.response?.data?.message ?? error.response?.data?.error ?? "Error de conexión");

            setErrorModalMessage(errorMessage);
            setIsErrorModalOpen(true);
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
                <form
                    className="bg-white w-full max-w-[486px] space-y-8 py-10"
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-[40px]/[44px] font-poppins font-medium tracking-[-0.4px]">
                        Iniciar Sesión
                    </h2>
                    <p className="text-app-gray font-inter text-base/[26px] font-semibold">
                        ¿Aún no tienes una cuenta?{" "}
                        <Link
                            to={ROUTES.REGISTER}
                            className="text-app-green cursor-pointer"
                        >
                            Registrarse
                        </Link>
                    </p>
                    <CustomInput
                        id="name"
                        type="text"
                        placeholder="Correo Electrónico"
                        required
                        onChange={(value) => setEmail(value)}
                    />
                    <PasswordInput
                        id="password"
                        placeholder="Contraseña"
                        showIcon="/images/eye.svg"
                        hideIcon="/images/eye-off.svg"
                        required
                        onChange={(value) => setPassword(value)}
                    />
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-nowrap flex-wrap">
                            <input
                                id="accept"
                                type="checkbox"
                                className="w-5 h-5 text-gray-500 border-2 rounded focus:ring-0 checked:bg-app-black checked:border-[#6C7275] cursor-pointer"
                                defaultChecked
                            />
                            <p className="flex text-xs md:text-base font-inter leading-[26px] text-app-gray">
                                Recordarme
                            </p>
                        </div>
                        <p className="text-app-black font-inter text-xs md:text-base leading-[26px] font-semibold">
                            ¿Olvidó su contraseña?
                        </p>
                    </div>
                    <button
                        className="text-white text-center font-inter text-base font-medium leading-[28px] tracking-[-0.4px] bg-app-black rounded-lg w-full px-10 py-[10px]">
                        Iniciar Sesión
                    </button>
                </form>
            </div>
            <Modal
                isOpen={isErrorModalOpen}
                onClose={() => setIsErrorModalOpen(false)}
                title="Error al iniciar sesión"
                description={errorModalMessage}
                buttonText="Intentar de nuevo"
                iconSrc="images/warning.svg"
                iconAlt="Error de autenticación"
            />
        </div>
    );
};

export default Login;
