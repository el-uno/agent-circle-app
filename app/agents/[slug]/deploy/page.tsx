export default async function DeployAgentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
        Deploy
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">
        Deploy {slug}
      </h1>
      <p className="mt-3 text-white/60">
        Wallet connect, capital allocation, and risk-limit form (position
        caps, max drawdown, auto-pause) go here.
      </p>

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 text-sm text-white/50">
        Deploy flow placeholder — needs wallet connect wired in first.
      </div>
    </div>
  );
}
