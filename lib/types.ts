export type MarketCategory = "Crypto" | "Sports" | "Politics" | "Macro" | "Event Markets";

export type AgentStatus = "live" | "vetting" | "paused";

export type Agent = {
  id: string;
  slug: string;
  name: string;
  builder: { name: string; builderScore: number };
  market: MarketCategory;
  status: AgentStatus;
  description: string;
  agentScore: number;
  winRate: number;
  consistency: number;
  maxDrawdown: number;
  totalReturn: number;
  rank: number;
  traderCount: number;
  listingFeeBps: number;
  performanceFeeBps: number;
  history: number[];
  riskDefaults: {
    positionCapPct: number;
    maxDrawdownPct: number;
    autoPause: boolean;
  };
};

export type Listing = {
  id: string;
  agentSlug: string;
  allocatedCapital: number;
  currentValue: number;
  pnlPct: number;
  status: "active" | "paused" | "closed";
  positionCapPct: number;
  maxDrawdownPct: number;
  autoPause: boolean;
  listedAt: string;
};
