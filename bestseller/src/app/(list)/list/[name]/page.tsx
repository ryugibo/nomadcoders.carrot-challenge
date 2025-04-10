import { getCategoryBestSellers } from "@/api/category-best-sellers";
import Book from "@/components/book";
import style from "@/styles/list.module.css";

interface IListProps {
  params: Promise<{ name: string }>;
}

export default async function List({ params }: IListProps) {
  const { name } = await params;
  const result = await getCategoryBestSellers(name);
  return (
    <div className={style.container}>
      {result.results.books?.map((book, index) => (
        <Book key={index} {...book} />
      ))}
    </div>
  );
}
