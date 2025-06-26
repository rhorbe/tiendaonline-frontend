import { useAuth } from "@/store/AuthContext";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function UserDropdown() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 rounded-full hover:bg-gray-200 transition"
      >
        {user ? (
          <span>{user.name}</span>
        ) : (
          <img src="/images/user-circle.svg" alt="User" className="w-6 h-6" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black/10 z-10">
          <div className="py-1 text-sm text-gray-700 divide-y divide-gray-200">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-2 hover:bg-gray-100 transition"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 hover:bg-gray-100 transition"
                >
                  Registrarse
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 transition"
                >
                  Ver Perfil
                </Link>
                <button
                  onClick={() => logout()}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                >
                  Cerrar Sesión
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
