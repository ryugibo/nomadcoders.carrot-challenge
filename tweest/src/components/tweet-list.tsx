"use client";

import { getTweets, tweets } from "@/app/action";
import { useEffect, useRef, useState } from "react";
import { TWEETS_PER_PAGE } from "@/lib/constants";
import ListTweet from "./list-tweet";
import { Prisma } from "@prisma/client";

export default function TweetList({
  initialTweets,
  queryWhere,
}: {
  initialTweets: tweets;
  queryWhere?: Prisma.TweetWhereInput;
}) {
  const [tweets, setTweets] = useState(initialTweets);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const trigger = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries, observer) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);
          const newTweets = await getTweets(
            page + 1,
            TWEETS_PER_PAGE,
            queryWhere
          );
          if (newTweets.length > 0) {
            setPage((prev) => prev + 1);
            setTweets((prev) => [...prev, ...newTweets]);
          } else {
            setIsLastPage(true);
          }
          setIsLoading(false);
        }
      },
      {
        threshold: 0.5,
      }
    );
    if (trigger.current) {
      observer.observe(trigger.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [page]);

  return (
    <div className="h-full w-full relative">
      <div className="flex flex-col gap-5">
        {tweets.map((tweet) => (
          <ListTweet
            key={tweet.id}
            username={tweet.user.username}
            countLike={tweet._count.Like}
            countResponse={tweet._count.Response}
            {...tweet}
          />
        ))}
        {tweets.length > 0 && !isLastPage && (
          <span
            ref={trigger}
            className="mb-96 text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
          >
            {isLoading ? "로딩 중" : "Load more"}
          </span>
        )}
      </div>
    </div>
  );
}
