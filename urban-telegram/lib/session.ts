import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: number;
}

export async function getSession() {
  const cookie = await cookies();

  const session = await getIronSession<SessionContent>(cookie, {
    cookieName: "urban-telegram",
    password: process.env.COOKIE_PASSWORD!,
  });

  return session;
}
