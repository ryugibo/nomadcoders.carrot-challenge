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

const initialState = {
  requested: false,
  errors: undefined,
};

export default function Home() {
  const [state, action] = useActionState(onSubmit, initialState);
  return (
    <div className="flex flex-col max-w-sm mx-auto h-screen justify-center">
      <div className="text-red-500 size-16 mb-16 flex w-full">
        <FireIcon />
      </div>
      <form action={action} className="flex flex-col gap-3">
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          errors={state.errors?.fieldErrors.email}
        >
          <EnvelopeIcon className="size-4" />
        </FormInput>
        <FormInput
          name="username"
          type="text"
          placeholder="Username"
          errors={state.errors?.fieldErrors.username}
        >
          <UserIcon className="size-4" />
        </FormInput>
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          errors={state.errors?.fieldErrors.password}
        >
          <KeyIcon className="size-4" />
        </FormInput>
        <FormButton text="Log in" />
      </form>
      {!state.requested ? null : state.errors ? null : (
        <div className="bg-green-500 h-14 flex items-center px-2 rounded-2xl mt-3">
          <CheckCircleIcon className="size-6 mr-4" />
          Welcome back!
        </div>
      )}
    </div>
  );
}
