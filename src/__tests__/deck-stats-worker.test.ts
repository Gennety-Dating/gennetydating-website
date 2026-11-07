import { describe, expect, it } from "vitest";
import { SLIDES, fmtMs, parseUserAgent, slugify, summaryText, validateBatch } from "../../workers/deck-stats/worker.js";
import { DECK_SLIDES } from "@/lib/deck-content";

describe("deck-stats worker", () => {
  it("keeps the slide list in sync with the page", () => {
    expect(SLIDES).toEqual([...DECK_SLIDES]);
  });

  it("rejects batches without a valid session id", () => {
    expect(validateBatch(null)).toBeNull();
    expect(validateBatch({ sid: "short" })).toBeNull();
    expect(validateBatch({ sid: "bad id with spaces" })).toBeNull();
  });

  it("clamps numbers and drops unknown dwell kinds and event types", () => {
    const batch = validateBatch({
      sid: "abcdefgh1234",
      ref: "Sequoia",
      activeMs: 10 * 60_000,
      maxScroll: 140,
      videoMax: -5,
      dwell: [
        { kind: "slide", key: 3, ms: 4200 },
        { kind: "evil", key: "x", ms: 10 },
        { kind: "section", key: "deck", ms: 0 },
      ],
      events: [
        { type: "click", target: "email:topbar", at: 1 },
        { type: "DROP TABLE", target: "x" },
      ],
      start: { device: "phone", lang: "en-GB" },
    });
    if (!batch) throw new Error("batch rejected");
    expect(batch.ref).toBeNull(); // uppercase slugs are not ours
    expect(batch.activeMs).toBe(5 * 60_000);
    expect(batch.maxScroll).toBe(100);
    expect(batch.videoMax).toBe(0);
    expect(batch.dwell).toEqual([{ kind: "slide", key: "3", ms: 4200 }]);
    expect(batch.events.map((e: { type: string }) => e.type)).toEqual(["click"]);
    expect(batch.start?.device).toBeNull();
    expect(batch.start?.lang).toBe("en-GB");
  });

  it("makes readable link slugs", () => {
    expect(slugify("Sequoia — Jane Doe")).toBe("sequoia-jane-doe");
    expect(slugify("  A16Z  Seed ")).toBe("a16z-seed");
  });

  it("reads common user agents", () => {
    expect(parseUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1"))
      .toEqual({ browser: "Safari 18.0", os: "iOS" });
    expect(parseUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"))
      .toEqual({ browser: "Chrome 131", os: "macOS" });
  });

  it("writes a Telegram summary of one visit", () => {
    const text = summaryText(
      { id: "abcdefgh1234", ref: "sequoia-jane", city: "Berlin", country: "DE", device: "desktop", os: "macOS", browser: "Chrome 131", active_ms: 372_000, max_scroll: 88, video_ms: 61_000, video_max: 92 },
      [
        { kind: "slide", key: "7", ms: 64_000 },
        { kind: "slide", key: "10", ms: 41_000 },
        { kind: "slide", key: "2", ms: 800 },
        { kind: "section", key: "deck", ms: 200_000 },
      ],
      [{ type: "click", target: "email:closing" }, { type: "download", target: "download:deck" }],
      "Sequoia — Jane",
    );
    expect(text).toContain("Sequoia — Jane");
    expect(text).toContain("Berlin, DE");
    expect(text).toContain("6 мин 12 с");
    expect(text).toContain("Слайды: 2/11");
    expect(text).toContain("№7 Business model — 1 мин 04 с");
    expect(text).toContain("до 92%");
    expect(text).toContain("download, email:closing");
    expect(text).toContain("https://www.gennety.com/deck/stats#abcdefgh1234");
  });

  it("formats durations", () => {
    expect(fmtMs(0)).toBe("0 с");
    expect(fmtMs(59_400)).toBe("59 с");
    expect(fmtMs(125_000)).toBe("2 мин 05 с");
  });
});
