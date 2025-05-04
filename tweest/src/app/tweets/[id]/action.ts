"use server";

import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const commentSchema = z.object({
  comment: z.string().min(1, "Comment 내용이 비어있습니다."),
});
export async function addComment(
  { tweetId, errors }: { tweetId: number; errors?: any },
  formData: FormData
) {
  const data = {
    comment: formData.get("comment"),
  };
  const result = await commentSchema.safeParse(data);
  if (!result.success) {
    return { tweetId, errors: result.error.flatten() };
  }
  const session = await getSession();
  if (!session.id) {
    return { tweetId, errors: undefined };
  }
  await db.response.create({
    data: {
      tweetId: tweetId,
      userId: session.id!,
      comment: result.data.comment,
    },
  });
  return { tweetId, errors: undefined };
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
  } catch (error) {}
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
  } catch (error) {}
}
