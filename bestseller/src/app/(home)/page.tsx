import styles from "@/styles/app.module.css";
import Link from "next/link";
import { getBestSellers } from "../../api/best-sellers";

export default async function Home() {
  const bestSellers = await getBestSellers();
  return (
    <div className={styles.container}>
      {bestSellers.results.map((bestSeller, index) => (
        <Link key={index} href={`list/${bestSeller.list_name_encoded}`}>
          <div className={styles.category}>{bestSeller.display_name}</div>
        </Link>
      ))}
    </div>
  );
}
