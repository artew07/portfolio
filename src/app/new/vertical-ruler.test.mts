import assert from "node:assert/strict";
import test from "node:test";
import {
  getRulerCoordinates,
  getRulerMarkerTop,
} from "./vertical-ruler-math.mjs";

test("returns ruler coordinates from zero through the measured height", () => {
  assert.deepEqual(getRulerCoordinates(0), [0]);
  assert.deepEqual(getRulerCoordinates(250), [0, 200]);
  assert.deepEqual(getRulerCoordinates(400), [0, 200, 400]);
});

test("offsets ruler markers 44 pixels from the top", () => {
  assert.equal(getRulerMarkerTop(0), 44);
  assert.equal(getRulerMarkerTop(200), 244);
});
