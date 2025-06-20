import React, { useState } from "react";

interface CustomInputProps {
  id: string;
  type: string;
  placeholder: string;
  required?: boolean;
  icon?: string;
  onChange?: (value: string) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
  id,
  type,
  placeholder,
  required,
  icon,
  onChange,
}) => {
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevoValor = e.target.value;
    setText(nuevoValor);
    onChange?.(nuevoValor);
  };
  return (
    <div className="relative w-full mb-8">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        value={text}
        onChange={handleChange}
        className={`border-b-2 border-app-light-gray bg-transparent focus:outline-none focus:ring-0 py-2 w-full border-t-0 border-l-0 border-r-0 placeholder-inter ${
          icon ? "pr-10" : ""
        }`}
      />
      {icon && (
        <img
          src={icon}
          alt={`${id}-icon`}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 cursor-pointer"
        />
      )}
    </div>
  );
};

export default CustomInput;
