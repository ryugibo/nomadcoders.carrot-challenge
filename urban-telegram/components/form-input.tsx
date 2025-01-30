import { EnvelopeIcon } from "@heroicons/react/24/solid";
import React from "react";

interface FormInputProps {
  type: string;
  name: string;
  placeholder: string;
  errors: string[];
  children?: React.ReactNode;
}

export default function FormInput({
  type,
  name,
  placeholder,
  errors,
  children,
}: FormInputProps) {
  return (
    <>
      <div className="relative">
        <div className="absolute flex w-full h-full items-center left-3 -z-10">
          {children}
        </div>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          className={`rounded-full ring-1 border-transparent ${
            errors.length > 0 ? "ring-red-500" : "ring-neutral-500"
          }  focus:ring-neutral-500 focus:ring-offset-2 focus:border-gray-500 pl-9 w-full bg-transparent`}
        />
      </div>
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </>
  );
}
