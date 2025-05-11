"use server";

import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { revalidateTag } from "next/cache";
import { typeToFlattenedError, z } from "zod";

const commentSchema = z.object({
  comment: z.string().min(1, "Comment 내용이 비어있습니다."),
});

export interface State {
  tweetId: number;
  errors?: typeToFlattenedError<{
    comment: string;
  }>;
}

export async function addComment({ tweetId }: State, formData: FormData) {
  const data = {
    comment: formData.get("comment"),
  };
  const result = await commentSchema.safeParse(data);
  if (!result.success) {
    return { tweetId, errors: result.error.flatten() };
  }
  const session = await getSession();
  if (!session.id) {
    return { tweetId };
  }
  await db.response.create({
    data: {
      tweetId: tweetId,
      userId: session.id!,
      comment: result.data.comment,
    },
  });
  revalidateTag(`responses-${tweetId}`);
  return { tweetId };
}

export async function likePost(tweetId: number) {
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        tweetId,
        userId: session.id!,
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (error) {
    console.log(error);
  }
}

export async function dislikePost(tweetId: number) {
  const session = await getSession();
  try {
    await db.like.delete({
      where: {
        id: {
          tweetId: tweetId,
          userId: session.id!,
        },
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (error) {
    console.log(error);
  }
}
