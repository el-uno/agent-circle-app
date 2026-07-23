import type { Listing } from "./types";

// Sample "my listings" data for the dashboard. Real listings require a
// backend that scopes rows to a connected wallet — not built yet, so this
// stays local/mock rather than reading from the (currently unreadable)
// `listings` table.
export const MOCK_LISTINGS: Listing[] = [
  {
    id: "l1",
    agentSlug: "oracle-edge",
    allocatedCapital: 5000,
    currentValue: 6140,
    pnlPct: 22.8,
    status: "active",
    positionCapPct: 12,
    maxDrawdownPct: 15,
    autoPause: true,
    listedAt: "2026-06-02",
  },
  {
    id: "l2",
    agentSlug: "market-pulse",
    allocatedCapital: 2500,
    currentValue: 2690,
    pnlPct: 7.6,
    status: "active",
    positionCapPct: 12,
    maxDrawdownPct: 16,
    autoPause: true,
    listedAt: "2026-06-18",
  },
  {
    id: "l3",
    agentSlug: "sentinel",
    allocatedCapital: 1500,
    currentValue: 1410,
    pnlPct: -6.0,
    status: "paused",
    positionCapPct: 10,
    maxDrawdownPct: 12,
    autoPause: true,
    listedAt: "2026-05-14",
  },
];
