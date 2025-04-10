import { getCategoryBestSellers } from "@/api/category-best-sellers";
import Navigation from "@/components/navigation";

interface ILayoutProps {
  children: React.ReactNode;
  params: Promise<{ name: string }>;
}

export default async function Layout({ children, params }: ILayoutProps) {
  const { name } = await params;
  const result = await getCategoryBestSellers(name);

  return (
    <>
      <Navigation title={result.results.display_name} />
      {children}
    </>
  );
}
