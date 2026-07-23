"use client";

import { useState } from "react";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { submitAgent } from "@/lib/submitAgent";
import type { MarketCategory } from "@/lib/types";
import { WalletButton } from "./WalletButton";

const MARKETS: MarketCategory[] = ["Crypto", "Sports", "Politics", "Macro", "Event Markets"];

const inputStyle = {
  borderColor: "var(--border)",
  color: "var(--foreground)",
} as const;

export function SubmitAgentForm() {
  const { connected, publicKey } = useWallet();
  const [builderName, setBuilderName] = useState("");
  const [agentName, setAgentName] = useState("");
  const [market, setMarket] = useState<MarketCategory>("Crypto");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [submittedSlug, setSubmittedSlug] = useState("");

  const shortAddress = publicKey
    ? `${publicKey.toBase58().slice(0, 4)}…${publicKey.toBase58().slice(-4)}`
    : null;

  const canSubmit =
    connected && builderName.trim() && agentName.trim() && description.trim().length >= 20;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || !publicKey || status === "loading") return;

    setStatus("loading");
    setErrorMsg("");

    const result = await submitAgent({
      builderName,
      builderWallet: publicKey.toBase58(),
      agentName,
      market,
      description,
    });

    if (!result.ok) {
      setStatus("error");
      setErrorMsg(result.error);
      return;
    }

    setSubmittedSlug(result.slug);
    setStatus("done");
  };

  if (status === "done") {
    return (
      <div
        className="mt-8 rounded-2xl border p-8 text-center"
        style={{ borderColor: "var(--border)", background: "var(--card)" }}
      >
        <div
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-full text-xl"
          style={{ background: "var(--grad-accent)", color: "#1a1608" }}
        >
          ✓
        </div>
        <h2 className="mt-4 text-xl font-semibold">Agent submitted for vetting</h2>
        <p className="mx-auto mt-2 max-w-md text-sm" style={{ color: "var(--muted)" }}>
          Your agent is now in the vetting queue. It appears in the catalogue
          as <span style={{ color: "var(--foreground)" }}>VETTING</span> and unlocks
          a public performance record once review completes.
        </p>
        <Link
          href={`/agents/${submittedSlug}`}
          className="mt-6 inline-block rounded-full px-6 py-3 text-sm font-semibold"
          style={{ background: "var(--grad-accent)", color: "#1a1608" }}
        >
          View your agent
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 rounded-2xl border p-6"
      style={{ borderColor: "var(--border)", background: "var(--card)" }}
    >
      {connected ? (
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Submitting as <span style={{ color: "var(--foreground)" }}>{shortAddress}</span>.
          Your wallet becomes your builder identity.
        </p>
      ) : (
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Connect a wallet to submit your agent — it becomes your builder identity
          and, later, where revenue share streams.
        </p>
      )}

      <div className="mt-6 space-y-5" style={{ opacity: connected ? 1 : 0.45 }}>
        <div>
          <label htmlFor="builder-name" className="text-xs font-semibold" style={{ color: "var(--muted)" }}>
            Builder / team name
          </label>
          <input
            id="builder-name"
            type="text"
            disabled={!connected}
            value={builderName}
            onChange={(e) => setBuilderName(e.target.value)}
            placeholder="e.g. 0xForge Labs"
            className="mt-2 w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none"
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="agent-name" className="text-xs font-semibold" style={{ color: "var(--muted)" }}>
            Agent name
          </label>
          <input
            id="agent-name"
            type="text"
            disabled={!connected}
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
            placeholder="e.g. Oracle Edge"
            className="mt-2 w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none"
            style={inputStyle}
          />
        </div>

        <div>
          <label className="text-xs font-semibold" style={{ color: "var(--muted)" }}>
            Market focus
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {MARKETS.map((m) => (
              <button
                key={m}
                type="button"
                disabled={!connected}
                onClick={() => setMarket(m)}
                className="rounded-full px-4 py-2 text-xs font-semibold transition"
                style={
                  market === m
                    ? { background: "var(--grad-accent)", color: "#1a1608" }
                    : { border: "1px solid var(--border)", color: "var(--muted)" }
                }
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="agent-description" className="text-xs font-semibold" style={{ color: "var(--muted)" }}>
            Strategy description{" "}
            <span className="font-normal">(min 20 characters — shown publicly on your agent's profile)</span>
          </label>
          <textarea
            id="agent-description"
            disabled={!connected}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="What does your agent trade, and what's its edge?"
            className="mt-2 w-full resize-none rounded-xl border bg-transparent px-4 py-3 text-sm outline-none"
            style={inputStyle}
          />
        </div>
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm" role="alert" style={{ color: "var(--negative)" }}>
          {errorMsg}
        </p>
      )}

      {connected ? (
        <button
          type="submit"
          disabled={!canSubmit || status === "loading"}
          className="mt-6 w-full rounded-full py-3 text-sm font-semibold text-white disabled:opacity-40"
          style={{ background: "var(--logo-blue)" }}
        >
          {status === "loading" ? "Submitting…" : "Submit for vetting"}
        </button>
      ) : (
        <div className="mt-6 flex justify-center">
          <WalletButton />
        </div>
      )}
    </form>
  );
}
