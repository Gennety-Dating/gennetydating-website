"use client";

import dynamic from "next/dynamic";

// The dashboard reads its token from localStorage, so it renders in the browser only.
export const DeckStatsLoader = dynamic(() => import("./deck-stats").then((m) => m.DeckStats), { ssr: false });
