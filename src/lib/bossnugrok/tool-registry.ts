/**
 * Boss Tool Registry
 * Tools advertise capability, risk and verification requirements.
 */
export type BossTool = {
  id: string;
  capability: string;
  risk: "read" | "write" | "external";
  verify: string[];
};

export const BOSS_TOOL_REGISTRY: BossTool[] = [
  { id: "repo_inspect", capability: "inspect repository", risk: "read", verify: ["structure"] },
  { id: "repo_read_file", capability: "read source", risk: "read", verify: ["content"] },
  { id: "repo_write_file", capability: "modify source", risk: "write", verify: ["commit", "ci"] },
  { id: "ci_check", capability: "inspect CI", risk: "read", verify: ["workflow"] },
  { id: "web_check", capability: "verify production URL", risk: "external", verify: ["http"] },
  { id: "memory_learn", capability: "record failure lessons", risk: "write", verify: ["stored"] },
];

export function findToolForCapability(capability: string) {
  const q = capability.toLowerCase();
  return BOSS_TOOL_REGISTRY.find((t) => t.capability.includes(q) || q.includes(t.id));
}
