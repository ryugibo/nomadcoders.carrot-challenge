"use client";

import { useFormStatus } from "react-dom";
interface FormButtonProps {
  text: string;
}

export default function FormButton({ text }: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="bg-neutral-200 h-10 rounded-full font-bold hover:cursor-pointer disabled:hover:cursor-not-allowed disabled:bg-neutral-500 disabled:text-neutral-300"
      type="submit"
    >
      {pending ? "Loading..." : text}
    </button>
  );
}
