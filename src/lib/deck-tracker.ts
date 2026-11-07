"use client";

// First-party analytics for /deck: time on page, time per section and per
// slide, video watch time, clicks. No cookies; the tab session id lives in
// sessionStorage, a browser id only when analytics consent was given.
// Batches go to /api/deck/e, which forwards them to the deck-stats worker.

import { readConsentCache } from "@/lib/consent-cache";

export const OWNER_FLAG = "gn_deck_owner";
const SESSION_KEY = "gn_deck_sid";
const VISITOR_KEY = "gn_deck_vid";
const ENDPOINT = "/api/deck/e";
const TICK_MS = 1_000;
const FLUSH_MS = 15_000;
const IDLE_MS = 90_000;

type DwellKind = "slide" | "section" | "screen";
type TrackEvent = { type: string; target?: string; value?: number; at: number };

function randomId(): string {
  const bytes = new Uint8Array(12);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(36).padStart(2, "0")).join("").slice(0, 20);
}

function safeStorage(kind: "local" | "session"): Storage | null {
  try {
    return kind === "local" ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

function deviceClass(width: number) {
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

class DeckTracker {
  private started = false;
  private disabled = false;
  private sid = "";
  private vid: string | null = null;
  private ref: string | null = null;
  private startInfo: Record<string, unknown> | null = null;

  private activeMs = 0;
  private videoMs = 0;
  private videoMax = 0;
  private maxScroll = 0;
  private sentScroll = 0;
  private sentVideoMax = 0;
  private dwell = new Map<string, number>();
  private events: TrackEvent[] = [];

  private section: string | null = null;
  private slide: number | null = null;
  private deckVisible = false;
  private deckFullscreen = false;
  private lastInput = Date.now();
  private lastTick = Date.now();
  private sectionRatios = new Map<string, number>();

  start(ref: string | null) {
    if (this.started || typeof window === "undefined") return;
    this.started = true;
    const local = safeStorage("local");
    if (local?.getItem(OWNER_FLAG) === "1" || new URLSearchParams(location.search).has("preview")) {
      this.disabled = true;
      return;
    }

    const session = safeStorage("session");
    this.sid = session?.getItem(SESSION_KEY) || randomId();
    session?.setItem(SESSION_KEY, this.sid);
    this.ref = ref;

    const consent = readConsentCache();
    if (consent?.categories?.analytics && local) {
      this.vid = local.getItem(VISITOR_KEY) || randomId();
      local.setItem(VISITOR_KEY, this.vid);
    }

    this.startInfo = {
      lang: navigator.language,
      tz: Intl.DateTimeFormat().resolvedOptions().timeZone ?? null,
      referrer: document.referrer ? new URL(document.referrer).hostname : null,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      device: deviceClass(Math.max(window.screen?.width ?? 0, window.innerWidth)),
      t0: Math.round(performance.timeOrigin || Date.now()),
    };

    const bump = () => {
      this.lastInput = Date.now();
    };
    for (const name of ["pointerdown", "pointermove", "keydown", "wheel", "touchstart", "scroll"]) {
      window.addEventListener(name, bump, { passive: true });
    }
    window.addEventListener("scroll", () => this.measureScroll(), { passive: true });
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") this.flush(true);
      else this.lastTick = Date.now();
    });
    window.addEventListener("pagehide", () => this.flush(true));

    window.setInterval(() => this.tick(), TICK_MS);
    window.setInterval(() => this.flush(false), FLUSH_MS);
    this.measureScroll();
    this.flush(false); // registers the visit right away
  }

  private isActive(now: number) {
    if (document.visibilityState !== "visible") return false;
    // A playing video counts as attention even without input.
    return now - this.lastInput < IDLE_MS || this.videoPlaying;
  }

  private videoPlaying = false;

  private tick() {
    const now = Date.now();
    const delta = Math.min(now - this.lastTick, 5_000);
    this.lastTick = now;
    if (this.disabled || !this.isActive(now)) return;
    this.activeMs += delta;
    if (this.deckFullscreen) {
      this.addDwell("section", "deck", delta);
    } else if (this.section) {
      this.addDwell("section", this.section, delta);
    }
    if (this.slide !== null && (this.deckVisible || this.deckFullscreen)) {
      this.addDwell("slide", String(this.slide + 1), delta);
    }
  }

  private addDwell(kind: DwellKind, key: string, ms: number) {
    const id = `${kind}:${key}`;
    this.dwell.set(id, (this.dwell.get(id) ?? 0) + ms);
  }

  private measureScroll() {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const pct = max <= 0 ? 100 : Math.round((window.scrollY / max) * 100);
    this.maxScroll = Math.max(this.maxScroll, Math.min(100, pct));
  }

  /** Visibility ratio of a page section, from an IntersectionObserver. */
  sectionVisibility(id: string, ratio: number) {
    this.sectionRatios.set(id, ratio);
    let best: string | null = null;
    let bestRatio = 0.15;
    for (const [key, value] of this.sectionRatios) {
      if (value > bestRatio) {
        best = key;
        bestRatio = value;
      }
    }
    this.section = best;
    this.deckVisible = (this.sectionRatios.get("deck") ?? 0) > 0.35;
  }

  setSlide(index: number) {
    if (this.slide === index) return;
    this.slide = index;
  }

  setDeckFullscreen(open: boolean) {
    this.deckFullscreen = open;
  }

  setVideoPlaying(playing: boolean) {
    this.videoPlaying = playing;
    this.lastInput = Date.now();
  }

  addVideoTime(ms: number, percent: number) {
    if (this.disabled) return;
    this.videoMs += Math.max(0, Math.min(ms, 2_000));
    this.videoMax = Math.max(this.videoMax, Math.round(percent));
  }

  track(type: string, target?: string, value?: number) {
    if (this.disabled || !this.started) return;
    this.events.push({ type, target, value, at: Date.now() });
    if (this.events.length >= 60) this.flush(false);
  }

  private flush(final: boolean) {
    if (this.disabled || !this.sid) return;
    const hasData = this.activeMs > 0 || this.videoMs > 0 || this.events.length > 0 || this.dwell.size > 0
      || this.maxScroll > this.sentScroll || this.videoMax > this.sentVideoMax || this.startInfo;
    if (!hasData) return;

    const sent = {
      start: this.startInfo,
      activeMs: this.activeMs,
      videoMs: this.videoMs,
      dwell: new Map(this.dwell),
      events: this.events,
    };
    const payload = JSON.stringify({
      sid: this.sid,
      vid: this.vid,
      ref: this.ref,
      start: sent.start,
      activeMs: Math.round(sent.activeMs),
      videoMs: Math.round(sent.videoMs),
      videoMax: this.videoMax,
      maxScroll: this.maxScroll,
      dwell: Array.from(sent.dwell, ([id, ms]) => {
        const [kind, key] = id.split(":");
        return { kind, key, ms: Math.round(ms) };
      }),
      events: sent.events,
    });

    this.startInfo = null;
    this.activeMs = 0;
    this.videoMs = 0;
    this.dwell.clear();
    this.events = [];
    this.sentScroll = this.maxScroll;
    this.sentVideoMax = this.videoMax;

    // A failed batch goes back into the queue so the next flush carries it.
    const requeue = () => {
      this.startInfo = this.startInfo ?? sent.start;
      this.activeMs += sent.activeMs;
      this.videoMs += sent.videoMs;
      for (const [id, ms] of sent.dwell) this.dwell.set(id, (this.dwell.get(id) ?? 0) + ms);
      this.events = [...sent.events, ...this.events].slice(-120);
      this.sentScroll = 0;
      this.sentVideoMax = 0;
    };

    try {
      if (final && navigator.sendBeacon) {
        if (navigator.sendBeacon(ENDPOINT, new Blob([payload], { type: "text/plain" }))) return;
      }
      void fetch(ENDPOINT, { method: "POST", body: payload, keepalive: true, headers: { "Content-Type": "text/plain" } })
        .then((response) => {
          if (!response.ok && response.status !== 400 && response.status !== 413) requeue();
        })
        .catch(requeue);
    } catch {
      requeue();
    }
  }
}

export const deckTracker = new DeckTracker();
