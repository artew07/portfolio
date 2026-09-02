"use client";

import styles from "./page.module.css";
import { mediaUrl } from "./media";
import { useInteractionSound } from "./sound-provider";
import { SocialPreviewLink } from "./social-preview-link";

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
        {", where I built an ecosystem for gamers. I've also designed products for crypto companies like "}
        <a
          className={styles.v2InlineLink}
          href="https://safe.global/"
          onClick={playTap}
          rel="noreferrer"
          target="_blank"
        >
          Safe
        </a>
        {", with hands-on experience in Web3, wallets, and digital assets."}
      </p>
      <p>
        I also share practical insights on{" "}
        <SocialPreviewLink
          href="https://www.youtube.com/@artem_uxdesign"
          previewSrc={mediaUrl("/videos/youtube_tooltip.mp4")}
        >
          YouTube
        </SocialPreviewLink>{" "}
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
      {/* <p>Based in Moscow, UTC+3</p> */}
    </div>
  );
}
