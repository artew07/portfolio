"use client";

import { GradientShimmer } from "gradient-shimmer";
import { useState } from "react";

export function CodexShimmer() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      onPointerEnter={(event) => {
        const supportsHover = window.matchMedia(
          "(hover: hover) and (pointer: fine)",
        ).matches;

        if (event.pointerType === "mouse" && supportsHover) {
          setIsHovered(true);
        }
      }}
      onPointerLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <GradientShimmer
          angle={105}
          duration={0.5}
          easing="smooth"
          gradient="mint"
          pauseBetween={1600}
          spread={4}
        >
          Codex
        </GradientShimmer>
      ) : (
        "Codex"
      )}
    </span>
  );
}
