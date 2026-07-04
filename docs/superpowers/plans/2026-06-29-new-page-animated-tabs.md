# `/new` Animated Tabs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Render the existing animated portfolio-category tabs directly below the hero heading on `/new`.

**Architecture:** Keep the shared client component unchanged and compose it from the `/new` server page. Define the static tab data beside the page's other module-level content and render the component inside the existing intro header.

**Tech Stack:** Next.js App Router, React, TypeScript, Framer Motion, CSS Modules

---

### Task 1: Add animated tabs to the `/new` intro

**Files:**
- Modify: `src/app/new/page.tsx`

- [ ] **Step 1: Run a source assertion that demonstrates the feature is absent**

```bash
node -e "const fs=require('fs'); const s=fs.readFileSync('src/app/new/page.tsx','utf8'); if(!s.includes('AnimatedTabs') || !s.includes('<AnimatedTabs')) process.exit(1)"
```

Expected: exit code 1 because `AnimatedTabs` is not imported or rendered.

- [ ] **Step 2: Add the shared component import and tab data**

```tsx
import { AnimatedTabs } from "@/components/ui/animated-tabs";

const workTabs = [
  { id: "all", label: "All" },
  { id: "case-study", label: "Case Study" },
  { id: "concepts", label: "Concepts" },
];
```

- [ ] **Step 3: Render the tabs immediately after the hero heading**

```tsx
<header className={styles.intro}>
  <p className={styles.name}>Artem Suslov</p>
  <HeroHeading />
  <AnimatedTabs defaultTab="all" tabs={workTabs} />
</header>
```

- [ ] **Step 4: Re-run the source assertion**

Run the command from Step 1.

Expected: exit code 0.

- [ ] **Step 5: Run project validation**

```bash
npm run build
npx eslint src
```

Expected: build succeeds. ESLint may retain only the documented baseline findings in `language-provider.tsx`, `about/page.tsx`, and `case-card.tsx`.

- [ ] **Step 6: Verify the rendered interaction**

Open `http://localhost:3000/new`, confirm the three tabs appear below the heading, select `Case Study`, and confirm the animated active indicator moves to that tab.
