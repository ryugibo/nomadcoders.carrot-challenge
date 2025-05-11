"use server";

import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { z } from "zod";

const tweetSchema = z.object({
  tweet: z.string().min(1, "Tweet 내용이 비어있습니다."),
});
export async function addTweet(_: any, formData: FormData) {
  const data = {
    tweet: formData.get("tweet"),
  };
  const result = await tweetSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  }
  const session = await getSession();
  if (!session.id) {
    return;
  }
  await db.tweet.create({
    data: { tweet: result.data.tweet, user: { connect: { id: session.id } } },
  });
  redirect("/");
}

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
      _count: { select: { Like: true, Response: true } },
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
