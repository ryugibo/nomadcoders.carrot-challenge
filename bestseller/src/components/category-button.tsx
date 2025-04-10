"use client";

import Link from "next/link";
import { motion } from "motion/react";
import styles from "@/styles/category-button.module.css";

const variants = {
  initial: {
    scale: 1,
    color: "#fff",
    backgroundColor: "#000",
  },
  hover: {
    scale: 1.5,
    color: "#000",
    backgroundColor: "#fff",
  },
};

interface ICategoryButtonProps {
  text: string;
  path: string;
}

export default function CategoryButton({ text, path }: ICategoryButtonProps) {
  return (
    <Link href={`list/${path}`}>
      <motion.div
        variants={variants}
        initial="initial"
        whileHover="hover"
        layoutId={path}
        className={styles.container}
      >
        {text}
      </motion.div>
    </Link>
  );
}
