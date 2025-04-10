"use client";

import { ICategoryBestSeller } from "@/api/category-best-sellers";
import Link from "next/link";
import styles from "@/styles/book.module.css";
import { motion, Variants } from "motion/react";

const shopButtonVariants: Variants = {
  initial: {
    backgroundColor: "#000",
  },
  hover: {
    backgroundColor: "#2d2d2d",
    transition: { delayChildren: 0.2 },
  },
};

const shopPanelVariants: Variants = {
  initial: {
    visibility: "hidden",
    scaleY: 0,
    transformOrigin: "bottom",
  },
  hover: {
    visibility: "visible",
    scaleY: 1,
  },
};

const shopItemVaiants: Variants = {
  initial: {
    color: "#FFF",
    backgroundColor: "#2d2d2d",
  },
  hover: {
    color: "#2d2d2d",
    backgroundColor: "#FFF",
  },
};
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
      <motion.div
        variants={shopButtonVariants}
        initial="initial"
        whileHover="hover"
        className={styles.shop}
      >
        Buy now &rarr;
        <motion.div variants={shopPanelVariants} className={styles.shop_panel}>
          {buy_links.map((link, index) => (
            <Link key={index} href={link.url}>
              <motion.div
                variants={shopItemVaiants}
                initial="initial"
                whileHover="hover"
              >
                {link.name}
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
