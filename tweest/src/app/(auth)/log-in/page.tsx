"use client";

import { useActionState } from "react";
import FormInput from "@/components/form-input";
import { login } from "./action";
import FormButton from "@/components/form-button";
import { EnvelopeIcon, KeyIcon } from "@heroicons/react/24/solid";
import { PASSWORD_MIN_LENGTH, USERNAME_MIN_LENGTH } from "@/lib/constants";
import Link from "next/link";
import Logo from "@/components/logo";

export default function Login() {
  const [state, action] = useActionState(login, undefined);
  return (
    <>
      <div className="flex flex-col gap-2 xl:w-2xl items-center *:font-medium">
        <h1 className="text-4xl">Tweest</h1>
        <h2 className="text-2xl">Tweest에 어서오세요!</h2>
        <h2 className="text-xl">사용자 이름과 암호로 로그인하세요!</h2>
        <form action={action} className="flex flex-col gap-3 w-sm">
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
        <Link href="/create-account" className="text-center">
          아직 계정이 없으신가요? 가입하러 가기
        </Link>
      </div>
    </>
  );
}
