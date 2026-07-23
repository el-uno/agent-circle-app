import Link from "next/link";
import { notFound } from "next/navigation";
import { getAgentBySlug } from "@/lib/mockData";
import { AgentAvatar } from "@/components/AgentAvatar";
import { DeployForm } from "@/components/DeployForm";

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

      <DeployForm agent={agent} />
    </div>
  );
}
