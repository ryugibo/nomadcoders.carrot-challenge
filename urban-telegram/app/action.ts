"use server";

import { z } from "zod";

const checkEmail = (email: string) => email.endsWith("@zod.com");

const regexPassword = new RegExp(/^(?=.*[a-zA-Z])(?=.*\d).+$/);

const formSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .refine(checkEmail, "Only @zod.com emails are allowed"),
  username: z.string().min(5, "Username should be at least 5 characters long."),
  password: z
    .string()
    .min(10, "Password should be at least 10 characters long.")
    .regex(
      regexPassword,
      "Password should contain at least one number(0123456789)"
    ),
});

export const onSubmit = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return {
      requested: true,
      errors: result.error.flatten(),
    };
  }
  return {
    requested: true,
    errors: undefined,
  };
};
