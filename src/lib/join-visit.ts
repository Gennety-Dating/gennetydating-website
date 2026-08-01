export type VisitPage = "join" | "app";

export type JoinVisitInput = {
  page: VisitPage;
  language: string;
  languages: string[];
  timeZone: string | null;
  viewport: { width: number; height: number };
  screen: { width: number; height: number };
  deviceClass: "mobile" | "tablet" | "desktop";
};

export type ParsedUserAgent = {
  browser: string;
  operatingSystem: string;
};

export function parseUserAgent(userAgent: string): ParsedUserAgent {
  const edgeVersion = /Edg\/([\d.]+)/.exec(userAgent)?.[1];
  const operaVersion = /OPR\/([\d.]+)/.exec(userAgent)?.[1];
  const firefoxVersion = /Firefox\/([\d.]+)/.exec(userAgent)?.[1];
  const chromeIosVersion = /CriOS\/([\d.]+)/.exec(userAgent)?.[1];
  const chromeVersion = /Chrome\/([\d.]+)/.exec(userAgent)?.[1];
  const safariVersion = /Version\/([\d.]+).*Safari/.exec(userAgent)?.[1];
  const windowsVersion = /Windows NT ([\d.]+)/.exec(userAgent)?.[1];
  const androidVersion = /Android ([\d.]+)/.exec(userAgent)?.[1];

  const browser = edgeVersion ? `Edge ${edgeVersion}`
    : operaVersion ? `Opera ${operaVersion}`
    : firefoxVersion ? `Firefox ${firefoxVersion}`
    : chromeIosVersion ? `Chrome iOS ${chromeIosVersion}`
    : chromeVersion ? `Chrome ${chromeVersion}`
    : safariVersion ? `Safari ${safariVersion}`
    : "Unknown browser";

  const operatingSystem = windowsVersion ? `Windows ${windowsVersion}`
    : androidVersion ? `Android ${androidVersion}`
    : /iPhone|iPad|iPod/.test(userAgent) ? "iOS/iPadOS"
    : /Mac OS X/.test(userAgent) ? "macOS"
    : /Linux/.test(userAgent) ? "Linux"
    : "Unknown OS";

  return { browser, operatingSystem };
}
