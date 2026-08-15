# Zaimal Zia — Portfolio

Personal site for an AI systems builder, ML researcher and founder.
Next.js App Router, TypeScript, Tailwind. Dark-first, with a deliberately
designed light theme.

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (runs typecheck)
npm run lint       # eslint (flat config)
npm run typecheck  # tsc --noEmit
```

## Architecture

```
src/
  app/            routes, metadata, sitemap/robots/manifest
  components/
    layout/       Navbar, Footer, ScrollProgress
    providers/    theme, command centre (keyboard), boot sequence
    sections/     one file per page section
    seo/          JSON-LD graph
    ui/           Reveal, SectionHeader, Button, Metric, CommandPalette, ...
  content/        ALL copy and data — components read from here
  hooks/          media queries, scroll spy
  lib/            utils, anchor navigation
  og/             social-image generators (not routed — see src/og/README.md)
public/           og.png, icon.png
```

### Content is data

Nothing user-facing is hardcoded in a component. To change copy, edit
`src/content/*`:

| File | Holds |
| --- | --- |
| `site.ts` | name, roles, links, email, system status, **section ids**, nav |
| `narrative.ts` | the four About movements |
| `principles.ts` | the six engineering principles |
| `projects.ts` | featured work index |
| `neurofusion.ts` | research case study incl. per-modality detail |
| `evinic.ts` | product case study incl. request flow + masterplan artifacts |
| `experiments.ts` | engineering archive (the Lab) |
| `stack.ts` | capability tree — **also the source for the resume + JSON-LD** |
| `trajectory.ts` | career timeline incl. `start` dates for the concurrency chart |
| `buildLog.ts` | build log — hand-maintained, see note below |
| `status.ts` | availability |

Two derived sources worth knowing:

- `profile.ts` derives `technicalArsenal` from `stack.ts`, so the site, the CV
  and the structured data can never disagree. Edit `stack.ts` only.
- `ConcurrencyChart` computes bar positions from `trajectory.ts` `start` dates
  at build time. Adding an entry updates the chart automatically.

`buildLog.ts` is static by design. There is no live feed; every entry must
correspond to work described elsewhere in `src/content`.

### Design tokens

All colour, radius, shadow, easing and duration values live as CSS custom
properties in `src/app/globals.css` (`:root` for light, `.dark` for dark) and
are surfaced to Tailwind in `tailwind.config.ts`. No raw hex in components.

**Signal colours are split into two tokens.** On a light background a colour
cannot be both vivid and clear 4.5:1 as 11px text, so:

- `emerald` / `amber` / `rose` — vivid; for dots, bars, borders, fills
  (UI graphics only need 3:1)
- `emerald-ink` / `amber-ink` / `rose-ink` — darker; **only** where the colour
  becomes small text

In dark mode `ink` equals the vivid value. If you add a colour token, add it to
the `@media print` block too or it will leak colour into the resume PDF.

Both themes are verified to clear WCAG AA for all body and micro-label text.

### Animation

One strategy, no animation library. `components/ui/Reveal.tsx` flips a
`data-reveal` attribute from a **single shared** IntersectionObserver (not one
per element) and CSS does the rest. Guards, in order:

1. The hiding CSS sits behind `@media (scripting: enabled)` — with JavaScript
   off, everything renders visible.
2. No `IntersectionObserver` → the element shows immediately.
3. If no observer delivers a callback within 1.6s, all pending elements are
   force-shown.

`prefers-reduced-motion: reduce` disables transforms and transitions globally.
`prefers-contrast: more` strengthens borders, drops the grain layer and
replaces the gradient headline with a solid colour.

### Keyboard

`⌘/Ctrl+K` command palette · `?` shortcuts · `g` then `h/a/w/l/t/c` to jump.
All global key handling lives in `providers/CommandProvider.tsx` — one document
listener, and bare keys are ignored while typing in a field.

### Boot sequence

`providers/BootSequence.tsx` shows a ~0.6s overlay once per browser session.
Skipped under reduced motion, skippable by any input, costs roughly 0.6s of LCP
on a cold session. Set `BOOT_ENABLED = false` to remove it.

### Social images are static

`public/og.png` and `public/icon.png` are committed assets, not generated
routes. Generating them at build time via `ImageResponse` failed intermittently
(roughly one build in three) inside the parallel static-export workers. See
`src/og/README.md` for the detail and how to regenerate.

## Configuration

`NEXT_PUBLIC_SITE_URL` sets the canonical origin used by metadata, the sitemap,
robots and the JSON-LD graph. It defaults to the current deployment URL; set it
to the production domain before launch.

## Resume

`/resume` renders from the same content data as a formal document — serif,
point-sized, on a paper sheet so the screen previews the print output. "Download
PDF" opens the browser print dialog; there is no checked-in PDF to go stale.

Site chrome (`Navbar`, `Footer`, `ScrollProgress`) carries `no-print`. The
resume deliberately shows a **curated** subset of skills and one-line archive
entries so the PDF stays within two pages — the site shows everything.
