import TabBar from "@/components/tab-bar";
import { getSession } from "@/lib/session";

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <>
      <div className="w-full sm:w-2xl">
        {modal}
        {children}
      </div>
      <TabBar username={session.username!} />
    </>
  );
}
