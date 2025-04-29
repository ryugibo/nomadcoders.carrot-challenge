"use client";

import FormInput from "@/components/form-input";
import { createAccount } from "./action";
import { useActionState } from "react";
import FormButton from "@/components/form-button";
import { PASSWORD_MIN_LENGTH, USERNAME_MIN_LENGTH } from "@/lib/constants";
import { KeyIcon, UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Logo from "@/components/logo";

export default function CreateAccount() {
  const [state, action] = useActionState(createAccount, undefined);
  return (
    <div className="flex flex-col gap-10 py-8 px-6 justify-center h-screen">
      <div className="flex flex-col gap-2 *:font-medium items-center">
        <Logo />
        <h1 className="text-4xl">Tweest</h1>
        <h2 className="text-2xl">Tweest에 어서오세요!</h2>
        <h2 className="text-xl">사용자 이름과 암호로 로그인하세요!</h2>
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
      <Link href="/log-in" className="text-center">
        이미 계정이 있으신가요? 로그인하러 가기
      </Link>
    </div>
  );
}
