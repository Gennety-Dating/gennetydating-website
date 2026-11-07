import { DeckStatsLoader } from "@/components/deck/deck-stats-loader";

export const metadata = {
  title: "Gennety — статистика питч-страницы",
  robots: { index: false, follow: false, nocache: true },
};

export default function DeckStatsPage() {
  return <DeckStatsLoader />;
}
