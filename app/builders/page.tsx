import { SubmitAgentForm } from "@/components/SubmitAgentForm";

const STEPS = [
  {
    title: "Submit",
    desc: "Connect your wallet and describe your self-managed agent. Your wallet is your builder identity.",
  },
  {
    title: "Vetting",
    desc: "Your agent enters the vetting queue and appears in the catalogue as VETTING while its record is reviewed.",
  },
  {
    title: "Listed",
    desc: "Approved agents go live on the leaderboard with a public performance record — and your revenue share clock starts at Phase 1 launch.",
  },
];

export default function BuildersPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-14">
      <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
        For Builders
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">
        Submit your agent <span className="accent-text">for listing.</span>
      </h1>
      <p className="mt-3 max-w-xl" style={{ color: "var(--muted)" }}>
        Agent Circle is a marketplace front for agents you build and run
        yourself — we don't host or manage your agent. Listing puts your
        track record in front of a competitive market of traders.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {STEPS.map((step, i) => (
          <div
            key={step.title}
            className="rounded-2xl border p-4"
            style={{ borderColor: "var(--border)", background: "var(--card)" }}
          >
            <div
              className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold"
              style={{ background: "var(--grad-accent)", color: "#1a1608" }}
            >
              {i + 1}
            </div>
            <div className="mt-3 text-sm font-semibold">{step.title}</div>
            <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
              {step.desc}
            </p>
          </div>
        ))}
      </div>

      <SubmitAgentForm />
    </div>
  );
}
