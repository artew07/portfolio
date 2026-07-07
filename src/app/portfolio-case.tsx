"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import dynamic from "next/dynamic";
import {
  Fragment,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import { InteractiveCardCover } from "@/components/interactive-card-cover";
import { DashboardCasePreview } from "./dashboard-case-preview";
import styles from "./page.module.css";

type CaseImageVariant = "steamify" | "loop" | "ccp" | "safe";

type CaseCover =
  | {
      type: "interactive-card";
    }
  | {
      type: "phantom-glow";
    }
  | {
      type: "image";
      src: string | StaticImageData;
      alt: string;
      eager?: boolean;
      width: number;
      height: number;
      variant: CaseImageVariant;
      sizes?: string;
    }
  | {
      type: "video";
      src: string;
      variant: "loop";
    };

interface PortfolioCaseProps {
  accent?: string;
  caseId: string;
  centeredTitle?: boolean;
  cover: CaseCover;
  metadata?: string[];
  title?: string | false;
}

const caseImageClassNames: Record<CaseImageVariant, string> = {
  steamify: styles.steamifyCaseImage,
  loop: styles.loopCaseImage,
  ccp: styles.ccpCaseImage,
  safe: styles.safeCaseImage,
};

const phantomPath =
  "M215.715 1518C448.348 1518 623.175 1315.69 727.504 1155.83C714.817 1191.2 707.769 1226.56 707.769 1260.52C707.769 1353.89 761.343 1420.39 867.089 1420.39C1012.3 1420.39 1167.4 1293.06 1247.76 1155.83C1242.12 1175.64 1239.3 1194.03 1239.3 1211C1239.3 1276.08 1275.96 1317.11 1350.68 1317.11C1586.13 1317.11 1823 899.767 1823 534.766C1823 250.406 1679.19 0 1318.26 0C683.798 0 0 775.271 0 1276.08C0 1472.73 105.742 1518 215.715 1518ZM1099.72 503.642C1099.72 432.906 1139.2 383.391 1197.01 383.391C1253.4 383.391 1292.88 432.906 1292.88 503.642C1292.88 574.379 1253.4 625.308 1197.01 625.308C1139.2 625.308 1099.72 574.379 1099.72 503.642ZM1401.44 503.642C1401.44 432.906 1440.92 383.391 1498.72 383.391C1555.12 383.391 1594.59 432.906 1594.59 503.642C1594.59 574.379 1555.12 625.308 1498.72 625.308C1440.92 625.308 1401.44 574.379 1401.44 503.642Z";

const defaultPhantomCaseSettings = {
  blur: 53,
  brightness: 1.25,
  glowColor: "#614fee",
  isOutlineGlow: true,
  logoColor: "#0b0b0e",
  opacity: 0.92,
  outlineWidth: 2,
  radius: 150,
  saturation: 0.85,
  scale: 0.65,
};

const isDevelopment = process.env.NODE_ENV === "development";

type PhantomCaseSettings = typeof defaultPhantomCaseSettings;

const PhantomCaseDebugControls = isDevelopment
  ? dynamic(
      () =>
        import("./phantom-case-debug-controls").then(
          (module) => module.PhantomCaseDebugControls,
        ),
      { ssr: false },
    )
  : null;

function PhantomGlowCover() {
  const idPrefix = useId().replaceAll(":", "");
  const gradientId = `${idPrefix}-phantom-card-gradient`;
  const animationFrameRef = useRef<number | null>(null);
  const animationStartedAtRef = useRef<number | null>(null);
  const autoPhaseRef = useRef(0);
  const animationStartPhaseRef = useRef(0);
  const [settings, setSettings] = useState<PhantomCaseSettings>(
    defaultPhantomCaseSettings,
  );
  const [glowPosition, setGlowPosition] = useState({ x: 912, y: 759 });
  const [viewBoxScale, setViewBoxScale] = useState(3.5);

  function updateSetting<Key extends keyof PhantomCaseSettings>(
    key: Key,
    value: PhantomCaseSettings[Key],
  ) {
    setSettings((currentSettings) => ({
      ...currentSettings,
      [key]: value,
    }));
  }

  const stopAutoGlow = useCallback(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    animationStartedAtRef.current = null;
  }, []);

  const startAutoGlow = useCallback(() => {
    if (animationFrameRef.current !== null) {
      return;
    }

    animationStartedAtRef.current = null;
    animationStartPhaseRef.current = autoPhaseRef.current;

    const animateGlow = (timestamp: number) => {
      if (animationStartedAtRef.current === null) {
        animationStartedAtRef.current = timestamp;
      }

      const duration = 5200;
      const progress =
        (animationStartPhaseRef.current +
          ((timestamp - animationStartedAtRef.current) % duration) / duration) %
        1;
      const angle = progress * Math.PI * 2 - Math.PI / 2;

      autoPhaseRef.current = progress;
      setGlowPosition({
        x: Math.round(912 + Math.cos(angle) * 560 + Math.sin(angle * 2) * 80),
        y: Math.round(759 + Math.sin(angle) * 430 - Math.cos(angle * 2) * 90),
      });

      animationFrameRef.current = requestAnimationFrame(animateGlow);
    };

    animationFrameRef.current = requestAnimationFrame(animateGlow);
  }, []);

  function getAutoPhaseFromPosition(x: number, y: number) {
    const angle = Math.atan2((y - 759) / 430, (x - 912) / 560);
    const phase = (angle + Math.PI / 2) / (Math.PI * 2);

    return ((phase % 1) + 1) % 1;
  }

  function followPointer(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const nextPosition = {
      x: Math.round(((event.clientX - rect.left) / rect.width) * 1823),
      y: Math.round(((event.clientY - rect.top) / rect.height) * 1518),
    };

    setViewBoxScale(1823 / rect.width);
    autoPhaseRef.current = getAutoPhaseFromPosition(
      nextPosition.x,
      nextPosition.y,
    );
    setGlowPosition(nextPosition);
  }

  function handlePointerEnter(event: PointerEvent<HTMLDivElement>) {
    stopAutoGlow();
    followPointer(event);
  }

  function handlePointerLeave() {
    startAutoGlow();
  }

  useEffect(() => {
    startAutoGlow();

    return () => {
      stopAutoGlow();
    };
  }, [startAutoGlow, stopAutoGlow]);

  const middleStop = Math.min(
    0.86,
    Math.max(0.16, 1 - settings.blur / 72),
  );
  const gradientRadius = settings.radius * viewBoxScale;
  const logoWidth = `min(${72 * settings.scale}%, ${560 * settings.scale}px)`;
  const fill = `url(#${gradientId})`;

  return (
    <>
      <div
        className={styles.phantomCaseTarget}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerMove={followPointer}
        style={{ width: logoWidth }}
      >
        <svg
          aria-hidden="true"
          className={styles.phantomCaseLogo}
          data-debug-media
          fill="none"
          viewBox="0 0 1823 1518"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient
              cx={glowPosition.x}
              cy={glowPosition.y}
              gradientUnits="userSpaceOnUse"
              id={gradientId}
              r={gradientRadius}
            >
              <stop
                stopColor={settings.glowColor}
                stopOpacity={settings.opacity}
              />
              <stop
                offset={middleStop}
                stopColor={settings.glowColor}
                stopOpacity={settings.opacity * 0.72}
              />
              <stop offset="1" stopColor={settings.glowColor} stopOpacity="0" />
            </radialGradient>
          </defs>
          <path d={phantomPath} fill={settings.logoColor} />
          <path
            className={styles.phantomCaseGlow}
            d={phantomPath}
            fill={settings.isOutlineGlow ? "none" : fill}
            opacity={1}
            stroke={settings.isOutlineGlow ? fill : undefined}
            strokeLinecap={settings.isOutlineGlow ? "round" : undefined}
            strokeLinejoin={settings.isOutlineGlow ? "round" : undefined}
            strokeWidth={
              settings.isOutlineGlow ? settings.outlineWidth : undefined
            }
            style={{
              filter: `brightness(${settings.brightness}) saturate(${settings.saturation})`,
              vectorEffect: settings.isOutlineGlow
                ? "non-scaling-stroke"
                : undefined,
            }}
          />
        </svg>
      </div>

      <span className={styles.phantomCaseHint}>Hover on logo</span>

      {PhantomCaseDebugControls ? (
        <PhantomCaseDebugControls
          onUpdateSetting={updateSetting}
          settings={settings}
        />
      ) : null}
    </>
  );
}

