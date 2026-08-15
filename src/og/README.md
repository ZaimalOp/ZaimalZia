# Social image generators

`og-template.tsx` and `icon-template.tsx` produced `public/og.png` (1200×630)
and `public/icon.png` (512×512). They live here — **outside `src/app/`** — so
Next does not treat them as metadata routes.

## Why the images are static

As `src/app/opengraph-image.tsx` / `src/app/icon.tsx` they were rendered at
build time by `ImageResponse`, which rasterises SVG through sharp/libvips. That
step failed **intermittently** during `next build`:

```
Error: svgload_buffer: SVG rendering failed
glib: rendering error
```

Roughly one build in three, with no code change between runs — sharp itself
renders the same SVG fine sequentially and concurrently in-process, so the
failure is specific to the parallel static-export workers. A build that fails at
random is worse than an image that regenerates by hand, so the PNGs are now
committed static assets and referenced from `metadata` in `app/layout.tsx`.

This also makes builds faster and removes a native dependency from the deploy
path entirely.

## Regenerating

Only needed if the name, roles or positioning line in `src/content/site.ts`
change.

1. Copy `og-template.tsx` to `src/app/opengraph-image.tsx` and
   `icon-template.tsx` to `src/app/icon.tsx`.
2. `npm run build && npm start` (re-run the build if it hits the error above).
3. Save the output:
   ```bash
   curl -s http://localhost:3000/opengraph-image -o public/og.png
   curl -s http://localhost:3000/icon -o public/icon.png
   ```
4. Delete the two files from `src/app/` again.
