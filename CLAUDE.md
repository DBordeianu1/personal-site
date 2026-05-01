@AGENTS.md

# Personal Website

A personal website featuring a recursively-tiled photo gallery and a curated "current obsession" Spotify integration. Built with Next.js (App Router), TypeScript, and Tailwind CSS. Deployed on Vercel.

## Architecture

- `app/` — Next.js App Router pages
  - `app/api/spotify/track/route.ts` — serverless function for Spotify integration
- `components/` — React components
- `lib/gallery/` — pure TypeScript for the gallery algorithm (no React, no DOM, no Spotify code)
- `lib/spotify/` — server-side helpers for the Spotify API (token refresh, fetch logic, caching)
- `data/` — content as TypeScript const arrays (photos, projects, current obsession)
- `public/watercolors/` — hand-painted accent images
- `docs/` — design specifications, including the full gallery spec

## The gallery algorithm

The gallery uses a recursive tiling algorithm. Photos are 2:3 portrait or 3:2 landscape; tiles are exactly 2:3, 3:2, or 1:1 (no matting inside tiles, edge-to-edge fill). The full spec is in `docs/gallery-spec.md`.

Important properties to preserve:
- For any n photos and any viewport width, the algorithm produces exactly n tiles.
- Tiles are restricted to 2:3, 3:2, or 1:1.
- No tile drops below 200px on its short edge.
- Same input always produces same output (determinism).
- Internal split nodes can produce any aspect ratio; only leaves are constrained.

The algorithm code (`lib/gallery/`) must remain pure — no React imports, no DOM access, no fetch calls. This keeps it testable in isolation and ensures the proof maps cleanly to the implementation.

## The Spotify integration

A small serverless function at `app/api/spotify/track/route.ts` fetches metadata for a curated track ID from Spotify. The track ID and editorial note live in `data/current-obsession.ts`.

Important properties:
- The Spotify refresh token, client ID, and client secret are environment variables — never in the repo, never sent to the browser.
- The function caches results aggressively (1 hour for track metadata, full lifetime for access tokens).
- The function handles failures gracefully: API down, token revoked, invalid track ID, rate limit. The widget hides or degrades rather than blocking the page.
- Logging is meaningful: token refreshes, API errors, env var failures all log to Vercel's function logs.

The full spec for this integration is in `docs/site-spec.md` under "Current obsession (Spotify integration)."

## Conventions

- TypeScript strict mode is on.
- Prefer named exports over default exports (except for Next.js page files which require default).
- Components live in their own files in `components/<ComponentName>/index.tsx`.
- Watercolor accents are PNG files in `public/watercolors/` referenced via the Next.js Image component.
- Server-only code (anything that reads environment variables, calls Spotify) lives under `lib/spotify/` or `app/api/`. Client components must not import from these paths.

## What to ask before doing

- If a change would alter the gallery algorithm's contract (the properties above), pause and confirm.
- If a change would add a new external dependency, mention it before installing.
- If a change touches environment variable names or the Spotify integration's auth flow, mention it before changing.
- If a change touches the deployment pipeline, mention it before changing.

## Local development

- `npm run dev` — Next.js dev server.
- Environment variables for local Spotify development go in `.env.local` (gitignored). Required: `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN`.
- Vercel deploys automatically on push to `main`. Preview deployments are created for PRs.