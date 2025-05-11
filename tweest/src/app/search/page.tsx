import { getTweets } from "../action";
import { TWEETS_PER_PAGE } from "@/lib/constants";
import TweetList from "@/components/tweet-list";
import { Prisma } from "@prisma/client";
import SearchTweet from "@/components/search-tweet";

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ keyword?: string }>;
}) {
  const { keyword } = await searchParams;
  var queryWhere: Prisma.TweetWhereInput | undefined = undefined;
  if (keyword) {
    queryWhere = {
      tweet: { contains: keyword },
    };
  } else {
    queryWhere = { id: { lt: 0 } };
  }
  const initialTweets = await getTweets(0, TWEETS_PER_PAGE, queryWhere);

  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen h-screen gap-8 overflow-x-hidden">
      <div className="fixed flex items-center justify-center h-20 w-full sm:w-2xl px-10 sm:px-0">
        <SearchTweet />
      </div>
      <div className="w-full h-full mt-20 overflow-y-scroll overflow-x-hidden">
        <TweetList initialTweets={initialTweets} queryWhere={queryWhere} />
      </div>
    </div>
  );
}
