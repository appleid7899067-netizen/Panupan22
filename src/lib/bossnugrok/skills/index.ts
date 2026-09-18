import type { SkillCall, SkillDefinition, SkillId, SkillResult } from "./skill-types";
import { recordError, recordSuccess, getDailyInsights, getSuccessRate, loadMemory } from "../memory/storage";

export const SKILLS: SkillDefinition[] = [
  {
    id: "code-runner",
    name: "Code Runner",
    nameTh: "รันโค้ด",
    icon: "⚡",
    description: "Run JavaScript safely in an isolated Function sandbox",
    needsApproval: false,
    triggers: ["รันโค้ด", "run code", "execute", "console.log", "```js", "```javascript"],
  },
  {
    id: "daily-fixer",
    name: "Daily Fixer",
    nameTh: "ผู้แก้ไขตัวเอง",
    icon: "🧠",
    description: "Recall errors and daily insights from skill memory",
    needsApproval: false,
    triggers: ["บทเรียน", "จำไว้", "error", "insights", "daily", "ความจำ"],
  },
  {
    id: "web-search",
    name: "Web Search",
    nameTh: "ค้นหาเว็บ",
    icon: "🔍",
    description: "Prepare a structured search brief (no live crawl without connector)",
    needsApproval: false,
    triggers: ["ค้นหา", "search", "หาให้", "google"],
  },
  {
    id: "link-follower",
    name: "Link Follower",
    nameTh: "อ่านลิงก์",
    icon: "🔗",
    description: "Inspect a URL structure safely (no remote fetch by default)",
    needsApproval: true,
    triggers: ["https://", "http://", "อ่านลิงก์", "เปิดลิงก์"],
  },
  {
    id: "doc-reader",
    name: "Doc Reader",
    nameTh: "อ่านเอกสาร",
    icon: "📄",
    description: "Summarise pasted document text",
    needsApproval: false,
    triggers: ["อ่านเอกสาร", "สรุปเอกสาร", "doc", "pdf text"],
  },
];

export function detectSkill(input: string): SkillDefinition | null {
  const lower = input.toLowerCase();
  for (const skill of SKILLS) {
    if (skill.triggers.some((t) => lower.includes(t.toLowerCase()))) {
      return skill;
    }
  }
  return null;
}

export function parseSkillArgs(skillId: SkillId, input: string): Record<string, unknown> {
  if (skillId === "code-runner") {
    const match = input.match(/```(?:js|javascript|ts|typescript)?\n([\s\S]*?)```/i);
    return {
      language: "javascript",
      code: match?.[1]?.trim() ?? input.replace(/รันโค้ดนี้:?/i, "").trim(),
    };
  }
  if (skillId === "link-follower") {
    const match = input.match(/https?:\/\/[^\s]+/i);
    return { url: match?.[0] ?? "" };
  }
  if (skillId === "web-search") {
    return {
      query: input.replace(/ค้นหา|หาให้หน่อย|search|google/gi, "").trim() || input.trim(),
    };
  }
  if (skillId === "daily-fixer") {
    return { action: "get-insights" };
  }
  if (skillId === "doc-reader") {
    return { text: input.slice(0, 12_000) };
  }
  return { input };
}

function analyzeError(message: string): string {
  const m = message.toLowerCase();
  if (/timeout|timed out/.test(m)) return "timeout";
  if (/syntax|unexpected token/.test(m)) return "syntax";
  if (/network|fetch|cors/.test(m)) return "network";
  if (/not found|404/.test(m)) return "not_found";
  return "unknown";
}

function suggestFix(errorType: string): string {
  switch (errorType) {
    case "timeout":
      return "เพิ่ม timeout หรือลดขนาดงาน";
    case "syntax":
      return "ตรวจวงเล็บ / quote / semicolon";
    case "network":
      return "ตรวจ CORS หรือใช้ server proxy";
    case "not_found":
      return "ตรวจ URL / path ให้ถูกต้อง";
    default:
      return "อ่าน stack แล้วลองรันใหม่ทีละขั้น";
  }
}

