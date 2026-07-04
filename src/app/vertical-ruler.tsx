"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import {
  getRulerCoordinates,
  getRulerMarkerTop,
} from "./vertical-ruler-math.mjs";

export function VerticalRuler() {
  const rulerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const coordinates = getRulerCoordinates(height);

  useEffect(() => {
    const ruler = rulerRef.current;
    const container = ruler?.parentElement;

    if (!container) {
      return;
    }

    const observer = new ResizeObserver(() => {
      const nextHeight = Math.ceil(container.getBoundingClientRect().height);
      setHeight((currentHeight) =>
        currentHeight === nextHeight ? currentHeight : nextHeight,
      );
    });

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rulerRef} className={styles.ruler} aria-hidden="true">
      {coordinates.map((coordinate) => (
        <span
          className={styles.rulerMarker}
          key={coordinate}
          style={{ top: getRulerMarkerTop(coordinate) }}
        >
          <span className={styles.rulerLabel}>{coordinate}</span>
          <span className={styles.rulerTick} />
        </span>
      ))}
    </div>
  );
}
