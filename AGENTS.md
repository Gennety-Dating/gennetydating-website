# Gennety website — agent guide

Public site for Gennety: landing page, legal pages, cookie-consent logging.

## Stack

- Next.js 16.2.10 (App Router), React 19.2.4, TypeScript `strict`; alias `@/*` → `src/*`.
- Tailwind CSS v4 via `@tailwindcss/postcss`. There is **no** `tailwind.config`:
  tokens live in `@theme inline` in `src/app/globals.css`.
- framer-motion, lucide-react, `cn()` (clsx + tailwind-merge) in `src/lib/utils.ts`,
  `pg` (Neon Postgres) for consent, Vitest + Testing Library (jsdom).

## Colours (globals.css)

`midnight` #050505, `white` #FFFFFF, `magenta` **#8B253B** (deep wine, not
#FF00FF), `magenta-dark` #5a1827, `glass`
rgba(255,255,255,.06). `html`/`body` background #111111. `neon*` shadows are
burgundy. Fonts: Geist (`--font-geist`), Caveat (`--font-script`), serif = Georgia.

## Structure (src/)

- `app/`: `/` plus `app careers cookies join merch places privacy terms thesis`;
  API `api/consent`, `api/join-visit`; `layout.tsx` (fonts, language provider,
  cookie banner).
- `components/`: `navbar`, `hero`, `sections/`, `ui/`. Not imported anywhere:
  `sections/{our-mission,real-dates,safety,slideshow-bg}`,
  `ui/{polaroid,sticker,message-bubble,bubble-tail}`.
- `lib/`: `i18n.ts` (locales en uk ru de pl fr it es), `language-context.tsx`
  (`useLanguage`), `data.ts` / `home-content.ts` (copy), `site-config.ts`
  (Telegram, social, contact URLs), `postgres.ts`.
- Tests: `src/__tests__/`.

## Commands (npm)

```bash
npm install
npm run dev        # next dev --webpack
npm run build
npm run lint       # eslint (scripts/ ignored)
npm run test       # vitest run
npm run db:migrate:consent   # needs DATABASE_URL_DIRECT
```

## Rules

- Env vars: `.env.example`. Server secrets never get a `NEXT_PUBLIC_` prefix.
- CSP lives in `next.config.ts`: a new external origin goes into it.
- Sticky photo backgrounds have the blur baked into the JPG; re-tune with
  `scripts/bake-photo-backgrounds.py`, never a runtime `filter`.
- Deploy: Vercel (`vercel.json`: `npm install`, `npm run build`).
- `WEBSITE_INPLEMENTATION_SPEC.md` is the original brief; the code wins.
