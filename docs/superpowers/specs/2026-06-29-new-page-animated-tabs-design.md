# Animated tabs on `/new`

## Goal

Place the existing `AnimatedTabs` component directly below the hero heading on the `/new` portfolio page.

## Design

- Reuse `src/components/ui/animated-tabs.tsx` without modifying the component.
- Use the existing portfolio categories: `All`, `Case Study`, and `Concepts`.
- Render the tabs inside the intro header immediately after `HeroHeading`.
- Keep the existing intro spacing and responsive behavior.

## Verification

- Confirm `/new` renders all three tabs below the heading.
- Confirm the active indicator moves when a tab is selected.
- Run the root build and root-app ESLint checks.
