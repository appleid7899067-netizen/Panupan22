/**
 * MVPAUTO: one application-level tool surface for many provider capabilities.
 * The agent/UI speaks to "mvpa.auto"; provider-specific tools stay behind it.
 *
 * Important: finding sources is not the same as completing a goal.
 * MVPAUTO therefore keeps search/execution state separate from final verification.
 */
import { searchGoogle } from "@/lib/mvpauto-google";

export type MvpAutoGoal = {
  goal: string;
  context?: Record<string, unknown>;
  preferredProvider?:
    | "google"
    | "github"
    | "gitlab"
    | "railway"
    | "vercel"
    | "netlify"
    | "replit"
    | "lovable"
    | "puter"
    | "openai"
    | "manus"
    | "auto";
};

export type MvpAutoAction = {
  id: string;
  provider: string;
  capability: string;
  reason: string;
  input: Record<string, unknown>;
};

export type MvpAutoVerification = {
  phase: "planned" | "searched" | "executed" | "verified";
  status: "pending" | "passed" | "failed";
  checks: string[];
};

export type MvpAutoResult = {
  ok: boolean;
  tool: "mvpa.auto";
  goal: string;
  selected: MvpAutoAction[];
  verified: boolean;
  evidence: string[];
  verification: MvpAutoVerification;
};

const RULES = [
  { provider: "google", capability: "search", words: ["google", "search", "ค้น", "ค้นหา", "ข้อมูล", "เว็บ"] },
  { provider: "github", capability: "repository-code", words: ["github", "repo", "code", "commit", "branch", "pull request", "ci", "workflow"] },
  { provider: "gitlab", capability: "repository-pipeline", words: ["gitlab", "merge request", "pipeline", "job"] },
  { provider: "railway", capability: "deploy-runtime", words: ["railway", "deploy", "production", "server", "runtime", "502", "503"] },
  { provider: "vercel", capability: "deploy-web", words: ["vercel", "frontend", "deployment", "build", "runtime"] },
  { provider: "netlify", capability: "deploy-web", words: ["netlify"] },
  { provider: "replit", capability: "app-build", words: ["replit", "prototype", "app"] },
  { provider: "lovable", capability: "app-build", words: ["lovable", "ui", "website"] },
  { provider: "puter", capability: "ai-runtime", words: ["puter", "model", "chat", "ai"] },
  { provider: "openai", capability: "api", words: ["openai", "api key", "openai api"] },
  { provider: "manus", capability: "task-agent", words: ["manus", "task", "browser", "automation"] },
] as const;

function score(rule: (typeof RULES)[number], text: string) {
  return rule.words.reduce((n, word) => n + (text.includes(word) ? 1 : 0), 0);
}

export function planMvpAuto(input: MvpAutoGoal): MvpAutoResult {
  const text = (input.goal + " " + JSON.stringify(input.context ?? {})).toLowerCase();
  const preferred = input.preferredProvider && input.preferredProvider !== "auto" ? input.preferredProvider : undefined;
  const ranked = RULES.map((rule) => ({ rule, score: score(rule, text) }))
    .filter(({ rule, score: points }) => points > 0 || rule.provider === preferred)
    .sort((a, b) => {
      if (preferred) {
        if (a.rule.provider === preferred) return -1;
        if (b.rule.provider === preferred) return 1;
      }
      return b.score - a.score;
    });

  const selectedRules = ranked.length
    ? ranked.slice(0, 3)
    : [{ rule: { provider: "puter", capability: "ai-runtime", words: [] as readonly string[] }, score: 0 }];

  const selected = selectedRules.map(({ rule }) => ({
    id: "mvpa." + rule.provider + "." + rule.capability,
    provider: rule.provider,
    capability: rule.capability,
    reason: rule.words.length
      ? "matched: " + rule.words.filter((word) => text.includes(word)).join(", ")
      : "fallback AI planner",
    input: { goal: input.goal, context: input.context ?? {} },
  }));

  return {
    ok: true,
    tool: "mvpa.auto",
    goal: input.goal,
    selected,
    verified: false,
    evidence: ["plan-created; execution and verification are separate phases"],
    verification: {
      phase: "planned",
      status: "pending",
      checks: ["plan created", "goal completion not yet verified"],
    },
  };
}

export async function executeMvpAutoSearch(input: MvpAutoGoal & { start?: number }) {
  const plan = planMvpAuto(input);
  const google = plan.selected.find((action) => action.provider === "google");
  if (!google) {
    return {
      ...plan,
      execution: null,
      verification: {
        phase: "executed" as const,
        status: "failed" as const,
        checks: ["Google search was not selected"],
      },
    };
  }

  const result = await searchGoogle(input.goal, input.start ?? 1);
  const found = result.ok && result.items.length > 0;

  return {
    ...plan,
    execution: result,
    // Search evidence proves that sources were found, not that the user's goal was completed.
    verified: false,
    evidence: result.ok
      ? result.items.map((item) => item.link)
      : [result.error ?? "google-search-failed"],
    verification: {
      phase: "searched" as const,
      status: found ? "pending" as const : "failed" as const,
      checks: found
        ? ["search request succeeded", "sources found", "goal completion still requires verification"]
        : ["search request did not produce usable sources"],
    },
  };
}

export async function executeMvpAutoDeepSearch(input: MvpAutoGoal) {
  const plan = planMvpAuto({ ...input, preferredProvider: "google" });
  const { deepSearch } = await import("@/lib/mvpauto-deep-search");
  const result = await deepSearch(input.goal);
  const found = result.sourceCount > 0;

  return {
    ...plan,
    execution: result,
    // Deep search is an observation phase. It must not claim the goal is complete.
    verified: false,
    evidence: result.sources.map((s) => s.url),
    verification: {
      phase: "searched" as const,
      status: found ? "pending" as const : "failed" as const,
      checks: found
        ? ["multiple public sources searched", "sources collected", "goal completion still requires execution/verification"]
        : ["no usable sources found"],
    },
  };
}
