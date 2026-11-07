// Gennety investor deck analytics worker.
//
//   POST /ingest            batches from gennety.com/deck (via the site's /api/deck/e proxy)
//   GET  /stats?days=N      dashboard data                      (Bearer STATS_TOKEN)
//   GET  /session?id=...    one visit: dwell + event timeline   (Bearer STATS_TOKEN)
//   DELETE /session?id=...  remove a visit (own tests)          (Bearer STATS_TOKEN)
//   GET  /links             named investor links                (Bearer STATS_TOKEN)
//   POST /links {label}     create /deck?r=<slug>               (Bearer STATS_TOKEN)
//   DELETE /links?slug=...                                      (Bearer STATS_TOKEN)
//   cron                    Telegram summary of each finished visit
//
// Bindings: DB (D1). Secrets: STATS_TOKEN, TG_BOT_TOKEN, TG_CHAT_ID.

const MAX_BODY = 32_768;
const MAX_EVENTS = 120;
const MAX_DWELL = 80;
const MAX_DELTA_MS = 5 * 60_000; // one batch never adds more than 5 min
const IDLE_BEFORE_SUMMARY_MS = 10 * 60_000;
const SITE = "https://www.gennety.com";

export const SLIDES = [
  "Cover",
  "The real-world gap",
  "Retention collapse",
  "Paradigm shift",
  "System flow",
  "Audience & hubs",
  "Business model",
  "Acquisition engine",
  "Why we",
  "Pre-seed round",
  "Contact",
];

const SECTION_NAMES = {
  hero: "шапка",
  video: "ролик",
  deck: "презентация",
  screens: "экраны",
  round: "раунд",
  market: "конкуренты",
  contact: "контакты",
};

const json = (data, status = 200, extra = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...extra },
  });

const isId = (v) => typeof v === "string" && /^[A-Za-z0-9_-]{8,64}$/.test(v);
const str = (v, max = 120) => (typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null);
const int = (v, lo, hi) => (Number.isFinite(v) ? Math.max(lo, Math.min(hi, Math.round(v))) : 0);
const slugOk = (v) => typeof v === "string" && /^[a-z0-9][a-z0-9-]{0,47}$/.test(v);

function authorized(request, env) {
  const header = request.headers.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!env.STATS_TOKEN || token.length !== env.STATS_TOKEN.length) return false;
  let diff = 0;
  for (let i = 0; i < token.length; i += 1) diff |= token.charCodeAt(i) ^ env.STATS_TOKEN.charCodeAt(i);
  return diff === 0;
}

export function parseUserAgent(ua = "") {
  const pick = (re) => re.exec(ua)?.[1];
  const browser = pick(/Edg\/([\d]+)/) ? `Edge ${pick(/Edg\/([\d]+)/)}`
    : pick(/OPR\/([\d]+)/) ? `Opera ${pick(/OPR\/([\d]+)/)}`
    : pick(/Firefox\/([\d]+)/) ? `Firefox ${pick(/Firefox\/([\d]+)/)}`
    : pick(/CriOS\/([\d]+)/) ? `Chrome iOS ${pick(/CriOS\/([\d]+)/)}`
    : pick(/Chrome\/([\d]+)/) ? `Chrome ${pick(/Chrome\/([\d]+)/)}`
    : pick(/Version\/([\d.]+).*Safari/) ? `Safari ${pick(/Version\/([\d.]+).*Safari/)}`
    : "Unknown";
  const os = pick(/Windows NT ([\d.]+)/) ? "Windows"
    : pick(/Android ([\d.]+)/) ? `Android ${pick(/Android ([\d.]+)/)}`
    : /iPhone/.test(ua) ? "iOS"
    : /iPad/.test(ua) ? "iPadOS"
    : /Mac OS X/.test(ua) ? "macOS"
    : /Linux/.test(ua) ? "Linux"
    : "Unknown";
  return { browser, os };
}