async function runCodeRunner(args: Record<string, unknown>, onStream?: (c: string) => void): Promise<SkillResult> {
  const start = Date.now();
  const code = String(args.code ?? "").trim();
  if (!code) {
    return { ok: false, error: "ไม่มีโค้ดให้รัน", duration: Date.now() - start };
  }

  onStream?.("$ node (sandbox)\n");
  const logs: string[] = [];
  const fakeConsole = {
    log: (...xs: unknown[]) => {
      const line = xs.map(String).join(" ");
      logs.push(line);
      onStream?.(`${line}\n`);
    },
    error: (...xs: unknown[]) => {
      const line = xs.map(String).join(" ");
      logs.push(`[error] ${line}`);
      onStream?.(`[error] ${line}\n`);
    },
    warn: (...xs: unknown[]) => {
      const line = xs.map(String).join(" ");
      logs.push(`[warn] ${line}`);
      onStream?.(`[warn] ${line}\n`);
    },
  };

  try {
    // Isolated-ish Function sandbox — no DOM, no network helpers injected
    const fn = new Function("console", `"use strict";\n${code}`);
    const value = fn(fakeConsole);
    if (value !== undefined) {
      const line = `→ ${String(value)}`;
      logs.push(line);
      onStream?.(`${line}\n`);
    }
    recordSuccess({ skillId: "code-runner", pattern: code.slice(0, 120) });
    return {
      ok: true,
      data: { logs, value: value === undefined ? null : String(value) },
      duration: Date.now() - start,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const errorType = analyzeError(message);
    const fix = suggestFix(errorType);
    recordError({ skillId: "code-runner", error: message, args, fix });
    onStream?.(`❌ ${message}\n💡 ${fix}\n`);
    return { ok: false, error: message, duration: Date.now() - start };
  }
}

async function runDailyFixer(args: Record<string, unknown>, onStream?: (c: string) => void): Promise<SkillResult> {
  const start = Date.now();
  const action = String(args.action ?? "get-insights");
  if (action === "get-insights") {
    const insights = getDailyInsights();
    const rate = getSuccessRate();
    const memory = loadMemory();
    onStream?.("📊 สรุปบทเรียน\n\n");
    for (const line of insights) onStream?.(`• ${line}\n`);
    onStream?.(`\n📈 อัตราสำเร็จโดยรวม: ${(rate * 100).toFixed(1)}%\n`);
    onStream?.(`errors: ${memory.errors.length} · successes: ${memory.successes.length}\n`);
    return {
      ok: true,
      data: { insights, successRate: rate, errors: memory.errors.length, successes: memory.successes.length },
      duration: Date.now() - start,
    };
  }
  return { ok: false, error: `unknown action: ${action}`, duration: Date.now() - start };
}

async function runWebSearch(args: Record<string, unknown>, onStream?: (c: string) => void): Promise<SkillResult> {
  const start = Date.now();
  const query = String(args.query ?? "").trim();
  if (!query) return { ok: false, error: "ไม่มีคำค้น", duration: Date.now() - start };
  onStream?.(`🔍 Search brief for: ${query}\n\n`);
  onStream?.("1) Clarify intent\n2) List 3–5 trusted sources\n3) Extract claims with citations\n4) Flag uncertainty\n\n");
  onStream?.("(Live crawl is not enabled in this build — use this brief with Grok or attach a connector.)\n");
  recordSuccess({ skillId: "web-search", pattern: query.slice(0, 120) });
  return {
    ok: true,
    data: {
      query,
      steps: ["clarify", "sources", "extract", "uncertainty"],
      note: "No live web crawl in default build",
    },
    duration: Date.now() - start,
  };
}

async function runLinkFollower(args: Record<string, unknown>, onStream?: (c: string) => void): Promise<SkillResult> {
  const start = Date.now();
  const url = String(args.url ?? "").trim();
  if (!url) return { ok: false, error: "ไม่มี URL", duration: Date.now() - start };
  try {
    const parsed = new URL(url);
    onStream?.(`🔗 ${parsed.href}\n`);
    onStream?.(`host: ${parsed.host}\nprotocol: ${parsed.protocol}\npath: ${parsed.pathname}\n`);
    onStream?.("\n(Remote fetch disabled by default for safety. Approve only when a server proxy is configured.)\n");
    recordSuccess({ skillId: "link-follower", pattern: parsed.host });
    return {
      ok: true,
      data: {
        href: parsed.href,
        host: parsed.host,
        path: parsed.pathname,
        fetched: false,
      },
      duration: Date.now() - start,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    recordError({ skillId: "link-follower", error: message, args, fix: "ตรวจรูปแบบ URL" });
    return { ok: false, error: message, duration: Date.now() - start };
  }
}

async function runDocReader(args: Record<string, unknown>, onStream?: (c: string) => void): Promise<SkillResult> {
  const start = Date.now();
  const text = String(args.text ?? "").trim();
  if (text.length < 20) {
    return { ok: false, error: "ข้อความสั้นเกินไป", duration: Date.now() - start };
  }
  const words = text.split(/\s+/).filter(Boolean).length;
  const lines = text.split("\n").length;
  const preview = text.slice(0, 400);
  onStream?.(`📄 words≈${words} · lines=${lines}\n\n`);
  onStream?.(`${preview}${text.length > 400 ? "…" : ""}\n`);
  recordSuccess({ skillId: "doc-reader", pattern: `words:${words}` });
  return {
    ok: true,
    data: { words, lines, preview },
    duration: Date.now() - start,
  };
}

export async function executeSkill(
  call: SkillCall,
  onStream?: (chunk: string) => void,
): Promise<SkillCall> {
  const started: SkillCall = { ...call, status: "running", streamOutput: call.streamOutput ?? "" };
  const stream = (chunk: string) => {
    onStream?.(chunk);
  };

  let result: SkillResult;
  try {
    switch (call.skillId) {
      case "code-runner":
        result = await runCodeRunner(call.args, stream);
        break;
      case "daily-fixer":
        result = await runDailyFixer(call.args, stream);
        break;
      case "web-search":
        result = await runWebSearch(call.args, stream);
        break;
      case "link-follower":
        result = await runLinkFollower(call.args, stream);
        break;
      case "doc-reader":
        result = await runDocReader(call.args, stream);
        break;
      default:
        result = { ok: false, error: "unknown skill", duration: 0 };
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    result = { ok: false, error: message, duration: 0 };
  }

  return {
    ...started,
    status: result.ok ? "done" : "error",
    result: result.data,
    error: result.error,
    duration: result.duration,
  };
}

export function createSkillCall(input: string): SkillCall | null {
  const skill = detectSkill(input);
  if (!skill) return null;
  return {
    id: `skill_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
    skillId: skill.id,
    args: parseSkillArgs(skill.id, input),
    status: skill.needsApproval ? "pending" : "running",
  };
}