export function PortfolioCase({
  accent,
  caseId,
  centeredTitle = false,
  cover,
  metadata,
  title = false,
}: PortfolioCaseProps) {
  return (
    <article className={styles.case} data-case-id={caseId}>
      {cover.type === "interactive-card" ? (
        <div
          className={`${styles.caseVisual} ${styles.interactiveCaseVisual}`}
          data-debug-frame
        >
          <div className={styles.interactiveCaseMedia} data-debug-media>
            <InteractiveCardCover />
          </div>
        </div>
      ) : cover.type === "phantom-glow" ? (
        <div
          className={`${styles.caseVisual} ${styles.phantomCaseVisual}`}
          data-debug-frame
        >
          <PhantomGlowCover />
        </div>
      ) : cover.type === "video" ? (
        <div className={styles.caseVisual} data-debug-frame>
          <video
            aria-hidden="true"
            autoPlay
            className={`${styles.caseVideo} ${styles.loopCaseVideo}`}
            data-debug-media
            loop
            muted
            playsInline
            preload="metadata"
            src={cover.src}
          />
        </div>
      ) : (
        <div
          className={`${styles.caseVisual} ${
            cover.variant === "steamify"
              ? styles.steamifyCaseVisual
              : ""
          } ${
            cover.variant === "loop" ? styles.loopCaseVisual : ""
          } ${
            cover.variant === "ccp" ? styles.ccpCaseVisual : ""
          } ${
            cover.variant === "ccp" || cover.variant === "safe"
              ? styles.caseVisualFlushBottom
              : ""
          }`}
          data-debug-frame
        >
          {cover.variant === "loop" ? (
            <DashboardCasePreview
              alt={cover.alt}
              sizes={
                cover.sizes ??
                "(max-width: 760px) calc(100vw - 40px), 512px"
              }
              src={cover.src}
            />
          ) : (
            <Image
              alt={cover.alt}
              className={`${styles.caseImage} ${caseImageClassNames[cover.variant]}`}
              data-debug-media
              height={cover.height}
              loading={cover.eager ? "eager" : undefined}
              sizes={
                cover.sizes ??
                "(max-width: 760px) calc(100vw - 40px), 636px"
              }
              src={cover.src}
              width={cover.width}
            />
          )}
        </div>
      )}

      {title ? (
        <div className={styles.caseCaption}>
          <span
            className={
              centeredTitle ? styles.secondCaseTitle : styles.caseTitle
            }
          >
            {title}
            {accent ? (
              <>
                {" "}
                <span className={styles.caseMetric}>
                  {accent}
                  <Image
                    aria-hidden="true"
                    alt=""
                    className={styles.caseMetricUnderline}
                    height={6}
                    src="/svg/underline_small.webp"
                    unoptimized
                    width={87}
                  />
                </span>
              </>
            ) : null}
          </span>

          {metadata?.length ? (
            <span className={styles.caseMetadata}>
              {metadata.map((item, index) => (
                <Fragment key={item}>
                  {index > 0 ? <span aria-hidden="true">•</span> : null}
                  <span>{item}</span>
                </Fragment>
              ))}
            </span>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
