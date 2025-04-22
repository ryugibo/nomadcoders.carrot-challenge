"use server";

export const onSubmit = async (prevState: any, formData: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  if (formData.get("password") == "12345") {
    return { ok: true, errors: [] };
  } else {
    return {
      ok: false,
      errors: ["wrong password"],
    };
  }
};
