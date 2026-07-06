"use client";

import type { TransitionEvent } from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

type ReactionPhase = "idle" | "waiting" | "playing" | "fading";

// These windows were measured against the first frame of reaction.mp4.
const MATCHING_BASE_WINDOWS = [
  [0.8, 1.53],
  [3.67, 4.6],
] as const;

function isMatchingBaseFrame(currentTime: number) {
  return MATCHING_BASE_WINDOWS.some(
    ([start, end]) => currentTime >= start && currentTime <= end,
  );
}

export function HeroVideo() {
  const baseVideoRef = useRef<HTMLVideoElement>(null);
  const reactionVideoRef = useRef<HTMLVideoElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const phaseRef = useRef<ReactionPhase>("idle");
  const [phase, setPhase] = useState<ReactionPhase>("idle");

  useEffect(
    () => () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    },
    [],
  );

  function updatePhase(nextPhase: ReactionPhase) {
    phaseRef.current = nextPhase;
    setPhase(nextPhase);
  }

  function finishReaction() {
    const reactionVideo = reactionVideoRef.current;

    if (reactionVideo) {
      reactionVideo.pause();
      reactionVideo.currentTime = 0;
    }

    updatePhase("idle");
  }

  function playReaction() {
    const reactionVideo = reactionVideoRef.current;

    if (!reactionVideo || phaseRef.current !== "waiting") {
      return;
    }

    reactionVideo.pause();
    reactionVideo.currentTime = 0;
    updatePhase("playing");

    void reactionVideo.play().catch(() => {
      finishReaction();
    });
  }

  function waitForMatchingFrame() {
    const baseVideo = baseVideoRef.current;
    const reactionVideo = reactionVideoRef.current;

    if (
      !baseVideo ||
      !reactionVideo ||
      phaseRef.current !== "waiting"
    ) {
      return;
    }

    if (
      baseVideo.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
      reactionVideo.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
      isMatchingBaseFrame(baseVideo.currentTime)
    ) {
      playReaction();
      return;
    }

    animationFrameRef.current = window.requestAnimationFrame(
      waitForMatchingFrame,
    );
  }

  function handleMouseEnter() {
    if (phaseRef.current !== "idle") {
      return;
    }

    const supportsHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!supportsHover || prefersReducedMotion) {
      return;
    }

    updatePhase("waiting");
    waitForMatchingFrame();
  }

  function handleReactionEnded() {
    if (phaseRef.current === "playing") {
      updatePhase("fading");
    }
  }

  function handleReactionTransitionEnd(
    event: TransitionEvent<HTMLVideoElement>,
  ) {
    if (
      event.propertyName === "opacity" &&
      phaseRef.current === "fading"
    ) {
      finishReaction();
    }
  }

  return (
    <div
      className={styles.heroVideo}
      data-reaction-phase={phase}
      onMouseEnter={handleMouseEnter}
    >
      <video
        ref={baseVideoRef}
        aria-hidden="true"
        autoPlay
        className={styles.heroVideoLayer}
        loop
        muted
        playsInline
        poster="/videos/base-loop-poster.webp?v=20260706-short"
        preload="auto"
        src="/videos/base-loop.mp4?v=20260706-short"
      />

      <video
        ref={reactionVideoRef}
        aria-hidden="true"
        className={`${styles.heroVideoLayer} ${styles.heroReactionVideo}`}
        muted
        onEnded={handleReactionEnded}
        onTransitionEnd={handleReactionTransitionEnd}
        playsInline
        preload="auto"
      >
        <source src="/videos/reaction.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
