# deck-stats worker

Stores analytics for the investor page `gennety.com/deck` in Cloudflare D1 and
sends visit alerts to the Gennety WORKSPACE Telegram bot.

The site never talks to the worker from the browser: `/api/deck/e` (ingest) and
`/api/deck/admin` (dashboard, Bearer token) proxy to it, adding Vercel's
country/city headers. The worker URL defaults to
`https://gennety-deck-stats.glebw2008.workers.dev` (override with `DECK_STATS_URL`).

## First deploy

```sh
wrangler d1 create gennety-deck-stats            # paste the id into wrangler.toml
wrangler d1 execute gennety-deck-stats --remote --file schema.sql
wrangler secret put STATS_TOKEN                   # long random value; keep a copy in ~/.config/work-bot/gennety-deck-stats-token
wrangler secret put TG_BOT_TOKEN                  # WORKSPACE_BOT_TOKEN from ~/.config/work-bot/env
wrangler secret put TG_CHAT_ID                    # OWNER_CHAT_ID from ~/.config/work-bot/env
wrangler deploy
```

## Local run

```sh
printf 'STATS_TOKEN=local-test-token\n' > .dev.vars
wrangler d1 execute gennety-deck-stats --local --file schema.sql
wrangler dev --port 8787 --local
# site: DECK_STATS_URL=http://127.0.0.1:8787 npm run dev  (open via localhost, not 127.0.0.1)
```

## What is recorded

Per tab session: investor link (`?r=`), approximate city/country, device, OS,
browser, language, time zone, referrer host, visible time on page, max scroll,
time per section and per slide, video watch time and furthest point, clicks.
No cookies, no IP addresses. A browser id is kept only when the visitor
accepted analytics cookies on gennety.com. `?preview` and browsers that opened
`/deck/stats` are never recorded.

A visit is summarised in Telegram 10 minutes after its last activity (cron every
5 minutes); visits shorter than 8 s are counted but not announced.
