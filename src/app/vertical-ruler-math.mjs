export const RULER_STEP = 200;
export const RULER_TOP_OFFSET = 44;

/**
 * @param {number} height
 */
export function getRulerCoordinates(height) {
  const lastCoordinate = Math.max(0, Math.floor(height / RULER_STEP));

  return Array.from(
    { length: lastCoordinate + 1 },
    (_, index) => index * RULER_STEP,
  );
}

/**
 * @param {number} coordinate
 */
export function getRulerMarkerTop(coordinate) {
  return coordinate + RULER_TOP_OFFSET;
}
