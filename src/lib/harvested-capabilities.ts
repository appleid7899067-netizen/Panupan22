/**
 * Original capability map inspired by patterns observed in high-star open-source agent projects.
 * We implement the concepts here rather than copying project source files.
 * Sources/licences: see docs/github-harvest.md.
 */
export type HarvestedCapability = {
  id: string;
  capability: string;
  phase: "plan" | "act" | "observe" | "verify" | "memory" | "sandbox";
  trigger: string[];
  invariant: string;
};

export const HARVESTED_CAPABILITIES: HarvestedCapability[] = [
  { id: "skills.dynamic", capability: "dynamic skill discovery and activation", phase: "plan", trigger: ["skill", "tool", "capability"], invariant: "only activate skills relevant to the current goal" },
  { id: "verification.receipts", capability: "verification receipts before completion", phase: "verify", trigger: ["verify", "test", "proof", "done"], invariant: "never mark success without observable evidence" },
  { id: "loop.repair", capability: "observe-repair-retry loop", phase: "observe", trigger: ["error", "failed", "broken", "502", "503", "build"], invariant: "feed the observed failure back into the next plan" },
  { id: "delegation.parallel", capability: "parallel subtask delegation", phase: "act", trigger: ["parallel", "research", "multiple", "subtask"], invariant: "bound concurrency and preserve per-task evidence" },
  { id: "memory.closed-loop", capability: "memory from verified outcomes", phase: "memory", trigger: ["remember", "learn", "previous", "history"], invariant: "store causes and verified outcomes, not guesses" },
  { id: "sandbox.safe-runtime", capability: "isolated execution with explicit permissions", phase: "sandbox", trigger: ["sandbox", "run", "execute", "code"], invariant: "execution must be scoped and observable" },
  { id: "tool-search.deferred", capability: "search tools only when needed", phase: "plan", trigger: ["tool", "mcp", "connector", "plugin"], invariant: "keep the visible interface small while capabilities stay discoverable" },
  { id: "context.durable", capability: "checkpointed long-running context", phase: "observe", trigger: ["continue", "resume", "long", "checkpoint"], invariant: "resume from durable state instead of restarting blindly" },
];

export function capabilitiesForGoal(goal: string) {
  const text = goal.toLowerCase();
  return HARVESTED_CAPABILITIES.filter((item) => item.trigger.some((word) => text.includes(word)));
}
