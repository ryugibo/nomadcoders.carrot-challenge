import db from "@/lib/db";
import { getSession } from "@/lib/session";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

async function getUser(username: string) {
  const session = await getSession();
  if (!session.id) {
    return null;
  }
  const user = await db.user.findUnique({ where: { username: username } });
  if (!user) {
    return null;
  }
  return user;
}
export default async function UserProfile({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const username = (await params).username;
  const user = await getUser(username);
  if (!user) {
    notFound();
  }
  const session = await getSession();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/");
  };
  return (
    <div className="flex flex-col items-center mt-10 mx-5 w-full">
      <div className="flex justify-center w-full relative">
        <span className="absolute left-0">
          <Link href="/">&larr;</Link>
        </span>
        <span>{user.username}</span>
        {user.id === session.id && (
          <span className="absolute right-0 flex gap-5">
            <Link
              className="hover:bg-neutral-300 px-2"
              href={`./${username}/edit`}
            >
              편집
            </Link>
            <form action={logOut}>
              <button className="hover:cursor-pointer hover:bg-neutral-300 px-2">
                로그아웃
              </button>
            </form>
          </span>
        )}
      </div>
      <div className="w-full flex flex-col">
        <span className="text-4xl font-bold underline">{user.username}</span>
        <div className="h-10" />
        <span className="">bb: {user.bio}</span>
      </div>
    </div>
  );
}
