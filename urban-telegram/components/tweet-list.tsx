"use client";

import { getTweetCount, getTweets, tweetCoutnt, tweets } from "@/app/action";
import { useState } from "react";
import ListTweet from "./list-tweet";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
import { TWEETS_PER_PAGE } from "@/lib/constants";

export default function TweetList({
  initialTweets,
  initialTweetCount,
}: {
  initialTweets: tweets;
  initialTweetCount: tweetCoutnt;
}) {
  const [tweets, setTweets] = useState(initialTweets);
  const [isLoading, setIsLoading] = useState(false);
  const [tweetCount, setTweetCount] = useState(initialTweetCount);
  const [page, setPage] = useState(0);

  const onClickLeft = async () => {
    setIsLoading(true);
    const newPage = Math.max(0, page - 1);
    if (newPage != page) {
      setTweets(await getTweets(newPage, TWEETS_PER_PAGE));
      setTweetCount(await getTweetCount());
      setPage(newPage);
    }
    setIsLoading(false);
  };
  const onClickRight = async () => {
    setIsLoading(true);
    const maxPage = Math.floor((tweetCount - 1) / TWEETS_PER_PAGE);
    const newPage = Math.min(maxPage, page + 1);
    if (newPage != page) {
      setTweets(await getTweets(newPage, TWEETS_PER_PAGE));
      setTweetCount(await getTweetCount());
      setPage(newPage);
    }
    setIsLoading(false);
  };

  return (
    <div className="h-full w-full relative">
      <div className="flex flex-col gap-5">
        {tweets.map((tweet) => (
          <ListTweet key={tweet.id} username={tweet.user.username} {...tweet} />
        ))}
      </div>
      <div className="absolute bottom-0 flex flex-row w-full justify-between">
        <button
          disabled={page === 0}
          onClick={onClickLeft}
          className="size-28 disabled:text-gray-400"
        >
          <ArrowLeftCircleIcon />
        </button>
        <button
          disabled={page === Math.floor((tweetCount - 1) / TWEETS_PER_PAGE)}
          onClick={onClickRight}
          className="size-28 disabled:text-gray-400"
        >
          <ArrowRightCircleIcon />
        </button>
      </div>
    </div>
  );
}
