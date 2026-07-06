"use client";

import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useSyncExternalStore,
} from "react";

interface SoundContextValue {
  isSoundEnabled: boolean;
  playTap: () => void;
  toggleSound: () => void;
}

const soundPreferenceStorageKey = "portfolio-interaction-sound-enabled";
const soundPreferenceChangeEvent = "portfolio-sound-preference-change";
const SoundContext = createContext<SoundContextValue | null>(null);

function getSoundPreferenceSnapshot() {
  try {
    return window.localStorage.getItem(soundPreferenceStorageKey) !== "false";
  } catch {
    return true;
  }
}

function getServerSoundPreferenceSnapshot() {
  return true;
}

function subscribeToSoundPreference(onStoreChange: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === soundPreferenceStorageKey) {
      onStoreChange();
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(soundPreferenceChangeEvent, onStoreChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(soundPreferenceChangeEvent, onStoreChange);
  };
}

function saveSoundPreference(isEnabled: boolean) {
  try {
    window.localStorage.setItem(
      soundPreferenceStorageKey,
      String(isEnabled),
    );
  } catch {
    // Keep the in-page interaction working when storage is unavailable.
  }

  window.dispatchEvent(new Event(soundPreferenceChangeEvent));
}

export function SoundProvider({ children }: PropsWithChildren) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const isSoundEnabled = useSyncExternalStore(
    subscribeToSoundPreference,
    getSoundPreferenceSnapshot,
    getServerSoundPreferenceSnapshot,
  );

  const playAudio = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.currentTime = 0;
    void audio.play().catch(() => {
      // A blocked audio request should never interrupt the UI action.
    });
  }, []);

  const playTap = useCallback(() => {
    if (isSoundEnabled) {
      playAudio();
    }
  }, [isSoundEnabled, playAudio]);

  const toggleSound = useCallback(() => {
    const nextIsEnabled = !isSoundEnabled;

    if (isSoundEnabled) {
      playAudio();
    }

    saveSoundPreference(nextIsEnabled);

    if (nextIsEnabled) {
      playAudio();
    }
  }, [isSoundEnabled, playAudio]);

  const value = useMemo(
    () => ({ isSoundEnabled, playTap, toggleSound }),
    [isSoundEnabled, playTap, toggleSound],
  );

  return (
    <SoundContext.Provider value={value}>
      <audio
        aria-hidden="true"
        preload="auto"
        ref={audioRef}
        src="/sounds/tap_05.wav"
      />
      {children}
    </SoundContext.Provider>
  );
}

export function useInteractionSound() {
  const context = useContext(SoundContext);

  if (!context) {
    throw new Error(
      "useInteractionSound must be used inside SoundProvider.",
    );
  }

  return context;
}
