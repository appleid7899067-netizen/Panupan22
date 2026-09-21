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

/**
 * Autonomous research loop.
 * It keeps replanning while new evidence is being discovered, rather than
 * stopping after one search. A deadline prevents a request from consuming a
 * server worker forever; the result explicitly remains unverified until a
 * concrete completion check exists.
 */
export async function executeMvpAutoAutonomous(input: MvpAutoGoal & { deadlineMs?: number }) {
  const { deepSearch } = await import("@/lib/mvpauto-deep-search");
  const startedAt = Date.now();
  const deadline = startedAt + Math.max(5000, Math.min(input.deadlineMs ?? 45000, 120000));
  const queries = new Set<string>([input.goal.trim()]);
  const sources: Array<{ url: string; title?: string; snippet?: string; source?: string }> = [];
  const trace: string[] = [];
  let round = 0;

  while (Date.now() < deadline && queries.size > 0) {
    const query = queries.values().next().value as string;
    queries.delete(query);
    round += 1;
    trace.push(`round ${round}: search ${query}`);

    const result = await deepSearch(query);
    for (const source of result.sources) {
      if (!sources.some((existing) => existing.url === source.url)) sources.push(source);
    }

    const text = result.sources
      .map((source) => [source.title, source.snippet, source.content].filter(Boolean).join(" "))
      .join(" ")
      .toLowerCase();

    const candidates = [
      `${input.goal} solution`,
      `${input.goal} implementation`,
      `${input.goal} verification`,
    ];

    if (result.sourceCount === 0) {
      trace.push(`round ${round}: no sources, replanning`);
      if (round < 3) candidates.push(`${input.goal} github`);
    } else if (text.includes("error") || text.includes("issue") || text.includes("failed")) {
      trace.push(`round ${round}: failure signals found, searching corrective evidence`);
      candidates.push(`${input.goal} fix`, `${input.goal} troubleshooting`);
    } else {
      trace.push(`round ${round}: evidence collected, searching implementation/verification evidence`);
    }

    for (const candidate of candidates) {
      if (candidate !== query && ![...queries].includes(candidate)) queries.add(candidate);
    }

    if (round >= 2 && sources.length >= 8) break;
  }

  const exhausted = Date.now() >= deadline;
  const evidence = sources.map((source) => source.url);
  return {
    ...planMvpAuto(input),
    execution: { rounds: round, sourceCount: sources.length, sources, trace, elapsedMs: Date.now() - startedAt },
    verified: false,
    evidence,
    verification: {
      phase: "executed" as const,
      status: "pending" as const,
      checks: [
        `autonomous loop completed ${round} search rounds`,
        `collected ${sources.length} unique sources`,
        exhausted ? "deadline reached; goal still requires concrete completion evidence" : "loop stopped after sufficient evidence",
        "research evidence is not itself proof of goal completion",
      ],
    },
  };
}
