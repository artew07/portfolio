export const BASE_WEIGHT = 400;
export const MAX_WEIGHT = 800;

/**
 * @param {number} distance
 * @param {number} radius
 */
export function getRadialWeight(distance, radius) {
  if (radius <= 0) {
    return BASE_WEIGHT;
  }

  const progress = Math.max(0, 1 - Math.abs(distance) / radius);
  const influence = progress * progress;

  return Math.round(
    BASE_WEIGHT + (MAX_WEIGHT - BASE_WEIGHT) * influence,
  );
}
