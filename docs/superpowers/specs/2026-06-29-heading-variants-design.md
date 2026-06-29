# Heading variants

## Goal

Keep multiple hero heading treatments in the codebase while rendering one
explicitly selected version on `/new`.

## Design

- Extract the hero heading into a component with `plain` and `interactive`
  variants.
- Select the active variant with a single typed constant in code. Do not expose
  URL parameters or a visible switcher.
- Make `plain` the active variant. It keeps the current copy and manual line
  break, uses `TestFamily-Regular.otf` at weight 400, and has no accent color,
  underline, or per-letter interaction.
- Preserve the current Geist-based treatment as `interactive`, including the
  variable-weight `designer` interaction and highlighted phrase.
- Load Test Family locally with `next/font/local` and scope it to the plain
  heading only.

## Verification

- Confirm `/new` renders the plain Test Family heading with unchanged copy.
- Confirm the inactive interactive variant remains type-safe and buildable.
- Check desktop and mobile layouts for unchanged wrapping and no overflow.
- Run the existing heading math tests, targeted ESLint, and `npm run build`.
