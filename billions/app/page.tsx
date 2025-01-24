import Billion from "../component/billion";
import styles from "../styles/home.module.css";
import { API_URL } from "./constants";

async function getBillions() {
  const billions = await fetch(API_URL, { cache: "force-cache" });
  return billions.json();
}

export default async function Page() {
  const billions = await getBillions();
  return (
    <div className={styles.container}>
      {billions.map((billion) => (
        <Billion
          key={billion.id}
          id={billion.id}
          name={billion.name}
          squareImage={billion.squareImage}
          netWorth={billion.netWorth}
          industries={billion.industries}
        />
      ))}
    </div>
  );
}
