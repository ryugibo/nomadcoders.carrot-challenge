"use server";

import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";

function checkUsername(username: string) {
  return !username.includes("potato");
}

const checkPasswords = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "사용자 이름은 문자열이어야 합니다.",
        required_error: "사용자 이름은 필수입니다.",
      })
      .toLowerCase()
      .trim()
      .transform((username) => username)
      .refine(checkUsername, "No potatoes allowed!"),
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
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: { username: username },
      select: { id: true },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "이미 사용중인 사용자 이름입니다.",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  }
  const hashedPassword = await bcrypt.hash(result.data.password, 12);
  console.log(hashedPassword);
  const user = await db.user.create({
    data: {
      username: result.data.username,
      password: hashedPassword,
    },
    select: { id: true },
  });
  console.log(user);
  const session = await getSession();
  session.id = user.id;
  await session.save();

  redirect("/profile");
}
