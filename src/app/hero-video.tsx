"use client";

import type { CSSProperties } from "react";
import type { MouseEvent } from "react";
import type { TransitionEvent } from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import { mediaUrl } from "./media";

type ReactionPhase = "idle" | "waiting" | "playing" | "holding" | "fading";
type HeroMaskSettings = {
  centerY: number;
  radialHeight: number;
  radialOpacity: number;
  radialSoft: number;
  radialSolid: number;
  radialWidth: number;
  xFade: number;
  yFade: number;
};

const MAX_SYNC_WAIT_MS = 100;
const REACTION_HOLD_TIME = 3;
const MATCHING_BASE_WINDOWS = [
  [0, 0.8],
  [2.47, 3.33],
] as const;
const initialMaskSettings: HeroMaskSettings = {
  centerY: 57,
  radialHeight: 77,
  radialOpacity: 78,
  radialSoft: 72,
  radialSolid: 56,
  radialWidth: 92,
  xFade: 12,
  yFade: 28,
};

/*
const maskStorageKey = "portfolio-hero-video-mask-debug";
const maskSettingsChangeEvent = "portfolio-hero-video-mask-debug-change";
let cachedMaskSettingsStorageValue: string | null = null;
let cachedMaskSettingsSnapshot: HeroMaskSettings = initialMaskSettings;
*/

function isMatchingBaseFrame(currentTime: number) {
  return MATCHING_BASE_WINDOWS.some(
    ([start, end]) => currentTime >= start && currentTime <= end,
  );
}

