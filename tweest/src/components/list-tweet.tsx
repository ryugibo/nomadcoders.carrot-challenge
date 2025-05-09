import { formatToTimeAgo } from "@/lib/utils";
import Link from "next/link";

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
    <Link href={`/tweets/${id}`}>
      <div className="border-2 w-full border-neutral-800 py-3">
        <div className="flex flex-row justify-between mx-3">
          <Link href={`/users/${username}`}>
            <div className="hover:underline">{username}</div>
          </Link>
          <div>{formatToTimeAgo(created_at)}</div>
        </div>
        <div className=" bg-neutral-600 rounded-md py-4 px-2 mx-2 text-white">
          {tweet}
        </div>
      </div>
    </Link>
  );
}
