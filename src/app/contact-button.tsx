"use client";

import { useState } from "react";
import { GradientShimmer } from "gradient-shimmer";

export function ContactButton({ className }: { className: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={className}
      onPointerEnter={(event) => {
        const supportsHover = window.matchMedia(
          "(hover: hover) and (pointer: fine)",
        ).matches;

        if (event.pointerType === "mouse" && supportsHover) {
          setIsHovered(true);
        }
      }}
      onPointerLeave={() => setIsHovered(false)}
      type="button"
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
          Contact me
        </GradientShimmer>
      ) : (
        <span>Contact me</span>
      )}
    </button>
  );
}
