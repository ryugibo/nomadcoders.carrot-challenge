import Link from "next/link";
import styles from "../styles/billion.module.css";

interface IBillionProp {
  id: string;
  name: string;
  squareImage: string;
  netWorth: number;
  industries: string[];
}

export default function Billion({
  id,
  name,
  squareImage,
  netWorth,
  industries,
}: IBillionProp) {
  return (
    <div className={styles.billion}>
      <Link href={`/person/${id}`}>
        <img src={squareImage} alt={name} />
        <div>{name}</div>
        <div>
          {(netWorth / 1000).toLocaleString("en-US", {
            maximumFractionDigits: 0,
          })}{" "}
          Billion /{industries}
        </div>
      </Link>
    </div>
  );
}
