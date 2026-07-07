"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type PointerEvent,
} from "react";

const phantomPath =
  "M215.715 1518C448.348 1518 623.175 1315.69 727.504 1155.83C714.817 1191.2 707.769 1226.56 707.769 1260.52C707.769 1353.89 761.343 1420.39 867.089 1420.39C1012.3 1420.39 1167.4 1293.06 1247.76 1155.83C1242.12 1175.64 1239.3 1194.03 1239.3 1211C1239.3 1276.08 1275.96 1317.11 1350.68 1317.11C1586.13 1317.11 1823 899.767 1823 534.766C1823 250.406 1679.19 0 1318.26 0C683.798 0 0 775.271 0 1276.08C0 1472.73 105.742 1518 215.715 1518ZM1099.72 503.642C1099.72 432.906 1139.2 383.391 1197.01 383.391C1253.4 383.391 1292.88 432.906 1292.88 503.642C1292.88 574.379 1253.4 625.308 1197.01 625.308C1139.2 625.308 1099.72 574.379 1099.72 503.642ZM1401.44 503.642C1401.44 432.906 1440.92 383.391 1498.72 383.391C1555.12 383.391 1594.59 432.906 1594.59 503.642C1594.59 574.379 1555.12 625.308 1498.72 625.308C1440.92 625.308 1401.44 574.379 1401.44 503.642Z";

const settingsKey = "phantom-logo-glow-settings-v3";
const settingsVersion = 3;

const defaultSettings = {
  blur: 53,
  brightness: 1.25,
  glowColor: "#614fee",
  isOutlineGlow: true,
  logoColor: "#181721",
  opacity: 0.92,
  outlineWidth: 2,
  radius: 150,
  saturation: 0.85,
  scale: 0.65,
  settingsVersion,
};

type PhantomSettings = typeof defaultSettings;

function PhantomMark({
  className = "",
  color,
  gradient,
  style,
}: {
  className?: string;
  color: string;
  gradient?: {
    brightness: number;
    blur: number;
    opacity: number;
    outlineWidth: number;
    radius: number;
    saturation: number;
    variant: "fill" | "outline";
    x: number;
    y: number;
  };
  style?: CSSProperties;
}) {
  const idPrefix = useId().replaceAll(":", "");
  const gradientId = `${idPrefix}-phantom-route-gradient`;
  const fill = gradient ? `url(#${gradientId})` : color;
  const middleStop = gradient
    ? Math.min(0.86, Math.max(0.16, 1 - gradient.blur / 72))
    : 0.48;

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      style={style}
      viewBox="0 0 1823 1518"
      xmlns="http://www.w3.org/2000/svg"
    >
      {gradient ? (
        <defs>
          <radialGradient
            cx={gradient.x}
            cy={gradient.y}
            gradientUnits="userSpaceOnUse"
            id={gradientId}
            r={gradient.radius}
          >
            <stop stopColor={color} stopOpacity={gradient.opacity} />
            <stop
              offset={middleStop}
              stopColor={color}
              stopOpacity={gradient.opacity * 0.72}
            />
            <stop offset="1" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>
      ) : null}
      <path
        d={phantomPath}
        fill={gradient?.variant === "outline" ? "none" : fill}
        stroke={gradient?.variant === "outline" ? fill : undefined}
        strokeLinecap={gradient?.variant === "outline" ? "round" : undefined}
        strokeLinejoin={gradient?.variant === "outline" ? "round" : undefined}
        strokeWidth={
          gradient?.variant === "outline" ? gradient.outlineWidth : undefined
        }
        style={
          gradient
            ? {
                filter: `brightness(${gradient.brightness}) saturate(${gradient.saturation})`,
                vectorEffect:
                  gradient.variant === "outline" ? "non-scaling-stroke" : undefined,
              }
            : undefined
        }
      />
    </svg>
  );
}

export default function FooterSecondPage() {
  const settings: PhantomSettings = defaultSettings;
  const [isGlowActive, setIsGlowActive] = useState(false);
  const hasLoadedSettingsRef = useRef(false);
  const [glowPosition, setGlowPosition] = useState({ x: 912, y: 759 });
  const [viewBoxScale, setViewBoxScale] = useState(3.5);

  useEffect(() => {
    queueMicrotask(() => {
      const savedSettings = window.localStorage.getItem(settingsKey);

      if (savedSettings) {
        try {
          const parsedSettings = JSON.parse(
            savedSettings,
          ) as Partial<PhantomSettings>;

          if (parsedSettings.settingsVersion !== settingsVersion) {
            window.localStorage.removeItem(settingsKey);
            window.localStorage.setItem(
              settingsKey,
              JSON.stringify(defaultSettings),
            );
            hasLoadedSettingsRef.current = true;
            return;
          }

          window.localStorage.setItem(
            settingsKey,
            JSON.stringify(defaultSettings),
          );
        } catch {
          window.localStorage.removeItem(settingsKey);
          window.localStorage.setItem(
            settingsKey,
            JSON.stringify(defaultSettings),
          );
        }
      } else {
        window.localStorage.setItem(
          settingsKey,
          JSON.stringify(defaultSettings),
        );
      }

      hasLoadedSettingsRef.current = true;
    });
  }, []);

  useEffect(() => {
    if (!hasLoadedSettingsRef.current) {
      return;
    }

    window.localStorage.setItem(settingsKey, JSON.stringify(settings));
  }, [settings]);

  function updateGlowPosition(
    event: MouseEvent<HTMLDivElement> | PointerEvent<HTMLDivElement>,
  ) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 1823;
    const y = ((event.clientY - rect.top) / rect.height) * 1518;

    setIsGlowActive(true);
    setViewBoxScale(1823 / rect.width);
    setGlowPosition({
      x: Math.round(x),
      y: Math.round(y),
    });
  }

  const gradientRadius = settings.radius * viewBoxScale;
  const logoWidth = `min(${72 * settings.scale}vw, ${560 * settings.scale}px)`;

  return (
    <main className="grid min-h-dvh place-items-center overflow-hidden bg-[#0B0B0E]">
      <div
        className="relative aspect-[1823/1518] max-w-[calc(100vw-48px)] cursor-default select-none sm:max-w-[calc(100vw-64px)]"
        onMouseEnter={(event) => {
          setIsGlowActive(true);
          updateGlowPosition(event);
        }}
        onMouseLeave={() => setIsGlowActive(false)}
        onMouseMove={updateGlowPosition}
        onPointerEnter={updateGlowPosition}
        onPointerLeave={() => setIsGlowActive(false)}
        onPointerMove={updateGlowPosition}
        style={{ width: logoWidth }}
      >
        <PhantomMark
          className="absolute inset-0 size-full"
          color={settings.logoColor}
        />
        <PhantomMark
          className="pointer-events-none absolute inset-0 size-full transition-opacity duration-150 ease-out"
          color={settings.glowColor}
          gradient={{
            brightness: settings.brightness,
            blur: settings.blur,
            opacity: settings.opacity,
            outlineWidth: settings.outlineWidth,
            radius: gradientRadius,
            saturation: settings.saturation,
            variant: settings.isOutlineGlow ? "outline" : "fill",
            x: glowPosition.x,
            y: glowPosition.y,
          }}
          style={{
            mixBlendMode: "screen",
            opacity: isGlowActive ? 1 : 0,
          }}
        />
      </div>
    </main>
  );
}
