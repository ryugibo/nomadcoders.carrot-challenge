"use client";

import FormButton from "./form-button";
import FormInput from "./form-input";
import { useActionState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { addComment } from "@/app/tweets/[id]/action";

export default function AddComment({ tweetId }: { tweetId: number }) {
  const [state, action] = useActionState(addComment, {
    tweetId,
    errors: undefined,
  });
  return (
    <form action={action} className="flex flex-row w-full">
      <div className="w-full">
        <FormInput
          id="comment"
          name="comment"
          errors={state?.errors?.fieldErrors.comment}
        >
          <PencilSquareIcon className="size-5" />
        </FormInput>
      </div>
      <div className="w-32 *:w-full">
        <FormButton text="쓰기" />
      </div>
    </form>
  );
}
