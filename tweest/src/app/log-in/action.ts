"use server";

import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

const checkUsernameExists = async (username: string) => {
  const user = await db.user.findUnique({
    where: { username: username },
    select: { id: true },
  });
  return Boolean(user);
};

const formSchema = z.object({
  username: z
    .string({ required_error: "사용자 이름은 필수입니다." })
    .min(3, "사용자 이름은 3글자 이상이어야 합니다.")
    .toLowerCase()
    .refine(checkUsernameExists, "등록되지 않은 사용자 이름입니다."),
  password: z
    .string({ required_error: "암호는 필수입니다." })
    .min(PASSWORD_MIN_LENGTH, "암호는 6글자 이상이어야 합니다."),
});

export const login = async (
  prevState:
    | {
        fieldErrors: {
          username?: string[];
          password?: string[];
        };
      }
    | undefined,
  formData: FormData
) => {
  const data = {
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  }
  const user = await db.user.findUnique({
    where: {
      username: result.data.username,
    },
    select: {
      id: true,
      password: true,
    },
  });
  const ok = await bcrypt.compare(result.data.password, user?.password ?? "");
  if (!ok) {
    return {
      fieldErrors: {
        username: [],
        password: ["Wrong password."],
      },
    };
  }
  const session = await getSession();
  session.id = user!.id;
  await session.save();
  redirect("/");
};
