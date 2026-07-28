import { describe, expect, it } from "vitest";
import { parseUserAgent } from "@/lib/join-visit";

describe("Join visit user-agent summary", () => {
  it("summarises Chrome on Android without retaining the raw user agent", () => {
    const result = parseUserAgent(
      "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Chrome/126.0.0.0 Mobile Safari/537.36",
    );

    expect(result).toEqual({ browser: "Chrome 126.0.0.0", operatingSystem: "Android 14" });
  });

  it("identifies Safari and iOS", () => {
    const result = parseUserAgent(
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 Version/17.5 Mobile/15E148 Safari/604.1",
    );

    expect(result).toEqual({ browser: "Safari 17.5", operatingSystem: "iOS/iPadOS" });
  });

  it("returns safe fallbacks for an unrecognised user agent", () => {
    expect(parseUserAgent("custom-client")).toEqual({
      browser: "Unknown browser",
      operatingSystem: "Unknown OS",
    });
  });
});
