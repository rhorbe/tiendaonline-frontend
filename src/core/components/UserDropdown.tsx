import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../enum/common";

export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cierra el menú si se hace clic fuera
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
        <img
          src="/images/user-circle.svg"
          alt="Iniciar sesión"
          className="h-6 w-6"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black/10 z-10">
          <div className="py-1 text-sm text-gray-700 divide-y divide-gray-200">
            <Link
              to={ROUTES.LOGIN}
              className="block px-4 py-2 hover:bg-gray-100 transition"
            >
              Iniciar Sesión
            </Link>
            <Link
              to={ROUTES.REGISTER}
              className="block px-4 py-2 hover:bg-gray-100 transition"
            >
              Registrarse
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
