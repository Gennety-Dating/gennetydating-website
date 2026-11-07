// Content of the investor page at /deck. Facts mirror the PDF deck
// (public/deck/gennety-deck.pdf) and the former Notion page.

export const DECK_SLIDES = [
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
] as const;

export const deckSlideSrc = (index: number, thumb = false) =>
  `/deck/slides/slide-${String(index + 1).padStart(2, "0")}${thumb ? "-thumb" : ""}.webp`;

export const DECK_PDF = "/deck/gennety-deck.pdf";

export const WALKTHROUGH = {
  src: "/deck/walkthrough.mp4",
  poster: "/deck/walkthrough-poster.jpg",
};

export const FOUNDER = {
  name: "Gleb",
  role: "Founder & CEO",
  email: "gleb@gennety.com",
};

export const ROUND = {
  stage: "Pre-seed",
  target: "$300K",
  proceeds: [
    { share: 60, title: "Viral UGC & shows", detail: "Organic video engines, street activations and local media production." },
    { share: 25, title: "Offline pop-ups", detail: "Community events that seed dense launch cohorts." },
    { share: 15, title: "AI & scale", detail: "Core matching algorithms and backend architecture." },
  ],
  milestones: [
    { title: "50k+ daily users", detail: "Deep liquidity in the first metro hubs." },
    { title: "Proven monetization", detail: "3–5× the paying conversion of incumbents." },
    { title: "Ready for seed", detail: "Validated unit economics, primed for multi-city expansion." },
  ],
};

export const COMPETITORS = [
  {
    name: "Ditto AI",
    url: "https://ditto.ai/",
    press: "TechCrunch",
    pressUrl: "https://techcrunch.com/2026/08/06/gen-z-dating-apps-like-ditto-ditch-swiping-in-favor-of-ai-matchmaking",
  },
  {
    name: "Amata AI",
    url: "https://www.amata.ai/",
    press: "Business Insider",
    pressUrl: "https://www.businessinsider.com/new-ai-matchmaking-dating-app-amata-launches-us-new-york-2025-9",
  },
  {
    name: "Known AI",
    url: "https://known.com/",
    press: "TechCrunch",
    pressUrl: "https://techcrunch.com/2025/12/19/known-uses-voice-ai-to-help-you-go-on-more-in-person-dates/",
  },
  {
    name: "Sitch AI",
    url: "https://download.joinsitch.com/how-sitch-works",
    press: "TechCrunch",
    pressUrl: "https://techcrunch.com/2025/06/25/sitch-wants-to-fuse-human-personality-and-ai-for-matchmaking",
  },
  {
    name: "Breeze",
    url: "https://breeze.social/",
    press: "The Independent",
    pressUrl: "https://www.independent.co.uk/life-style/breeze-dating-app-tinder-hinge-b2983703.html",
  },
] as const;

/** Screens from the iOS app, one per step of the flow, in order. */
export type AppScreen = { src: string; step: string; caption: string };

export const APP_SCREENS: AppScreen[] = [];
