import AddTweet from "@/components/add-tweet";
import { getTweetCount, getTweets } from "./action";
import TweetList from "@/components/tweet-list";
import { TWEETS_PER_PAGE } from "@/lib/constants";

export default async function Home() {
  const initialTweets = await getTweets(0, TWEETS_PER_PAGE);
  const initialTotalTweetCount = await getTweetCount();
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6 h-screen">
      <AddTweet />
      <TweetList
        initialTweets={initialTweets}
        initialTweetCount={initialTotalTweetCount}
      />
    </div>
  );
}
