import { notFound } from "next/navigation";
import { searchTweets } from "./action";

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ keyword?: string }>;
}) {
  const { keyword } = await searchParams;
  if (!keyword) {
    return notFound();
  }
  const tweets = await searchTweets(keyword);

  return (
    <div>
      {tweets.map((tweet, id) => (
        <div key={id}>{tweet.tweet}</div>
      ))}
    </div>
  );
}
