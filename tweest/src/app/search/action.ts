import db from "@/lib/db";

export async function searchTweets(keyword: string) {
  const tweets = await db.tweet.findMany({
    where: { tweet: { contains: keyword } },
    select: {
      id: true,
      tweet: true,
      created_at: true,
      user: { select: { username: true } },
      _count: { select: { Like: true, Response: true } },
    },
    orderBy: { created_at: "desc" },
  });
  return tweets;
}
