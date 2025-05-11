"use client";
import { HandThumbUpIcon as HandThumbUpSolid } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as HandThumbUpOutline } from "@heroicons/react/24/outline";
import { useOptimistic } from "react";
import { dislikePost, likePost } from "@/app/(tab)/tweets/[id]/action";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
}

export default function LikeButton({
  isLiked,
  likeCount,
  tweetId,
}: LikeButtonProps) {
  const [state, reducerFn] = useOptimistic(
    { isLiked, likeCount },
    (previousState) => ({
      isLiked: !previousState.isLiked,
      likeCount: previousState.isLiked
        ? previousState.likeCount - 1
        : previousState.likeCount + 1,
    })
  );
  const action = async () => {
    reducerFn(undefined);
    if (isLiked) {
      await dislikePost(tweetId);
    } else {
      await likePost(tweetId);
    }
  };
  return (
    <form action={action}>
      <button
        className={`cursor-pointer flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-full p-2  transition-colors ${
          state.isLiked
            ? "bg-orange-500 text-white border-orange-500"
            : "hover:bg-neutral-800"
        }`}
      >
        {state.isLiked ? (
          <HandThumbUpSolid className="size-5" />
        ) : (
          <HandThumbUpOutline className="size-5" />
        )}
        {state.isLiked ? (
          <span>{state.likeCount}</span>
        ) : (
          <span>{state.likeCount}</span>
        )}
      </button>
    </form>
  );
}
