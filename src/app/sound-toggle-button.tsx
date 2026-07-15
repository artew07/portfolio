"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useInteractionSound } from "./sound-provider";

export function SoundToggleButton({ className }: { className: string }) {
  const { isSoundEnabled, toggleSound } = useInteractionSound();
  const label = isSoundEnabled
    ? "Disable interaction sounds"
    : "Enable interaction sounds";
  const Icon = isSoundEnabled ? Volume2 : VolumeX;

  return (
    <button
      data-sound-toggle
      aria-label={label}
      aria-pressed={isSoundEnabled}
      className={className}
      onClick={toggleSound}
      title={label}
      type="button"
    >
      <Icon aria-hidden="true" size={16} strokeWidth={1.5} />
    </button>
  );
}
