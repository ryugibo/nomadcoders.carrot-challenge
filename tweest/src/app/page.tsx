"use client";

import FormButton from "@/components/form-button";
import FormInput from "@/components/form-input";
import {
  EnvelopeIcon,
  FireIcon,
  KeyIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { useActionState } from "react";
import { onSubmit } from "./action";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const [state, action] = useActionState(onSubmit, null);
  return (
    <div className="flex flex-col max-w-sm mx-auto h-screen justify-center">
      <div className="text-red-500 size-16 mb-16 flex w-full">
        <FireIcon />
      </div>
      <form action={action} className="flex flex-col gap-3">
        <FormInput name="email" type="email" placeholder="Email" errors={[]}>
          <EnvelopeIcon className="size-4" />
        </FormInput>
        <FormInput
          name="username"
          type="text"
          placeholder="Username"
          errors={[]}
        >
          <UserIcon className="size-4" />
        </FormInput>
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          errors={state?.errors ?? []}
        >
          <KeyIcon className="size-4" />
        </FormInput>
        <FormButton text="Log in" />
      </form>
      {state?.ok ? (
        <div className="bg-green-500 h-14 flex items-center px-2 rounded-2xl mt-3">
          <CheckCircleIcon className="size-6 mr-4" />
          Welcome back!
        </div>
      ) : null}
    </div>
  );
}
