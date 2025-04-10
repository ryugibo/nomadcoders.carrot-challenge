"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/styles/navigation.module.css";
import { motion, AnimatePresence } from "motion/react";

export default function Navigation({ title }: { title?: string }) {
  const path = usePathname();
  return (
    <>
      <nav className={styles.nav}>
        <AnimatePresence>
          <ul>
            <li>
              <Link href="/">Home</Link>
              {path === "/" && <motion.div layoutId="indicator" />}
            </li>
            <li>
              {path.startsWith("/list") && (
                <>
                  {title}
                  <motion.div layoutId="indicator" />
                </>
              )}
            </li>
            <li>
              <Link href="/about">About</Link>
              {path === "/about" && <motion.div layoutId="indicator" />}
            </li>
          </ul>
        </AnimatePresence>
      </nav>
    </>
  );
}
