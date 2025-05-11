"use server";

import { typeToFlattenedError, z } from "zod";
import bcrypt from "bcrypt";
import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";

const changeAccountInfoFormSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  username: z
    .string({
      invalid_type_error: "사용자 이름은 문자열이어야 합니다.",
      required_error: "사용자 이름은 필수입니다.",
    })
    .toLowerCase()
    .trim(),
  bio: z.string(),
});

const checkPasswords = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

const changePasswordFormSchema = z
  .object({
    password: z
      .string({
        required_error: "암호는 필수입니다.",
      })
      .min(PASSWORD_MIN_LENGTH)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirmPassword: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .refine(checkPasswords, {
    message: "암호와 암호 확인은 일치해야 합니다.",
    path: ["confirmPassword"],
  });

type ChangeAccountInfoState =
  | typeToFlattenedError<{
      username: string;
      email: string;
    }>
  | undefined;

type ChangePasswordState =
  | typeToFlattenedError<{
      password: string;
      confirmPassword: string;
    }>
  | undefined;

export async function changeAccountInfo(
  prevState: ChangeAccountInfoState,
  formData: FormData
) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    bio: formData.get("bio"),
  };
  console.log(data);
  const result = await changeAccountInfoFormSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  }
  const session = await getSession();
  const user = await db.user.update({
    where: { id: session.id! },
    data: {
      username: result.data.username,
      email: result.data.email,
      bio: result.data.bio,
    },
    select: { id: true, username: true, email: true },
  });

  session.id = user!.id;
  session.username = user!.username;
  session.email = user!.email;
  await session.save();
  redirect(`/users/${session.username}`);
}

export async function changePassword(
  prevState: ChangePasswordState,
  formData: FormData
) {
  const data = {
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };
  const result = await changePasswordFormSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  }
  const hashedPassword = await bcrypt.hash(result.data.password, 12);
  const session = await getSession();
  await db.user.update({
    where: { id: session.id! },
    data: { password: hashedPassword },
  });
  session.destroy();
  redirect("/");
}
