# Heading Variants Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Render a plain Test Family hero heading on `/new` while preserving the current interactive heading as an inactive code variant.

**Architecture:** A small variant module owns the active heading identifier, and a focused server component renders either heading treatment. `next/font/local` scopes Test Family Regular to the plain variant; the page only renders the heading component.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS Modules, Node test runner

---

### Task 1: Heading variant selection

**Files:**
- Create: `src/app/new/heading-version.mjs`
- Create: `src/app/new/heading-version.test.mts`

- [ ] **Step 1: Write the failing selection tests**

```ts
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
```

- [ ] **Step 2: Run the test and verify RED**

Run: `node --test src/app/new/heading-version.test.mts`

Expected: FAIL because `heading-version.mjs` does not exist.

- [ ] **Step 3: Implement the typed selection constants**

```js
/** @typedef {"plain" | "interactive"} HeadingVersion */

/** @type {readonly HeadingVersion[]} */
export const HEADING_VERSIONS = ["plain", "interactive"];

/** @type {HeadingVersion} */
export const ACTIVE_HEADING_VERSION = "plain";
```

- [ ] **Step 4: Run the test and verify GREEN**

Run: `node --test src/app/new/heading-version.test.mts`

Expected: 2 tests pass.

### Task 2: Variant-based hero heading

**Files:**
- Create: `src/app/new/hero-heading.tsx`
- Modify: `src/app/new/page.tsx`
- Modify: `src/app/new/page.module.css`

- [ ] **Step 1: Add the focused heading component**

Create `HeroHeading` with:

```tsx
import Image from "next/image";
import localFont from "next/font/local";
import styles from "./page.module.css";
import { ACTIVE_HEADING_VERSION } from "./heading-version.mjs";
import { VariableWord } from "./variable-word";

const testFamily = localFont({
  src: "../../../public/font/Test Family/TestFamily-Regular.otf",
  display: "swap",
  style: "normal",
  weight: "400",
});

export function HeroHeading() {
  if (ACTIVE_HEADING_VERSION === "plain") {
    return (
      <h1 className={testFamily.className}>
        Software designer focused
        <br />
        on B2C web and mobile products
      </h1>
    );
  }

  return (
    <h1>
      Software <VariableWord word="designer" /> focused
      <br />
      on{" "}
      <span className={styles.accentText}>
        B2C web and mobile
        <Image
          aria-hidden="true"
          className={styles.accentUnderline}
          src="/svg/underline_big.svg"
          width={245}
          height={9}
          alt=""
          unoptimized
        />
      </span>{" "}
      products
    </h1>
  );
}
```

- [ ] **Step 2: Replace inline page markup**

Remove the page-level `VariableWord` import and replace the existing `<h1>` block with:

```tsx
<HeroHeading />
```

- [ ] **Step 3: Keep shared typography explicit**

Add `font-style: normal` to `.intro h1`; preserve the existing size, weight, line-height, spacing, colors, and all inactive interactive styles.

### Task 3: Verification

**Files:**
- Verify: `src/app/new/*`

- [ ] **Step 1: Run all local page tests**

Run: `node --test src/app/new/*.test.mts`

Expected: 7 tests pass.

- [ ] **Step 2: Run targeted lint**

Run: `npx eslint src/app/new`

Expected: exit code 0.

- [ ] **Step 3: Run production build**

Run: `npm run build`

Expected: exit code 0 with `/new` statically generated.

- [ ] **Step 4: Verify in browser**

Open `/new` at desktop and mobile widths. Confirm the plain heading uses Test Family Regular, has no highlight or underline, keeps the specified line break, and causes no horizontal overflow.
