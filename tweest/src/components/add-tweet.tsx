"use client";

import { addTweet } from "@/app/action";
import FormButton from "./form-button";
import FormInput from "./form-input";
import { useActionState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

export default function AddTweet() {
  const [state, action] = useActionState(addTweet, null);
  return (
    <form action={action} className="flex flex-row w-full">
      <div className="w-full">
        <FormInput id="tweet" name="tweet" errors={state?.fieldErrors.tweet}>
          <PencilSquareIcon className="size-5" />
        </FormInput>
      </div>
      <div className="w-32 *:w-full">
        <FormButton text="쓰기" />
      </div>
    </form>
  );
}