/** Validates one batch from the page. Returns null when it is not ours. */
export function validateBatch(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  if (!isId(body.sid)) return null;
  const batch = {
    sid: body.sid,
    vid: isId(body.vid) ? body.vid : null,
    ref: slugOk(body.ref) ? body.ref : null,
    activeMs: int(body.activeMs, 0, MAX_DELTA_MS),
    maxScroll: int(body.maxScroll, 0, 100),
    videoMs: int(body.videoMs, 0, MAX_DELTA_MS),
    videoMax: int(body.videoMax, 0, 100),
    /** @type {null | { lang: string | null, tz: string | null, referrer: string | null, viewport: string | null, device: string | null, t0: number | null }} */
    start: null,
    /** @type {{ kind: string, key: string, ms: number }[]} */
    dwell: [],
    /** @type {{ type: string, target: string | null, value: number | null, at: number }[]} */
    events: [],
  };
  if (body.start && typeof body.start === "object") {
    const s = body.start;
    batch.start = {
      lang: str(s.lang, 35),
      tz: str(s.tz, 64),
      referrer: str(s.referrer, 200),
      viewport: str(s.viewport, 20),
      device: ["mobile", "tablet", "desktop"].includes(s.device) ? s.device : null,
      // Page load time on the visitor's clock; event times use the same clock.
      t0: Number.isFinite(s.t0) ? Math.round(s.t0) : null,
    };
  }
  if (Array.isArray(body.dwell)) {
    for (const d of body.dwell.slice(0, MAX_DWELL)) {
      if (!d || !["slide", "section", "screen"].includes(d.kind)) continue;
      const key = str(String(d.key ?? ""), 40);
      const ms = int(d.ms, 0, MAX_DELTA_MS);
      if (key && ms > 0) batch.dwell.push({ kind: d.kind, key, ms });
    }
  }
  if (Array.isArray(body.events)) {
    for (const e of body.events.slice(0, MAX_EVENTS)) {
      const type = str(e?.type, 32);
      if (!type || !/^[a-z_]+$/.test(type)) continue;
      batch.events.push({
        type,
        target: str(e.target, 120),
        value: Number.isFinite(e.value) ? Number(e.value) : null,
        at: Number.isFinite(e.at) ? Math.round(e.at) : Date.now(),
      });
    }
  }
  return batch;
}

async function ingest(request, env) {
  const raw = await request.text();
  if (raw.length > MAX_BODY) return json({ error: "too large" }, 413);
  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: "bad json" }, 400);
  }
  const batch = validateBatch(body);
  if (!batch) return json({ error: "invalid" }, 400);

  const now = Date.now();
  const cf = request.cf || {};
  const h = (name) => {
    const v = request.headers.get(name);
    try {
      return v ? decodeURIComponent(v).slice(0, 80) : null;
    } catch {
      return v ? v.slice(0, 80) : null;
    }
  };
  const country = h("x-geo-country") || cf.country || null;
  const region = h("x-geo-region") || cf.region || null;
  const city = h("x-geo-city") || cf.city || null;
  const { browser, os } = parseUserAgent(request.headers.get("x-client-ua") || request.headers.get("user-agent") || "");

  const existing = await env.DB.prepare("SELECT id, summarized, batches FROM sessions WHERE id = ?").bind(batch.sid).first();
  const statements = [];
  const isNew = !existing;
  if (isNew) {
    const s = batch.start || {};
    statements.push(env.DB.prepare(
      `INSERT INTO sessions (id, visitor, ref, started_at, last_at, country, region, city, device, os, browser, lang, tz, referrer, viewport, client_start)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ).bind(batch.sid, batch.vid, batch.ref, now, now, country, region, city, s.device || null, os, browser,
      s.lang || null, s.tz || null, s.referrer || null, s.viewport || null, s.t0 ?? null));
  } else if (batch.start) {
    // The first batch was lost and a retry carries the visit details: fill the gaps.
    const s = batch.start;
    statements.push(env.DB.prepare(
      `UPDATE sessions SET device = COALESCE(device, ?), lang = COALESCE(lang, ?), tz = COALESCE(tz, ?),
         referrer = COALESCE(referrer, ?), viewport = COALESCE(viewport, ?), client_start = COALESCE(client_start, ?)
       WHERE id = ?`,
    ).bind(s.device, s.lang, s.tz, s.referrer, s.viewport, s.t0, batch.sid));
  }
  const clicks = batch.events.filter((e) => e.type === "click").length;
  statements.push(env.DB.prepare(
    `UPDATE sessions SET last_at = ?, active_ms = active_ms + ?, video_ms = video_ms + ?,
       max_scroll = MAX(max_scroll, ?), video_max = MAX(video_max, ?), clicks = clicks + ?, batches = batches + 1,
       summarized = CASE WHEN ? > 0 THEN 0 ELSE summarized END,
       visitor = COALESCE(visitor, ?), ref = COALESCE(ref, ?)
     WHERE id = ?`,
  ).bind(now, batch.activeMs, batch.videoMs, batch.maxScroll, batch.videoMax, clicks,
    batch.activeMs, batch.vid, batch.ref, batch.sid));
  for (const d of batch.dwell) {
    statements.push(env.DB.prepare(
      `INSERT INTO dwell (session_id, kind, key, ms) VALUES (?, ?, ?, ?)
       ON CONFLICT (session_id, kind, key) DO UPDATE SET ms = ms + excluded.ms`,
    ).bind(batch.sid, d.kind, d.key, d.ms));
  }
  for (const e of batch.events) {
    statements.push(env.DB.prepare("INSERT INTO events (session_id, at, type, target, value) VALUES (?, ?, ?, ?, ?)")
      .bind(batch.sid, e.at, e.type, e.target, e.value));
  }
  await env.DB.batch(statements);

  if (isNew && batch.ref) {
    const link = await env.DB.prepare("SELECT label FROM links WHERE slug = ?").bind(batch.ref).first();
    const who = link?.label || batch.ref;
    const where = [city, country].filter(Boolean).join(", ") || "место неизвестно";
    await notify(env, `👀 <b>${escapeHtml(who)}</b> открыл(а) питч-страницу\n${escapeHtml(where)} · ${escapeHtml(batch.start?.device || "?")} · ${escapeHtml(os)}`);
  }
  return json({ ok: true });
}

function escapeHtml(v) {
  return String(v ?? "").replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]);
}

async function notify(env, text) {
  if (!env.TG_BOT_TOKEN || !env.TG_CHAT_ID) return;
  try {
    await fetch(`https://api.telegram.org/bot${env.TG_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ chat_id: env.TG_CHAT_ID, text, parse_mode: "HTML", disable_web_page_preview: true }),
    });
  } catch {
    // Alerts never break ingestion.
  }
}

