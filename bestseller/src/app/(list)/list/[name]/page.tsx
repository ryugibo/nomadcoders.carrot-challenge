import { getCategoryBestSellers } from "@/api/category-best-sellers";

interface IListProps {
  params: Promise<{ name: string }>;
}

export default async function List({ params }: IListProps) {
  const { name } = await params;
  const result = await getCategoryBestSellers(name);
  return (
    <div>
      <header>{result.results.display_name}</header>
      <div>
        {result.results.books.map((book, index) => (
          <div key={index}>
            <h2>{book.title}</h2>
            <h3>{book.author}</h3>
            <img src={book.book_image} alt={book.title} />
            <p>{book.description}</p>
            <p>Rank: {book.rank}</p>
            <p>Weeks on List: {book.weeks_on_list}</p>
            <a href={book.amazon_product_url}>Buy on Amazon</a>
          </div>
        ))}
      </div>
    </div>
  );
}
