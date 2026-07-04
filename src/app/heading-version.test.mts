import assert from "node:assert/strict";
import test from "node:test";
import {
  ACTIVE_HEADING_VERSION,
  HEADING_VERSIONS,
} from "./heading-version.mjs";

test("uses the plain heading as the active version", () => {
  assert.equal(ACTIVE_HEADING_VERSION, "plain");
});

test("keeps both heading treatments available", () => {
  assert.deepEqual(HEADING_VERSIONS, ["plain", "interactive"]);
});
