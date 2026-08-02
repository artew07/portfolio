"use client";

import { GradientShimmer } from "gradient-shimmer";
import { useState } from "react";
import { useInteractionSound } from "./sound-provider";

export function ResumeButton({ className }: { className: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const { playTap } = useInteractionSound();

  return (
    <a
      aria-label="Resume"
      className={className}
      href="https://drive.google.com/file/d/1P8XKiDdLtftVHvlIbEwT0LWX7UPoKrZ1/view?usp=sharing"
      onClick={playTap}
      onPointerEnter={(event) => {
        const supportsHover = window.matchMedia(
          "(hover: hover) and (pointer: fine)",
        ).matches;

        if (event.pointerType === "mouse" && supportsHover) {
          setIsHovered(true);
        }
      }}
      onPointerLeave={() => setIsHovered(false)}
      rel="noreferrer"
      target="_blank"
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
          Resume
        </GradientShimmer>
      ) : (
        "Resume"
      )}
    </a>
  );
}
