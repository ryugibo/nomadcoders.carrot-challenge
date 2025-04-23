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

export interface State {
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
}

export const onSubmit = async (prevState: State, payload: FormData) => {
  const data = {
    email: payload.get("email"),
    username: payload.get("username"),
    password: payload.get("password"),
  };
  const clientData = {
    email: typeof data?.email === "string" ? data.email : "",
    username: typeof data?.username === "string" ? data.username : "",
    password: typeof data?.password === "string" ? data.password : "",
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return {
      requested: true,
      data: clientData,
      errors: result.error.flatten(),
    };
  }
  return {
    requested: true,
    data: clientData,
    errors: undefined,
  };
};
