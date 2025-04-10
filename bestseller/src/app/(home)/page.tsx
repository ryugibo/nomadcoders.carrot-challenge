import styles from "@/styles/app.module.css";
import { getBestSellers } from "../../api/best-sellers";
import CategoryButton from "@/components/category-button";

export default async function Home() {
  const bestSellers = await getBestSellers();
  return (
    <div className={styles.container}>
      {bestSellers.results.map((bestSeller, index) => (
        <CategoryButton
          key={index}
          text={bestSeller.display_name}
          path={bestSeller.list_name_encoded}
        />
      ))}
    </div>
  );
}
