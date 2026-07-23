import Link from "next/link";
import { MOCK_DEPLOYMENTS, getAgentBySlug } from "@/lib/mockData";
import { AgentAvatar } from "@/components/AgentAvatar";

export default function DashboardPage() {
  const totalAllocated = MOCK_DEPLOYMENTS.reduce((sum, d) => sum + d.allocatedCapital, 0);
  const totalValue = MOCK_DEPLOYMENTS.reduce((sum, d) => sum + d.currentValue, 0);
  const totalPnlPct = ((totalValue - totalAllocated) / totalAllocated) * 100;

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
        Monitoring
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">
        Your <span className="accent-text">deployed agents.</span>
      </h1>
      <p className="mt-3 max-w-xl" style={{ color: "var(--muted)" }}>
        Track performance, exposure, and risk-limit status for every agent
        you've deployed. Sample data shown — connect a wallet to see yours.
      </p>

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
        {MOCK_DEPLOYMENTS.map((deployment) => {
          const agent = getAgentBySlug(deployment.agentSlug);
          if (!agent) return null;

          return (
            <div
              key={deployment.id}
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
                    <span>Deployed {deployment.deployedAt}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <div className="text-[11px]" style={{ color: "var(--muted)" }}>
                    Allocated
                  </div>
                  <div className="tabular text-sm font-semibold">
                    ${deployment.allocatedCapital.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-[11px]" style={{ color: "var(--muted)" }}>
                    Current Value
                  </div>
                  <div className="tabular text-sm font-semibold">
                    ${deployment.currentValue.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-[11px]" style={{ color: "var(--muted)" }}>
                    P&amp;L
                  </div>
                  <div
                    className="tabular text-sm font-semibold"
                    style={{ color: deployment.pnlPct >= 0 ? "var(--positive)" : "var(--negative)" }}
                  >
                    {deployment.pnlPct >= 0 ? "+" : ""}
                    {deployment.pnlPct}%
                  </div>
                </div>
                <div>
                  <div className="text-[11px]" style={{ color: "var(--muted)" }}>
                    Max Drawdown Limit
                  </div>
                  <div className="tabular text-sm font-semibold">{deployment.maxDrawdownPct}%</div>
                </div>

                <span
                  className="rounded-full px-3 py-1.5 text-[11px] font-semibold"
                  style={
                    deployment.status === "active"
                      ? { background: "var(--positive)", color: "#04140c" }
                      : { border: "1px solid var(--border-strong)", color: "var(--muted)" }
                  }
                >
                  {deployment.status === "active" ? "ACTIVE" : "PAUSED"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
