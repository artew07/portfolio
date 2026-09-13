"use client";

import { useEffect, useRef } from "react";
import styles from "./paper-intro.module.css";

const paperIntroFinishedEvent = "portfolio-paper-intro-finished";

/** A decorative cover: the real page keeps its layout and native scrolling. */
export function PaperIntro() {
  const coverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cover = coverRef.current;
    if (!cover) return;

    if (window.matchMedia("(max-width: 760px)").matches) return;

    if (document.documentElement.dataset.paperIntroPlayed === "true") {
      cover.hidden = true;
      return;
    }

    document.documentElement.dataset.paperIntro = "playing";
    let hasFinished = false;
    const skip = () => {
      if (hasFinished) return;

      hasFinished = true;
      cover.hidden = true;
      delete document.documentElement.dataset.paperIntro;
      document.documentElement.dataset.paperIntroPlayed = "true";
      window.dispatchEvent(new Event(paperIntroFinishedEvent));
    };

    const events = ["wheel", "touchstart", "pointerdown", "keydown", "focusin", "scroll", "resize"] as const;
    const cleanup = () => {
      events.forEach((event) => window.removeEventListener(event, skip));
    };
    events.forEach((event) => window.addEventListener(event, skip, { passive: true }));
    const introTimer = window.setTimeout(skip, 2600);

    return () => {
      window.clearTimeout(introTimer);
      cleanup();
    };
  }, []);

  return (
    <div
      ref={coverRef}
      className={styles.cover}
      aria-hidden="true"
      data-paper-intro
    >
      <div className={styles.roll}>
        <span className={styles.edge} />
      </div>
    </div>
  );
}
