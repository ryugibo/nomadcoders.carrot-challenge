import { getTweet } from "@/app/action";
import LikeButton from "@/components/like-button";
import { getSession } from "@/lib/session";
import { formatToTimeAgo } from "@/lib/utils";
import { notFound } from "next/navigation";
import { unstable_cache as nextCache } from "next/cache";
import db from "@/lib/db";

async function getLikeStatus(tweetId: number, userId: number) {
  const isLiked = Boolean(
    await db.like.findUnique({
      where: { id: { tweetId, userId } },
    })
  );

  const likeCount = await db.like.count({
    where: { tweetId },
  });
  return { likeCount, isLiked };
}

async function getCachedLikeStatus(tweetId: number) {
  const session = await getSession();
  const userId = session.id;
  const cachedOperation = nextCache(getLikeStatus, ["like-status"], {
    tags: [`like-status-${tweetId}`],
  });
  return cachedOperation(tweetId, userId!);
}

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
  const { likeCount, isLiked } = await getCachedLikeStatus(tweet.id);
  return (
    <div className="flex flex-col gap-5 m-5">
      <div className="flex flex-row justify-between">
        <div>Written by {tweet.user.username}</div>
        <div>{formatToTimeAgo(tweet.created_at)}</div>
      </div>
      <LikeButton isLiked={isLiked} likeCount={likeCount} tweetId={tweet.id} />
      {tweet!.tweet}
      {tweet.Response.map((response) => (
        <div key={response.id}>{response.comment}</div>
      ))}
    </div>
  );
}
