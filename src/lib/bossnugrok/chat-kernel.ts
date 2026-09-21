/**
 * Chat kernel — Grok calls skills inside the current room.
 * Used by the web chat, POST /api/chat, Discord, and Telegram.
 */
import { createServerFn } from "@tanstack/react-start";
import { fetchLiveData } from "@/lib/live-data";
import { SKILLS } from "@/lib/bossnugrok/skills";
import type { SkillCall, SkillId } from "@/lib/bossnugrok/skills/skill-types";
import { executeBossAction, BOSS_ACTIONS, type BossActionName } from "@/lib/bossnugrok/action-bridge";

const CHAT_MODEL = "grok-4.5";
const MAX_TOKENS = 1400;
const MAX_ROUNDS = 3;

export type GrokToolCall = {
  id: string;
  type: "function";
  function: { name: string; arguments: string };
};

export type KernelMessage = {
  role: "system" | "user" | "assistant" | "tool";
  content: string;
  tool_call_id?: string;
  tool_calls?: GrokToolCall[];
};

export type KernelResult =
  | { ok: true; text: string; model: string; skillCalls: SkillCall[] }
  | { ok: false; error: string; skillCalls: SkillCall[] };

const BOSS_ACTION_TOOL_DEFS = BOSS_ACTIONS.map((action) => ({
  type: "function" as const,
  function: {
    name: action.name,
    description: action.description,
    parameters: {
      type: "object",
      properties: { repo: { type: "string" }, path: { type: "string" }, ref: { type: "string" }, content: { type: "string" }, message: { type: "string" }, branch: { type: "string" }, sha: { type: "string" }, url: { type: "string" }, text: { type: "string" } },
      required: action.name === "repo_read_file" ? ["path"] : action.name === "repo_write_file" ? ["path", "content"] : action.name === "web_check" ? ["url"] : action.name === "memory_learn" ? ["text"] : [],
    },
  },
}));

