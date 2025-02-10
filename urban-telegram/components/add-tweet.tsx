"use client";

import { addTweet } from "@/app/action";
import FormButton from "./form-button";
import FormInput from "./form-input";
import { useActionState } from "react";

export default function AddTweet() {
  const [state, action] = useActionState(addTweet, null);
  return (
    <form action={action}>
      <FormInput id="tweet" name="tweet" errors={state?.fieldErrors.tweet} />
      <FormButton text="쓰기" />
    </form>
  );
}
