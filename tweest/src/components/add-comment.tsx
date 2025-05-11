"use client";

import FormButton from "./form-button";
import FormInput from "./form-input";
import { useActionState, useOptimistic } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import {
  addComment,
  State as AddCommentState,
} from "@/app/(tab)/tweets/[id]/action";

export default function AddComment({
  tweetId,
  username,
  responses,
}: {
  tweetId: number;
  username: string;
  responses: {
    comment: string;
    created_at: Date;
    user: { username: string };
  }[];
}) {
  const [responseState, reducerFn] = useOptimistic(
    responses,
    (
      prevState: {
        comment: string;
        created_at: Date;
        user: { username: string };
        pending?: boolean;
      }[],
      payload: {
        comment: string;
        created_at: Date;
        user: { username: string };
      }
    ) => {
      return [...prevState, { ...payload, pending: true }];
    }
  );
  const [state, action] = useActionState(
    async (prevState: AddCommentState, formData: FormData) => {
      reducerFn({
        comment: formData.get("comment") + "",
        created_at: new Date(),
        user: { username: username! },
      });
      return await addComment(prevState, formData);
    },
    {
      tweetId,
    }
  );
  return (
    <>
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
      <div>
        {responseState.map((response, index) => (
          <div key={index}>
            {response.user.username}: {response.comment}
          </div>
        ))}
      </div>
    </>
  );
}
