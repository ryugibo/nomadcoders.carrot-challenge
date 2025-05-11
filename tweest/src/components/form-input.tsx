import React, { InputHTMLAttributes } from "react";

interface FormInputProps {
  name: string;
  errors?: string[];
  children?: React.ReactNode;
}

export default function FormInput({
  name,
  errors,
  children,
  ...props
}: FormInputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <>
      <div className="relative">
        <div className="absolute flex w-full h-full items-center left-3 -z-10">
          {children}
        </div>
        <input
          name={name}
          className={`ring-1 border-transparent ${
            errors && errors.length > 0 ? "ring-red-500" : "ring-neutral-500"
          }  focus:ring-neutral-500 focus:ring-offset-2 focus:border-gray-500 pl-9 w-full bg-transparent`}
          {...props}
        />
      </div>
      {errors?.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </>
  );
}
