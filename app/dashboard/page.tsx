"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { MOCK_LISTINGS } from "@/lib/mockData";
import { getAllAgents } from "@/lib/agents";
import type { Agent } from "@/lib/types";
import { AgentAvatar } from "@/components/AgentAvatar";
import { WalletButton } from "@/components/WalletButton";

export default function DashboardPage() {
  const { connected, publicKey } = useWallet();
  const [agentsBySlug, setAgentsBySlug] = useState<Map<string, Agent>>(new Map());

  useEffect(() => {
    getAllAgents().then((agents) => {
      setAgentsBySlug(new Map(agents.map((agent) => [agent.slug, agent])));
    });
  }, []);

  const totalAllocated = MOCK_LISTINGS.reduce((sum, l) => sum + l.allocatedCapital, 0);
  const totalValue = MOCK_LISTINGS.reduce((sum, l) => sum + l.currentValue, 0);
  const totalPnlPct = ((totalValue - totalAllocated) / totalAllocated) * 100;
  const shortAddress = publicKey
    ? `${publicKey.toBase58().slice(0, 4)}…${publicKey.toBase58().slice(-4)}`
    : null;

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
        Monitoring
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">
        Your <span className="accent-text">listed agents.</span>
      </h1>
      <p className="mt-3 max-w-xl" style={{ color: "var(--muted)" }}>
        Track performance, exposure, and risk-limit status for every agent
        you've listed.{" "}
        {connected
          ? "No live listings yet — Phase 1 listing opens once the on-chain programs are ready."
          : "Sample data shown below — connect a wallet to see your own."}
      </p>

      {!connected && (
        <div
          className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border p-5"
          style={{ borderColor: "var(--border)", background: "var(--card)" }}
        >
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Connect a wallet to check for listings tied to your address.
          </p>
          <WalletButton />
        </div>
      )}

      {connected && (
        <div
          className="mt-6 rounded-2xl border p-5 text-sm"
          style={{ borderColor: "var(--border)", background: "var(--card)", color: "var(--muted)" }}
        >
          Connected as <span style={{ color: "var(--foreground)" }}>{shortAddress}</span>. The
          list below is sample data illustrating what this page will show.
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border p-6 accent-border" style={{ background: "var(--card)" }}>
          <div className="text-xs font-semibold" style={{ color: "var(--muted)" }}>
            Total Allocated
          </div>
          <div className="tabular mt-2 text-2xl font-semibold">
            ${totalAllocated.toLocaleString()}
          </div>
        </div>
        <div className="rounded-2xl border p-6" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
          <div className="text-xs font-semibold" style={{ color: "var(--muted)" }}>
            Current Value
          </div>
          <div className="tabular mt-2 text-2xl font-semibold">
            ${totalValue.toLocaleString()}
          </div>
        </div>
        <div className="rounded-2xl border p-6" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
          <div className="text-xs font-semibold" style={{ color: "var(--muted)" }}>
            Total P&amp;L
          </div>
          <div
            className="tabular mt-2 text-2xl font-semibold"
            style={{ color: totalPnlPct >= 0 ? "var(--positive)" : "var(--negative)" }}
          >
            {totalPnlPct >= 0 ? "+" : ""}
            {totalPnlPct.toFixed(1)}%
          </div>
        </div>
      </div>

      <div className="mt-10 space-y-4">
        {MOCK_LISTINGS.map((listing) => {
          const agent = agentsBySlug.get(listing.agentSlug);
          if (!agent) return null;

          return (
            <div
              key={listing.id}
              className="flex flex-col gap-4 rounded-2xl border p-6 sm:flex-row sm:items-center sm:justify-between"
              style={{ borderColor: "var(--border)", background: "var(--card)" }}
            >
              <div className="flex items-center gap-4">
                <AgentAvatar name={agent.name} size={48} />
                <div>
                  <Link href={`/agents/${agent.slug}`} className="text-sm font-semibold hover:underline">
                    {agent.name}
                  </Link>
                  <div className="mt-1 flex items-center gap-2 text-xs" style={{ color: "var(--muted)" }}>
                    <span>{agent.market}</span>
                    <span>·</span>
                    <span>Listed {listing.listedAt}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <div className="text-[11px]" style={{ color: "var(--muted)" }}>
                    Allocated
                  </div>
                  <div className="tabular text-sm font-semibold">
                    ${listing.allocatedCapital.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-[11px]" style={{ color: "var(--muted)" }}>
                    Current Value
                  </div>
                  <div className="tabular text-sm font-semibold">
                    ${listing.currentValue.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-[11px]" style={{ color: "var(--muted)" }}>
                    P&amp;L
                  </div>
                  <div
                    className="tabular text-sm font-semibold"
                    style={{ color: listing.pnlPct >= 0 ? "var(--positive)" : "var(--negative)" }}
                  >
                    {listing.pnlPct >= 0 ? "+" : ""}
                    {listing.pnlPct}%
                  </div>
                </div>
                <div>
                  <div className="text-[11px]" style={{ color: "var(--muted)" }}>
                    Max Drawdown Limit
                  </div>
                  <div className="tabular text-sm font-semibold">{listing.maxDrawdownPct}%</div>
                </div>

                <span
                  className="rounded-full px-3 py-1.5 text-[11px] font-semibold"
                  style={
                    listing.status === "active"
                      ? { background: "var(--positive)", color: "#04140c" }
                      : { border: "1px solid var(--border-strong)", color: "var(--muted)" }
                  }
                >
                  {listing.status === "active" ? "ACTIVE" : "PAUSED"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
