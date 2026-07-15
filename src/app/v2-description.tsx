"use client";

import styles from "./page.module.css";
import { useInteractionSound } from "./sound-provider";

export function V2Description() {
  const { playTap } = useInteractionSound();

  return (
    <div className={styles.v2Description}>
      <p>
        I have 5+ years of experience. I explore product design, AI, and
        emerging technologies to create better digital experiences. Previously,
        I worked at{" "}
        <a
          className={styles.v2InlineLink}
          href="https://steamify.io/cashout/cs2"
          onClick={playTap}
          rel="noreferrer"
          target="_blank"
        >
          Steamify
        </a>
        {", where I built an ecosystem for gamers."}
      </p>
      <p>
        I also share practical insights on{" "}
        <a
          className={styles.v2InlineLink}
          href="https://www.youtube.com/@artem_uxdesign"
          onClick={playTap}
          rel="noreferrer"
          target="_blank"
        >
          YouTube
        </a>{" "}
        and run a{" "}
        <a
          className={styles.v2InlineLink}
          href="https://telegram.me/artem_designich"
          onClick={playTap}
          rel="noreferrer"
          target="_blank"
        >
          Telegram
        </a>{" "}
        channel for designers and tech enthusiasts. Outside of work, I play
        tennis, go to the gym, and compete in Counter-Strike 2.
      </p>
      <p>Based in Moscow, UTC+3</p>
    </div>
  );
}
