import { ROUTES } from "@/core/enum/common";
import { useAuth } from "@/store/useAuth";
import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../Modal";

export default function UserMenu() {
  const { user, logout } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutConfirm = async () => {
    setIsLogoutModalOpen(false);
    await logout();
  };

  if (!user) {
    return (
      <Link
        to={ROUTES.LOGIN}
        className="inline-flex items-center justify-center p-2 rounded-full text-white hover:bg-white/10 transition"
        aria-label="Iniciar sesión"
      >
        <img src="/images/user-circle.svg" alt="Usuario" className="w-6 h-6 invert" />
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2 text-white">
      <Link
        to={ROUTES.PROFILE}
        className="p-2 rounded-full hover:bg-white/10 transition font-inter font-medium"
        aria-label="Ir al perfil"
      >
        <span>{user.name}</span>
      </Link>
      <button
        type="button"
        onClick={() => setIsLogoutModalOpen(true)}
        className="inline-flex items-center justify-center p-2 rounded-full hover:bg-white/10 transition"
        aria-label="Cerrar sesión"
        title="Cerrar sesión"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="w-5 h-5"
        >
          <path
            d="M10 17L15 12L10 7"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 12H3"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M11 5.5V4.5C11 3.39543 11.8954 2.5 13 2.5H19.5C20.6046 2.5 21.5 3.39543 21.5 4.5V19.5C21.5 20.6046 20.6046 21.5 19.5 21.5H13C11.8954 21.5 11 20.6046 11 19.5V18.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Modal
        isOpen={isLogoutModalOpen}
        onClose={handleLogoutConfirm}
        title="Cerrar sesión"
        description="¿Estás seguro de cerrar sesión?"
        buttonText="Confirmar"
        secondaryButtonText="Cancelar"
        secondaryOnClick={() => setIsLogoutModalOpen(false)}
        iconSrc="/images/warning.svg"
        iconAlt="Confirmar cierre de sesión"
      />
    </div>
  );
}

