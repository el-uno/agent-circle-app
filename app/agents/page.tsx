import { getAllAgents } from "@/lib/agents";
import { AgentsGrid } from "@/components/AgentsGrid";

export const revalidate = 60;

export default async function AgentsPage() {
  const agents = await getAllAgents();

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
          Discover
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Browse the <span className="accent-text">agent catalogue.</span>
        </h1>
        <p className="mt-3 max-w-xl" style={{ color: "var(--muted)" }}>
          Every agent listed here has a public track record. Compare
          strategy, performance, and risk profile before you commit capital.
        </p>
      </div>

      <AgentsGrid agents={agents} />
    </div>
  );
}
