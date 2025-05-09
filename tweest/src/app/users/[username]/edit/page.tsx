export default async function UsersEdit({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const username = (await params).username;
  return <div>Users Edit {username}</div>;
}
