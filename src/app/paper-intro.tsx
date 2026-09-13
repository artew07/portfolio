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

    const documentId = String(performance.timeOrigin);
    const storageKey = "portfolio-paper-intro-document";
    const hasPlayedInThisDocument =
      sessionStorage.getItem(storageKey) === documentId;

    // A page load creates a new document; an in-app return keeps the current
    // one. This makes the intro reliable on first visit and refresh only.
    if (hasPlayedInThisDocument) return;

    sessionStorage.setItem(storageKey, documentId);
    document.documentElement.dataset.paperIntro = "playing";
    let hasFinished = false;
    let introTimer: number | undefined;
    const skip = () => {
      if (hasFinished) return;

      hasFinished = true;
      cover.hidden = true;
      delete document.documentElement.dataset.paperIntro;
      window.dispatchEvent(new Event(paperIntroFinishedEvent));
    };
    const start = () => {
      if (hasFinished) return;

      cover.hidden = false;
      introTimer = window.setTimeout(skip, 2600);
    };

    const events = ["wheel", "touchstart", "pointerdown", "keydown", "focusin", "scroll", "resize"] as const;
    const cleanup = () => {
      events.forEach((event) => window.removeEventListener(event, skip));
    };
    events.forEach((event) => window.addEventListener(event, skip, { passive: true }));
    if (document.readyState === "complete") {
      start();
    } else {
      window.addEventListener("load", start, { once: true });
    }

    return () => {
      if (introTimer !== undefined) window.clearTimeout(introTimer);
      window.removeEventListener("load", start);
      cleanup();
    };
  }, []);

  return (
    <div
      ref={coverRef}
      className={styles.cover}
      aria-hidden="true"
      data-paper-intro
      hidden
    >
      <div className={styles.roll}>
        <span className={styles.edge} />
      </div>
    </div>
  );
}
