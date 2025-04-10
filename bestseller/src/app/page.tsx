import styles from "@/styles/app.module.css";
import Link from "next/link";

interface IBestSeller {
  list_name: string;
  display_name: string;
  list_name_encoded: string;
  oldest_published_date: string;
  newest_published_date: string;
  updated: "WEEKLY" | "MONTHLY";
}

interface IBestSellersResponse {
  status: "OK";
  copyright: string;
  num_results: number;
  results: IBestSeller[];
}

async function getBestSellers(): Promise<IBestSellersResponse> {
  const res = await fetch("https://books-api.nomadcoders.workers.dev/lists");
  return res.json();
}

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
