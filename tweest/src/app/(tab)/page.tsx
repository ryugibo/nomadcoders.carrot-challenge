import AddTweet from "@/components/add-tweet";
import { getTweets } from "../action";
import TweetList from "@/components/tweet-list";
import { TWEETS_PER_PAGE } from "@/lib/constants";

export default async function Home() {
  const initialTweets = await getTweets(0, TWEETS_PER_PAGE);

  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen h-screen gap-8 overflow-x-hidden">
      <div className="fixed flex items-center justify-center h-20 w-full sm:w-2xl px-10 sm:px-0">
        <AddTweet />
      </div>
      <div className="w-full h-full mt-20 overflow-y-scroll overflow-x-hidden">
        <TweetList initialTweets={initialTweets} />
      </div>
    </div>
  );
}
