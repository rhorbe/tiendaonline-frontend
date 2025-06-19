import React, { useState } from "react";

interface PasswordInputProps {
  id: string;
  placeholder: string;
  required?: boolean;
  showIcon?: string; // Ícono para mostrar la contraseña
  hideIcon?: string; // Ícono para ocultarla
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  placeholder,
  required,
  showIcon,
  hideIcon,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative w-full mb-8">
      <input
        id={id}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        required={required}
        className="border-b-2 border-app-light-gray bg-transparent focus:outline-none focus:ring-0 py-2 w-full border-t-0 border-l-0 border-r-0 pr-10 placeholder-inter"
      />
      {showIcon && hideIcon && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 cursor-pointer bg-transparent border-none p-0"
          aria-label={
            showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
          }
          tabIndex={0}
        >
          <img
            src={showPassword ? hideIcon : showIcon}
            alt={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            aria-hidden="true"
            className="w-6 h-6"
          />
        </button>
      )}
    </div>
  );
};

export default PasswordInput;
