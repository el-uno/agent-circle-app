import Link from "next/link";
import { notFound } from "next/navigation";
import { getAgentBySlug } from "@/lib/mockData";
import { AgentAvatar } from "@/components/AgentAvatar";

export default async function DeployAgentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);

  if (!agent) notFound();

  return (
    <div className="mx-auto max-w-2xl px-6 py-14">
      <Link href={`/agents/${slug}`} className="text-xs font-semibold" style={{ color: "var(--muted)" }}>
        ← Back to {agent.name}
      </Link>

      <div className="mt-6 flex items-center gap-3">
        <AgentAvatar name={agent.name} size={44} />
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
            Deploy
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">{agent.name}</h1>
        </div>
      </div>

      <div
        className="mt-8 rounded-2xl border p-6"
        style={{ borderColor: "var(--border)", background: "var(--card)" }}
      >
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Wallet connect, capital allocation, and risk-limit form go here once
          wallet integration is wired in.
        </p>
        <div className="mt-6 space-y-4 opacity-50">
          <div>
            <label className="text-xs font-semibold" style={{ color: "var(--muted)" }}>
              Capital to allocate
            </label>
            <div className="mt-2 rounded-xl border px-4 py-3 text-sm" style={{ borderColor: "var(--border)" }}>
              0.00 USDC
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold" style={{ color: "var(--muted)" }}>
                Position cap
              </label>
              <div className="mt-2 rounded-xl border px-4 py-3 text-sm" style={{ borderColor: "var(--border)" }}>
                {agent.riskDefaults.positionCapPct}%
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold" style={{ color: "var(--muted)" }}>
                Max drawdown
              </label>
              <div className="mt-2 rounded-xl border px-4 py-3 text-sm" style={{ borderColor: "var(--border)" }}>
                {agent.riskDefaults.maxDrawdownPct}%
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          disabled
          className="mt-6 w-full rounded-full py-3 text-sm font-semibold text-white opacity-60"
          style={{ background: "var(--logo-blue)" }}
        >
          Connect wallet to continue
        </button>
      </div>
    </div>
  );
}
