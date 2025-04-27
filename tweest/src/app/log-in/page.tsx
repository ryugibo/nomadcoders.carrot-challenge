"use client";

import { useActionState } from "react";
import FormInput from "@/components/form-input";
import { login } from "./action";
import FormButton from "@/components/form-button";
import { EnvelopeIcon, KeyIcon } from "@heroicons/react/24/solid";
import { PASSWORD_MIN_LENGTH, USERNAME_MIN_LENGTH } from "@/lib/constants";

export default function Login() {
  const [state, action] = useActionState(login, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요</h1>
        <h2 className="text-xl">사용자 이름과 암호로 로그인하세요!</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <FormInput
          name="username"
          type="text"
          placeholder="사용자 이름"
          required
          minLength={USERNAME_MIN_LENGTH}
          errors={state?.fieldErrors.username}
        >
          <EnvelopeIcon className="size-4" />
        </FormInput>
        <FormInput
          name="password"
          type="password"
          placeholder="암호"
          required
          minLength={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors.password}
        >
          <KeyIcon className="size-4" />
        </FormInput>
        <FormButton text="로그인" />
      </form>
    </div>
  );
}
