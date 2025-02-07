import { getTweet } from "@/app/action";
import { formatToTimeAgo } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function TweetDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = Number((await params).id);
  if (isNaN(id)) {
    return notFound();
  }
  const tweet = await getTweet(id);
  if (!tweet) {
    return notFound();
  }
  return (
    <div>
      <div>Written by {tweet.user.username}</div>
      <div>{formatToTimeAgo(tweet.created_at)}</div>
      {tweet!.tweet}
    </div>
  );
}
