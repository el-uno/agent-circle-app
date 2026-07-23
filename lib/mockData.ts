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
  deploymentFeeBps: number;
  performanceFeeBps: number;
  history: number[];
  riskDefaults: {
    positionCapPct: number;
    maxDrawdownPct: number;
    autoPause: boolean;
  };
};

export const AGENTS: Agent[] = [
  {
    id: "1",
    slug: "oracle-edge",
    name: "Oracle Edge",
    builder: { name: "0xForge Labs", builderScore: 94.8 },
    market: "Crypto",
    status: "live",
    description:
      "Cross-exchange orderflow model tuned for high-liquidity crypto prediction markets. Favors consistency over swing size.",
    agentScore: 94.8,
    winRate: 78,
    consistency: 91,
    maxDrawdown: -8.4,
    totalReturn: 42.8,
    rank: 1,
    traderCount: 214,
    deploymentFeeBps: 150,
    performanceFeeBps: 1000,
    history: [12, 18, 15, 24, 30, 27, 35, 42, 38, 46, 42.8],
    riskDefaults: { positionCapPct: 12, maxDrawdownPct: 15, autoPause: true },
  },
  {
    id: "2",
    slug: "flash-signal",
    name: "Flash Signal",
    builder: { name: "Meridian Quant", builderScore: 91.2 },
    market: "Sports",
    status: "live",
    description:
      "Live in-game momentum model for sports prediction markets. Fast entries, tight exits, high turnover.",
    agentScore: 91.2,
    winRate: 71,
    consistency: 84,
    maxDrawdown: -11.2,
    totalReturn: 31.4,
    rank: 2,
    traderCount: 178,
    deploymentFeeBps: 125,
    performanceFeeBps: 900,
    history: [5, 9, 14, 11, 18, 22, 20, 26, 24, 29, 31.4],
    riskDefaults: { positionCapPct: 15, maxDrawdownPct: 18, autoPause: true },
  },
  {
    id: "3",
    slug: "sentinel",
    name: "Sentinel",
    builder: { name: "Groundtruth Systems", builderScore: 88.7 },
    market: "Politics",
    status: "live",
    description:
      "Polling-divergence strategy for political event markets. Lower turnover, longer holding periods.",
    agentScore: 88.7,
    winRate: 69,
    consistency: 89,
    maxDrawdown: -6.1,
    totalReturn: 24.9,
    rank: 4,
    traderCount: 156,
    deploymentFeeBps: 125,
    performanceFeeBps: 900,
    history: [3, 6, 8, 10, 9, 14, 16, 19, 21, 23, 24.9],
    riskDefaults: { positionCapPct: 10, maxDrawdownPct: 12, autoPause: true },
  },
  {
    id: "4",
    slug: "probability-x",
    name: "Probability X",
    builder: { name: "Lumen Capital", builderScore: 86.1 },
    market: "Macro",
    status: "live",
    description:
      "Macro-event conditional model — rate decisions, inflation prints, and their downstream markets.",
    agentScore: 86.1,
    winRate: 66,
    consistency: 82,
    maxDrawdown: -13.6,
    totalReturn: 18.6,
    rank: 5,
    traderCount: 121,
    deploymentFeeBps: 100,
    performanceFeeBps: 800,
    history: [2, 4, 7, 6, 10, 9, 13, 15, 14, 17, 18.6],
    riskDefaults: { positionCapPct: 14, maxDrawdownPct: 20, autoPause: false },
  },
  {
    id: "5",
    slug: "market-pulse",
    name: "Market Pulse",
    builder: { name: "0xForge Labs", builderScore: 89.4 },
    market: "Crypto",
    status: "live",
    description:
      "Volatility-regime switching model that scales exposure up in trending crypto markets, down in chop.",
    agentScore: 89.4,
    winRate: 73,
    consistency: 87,
    maxDrawdown: -9.7,
    totalReturn: 27.3,
    rank: 3,
    traderCount: 143,
    deploymentFeeBps: 125,
    performanceFeeBps: 900,
    history: [4, 8, 10, 15, 13, 19, 21, 24, 22, 26, 27.3],
    riskDefaults: { positionCapPct: 12, maxDrawdownPct: 16, autoPause: true },
  },
  {
    id: "6",
    slug: "signalforge",
    name: "SignalForge",
    builder: { name: "Meridian Quant", builderScore: 92.1 },
    market: "Event Markets",
    status: "vetting",
    description:
      "Multi-market event correlation strategy currently completing the Phase 1 vetting review.",
    agentScore: 0,
    winRate: 0,
    consistency: 0,
    maxDrawdown: 0,
    totalReturn: 0,
    rank: 0,
    traderCount: 0,
    deploymentFeeBps: 125,
    performanceFeeBps: 900,
    history: [],
    riskDefaults: { positionCapPct: 10, maxDrawdownPct: 15, autoPause: true },
  },
];

export function getAgentBySlug(slug: string) {
  return AGENTS.find((agent) => agent.slug === slug);
}

export function getLeaderboardAgents() {
  return AGENTS.filter((agent) => agent.status === "live").sort(
    (a, b) => b.agentScore - a.agentScore
  );
}

export type Deployment = {
  id: string;
  agentSlug: string;
  allocatedCapital: number;
  currentValue: number;
  pnlPct: number;
  status: "active" | "paused" | "closed";
  positionCapPct: number;
  maxDrawdownPct: number;
  autoPause: boolean;
  deployedAt: string;
};

export const MOCK_DEPLOYMENTS: Deployment[] = [
  {
    id: "d1",
    agentSlug: "oracle-edge",
    allocatedCapital: 5000,
    currentValue: 6140,
    pnlPct: 22.8,
    status: "active",
    positionCapPct: 12,
    maxDrawdownPct: 15,
    autoPause: true,
    deployedAt: "2026-06-02",
  },
  {
    id: "d2",
    agentSlug: "market-pulse",
    allocatedCapital: 2500,
    currentValue: 2690,
    pnlPct: 7.6,
    status: "active",
    positionCapPct: 12,
    maxDrawdownPct: 16,
    autoPause: true,
    deployedAt: "2026-06-18",
  },
  {
    id: "d3",
    agentSlug: "sentinel",
    allocatedCapital: 1500,
    currentValue: 1410,
    pnlPct: -6.0,
    status: "paused",
    positionCapPct: 10,
    maxDrawdownPct: 12,
    autoPause: true,
    deployedAt: "2026-05-14",
  },
];
