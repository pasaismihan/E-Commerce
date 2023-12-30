"use client";

import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

type InputProps = {
  id: string;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  type: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
};

const Input: React.FC<InputProps> = ({
  id,
  placeholder,
  required,
  disabled,
  type,
  register,
  errors,
}) => {
  return (
    <input
      className={`h-12 w-full p-3 rounded-md outline-none my-3 ${
        errors[id] ? "border border-red-500" : "border border-slate-300"
      }`}
      id={id}
      placeholder={placeholder}
      disabled={disabled}
      type={type}
      {...register(id, { required })}
    />
  );
};

export default Input;
