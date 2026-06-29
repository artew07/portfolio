"use client";

import {
  useEffect,
  useRef,
  type MouseEvent as ReactMouseEvent,
} from "react";
import styles from "./page.module.css";
import {
  BASE_WEIGHT,
  getRadialWeight,
} from "./variable-word-weight.mjs";

type VariableWordProps = {
  word: string;
};

const canUseWeightEffect = () =>
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function VariableWord({ word }: VariableWordProps) {
  const slotRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const letterRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const animationFrameRef = useRef<number | null>(null);
  const pointerXRef = useRef(0);

  const resetWeights = () => {
    letterRefs.current.forEach((letter) => {
      if (letter) {
        letter.style.fontVariationSettings = `"wght" ${BASE_WEIGHT}`;
      }
    });
  };

  const updateWeights = () => {
    const firstLetter = letterRefs.current[0];

    if (!firstLetter) {
      return;
    }

    const radius = Number.parseFloat(getComputedStyle(firstLetter).fontSize) * 2;

    letterRefs.current.forEach((letter) => {
      if (!letter) {
        return;
      }

      const rect = letter.getBoundingClientRect();
      const distance = pointerXRef.current - (rect.left + rect.width / 2);
      const weight = getRadialWeight(distance, radius);

      letter.style.fontVariationSettings = `"wght" ${weight}`;
    });
  };

  const handleMouseMove = (event: ReactMouseEvent<HTMLSpanElement>) => {
    if (!canUseWeightEffect()) {
      resetWeights();
      return;
    }

    pointerXRef.current = event.clientX;

    if (animationFrameRef.current !== null) {
      return;
    }

    animationFrameRef.current = window.requestAnimationFrame(() => {
      animationFrameRef.current = null;
      updateWeights();
    });
  };

  const handleMouseLeave = () => {
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    resetWeights();
  };

  useEffect(() => {
    let active = true;
    let resizeFrame: number | null = null;

    const measureLetterWidths = () => {
      resetWeights();

      slotRefs.current.forEach((slot) => {
        if (slot) {
          slot.style.width = "";
        }
      });

      letterRefs.current.forEach((letter, index) => {
        const slot = slotRefs.current[index];

        if (letter && slot) {
          slot.style.width = `${letter.getBoundingClientRect().width}px`;
        }
      });
    };

    const scheduleMeasurement = () => {
      if (resizeFrame !== null) {
        window.cancelAnimationFrame(resizeFrame);
      }

      resizeFrame = window.requestAnimationFrame(() => {
        resizeFrame = null;
        measureLetterWidths();
      });
    };

    measureLetterWidths();
    void document.fonts.ready.then(() => {
      if (active) {
        measureLetterWidths();
      }
    });
    window.addEventListener("resize", scheduleMeasurement);

    return () => {
      active = false;
      window.removeEventListener("resize", scheduleMeasurement);

      if (resizeFrame !== null) {
        window.cancelAnimationFrame(resizeFrame);
      }

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [word]);

  return (
    <span
      aria-label={word}
      className={styles.variableWord}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {Array.from(word).map((letter, index) => (
        <span
          aria-hidden="true"
          className={styles.variableLetterSlot}
          key={`${letter}-${index}`}
          ref={(element) => {
            slotRefs.current[index] = element;
          }}
        >
          <span
            className={styles.variableLetter}
            ref={(element) => {
              letterRefs.current[index] = element;
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </span>
  );
}
