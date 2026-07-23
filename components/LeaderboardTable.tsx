"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Agent, MarketCategory } from "@/lib/types";
import { AgentAvatar } from "@/components/AgentAvatar";
import { RankBadge, MarketChip } from "@/components/Badge";
import { Sparkline } from "@/components/Sparkline";

const MARKETS: (MarketCategory | "All")[] = [
  "All",
  "Crypto",
  "Sports",
  "Politics",
  "Macro",
  "Event Markets",
];

export function LeaderboardTable({ agents }: { agents: Agent[] }) {
  const [market, setMarket] = useState<(typeof MARKETS)[number]>("All");

  const filtered = useMemo(
    () => (market === "All" ? agents : agents.filter((a) => a.market === market)),
    [agents, market]
  );

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2">
        {MARKETS.map((m) => (
          <button
            key={m}
            onClick={() => setMarket(m)}
            className="rounded-full px-4 py-2 text-xs font-semibold transition"
            style={
              market === m
                ? { background: "var(--grad-accent)", color: "#1a1608" }
                : { border: "1px solid var(--border)", color: "var(--muted)" }
            }
          >
            {m}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border" style={{ borderColor: "var(--border)" }}>
        <div
          className="grid grid-cols-[48px_1fr_100px_90px_90px_100px_120px_80px] gap-4 border-b px-5 py-3 text-[11px] font-semibold uppercase tracking-wider"
          style={{ borderColor: "var(--border)", color: "var(--muted)" }}
        >
          <span>Rank</span>
          <span>Agent</span>
          <span>Market</span>
          <span>Score</span>
          <span>Win Rate</span>
          <span>Drawdown</span>
          <span>Return</span>
          <span />
        </div>

        {filtered.length === 0 && (
          <div className="px-5 py-10 text-center text-sm" style={{ color: "var(--muted)" }}>
            No live agents in this market yet.
          </div>
        )}

        {filtered.map((agent, i) => (
          <Link
            key={agent.id}
            href={`/agents/${agent.slug}`}
            className={`grid grid-cols-[48px_1fr_100px_90px_90px_100px_120px_80px] items-center gap-4 px-5 py-4 transition ${
              i !== filtered.length - 1 ? "border-b" : ""
            }`}
            style={{
              borderColor: "var(--border)",
              background: agent.rank === 1 ? "var(--accent-glow)" : "transparent",
            }}
          >
            <RankBadge rank={agent.rank} />

            <div className="flex items-center gap-3 min-w-0">
              <AgentAvatar name={agent.name} size={40} ring={agent.rank <= 3} />
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold">{agent.name}</div>
                <div className="truncate text-xs" style={{ color: "var(--muted)" }}>
                  {agent.builder.name}
                </div>
              </div>
            </div>

            <div>
              <MarketChip market={agent.market} />
            </div>

            <span className="tabular text-sm font-semibold">{agent.agentScore.toFixed(1)}</span>
            <span className="tabular text-sm" style={{ color: "var(--muted)" }}>
              {agent.winRate}%
            </span>
            <span className="tabular text-sm" style={{ color: "var(--negative)" }}>
              {agent.maxDrawdown}%
            </span>

            <div className="flex items-center gap-2">
              <Sparkline data={agent.history} width={64} height={28} />
              <span className="tabular text-sm font-semibold" style={{ color: "var(--positive)" }}>
                +{agent.totalReturn}%
              </span>
            </div>

            <span className="text-right text-xs font-semibold" style={{ color: "var(--logo-blue)" }}>
              View →
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
