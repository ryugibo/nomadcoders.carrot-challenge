"use server";

import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

const formSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z
    .string({ required_error: "암호는 필수입니다." })
    .min(PASSWORD_MIN_LENGTH, "암호는 6글자 이상이어야 합니다."),
});

export const login = async (
  prevState:
    | {
        fieldErrors: {
          email?: string[];
          password?: string[];
        };
      }
    | undefined,
  formData: FormData
) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  }
  const user = await db.user.findUnique({
    where: {
      email: result.data.email,
    },
    select: {
      id: true,
      email: true,
      username: true,
      password: true,
    },
  });
  const ok = await bcrypt.compare(result.data.password, user?.password ?? "");
  if (!ok) {
    return {
      fieldErrors: {
        email: [],
        password: ["Wrong password."],
      },
    };
  }
  const session = await getSession();
  session.id = user!.id;
  session.username = user!.username;
  session.email = user!.email;
  await session.save();
  redirect("/");
};
