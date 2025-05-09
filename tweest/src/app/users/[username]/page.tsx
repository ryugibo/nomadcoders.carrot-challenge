import FormButton from "@/components/form-button";
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
    <div className="flex flex-col items-center mt-10 mx-5">
      <div className="flex justify-center w-full relative">
        <span className="absolute left-0">
          <Link href="/">&larr;</Link>
        </span>
        <span>{user.username}</span>
      </div>
      <span>Bio: {user.bio}</span>
      <span>Created at: {user.created_at.toDateString()}!</span>
      <span>Updated at: {user.updated_at.toDateString()}!</span>
      {username === session.username && (
        <form action={logOut}>
          <FormButton text={"로그아웃"} />
        </form>
      )}
    </div>
  );
}
