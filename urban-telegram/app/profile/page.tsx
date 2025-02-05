import FormButton from "@/components/form-button";
import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (!session.id) {
    return null;
  }
  const user = await db.user.findUnique({ where: { id: session.id } });
  if (!user) {
    return null;
  }
  return user;
}
export default async function Profile() {
  const user = await getUser();
  if (!user) {
    notFound();
  }
  const logOut = async () => {
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/");
  };
  return (
    <div className="flex flex-col items-center mt-10">
      <h1>Welcome!</h1>
      <span>Username: {user.username}!</span>
      <span>Bio: {user.bio}</span>
      <span>Created at: {user.created_at.toDateString()}!</span>
      <span>Updated at: {user.updated_at.toDateString()}!</span>
      <form action={logOut}>
        <FormButton text={"로그아웃"} />
      </form>
    </div>
  );
}
