"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import styles from "./interactive-card-demo.module.css";

const InteractiveCardDemo = dynamic(() => import("./interactive-card-demo"), {
  loading: () => <div className={styles.loadingCard} aria-hidden="true" />,
  ssr: false,
});

export function InteractiveCardCover() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "640px 0px" },
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={styles.demo}>
      {shouldLoad ? (
        <InteractiveCardDemo />
      ) : (
        <div className={styles.loadingCard} aria-hidden="true" />
      )}
    </div>
  );
}
