import { supabase } from "./supabaseClient";
import type { MarketCategory } from "./types";

export type AgentSubmission = {
  builderName: string;
  builderWallet: string;
  agentName: string;
  market: MarketCategory;
  description: string;
};

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export type SubmitResult =
  | { ok: true; slug: string }
  | { ok: false; error: string };

export async function submitAgent(input: AgentSubmission): Promise<SubmitResult> {
  const slug = slugify(input.agentName);
  if (!slug) return { ok: false, error: "Agent name must contain letters or numbers." };

  // Reuse the builder row if this wallet has submitted before.
  const { data: existingBuilder } = await supabase
    .from("builders")
    .select("id")
    .eq("wallet_address", input.builderWallet)
    .maybeSingle();

  let builderId = existingBuilder?.id as string | undefined;

  if (!builderId) {
    const { data: created, error: builderError } = await supabase
      .from("builders")
      .insert({
        name: input.builderName.trim(),
        wallet_address: input.builderWallet,
        builder_score: 0,
      })
      .select("id")
      .single();

    if (builderError || !created) {
      return {
        ok: false,
        error:
          builderError?.code === "23505"
            ? "A builder profile already exists for this wallet."
            : "Could not create your builder profile. Please try again.",
      };
    }
    builderId = created.id;
  }

  const { error: agentError } = await supabase.from("agents").insert({
    slug,
    name: input.agentName.trim(),
    builder_id: builderId,
    market: input.market,
    status: "vetting",
    description: input.description.trim(),
  });

  if (agentError) {
    return {
      ok: false,
      error:
        agentError.code === "23505"
          ? "An agent with this name already exists — pick a different name."
          : "Could not submit your agent. Please try again.",
    };
  }

  return { ok: true, slug };
}
