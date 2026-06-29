import assert from "node:assert/strict";
import test from "node:test";
import { getRadialWeight } from "./variable-word-weight.mjs";

test("uses the maximum weight directly under the pointer", () => {
  assert.equal(getRadialWeight(0, 56), 800);
});

test("returns to the base weight at and beyond the influence radius", () => {
  assert.equal(getRadialWeight(56, 56), 400);
  assert.equal(getRadialWeight(80, 56), 400);
});

test("applies a smooth quadratic falloff between the pointer and radius", () => {
  assert.equal(getRadialWeight(14, 56), 625);
  assert.equal(getRadialWeight(28, 56), 500);
});
