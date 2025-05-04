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
    <div className="flex flex-col gap-5 m-5">
      <div className="flex flex-row justify-between">
        <div>Written by {tweet.user.username}</div>
        <div>{formatToTimeAgo(tweet.created_at)}</div>
      </div>
      {tweet!.tweet}
      {tweet.Response.map((response) => (
        <div key={response.id}>{response.comment}</div>
      ))}
    </div>
  );
}
