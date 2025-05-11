import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import TabBar from "@/components/tab-bar";
import { getSession } from "@/lib/session";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tweest",
  description: "a modern Twitter-inspired microblog platform",
};

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <html lang="ko-KR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative flex flex-col items-center mx-10`}
      >
        <div className="w-full sm:w-2xl">
          {modal}
          {children}
        </div>
        <TabBar username={session.username!} />
      </body>
    </html>
  );
}
