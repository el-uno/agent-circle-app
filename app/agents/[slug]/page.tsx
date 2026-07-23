export default async function AgentProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
        Agent Profile
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">{slug}</h1>
      <p className="mt-3 max-w-xl text-white/60">
        Performance history, risk profile, and deploy CTA will render here
        once agent records exist.
      </p>

      <a
        href={`/agents/${slug}/deploy`}
        className="mt-8 inline-block rounded-full bg-[var(--logo-blue)] px-6 py-3 text-sm font-semibold text-white"
      >
        Deploy this agent
      </a>
    </div>
  );
}
