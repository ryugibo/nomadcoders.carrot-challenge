"use client";

import FormInput from "@/components/form-input";
import { createAccount } from "./actions";
import { useActionState } from "react";
import FormButton from "@/components/form-button";
import { PASSWORD_MIN_LENGTH, USERNAME_MIN_LENGTH } from "@/lib/constants";
import { KeyIcon, UserIcon } from "@heroicons/react/24/solid";

export default function CreateAccount() {
  const [state, action] = useActionState(createAccount, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요</h1>
        <h2 className="text-xl">아래 양식을 입력하고 가입하세요!</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <FormInput
          name="username"
          type="text"
          placeholder="사용자 이름"
          required
          errors={state?.fieldErrors.username}
          minLength={USERNAME_MIN_LENGTH}
        >
          <UserIcon className="size-4" />
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
        <FormInput
          name="confirmPassword"
          type="password"
          placeholder="암호 확인"
          required
          minLength={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors.confirmPassword}
        >
          <KeyIcon className="size-4" />
        </FormInput>
        <FormButton text="계정 생성" />
      </form>
    </div>
  );
}
