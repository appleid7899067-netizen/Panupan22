/**
 * Grok Bot-inspired runtime contracts for BossnuGrok.
 *
 * This is an original compatibility layer inspired by the public
 * architecture documented by b-nnett/grok-bot-0.18-reconstructed.
 * It does not copy upstream source or bundled assets.
 *
 * Responsibilities:
 * - provider routing with deterministic fallback order
 * - capability/tool registry
 * - turn execution trace
 * - least-privilege tool permissions
 * - streaming-friendly lifecycle events
 */

export type RuntimeProvider = "xai" | "puter" | "openrouter" | "local";

export type RuntimeCapability =
  | "chat"
  | "stream"
  | "tools"
  | "vision"
  | "code"
  | "web"
  | "sandbox";

export type ToolPermission = "network" | "filesystem" | "execution" | "account";

export type RuntimeTool = {
  id: string;
  description: string;
  capabilities: RuntimeCapability[];
  permissions: ToolPermission[];
  enabled: boolean;
};

export type RouterProfile = {
  id: string;
  provider: RuntimeProvider;
  model: string;
  capabilities: RuntimeCapability[];
  priority: number;
  enabled: boolean;
};

export type TraceEvent = {
  id: string;
  phase: "route" | "tool" | "stream" | "complete" | "error";
  label: string;
  provider?: RuntimeProvider;
  model?: string;
  durationMs?: number;
  ok?: boolean;
  at: number;
};

export type RuntimePlan = {
  provider: RuntimeProvider;
  model: string;
  tools: RuntimeTool[];
  events: TraceEvent[];
};

const DEFAULT_PROFILES: RouterProfile[] = [
  {
    id: "xai-primary",
    provider: "xai",
    model: "grok-4.5",
    capabilities: ["chat", "stream", "tools", "vision"],
    priority: 10,
    enabled: true,
  },
  {
    id: "puter-fallback",
    provider: "puter",
    model: "grok-4.5",
    capabilities: ["chat", "stream", "tools", "vision"],
    priority: 20,
    enabled: true,
  },
  {
    id: "openrouter-fallback",
    provider: "openrouter",
    model: "auto",
    capabilities: ["chat", "stream", "tools"],
    priority: 30,
    enabled: true,
  },
];

const DEFAULT_TOOLS: RuntimeTool[] = [
  {
    id: "web-search",
    description: "ค้นข้อมูลสดจากเว็บ",
    capabilities: ["web", "tools"],
    permissions: ["network"],
    enabled: true,
  },
  {
    id: "code-runner",
    description: "รันโค้ดใน sandbox ที่จำกัดสิทธิ์",
    capabilities: ["code", "sandbox", "tools"],
    permissions: ["execution"],
    enabled: true,
  },
  {
    id: "doc-reader",
    description: "อ่านและสรุปเอกสารที่ผู้ใช้ส่ง",
    capabilities: ["tools"],
    permissions: ["filesystem"],
    enabled: true,
  },
];

function canSatisfy(profile: RouterProfile, required: RuntimeCapability[]) {
  return required.every((capability) => profile.capabilities.includes(capability));
}

function makeEvent(
  phase: TraceEvent["phase"],
  label: string,
  extra: Omit<TraceEvent, "id" | "phase" | "label" | "at"> = {},
): TraceEvent {
  return {
    id: `trace_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
    phase,
    label,
    at: Date.now(),
    ...extra,
  };
}

export function createRuntimePlan(input: {
  requiredCapabilities?: RuntimeCapability[];
  profiles?: RouterProfile[];
  tools?: RuntimeTool[];
}): RuntimePlan {
  const required = input.requiredCapabilities ?? ["chat", "stream"];
  const profiles = [...(input.profiles ?? DEFAULT_PROFILES)]
    .filter((profile) => profile.enabled && canSatisfy(profile, required))
    .sort((a, b) => a.priority - b.priority);

  const selected = profiles[0] ?? DEFAULT_PROFILES[0];
  const tools = (input.tools ?? DEFAULT_TOOLS).filter(
    (tool) =>
      tool.enabled &&
      tool.capabilities.some((capability) => required.includes(capability) || capability === "tools"),
  );

  const events = [
    makeEvent("route", "runtime route selected", {
      provider: selected.provider,
      model: selected.model,
      ok: true,
    }),
  ];

  return {
    provider: selected.provider,
    model: selected.model,
    tools,
    events,
  };
}

export function addTraceEvent(
  plan: RuntimePlan,
  phase: TraceEvent["phase"],
  label: string,
  extra: Omit<TraceEvent, "id" | "phase" | "label" | "at"> = {},
): RuntimePlan {
  return {
    ...plan,
    events: [...plan.events, makeEvent(phase, label, extra)],
  };
}

export function hasPermission(tool: RuntimeTool, permission: ToolPermission): boolean {
  return tool.permissions.includes(permission);
}

export function getRuntimeCapabilities() {
  return {
    providers: DEFAULT_PROFILES,
    tools: DEFAULT_TOOLS,
    principles: [
      "route",
      "stream",
      "tool-registry",
      "execution-trace",
      "least-privilege",
      "verification",
    ] as const,
  };
}
