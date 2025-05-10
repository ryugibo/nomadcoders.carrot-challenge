import Logo from "@/components/logo";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-10 py-8 px-6 h-screen items-center justify-center xl:flex-row">
      <Logo className="size-80 xl:size-1/2" />
      {children}
    </div>
  );
}
