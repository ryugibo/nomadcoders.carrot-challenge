import { formatToTimeAgo } from "@/lib/utils";
import Link from "next/link";
import { HeartIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";

interface ListTweetProps {
  id: number;
  tweet: string;
  created_at: Date;
  username: string;
}
export default function ListTweet({
  id,
  tweet,
  created_at,
  username,
}: ListTweetProps) {
  return (
    <div className="w-full border-neutral-800">
      <div className="flex flex-row justify-between items-center">
        <Link href={`/users/${username}`}>
          <div className="hover:underline text-2xl font-bold">{username}</div>
        </Link>
        <hr className="flex-1/2 mx-3" />
        <div>{formatToTimeAgo(created_at)}</div>
      </div>
      <Link href={`/tweets/${id}`}>
        <div className="py-4 px-2 mx-2 hover:bg-neutral-200 text-wrap break-words">
          {tweet}
        </div>
      </Link>
      <div className="*:size-5 flex flex-row">
        <HeartIcon />
        <span>3</span>
        <ChatBubbleOvalLeftIcon />
        <span>3</span>
      </div>
    </div>
  );
}
