import TabBar from "@/components/tab-bar";
import { getSession } from "@/lib/session";

export default async function TabLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <>
      <div className="w-full sm:w-2xl">{children}</div>
      <TabBar username={session.username!} />
    </>
  );
}
