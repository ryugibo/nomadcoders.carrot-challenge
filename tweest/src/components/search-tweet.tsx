"use client";

import { searchKeyword } from "@/app/search/action";
import FormButton from "./form-button";
import FormInput from "./form-input";
import { useActionState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

export default function SearchTweet() {
  const [state, action] = useActionState(searchKeyword, null);
  return (
    <form action={action} className="flex flex-row w-full">
      <div className="w-full">
        <FormInput
          id="keyword"
          name="keyword"
          errors={state?.fieldErrors.keyword}
        >
          <PencilSquareIcon className="size-5" />
        </FormInput>
      </div>
      <div className="w-32 *:w-full">
        <FormButton text="검색" />
      </div>
    </form>
  );
}
