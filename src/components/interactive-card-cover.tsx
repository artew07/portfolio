"use client";

import dynamic from "next/dynamic";
import styles from "./interactive-card-demo.module.css";

const InteractiveCardDemo = dynamic(() => import("./interactive-card-demo"), {
  loading: () => <div className={styles.loadingCard} aria-hidden="true" />,
  ssr: false,
});

export function InteractiveCardCover() {
  return <InteractiveCardDemo />;
}