export function fmtMs(ms) {
  const s = Math.round((ms || 0) / 1000);
  if (s < 60) return `${s} с`;
  const m = Math.floor(s / 60);
  return `${m} мин ${String(s % 60).padStart(2, "0")} с`;
}

export function summaryText(session, dwell, events, label) {
  const who = label || session.ref || "Без метки";
  const where = [session.city, session.country].filter(Boolean).join(", ") || "место неизвестно";
  const slides = dwell.filter((d) => d.kind === "slide" && d.ms >= 1500);
  const top = [...slides].sort((a, b) => b.ms - a.ms).slice(0, 3)
    .map((d) => `№${d.key} ${SLIDES[Number(d.key) - 1] || ""} — ${fmtMs(d.ms)}`);
  const sections = dwell.filter((d) => d.kind === "section").sort((a, b) => b.ms - a.ms).slice(0, 4)
    .map((d) => `${SECTION_NAMES[d.key] || d.key} ${fmtMs(d.ms)}`);
  const clicks = events.filter((e) => e.type === "click").map((e) => e.target).filter(Boolean);
  const actions = events.filter((e) => ["download", "fullscreen", "copy_email"].includes(e.type)).map((e) => e.type);
  const lines = [
    `📊 <b>${escapeHtml(who)}</b> — визит на питч-странице`,
    `${escapeHtml(where)} · ${escapeHtml(session.device || "?")} · ${escapeHtml(session.os || "")} ${escapeHtml(session.browser || "")}`,
    `Время на странице: <b>${fmtMs(session.active_ms)}</b> · прокрутка ${session.max_scroll}%`,
    `Слайды: ${slides.length}/${SLIDES.length}${top.length ? ` · дольше всего: ${escapeHtml(top.join("; "))}` : ""}`,
    `Ролик: ${session.video_ms > 0 ? `${fmtMs(session.video_ms)}, до ${session.video_max}%` : "не смотрел(а)"}`,
  ];
  if (sections.length) lines.push(`Разделы: ${escapeHtml(sections.join(", "))}`);
  if (clicks.length || actions.length) lines.push(`Нажатия: ${escapeHtml([...actions, ...clicks].slice(0, 12).join(", "))}`);
  lines.push(`${SITE}/deck/stats#${session.id}`);
  return lines.join("\n");
}

async function summarize(env) {
  const cutoff = Date.now() - IDLE_BEFORE_SUMMARY_MS;
  const { results } = await env.DB.prepare(
    "SELECT * FROM sessions WHERE summarized = 0 AND last_at < ? ORDER BY last_at LIMIT 20",
  ).bind(cutoff).all();
  for (const session of results) {
    await env.DB.prepare("UPDATE sessions SET summarized = 1 WHERE id = ?").bind(session.id).run();
    if (session.active_ms < 8_000) continue; // bounces are counted, not announced
    const [dwell, events, link] = await Promise.all([
      env.DB.prepare("SELECT kind, key, ms FROM dwell WHERE session_id = ?").bind(session.id).all(),
      env.DB.prepare("SELECT type, target FROM events WHERE session_id = ? ORDER BY at").bind(session.id).all(),
      session.ref ? env.DB.prepare("SELECT label FROM links WHERE slug = ?").bind(session.ref).first() : null,
    ]);
    await notify(env, summaryText(session, dwell.results, events.results, link?.label));
  }
}

