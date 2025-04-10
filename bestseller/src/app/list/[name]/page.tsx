interface IIsbn {
  isbn10: string;
  isbn13: string;
}

interface IBuyLink {
  name: string;
  url: string;
}

interface ICategoryBestSeller {
  rank: number;
  rank_last_week: number;
  weeks_on_list: number;
  asterisk: number;
  dagger: number;
  primary_isbn10: string;
  primary_isbn13: string;
  publisher: string;
  description: string;
  price: string;
  title: string;
  author: string;
  contributor: string;
  contributor_note: string;
  book_image: string;
  book_image_width: number;
  book_image_height: number;
  amazon_product_url: string;
  age_group: string;
  book_review_link: string;
  first_chapter_link: string;
  sunday_review_link: string;
  article_chapter_link: string;
  isbns: IIsbn[];
  buy_links: IBuyLink[];
  book_uri: string;
}

interface ICategoryBestSellersResponse {
  status: "OK";
  copyright: string;
  num_results: number;
  last_modified: string;
  results: {
    list_name: string;
    list_name_encoded: string;
    bestsellers_date: string;
    published_date: string;
    published_date_description: string;
    next_published_date: string;
    previous_published_date: string;
    display_name: string;
    normal_list_ends_at: number;
    updated: "WEEKLY" | "MONTHLY";
    books: ICategoryBestSeller[];
    corrections: [];
  };
}

async function getCategoryBestSellers(
  name: string
): Promise<ICategoryBestSellersResponse> {
  const res = await fetch(
    `https://books-api.nomadcoders.workers.dev/list?name=${name}`
  );
  return res.json();
}

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
        {result.results.books.map((book) => (
          <div key={book.primary_isbn10}>
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
