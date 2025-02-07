"use server";

import db from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function getTweetCount() {
  return await db.tweet.count();
}
export async function getTweet(id: number) {
  return await db.tweet.findUnique({
    where: { id },
    select: {
      id: true,
      tweet: true,
      created_at: true,
      user: { select: { username: true } },
    },
  });
}
export async function getTweets(page: number, amount: number) {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      created_at: true,
      user: { select: { username: true } },
    },
    skip: page * amount,
    take: amount,
    orderBy: { created_at: "desc" },
  });
  return tweets;
}

export type tweetCoutnt = Prisma.PromiseReturnType<typeof getTweetCount>;
export type tweet = Prisma.PromiseReturnType<typeof getTweet>;
export type tweets = Prisma.PromiseReturnType<typeof getTweets>;
