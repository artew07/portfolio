"use client";

import type { TransitionEvent } from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

type ReactionPhase = "idle" | "waiting" | "playing" | "holding" | "fading";

const MAX_SYNC_WAIT_MS = 100;
const REACTION_HOLD_TIME = 3;
const MATCHING_BASE_WINDOWS = [
  [0, 0.8],
  [2.47, 3.33],
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
  const hoveredRef = useRef(false);
  const hasHeldRef = useRef(false);
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

    hasHeldRef.current = false;
    updatePhase("idle");
  }

  function playReaction() {
    const reactionVideo = reactionVideoRef.current;

    if (!reactionVideo || phaseRef.current !== "waiting") {
      return;
    }

    reactionVideo.pause();
    reactionVideo.currentTime = 0;
    hasHeldRef.current = false;
    updatePhase("playing");

    void reactionVideo.play().catch(() => {
      finishReaction();
    });
  }

  function waitForMatchingFrame(startedAt: number) {
    const baseVideo = baseVideoRef.current;

    if (!baseVideo || phaseRef.current !== "waiting") {
      return;
    }

    const reachedMatchingFrame =
      baseVideo.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
      isMatchingBaseFrame(baseVideo.currentTime);
    const reachedWaitLimit =
      window.performance.now() - startedAt >= MAX_SYNC_WAIT_MS;

    if (reachedMatchingFrame || reachedWaitLimit) {
      playReaction();
      return;
    }

    animationFrameRef.current = window.requestAnimationFrame(() => {
      waitForMatchingFrame(startedAt);
    });
  }

  function handleMouseEnter() {
    hoveredRef.current = true;

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
    waitForMatchingFrame(window.performance.now());
  }

  function handleMouseLeave() {
    hoveredRef.current = false;

    if (phaseRef.current !== "holding") {
      return;
    }

    const reactionVideo = reactionVideoRef.current;

    if (!reactionVideo) {
      finishReaction();
      return;
    }

    updatePhase("playing");
    void reactionVideo.play().catch(() => {
      finishReaction();
    });
  }

  function handleReactionTimeUpdate() {
    const reactionVideo = reactionVideoRef.current;

    if (
      !reactionVideo ||
      phaseRef.current !== "playing" ||
      !hoveredRef.current ||
      hasHeldRef.current ||
      reactionVideo.currentTime < REACTION_HOLD_TIME
    ) {
      return;
    }

    hasHeldRef.current = true;
    reactionVideo.pause();
    updatePhase("holding");
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
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={baseVideoRef}
        aria-hidden="true"
        autoPlay
        className={styles.heroVideoLayer}
        loop
        muted
        playsInline
        poster="/videos/base-loop-poster.webp?v=20260706-fast"
        preload="auto"
        src="/videos/base-loop-short.mp4?v=20260706-fast"
      />

      <video
        ref={reactionVideoRef}
        aria-hidden="true"
        className={`${styles.heroVideoLayer} ${styles.heroReactionVideo}`}
        muted
        onEnded={handleReactionEnded}
        onTimeUpdate={handleReactionTimeUpdate}
        onTransitionEnd={handleReactionTransitionEnd}
        playsInline
        preload="auto"
      >
        <source src="/videos/reaction.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
