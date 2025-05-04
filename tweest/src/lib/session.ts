"use server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: number;
  username?: string;
}

export async function getSession() {
  const cookie = await cookies();

  const session = await getIronSession<SessionContent>(cookie, {
    cookieName: "tweest",
    password: process.env.COOKIE_PASSWORD!,
  });

  return session;
}
