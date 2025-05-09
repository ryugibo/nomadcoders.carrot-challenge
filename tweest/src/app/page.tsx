import AddTweet from "@/components/add-tweet";
import { getTweetCount, getTweets } from "./action";
import TweetList from "@/components/tweet-list";
import { TWEETS_PER_PAGE } from "@/lib/constants";
import Link from "next/link";
import { getSession } from "@/lib/session";

export default async function Home() {
  const initialTweets = await getTweets(0, TWEETS_PER_PAGE);
  const initialTotalTweetCount = await getTweetCount();
  const session = await getSession();

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6 h-screen gap-8">
      <Link href={`/users/${session.username}`}>{session.username}</Link>
      <AddTweet />
      <TweetList
        initialTweets={initialTweets}
        initialTweetCount={initialTotalTweetCount}
      />
    </div>
  );
}
