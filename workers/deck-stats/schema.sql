-- Gennety investor deck analytics (Cloudflare D1 "gennety-deck-stats").
-- One row per browser tab session on /deck, plus per-target dwell time and a
-- capped event log. No cookies, no IP storage, no fingerprinting.

CREATE TABLE IF NOT EXISTS sessions (
  id           TEXT PRIMARY KEY,           -- random per tab (sessionStorage)
  visitor      TEXT,                       -- random per browser, only with analytics consent
  ref          TEXT,                       -- investor link slug (?r=...)
  started_at   INTEGER NOT NULL,           -- epoch ms
  last_at      INTEGER NOT NULL,
  country      TEXT,
  region       TEXT,
  city         TEXT,
  device       TEXT,                       -- mobile | tablet | desktop
  os           TEXT,
  browser      TEXT,
  lang         TEXT,
  tz           TEXT,
  referrer     TEXT,
  viewport     TEXT,
  client_start INTEGER,                    -- page load on the visitor's clock (event times use it too)
  active_ms    INTEGER NOT NULL DEFAULT 0, -- time the tab was visible and in focus
  max_scroll   INTEGER NOT NULL DEFAULT 0, -- percent of page
  video_ms     INTEGER NOT NULL DEFAULT 0, -- seconds of the walkthrough actually played, in ms
  video_max    INTEGER NOT NULL DEFAULT 0, -- furthest point reached, percent
  clicks       INTEGER NOT NULL DEFAULT 0,
  batches      INTEGER NOT NULL DEFAULT 0,
  summarized   INTEGER NOT NULL DEFAULT 0  -- 1 once the Telegram summary went out
);
CREATE INDEX IF NOT EXISTS sessions_started ON sessions (started_at);
CREATE INDEX IF NOT EXISTS sessions_ref ON sessions (ref);
CREATE INDEX IF NOT EXISTS sessions_open ON sessions (summarized, last_at);

-- Time per thing: kind = slide | section | screen ; key = slide number / section id / screen id.
CREATE TABLE IF NOT EXISTS dwell (
  session_id TEXT NOT NULL,
  kind       TEXT NOT NULL,
  key        TEXT NOT NULL,
  ms         INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (session_id, kind, key)
);

-- Discrete actions: click, deck_open, fullscreen, download, video_play, video_pause,
-- video_seek, video_end, slide_nav, copy_email ...
CREATE TABLE IF NOT EXISTS events (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  at         INTEGER NOT NULL,
  type       TEXT NOT NULL,
  target     TEXT,
  value      REAL
);
CREATE INDEX IF NOT EXISTS events_session ON events (session_id, at);

-- Named investor links: /deck?r=<slug>
CREATE TABLE IF NOT EXISTS links (
  slug       TEXT PRIMARY KEY,
  label      TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
