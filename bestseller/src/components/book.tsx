import { ICategoryBestSeller } from "@/api/category-best-sellers";
import Link from "next/link";
import styles from "@/styles/book.module.css";

export default function Book({
  title,
  book_image,
  author,
  buy_links,
}: ICategoryBestSeller) {
  return (
    <div className={styles.container}>
      <div
        className={styles.cover}
        style={{ backgroundImage: `url(${book_image})` }}
      />
      <p className={styles.title}>{title}</p>
      <p className={styles.author}>{author}</p>
      <div className={styles.shop}>
        Go to buy
        <div className={styles.shop_panel}>
          {buy_links.map((link, index) => (
            <div key={index}>
              <Link href={link.url}>{link.name}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