async function stats(url, env) {
  const days = int(Number(url.searchParams.get("days") || 30), 1, 365);
  const since = Date.now() - days * 86_400_000;
  const [sessions, dwell, clicks, links] = await Promise.all([
    env.DB.prepare(
      `SELECT s.*, l.label FROM sessions s LEFT JOIN links l ON l.slug = s.ref
       WHERE s.started_at >= ? ORDER BY s.started_at DESC LIMIT 500`,
    ).bind(since).all(),
    env.DB.prepare(
      `SELECT d.kind, d.key, SUM(d.ms) AS ms, COUNT(*) AS sessions FROM dwell d
       JOIN sessions s ON s.id = d.session_id WHERE s.started_at >= ? GROUP BY d.kind, d.key`,
    ).bind(since).all(),
    env.DB.prepare(
      `SELECT e.type, e.target, COUNT(*) AS n, COUNT(DISTINCT e.session_id) AS sessions FROM events e
       JOIN sessions s ON s.id = e.session_id WHERE s.started_at >= ? AND e.type NOT IN ('slide_nav', 'video_progress')
       GROUP BY e.type, e.target ORDER BY n DESC LIMIT 60`,
    ).bind(since).all(),
    env.DB.prepare("SELECT * FROM links ORDER BY created_at DESC").all(),
  ]);
  const slideReach = await env.DB.prepare(
    `SELECT d.key, COUNT(*) AS sessions FROM dwell d JOIN sessions s ON s.id = d.session_id
     WHERE s.started_at >= ? AND d.kind = 'slide' AND d.ms >= 1500 GROUP BY d.key`,
  ).bind(since).all();
  return json({
    days,
    slides: SLIDES,
    sessions: sessions.results,
    dwell: dwell.results,
    actions: clicks.results,
    slideReach: slideReach.results,
    links: links.results,
  });
}

async function sessionDetail(url, env, method) {
  const id = url.searchParams.get("id");
  if (!isId(id)) return json({ error: "bad id" }, 400);
  if (method === "DELETE") {
    await env.DB.batch([
      env.DB.prepare("DELETE FROM events WHERE session_id = ?").bind(id),
      env.DB.prepare("DELETE FROM dwell WHERE session_id = ?").bind(id),
      env.DB.prepare("DELETE FROM sessions WHERE id = ?").bind(id),
    ]);
    return json({ ok: true });
  }
  const [session, dwell, events] = await Promise.all([
    env.DB.prepare("SELECT s.*, l.label FROM sessions s LEFT JOIN links l ON l.slug = s.ref WHERE s.id = ?").bind(id).first(),
    env.DB.prepare("SELECT kind, key, ms FROM dwell WHERE session_id = ? ORDER BY kind, ms DESC").bind(id).all(),
    env.DB.prepare("SELECT at, type, target, value FROM events WHERE session_id = ? ORDER BY at LIMIT 1000").bind(id).all(),
  ]);
  if (!session) return json({ error: "not found" }, 404);
  return json({ session, dwell: dwell.results, events: events.results });
}

export function slugify(label) {
  return label.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim()
    .replace(/[\s_]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
}

async function links(request, url, env) {
  if (request.method === "GET") {
    const { results } = await env.DB.prepare("SELECT * FROM links ORDER BY created_at DESC").all();
    return json({ links: results });
  }
  if (request.method === "DELETE") {
    const slug = url.searchParams.get("slug");
    if (!slugOk(slug)) return json({ error: "bad slug" }, 400);
    await env.DB.prepare("DELETE FROM links WHERE slug = ?").bind(slug).run();
    return json({ ok: true });
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "bad json" }, 400);
  }
  const label = str(body?.label, 80);
  if (!label) return json({ error: "label required" }, 400);
  let base = slugOk(body?.slug) ? body.slug : slugify(label);
  if (!slugOk(base)) base = `inv-${Math.random().toString(36).slice(2, 8)}`;
  let slug = base;
  for (let i = 2; await env.DB.prepare("SELECT 1 FROM links WHERE slug = ?").bind(slug).first(); i += 1) {
    slug = `${base}-${i}`.slice(0, 48);
  }
  await env.DB.prepare("INSERT INTO links (slug, label, created_at) VALUES (?, ?, ?)").bind(slug, label, Date.now()).run();
  return json({ slug, label, url: `${SITE}/deck?r=${slug}` }, 201);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    try {
      if (url.pathname === "/ingest" && request.method === "POST") return await ingest(request, env);
      if (url.pathname === "/health") return json({ ok: true });
      if (!authorized(request, env)) return json({ error: "unauthorized" }, 401);
      if (url.pathname === "/stats" && request.method === "GET") return await stats(url, env);
      if (url.pathname === "/session") return await sessionDetail(url, env, request.method);
      if (url.pathname === "/links") return await links(request, url, env);
      return json({ error: "not found" }, 404);
    } catch (error) {
      console.error("deck-stats", error?.message);
      return json({ error: "server error" }, 500);
    }
  },
  async scheduled(_event, env, ctx) {
    ctx.waitUntil(summarize(env));
  },
};