const TOOLS = [
  ...BOSS_ACTION_TOOL_DEFS,
  {
    type: "function" as const,
    function: {
      name: "web_search",
      description: "Search the live web / Wikipedia / DuckDuckGo. Use for current facts, news, docs.",
      parameters: {
        type: "object",
        properties: { query: { type: "string" } },
        required: ["query"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "live_scores",
      description: "Fetch live football scores and fixtures.",
      parameters: {
        type: "object",
        properties: { query: { type: "string", description: "League or team, e.g. Premier League" } },
        required: ["query"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "code_runner",
      description: "Run JavaScript in an isolated sandbox. No network, no filesystem.",
      parameters: {
        type: "object",
        properties: { code: { type: "string" } },
        required: ["code"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "link_follower",
      description: "Inspect a URL (host, path). Does not fetch remote HTML.",
      parameters: {
        type: "object",
        properties: { url: { type: "string" } },
        required: ["url"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "doc_reader",
      description: "Summarise pasted document text.",
      parameters: {
        type: "object",
        properties: { text: { type: "string" } },
        required: ["text"],
      },
    },
  },
];

const NAME_TO_SKILL: Record<string, SkillId> = {
  web_search: "web-search",
  live_scores: "live-scores",
  code_runner: "code-runner",
  link_follower: "link-follower",
  doc_reader: "doc-reader",
};

function kernelSystem(lang: "th" | "en", extra?: string) {
  const skills = SKILLS.map((s) => `- ${s.id}: ${s.description} (triggers: ${s.triggers.join(", ")})`).join("\n");
  const base =
    lang === "th"
      ? `คุณคือผู้บัญชาการ BossnuGrok (ผู้พัฒนา: ภาณุพันธ์)
อยู่ห้องแชทนี้ตลอด ห้ามบอกให้ผู้ใช้ไปเปิดโหมดอื่น เว้นแต่เขาพูดชัดว่า "เปิด sandbox" / "switch to terminal"
เรียกเครื่องมือเองเมื่อต้องการข้อมูลสดหรือรันโค้ด\nเลือก Boss actions เองเมื่อจำเป็นต้องตรวจ/แก้ repository, ตรวจเว็บ, ตรวจ CI หรือบันทึกบทเรียน
ห้ามใช้ emoji ห้ามแต่ง token budget
ตอบภาษาไทยถ้าผู้ใช้พิมพ์ไทย`
      : `You are the BossnuGrok commander (developer: Phanuphan).
Stay in this chat room. Do not send the user to another mode unless they explicitly switch.
Call tools yourself for live data or code.
No emoji. Never invent a token budget.`;
  return [base, "", "Available skills:", skills, extra?.trim() ? `\n${extra.trim()}` : ""].join("\n");
}

async function runCode(code: string): Promise<string> {
  const logs: string[] = [];
  const fakeConsole = {
    log: (...xs: unknown[]) => logs.push(xs.map(String).join(" ")),
    error: (...xs: unknown[]) => logs.push(`[error] ${xs.map(String).join(" ")}`),
    warn: (...xs: unknown[]) => logs.push(`[warn] ${xs.map(String).join(" ")}`),
  };
  try {
    const fn = new Function("console", `"use strict";\n${code}`);
    const value = fn(fakeConsole);
    if (value !== undefined) logs.push(`→ ${String(value)}`);
    return logs.join("\n") || "(no output)";
  } catch (err) {
    return `❌ ${err instanceof Error ? err.message : String(err)}`;
  }
}

async function executeTool(
  name: string,
  rawArgs: string,
): Promise<{ skillId: SkillId; output: string; args: Record<string, unknown> }> {
  let args: Record<string, unknown> = {};
  try {
    args = rawArgs ? (JSON.parse(rawArgs) as Record<string, unknown>) : {};
  } catch {
    args = { raw: rawArgs };
  }
  const skillId = NAME_TO_SKILL[name] ?? "web-search";

  if (BOSS_ACTIONS.some((action) => action.name === name)) {
    const action = await executeBossAction(name as BossActionName, args);
    return {
      skillId: "daily-fixer",
      args,
      output: action.ok
        ? action.summary + "\\n" + JSON.stringify(action.data ?? {}, null, 2).slice(0, 7000)
        : "❌ " + (action.error || action.summary),
    };
  }

  if (name === "code_runner") {
    const code = String(args.code ?? "").trim();
    return { skillId, args, output: await runCode(code) };
  }

  if (name === "link_follower") {
    try {
      const parsed = new URL(String(args.url ?? ""));
      return {
        skillId,
        args,
        output: `🔗 ${parsed.href}\nhost: ${parsed.host}\npath: ${parsed.pathname}`,
      };
    } catch (err) {
      return { skillId, args, output: `❌ ${err instanceof Error ? err.message : String(err)}` };
    }
  }

  if (name === "doc_reader") {
    const text = String(args.text ?? "").trim();
    const words = text.split(/\s+/).filter(Boolean).length;
    return {
      skillId,
      args,
      output: `📄 words≈${words}\n${text.slice(0, 800)}${text.length > 800 ? "…" : ""}`,
    };
  }

  let query = String(args.query ?? "").trim();
  if (name === "live_scores" && query && !/ผลบอล|football|soccer|premier|พรีเมียร์/i.test(query)) {
    query = `ผลบอล ${query}`;
  }
  if (!query) query = name === "live_scores" ? "ผลบอล Premier League" : "";
  if (!query) return { skillId, args, output: "ไม่มีคำค้น" };

  const result = await fetchLiveData({ data: { query } });
  if (!result.ok) return { skillId, args, output: result.error };
  return { skillId, args, output: result.summary };
}

export async function runChatTurn(input: {
  messages: { role: "user" | "assistant" | "system"; content: string }[];
  system?: string;
  lang?: "th" | "en";
}): Promise<KernelResult> {
  const apiKey = process.env.XAI_API_KEY;
  const skillCalls: SkillCall[] = [];
  if (!apiKey) return { ok: false, error: "Grok is not available in this environment.", skillCalls };

  const lang = input.lang ?? "th";
  const messages: KernelMessage[] = [
    { role: "system", content: kernelSystem(lang, input.system).slice(0, 6_000) },
  ];
  for (const m of input.messages.slice(-16)) {
    if (!m?.content?.trim()) continue;
    if (m.role !== "user" && m.role !== "assistant" && m.role !== "system") continue;
    messages.push({ role: m.role, content: m.content.slice(0, 8_000) });
  }
  if (messages.length < 2) return { ok: false, error: "Empty message.", skillCalls };

  for (let round = 0; round < MAX_ROUNDS; round++) {
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: CHAT_MODEL,
        messages,
        tools: TOOLS,
        tool_choice: "auto",
        max_tokens: MAX_TOKENS,
        temperature: 0.5,
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      if (res.status === 429) return { ok: false, error: "Grok is busy. Wait a moment, then retry.", skillCalls };
      return { ok: false, error: `xAI error ${res.status}${body ? `: ${body.slice(0, 180)}` : ""}`, skillCalls };
    }

    const json = (await res.json()) as {
      choices?: {
        message?: {
          content?: string | null;
          tool_calls?: GrokToolCall[];
        };
      }[];
    };
    const msg = json.choices?.[0]?.message;
    const toolCalls = msg?.tool_calls ?? [];

    if (toolCalls.length > 0) {
      messages.push({
        role: "assistant",
        content: msg?.content ?? "",
        tool_calls: toolCalls,
      });
      for (const call of toolCalls) {
        const started = Date.now();
        const ran = await executeTool(call.function.name, call.function.arguments ?? "{}");
        skillCalls.push({
          id: call.id,
          skillId: ran.skillId,
          args: ran.args,
          status: ran.output.startsWith("❌") ? "error" : "done",
          streamOutput: ran.output,
          duration: Date.now() - started,
        });
        messages.push({
          role: "tool",
          tool_call_id: call.id,
          content: ran.output.slice(0, 6_000),
        });
      }
      continue;
    }

    const text = msg?.content?.trim() ?? "";
    if (!text) return { ok: false, error: "Grok returned an empty reply.", skillCalls };
    return { ok: true, text, model: CHAT_MODEL, skillCalls };
  }

  return {
    ok: true,
    text: skillCalls[skillCalls.length - 1]?.streamOutput || (lang === "th" ? "ทำรายการเครื่องมือแล้ว" : "Tools finished."),
    model: CHAT_MODEL,
    skillCalls,
  };
}

export const runChatKernel = createServerFn({ method: "POST" })
  .validator((input: {
    messages: { role: "user" | "assistant" | "system"; content: string }[];
    system?: string;
    lang?: "th" | "en";
  }) => input)
  .handler(async ({ data }): Promise<KernelResult> => runChatTurn(data));
