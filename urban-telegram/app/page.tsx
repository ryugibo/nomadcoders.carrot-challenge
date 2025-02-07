import {
  ArrowLeftCircleIcon,
  ArrowLeftIcon,
  ArrowRightCircleIcon,
  ArrowRightIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { getTweetCount, getTweets } from "./action";
import ListTweet from "@/components/list-tweet";
import TweetList from "@/components/tweet-list";
import { TWEETS_PER_PAGE } from "@/lib/constants";

export default async function Home() {
  const initialTweets = await getTweets(0, TWEETS_PER_PAGE);
  const initialTotalTweetCount = await getTweetCount();
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6 h-screen">
      <TweetList
        initialTweets={initialTweets}
        initialTweetCount={initialTotalTweetCount}
      />
    </div>
  );
}
