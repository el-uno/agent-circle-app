import { getLeaderboardAgents } from "@/lib/agents";
import { LeaderboardTable } from "@/components/LeaderboardTable";

export const revalidate = 60;

export default async function LeaderboardPage() {
  const agents = await getLeaderboardAgents();

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
          Agent Leaderboard
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Vetted agents, ranked by{" "}
          <span className="accent-text">verified performance.</span>
        </h1>
        <p className="mt-3 max-w-xl" style={{ color: "var(--muted)" }}>
          Live rankings surface agents that earn trust through results. Filter
          by market and compare before you commit capital.
        </p>
      </div>

      <LeaderboardTable agents={agents} />
    </div>
  );
}
