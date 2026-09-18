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
    triggers: ["รันโค้ด", "run code", "```js", "```javascript", "```ts", "```typescript"],
  },
  {
    id: "daily-fixer",
    name: "Daily Fixer",
    nameTh: "ผู้แก้ไขตัวเอง",
    icon: "🧠",
    description: "Recall errors and daily insights from skill memory",
    needsApproval: false,
    triggers: ["ดูบทเรียน", "บทเรียนวันนี้", "skill memory", "ความจำสกิล"],
  },
  {
    id: "web-search",
    name: "Web Search",
    nameTh: "ค้นหาเว็บ",
    icon: "🔍",
    description: "Structured search brief (live crawl when connector available)",
    needsApproval: false,
    // Intentionally strict — avoid hijacking normal chat
    triggers: ["ค้นหาเว็บ", "ค้นหาว่า", "web search", "ค้นหา:", "search:"],
  },
  {
    id: "link-follower",
    name: "Link Follower",
    nameTh: "อ่านลิงก์",
    icon: "🔗",
    description: "Inspect a URL structure safely",
    needsApproval: true,
    triggers: ["อ่านลิงก์", "เปิดลิงก์", "follow link"],
  },
  {
    id: "doc-reader",
    name: "Doc Reader",
    nameTh: "อ่านเอกสาร",
    icon: "📄",
    description: "Summarise pasted document text",
    needsApproval: false,
    triggers: ["อ่านเอกสาร", "สรุปเอกสาร"],
  },
];

export function detectSkill(input: string): SkillDefinition | null {
  const lower = input.toLowerCase();
  // Prefer longer / more specific triggers first
  const ranked = [...SKILLS].sort(
    (a, b) =>
      Math.max(...b.triggers.map((t) => t.length)) -
      Math.max(...a.triggers.map((t) => t.length)),
  );
  for (const skill of ranked) {
    if (skill.triggers.some((t) => lower.includes(t.toLowerCase()))) {
      return skill;
    }
  }
  // Explicit URL + "อ่าน" style
  if (/https?:\/\//i.test(input) && /อ่าน|เปิด|follow/i.test(input)) {
    return SKILLS.find((s) => s.id === "link-follower") ?? null;
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
    const query = input
      .replace(/ค้นหาเว็บ|ค้นหาว่า|web search|ค้นหา:|search:/gi, "")
      .trim();
    return { query: query || input.trim() };
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

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

/** Stream text in small chunks so the UI feels real-time. */
async function streamLines(
  lines: string[],
  onStream?: (c: string) => void,
  gapMs = 40,
) {
  for (const line of lines) {
    onStream?.(line.endsWith("\n") ? line : `${line}\n`);
    if (gapMs > 0) await delay(gapMs);
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
    await streamLines(
      [
        "📊 สรุปบทเรียน",
        "",
        ...insights.map((i) => `• ${i}`),
        "",
        `📈 อัตราสำเร็จโดยรวม: ${(rate * 100).toFixed(1)}%`,
        `errors: ${memory.errors.length} · successes: ${memory.successes.length}`,
      ],
      onStream,
      30,
    );
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

  await streamLines(
    [
      `🔍 ค้นหา: ${query}`,
      "",
      "กำลังจัด brief…",
      "1) ชัดเจน intent ของคำถาม",
      "2) เลือกแหล่งที่น่าเชื่อถือ 3–5 แหล่ง",
      "3) ดึง claim พร้อม citation",
      "4) ระบุจุดที่ไม่แน่ใจ",
      "",
      `สรุปสั้น: ใช้คำถาม “${query.slice(0, 120)}” เป็นแกน แล้วให้ Grok ขยายต่อในแชทได้`,
      "",
      "(Live web crawl ยังไม่เปิดใน build นี้ — brief พร้อมใช้ต่อกับโมเดลทันที)",
    ],
    onStream,
    45,
  );

  recordSuccess({ skillId: "web-search", pattern: query.slice(0, 120) });
  return {
    ok: true,
    data: {
      query,
      steps: ["clarify", "sources", "extract", "uncertainty"],
      note: "Brief only — no live crawl in default build",
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
    await streamLines(
      [
        `🔗 ${parsed.href}`,
        `host: ${parsed.host}`,
        `protocol: ${parsed.protocol}`,
        `path: ${parsed.pathname}`,
        "",
        "(ยังไม่ดึงเนื้อหาจากเน็ตโดยตรง — ปลอดภัยตามค่าเริ่มต้น)",
      ],
      onStream,
      35,
    );
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
    onStream?.(`❌ ${message}\n`);
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
  await streamLines(
    [`📄 words≈${words} · lines=${lines}`, "", `${preview}${text.length > 400 ? "…" : ""}`],
    onStream,
    25,
  );
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
  let streamOutput = call.streamOutput ?? "";
  const stream = (chunk: string) => {
    streamOutput += chunk;
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
    stream(`❌ ${message}\n`);
    result = { ok: false, error: message, duration: 0 };
  }

  return {
    ...call,
    status: result.ok ? "done" : "error",
    streamOutput,
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
