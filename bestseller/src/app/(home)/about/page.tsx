import styles from "@/styles/about.module.css";

export default function About() {
  return (
    <div className={styles.container}>
      <header className={styles.title}>ABOUT US</header>
      <p>
        Welcome to the official explorer for The New York Times Best Seller list
        explorer.
      </p>
      <p> We hope you enjoy your stay!</p>
    </div>
  );
}
