"use client";

import { useRef } from "react";
import styles from "./page.module.css";
import { useInteractionSound } from "./sound-provider";

interface SocialPreviewLinkProps {
  children: string;
  href: string;
  previewSrc: string;
}

export function SocialPreviewLink({
  children,
  href,
  previewSrc,
}: SocialPreviewLinkProps) {
  const { playTap } = useInteractionSound();
  const videoRef = useRef<HTMLVideoElement>(null);

  function startPreview() {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.dataset.loaded !== "true") {
      video.dataset.loaded = "true";
      video.src = previewSrc;
      video.load();
    }

    video.currentTime = 0;
    void video.play().catch(() => {
      // The preview remains useful as soon as its first frame is ready.
    });
  }

  function stopPreview() {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.pause();
    video.currentTime = 0;
  }

  return (
    <a
      aria-label={`${children} — opens in a new tab`}
      className={`${styles.v2InlineLink} ${styles.socialPreviewLink}`}
      href={href}
      onClick={playTap}
      onBlur={stopPreview}
      onFocus={startPreview}
      onPointerEnter={startPreview}
      onPointerLeave={stopPreview}
      rel="noreferrer"
      target="_blank"
    >
      {children}
      <span aria-hidden="true" className={styles.socialPreviewTooltip}>
        <video
          className={styles.socialPreviewVideo}
          loop
          muted
          playsInline
          preload="none"
          ref={videoRef}
        />
      </span>
    </a>
  );
}
