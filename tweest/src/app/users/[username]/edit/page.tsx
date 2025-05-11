"use client";

import { use, useActionState } from "react";
import { changeAccountInfo, changePassword } from "./action";
import FormInput from "@/components/form-input";
import { PASSWORD_MIN_LENGTH, USERNAME_MIN_LENGTH } from "@/lib/constants";
import { KeyIcon, UserIcon } from "@heroicons/react/24/solid";
import FormButton from "@/components/form-button";

export default function UsersEdit({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const username = use(params).username;
  const [changeAccountInfoState, changeAccountInfoAction] = useActionState(
    changeAccountInfo,
    undefined
  );
  const [changePasswordState, changePasswordAction] = useActionState(
    changePassword,
    undefined
  );

  return (
    <div className="w-full">
      <div className="text-3xl">{username} 정보 수정</div>
      <form action={changeAccountInfoAction} className="flex flex-col gap-3">
        <FormInput
          name="username"
          type="text"
          placeholder="사용자 이름"
          required
          errors={changeAccountInfoState?.fieldErrors.username}
          minLength={USERNAME_MIN_LENGTH}
        >
          <UserIcon className="size-4" />
        </FormInput>
        <button type="button">취소</button>
        <FormButton text="계정 정보 변경" />
      </form>
      <div className="my-10" />
      <div className="text-3xl">비밀번호 변경</div>
      <form action={changePasswordAction} className="flex flex-col gap-3">
        <FormInput
          name="password"
          type="password"
          placeholder="암호"
          required
          minLength={PASSWORD_MIN_LENGTH}
          errors={changePasswordState?.fieldErrors.password}
        >
          <KeyIcon className="size-4" />
        </FormInput>
        <FormInput
          name="confirmPassword"
          type="password"
          placeholder="암호 확인"
          required
          minLength={PASSWORD_MIN_LENGTH}
          errors={changePasswordState?.fieldErrors.confirmPassword}
        >
          <KeyIcon className="size-4" />
        </FormInput>
        <FormButton text="비밀번호 변경" />
      </form>
    </div>
  );
}
