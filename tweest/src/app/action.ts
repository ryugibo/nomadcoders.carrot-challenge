"use server";

import { typeToFlattenedError, z } from "zod";

const checkEmail = (email: string) => email.endsWith("@zod.com");

const regexPassword = new RegExp(/^(?=.*[a-zA-Z]*)(?=.*\d).+$/);

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

export const onSubmit = async (
  prevState: {
    requested: boolean;
    data: { email: string; username: string; password: string };
    errors:
      | typeToFlattenedError<
          {
            email: string;
            username: string;
            password: string;
          },
          string
        >
      | undefined;
  },
  payload: FormData
) => {
  const data = {
    email: payload.get("email"),
    username: payload.get("username"),
    password: payload.get("password"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return {
      requested: true,
      data: {
        email: data.email?.toString() || "",
        username: data.username?.toString() || "",
        password: data.password?.toString() || "",
      },
      errors: result.error.flatten(),
    };
  }
  return {
    requested: true,
    data: {
      email: data.email?.toString() || "",
      username: data.username?.toString() || "",
      password: data.password?.toString() || "",
    },
    errors: undefined,
  };
};