export function HeroVideo({ className }: { className?: string }) {
  const baseVideoRef = useRef<HTMLVideoElement>(null);
  const reactionVideoRef = useRef<HTMLVideoElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const hoveredRef = useRef(false);
  const hasHeldRef = useRef(false);
  const isIntroductionRef = useRef(false);
  const phaseRef = useRef<ReactionPhase>("idle");
  const [phase, setPhase] = useState<ReactionPhase>("idle");
  const [cursorLabel, setCursorLabel] = useState({
    isVisible: false,
    x: 0,
    y: 0,
  });
  const maskSettings = initialMaskSettings;

  /*
  const maskSettings = useSyncExternalStore(
    subscribeToMaskSettings,
    readSavedMaskSettings,
    getServerMaskSettings,
  );
  */

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

  /*
  function updateMaskSetting<Key extends keyof HeroMaskSettings>(
    key: Key,
    value: HeroMaskSettings[Key],
  ) {
    saveMaskSettings({
      ...maskSettings,
      [key]: value,
    });
  }

  function resetMaskSettings() {
    window.localStorage.removeItem(maskStorageKey);
    window.dispatchEvent(new Event(maskSettingsChangeEvent));
  }
  */

  function finishReaction() {
    const reactionVideo = reactionVideoRef.current;

    if (reactionVideo) {
      reactionVideo.pause();
      reactionVideo.currentTime = 0;
    }

    hasHeldRef.current = false;
    isIntroductionRef.current = false;
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

  function handleMouseEnter(event: MouseEvent<HTMLDivElement>) {
    hoveredRef.current = true;
    updateCursorLabel(event);

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
    setCursorLabel((currentLabel) => ({
      ...currentLabel,
      isVisible: false,
    }));

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

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    updateCursorLabel(event);
  }

  function updateCursorLabel(event: MouseEvent<HTMLDivElement>) {
    const supportsHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;

    if (!supportsHover) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();

    setCursorLabel({
      isVisible: true,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  }

  function handleReactionTimeUpdate() {
    const reactionVideo = reactionVideoRef.current;

    if (
      !reactionVideo ||
      phaseRef.current !== "playing" ||
      isIntroductionRef.current ||
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

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const introductionTimer = window.setTimeout(() => {
      isIntroductionRef.current = true;
      updatePhase("waiting");
      waitForMatchingFrame(window.performance.now());
    }, 0);

    return () => {
      window.clearTimeout(introductionTimer);
    };

    // The introduction should run once when this mounted hero is hydrated.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      data-reaction-phase={phase}
      className={[styles.heroVideoShell, className].filter(Boolean).join(" ")}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div
        className={styles.heroVideo}
        data-reaction-phase={phase}
        style={getMaskStyle(maskSettings)}
      >
        <video
          ref={baseVideoRef}
          aria-hidden="true"
          autoPlay
          className={styles.heroVideoLayer}
          loop
          muted
          playsInline
          poster={mediaUrl("/videos/base-loop-poster.webp?v=20260706-fast")}
          preload="auto"
          src={mediaUrl("/videos/base-loop-short.mp4?v=20260706-fast")}
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
          <source src={mediaUrl("/videos/reaction.mp4")} type="video/mp4" />
        </video>
      </div>

      {/*
      {process.env.NODE_ENV === "development" ? (
        <HeroMaskDebugPanel
          onReset={resetMaskSettings}
          onUpdateSetting={updateMaskSetting}
          settings={maskSettings}
        />
      ) : null}
      */}

      <span
        aria-hidden="true"
        className={styles.heroCursorLabel}
        data-visible={cursorLabel.isVisible}
        style={{
          "--hero-cursor-label-x": `${cursorLabel.x}px`,
          "--hero-cursor-label-y": `${cursorLabel.y}px`,
        } as CSSProperties}
      >
        Say Hi
      </span>
    </div>
  );
}

/*
function subscribeToMaskSettings(onStoreChange: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === maskStorageKey) {
      onStoreChange();
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(maskSettingsChangeEvent, onStoreChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(maskSettingsChangeEvent, onStoreChange);
  };
}

function readSavedMaskSettings() {
  try {
    const savedSettings = window.localStorage.getItem(maskStorageKey);

    if (!savedSettings) {
      cachedMaskSettingsStorageValue = null;
      cachedMaskSettingsSnapshot = initialMaskSettings;

      return cachedMaskSettingsSnapshot;
    }

    if (savedSettings === cachedMaskSettingsStorageValue) {
      return cachedMaskSettingsSnapshot;
    }

    cachedMaskSettingsStorageValue = savedSettings;
    cachedMaskSettingsSnapshot = {
      ...initialMaskSettings,
      ...(JSON.parse(savedSettings) as Partial<HeroMaskSettings>),
    };

    return cachedMaskSettingsSnapshot;
  } catch {
    cachedMaskSettingsStorageValue = null;
    cachedMaskSettingsSnapshot = initialMaskSettings;

    return cachedMaskSettingsSnapshot;
  }
}

function getServerMaskSettings() {
  return initialMaskSettings;
}

function saveMaskSettings(settings: HeroMaskSettings) {
  window.localStorage.setItem(maskStorageKey, JSON.stringify(settings));
  window.dispatchEvent(new Event(maskSettingsChangeEvent));
}
*/

function getMaskStyle(settings: HeroMaskSettings) {
  return {
    "--hero-video-mask-center-y": `${settings.centerY}%`,
    "--hero-video-mask-radial-height": `${settings.radialHeight}%`,
    "--hero-video-mask-radial-opacity": `${settings.radialOpacity}%`,
    "--hero-video-mask-radial-soft": `${settings.radialSoft}%`,
    "--hero-video-mask-radial-solid": `${settings.radialSolid}%`,
    "--hero-video-mask-radial-width": `${settings.radialWidth}%`,
    "--hero-video-mask-x-fade": `${settings.xFade}%`,
    "--hero-video-mask-y-fade": `${settings.yFade}%`,
  } as CSSProperties;
}

/*
function HeroMaskDebugPanel({
  onReset,
  onUpdateSetting,
  settings,
}: {
  onReset: () => void;
  onUpdateSetting: <Key extends keyof HeroMaskSettings>(
    key: Key,
    value: HeroMaskSettings[Key],
  ) => void;
  settings: HeroMaskSettings;
}) {
  const [isVisible, setIsVisible] = useState(false);

  if (!isVisible) {
    return (
      <button
        aria-label="Open hero mask debug panel"
        className={styles.heroMaskDebugToggle}
        onClick={() => setIsVisible(true)}
        type="button"
      >
        <SlidersHorizontal aria-hidden="true" size={15} strokeWidth={1.8} />
      </button>
    );
  }

  return (
    <div className={styles.heroMaskDebugPanel}>
      <div className={styles.heroMaskDebugHeader}>
        <span>Hero mask</span>
        <div className={styles.heroMaskDebugActions}>
          <button
            aria-label="Reset hero mask"
            className={styles.heroMaskDebugIconButton}
            onClick={onReset}
            type="button"
          >
            <RotateCcw aria-hidden="true" size={13} strokeWidth={1.8} />
          </button>
          <button
            aria-label="Close hero mask debug panel"
            className={styles.heroMaskDebugIconButton}
            onClick={() => setIsVisible(false)}
            type="button"
          >
            <X aria-hidden="true" size={14} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      <HeroMaskSlider
        label="x fade"
        max={32}
        min={0}
        onChange={(value) => onUpdateSetting("xFade", value)}
        value={settings.xFade}
      />
      <HeroMaskSlider
        label="y fade"
        max={34}
        min={0}
        onChange={(value) => onUpdateSetting("yFade", value)}
        value={settings.yFade}
      />
      <HeroMaskSlider
        label="width"
        max={140}
        min={40}
        onChange={(value) => onUpdateSetting("radialWidth", value)}
        value={settings.radialWidth}
      />
      <HeroMaskSlider
        label="height"
        max={130}
        min={40}
        onChange={(value) => onUpdateSetting("radialHeight", value)}
        value={settings.radialHeight}
      />
      <HeroMaskSlider
        label="center"
        max={82}
        min={28}
        onChange={(value) => onUpdateSetting("centerY", value)}
        value={settings.centerY}
      />
      <HeroMaskSlider
        label="radius"
        max={82}
        min={20}
        onChange={(value) => onUpdateSetting("radialSolid", value)}
        value={settings.radialSolid}
      />
      <HeroMaskSlider
        label="soft"
        max={96}
        min={30}
        onChange={(value) => onUpdateSetting("radialSoft", value)}
        value={settings.radialSoft}
      />
      <HeroMaskSlider
        label="opacity"
        max={100}
        min={0}
        onChange={(value) => onUpdateSetting("radialOpacity", value)}
        value={settings.radialOpacity}
      />
    </div>
  );
}

function HeroMaskSlider({
  label,
  max,
  min,
  onChange,
  value,
}: {
  label: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  value: number;
}) {
  return (
    <label className={styles.heroMaskDebugSlider}>
      <span>{label}</span>
      <input
        max={max}
        min={min}
        onChange={(event) => onChange(Number(event.target.value))}
        type="range"
        value={value}
      />
      <span>{value}%</span>
    </label>
  );
}
*/
