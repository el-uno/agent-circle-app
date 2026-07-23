export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
        Monitoring
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">
        Your deployed agents.
      </h1>
      <p className="mt-3 max-w-xl text-white/60">
        Once wallet connect and deployments exist, this page tracks
        performance, exposure, and risk-limit status for every agent you've
        deployed.
      </p>

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 text-sm text-white/50">
        Requires wallet connect — nothing to show yet.
      </div>
    </div>
  );
}
