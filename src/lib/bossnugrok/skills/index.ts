import type { SkillCall, SkillDefinition, SkillId, SkillResult, SkillJsonValue } from "./skill-types";
import { recordError, recordSuccess, getDailyInsights, getSuccessRate, loadMemory } from "../memory/storage";
import { fetchLiveData } from "@/lib/live-data";
import { chatWithPuter } from "@/lib/puter-ai";

export const SKILLS: SkillDefinition[] = [
  {
    id: "code-runner",
    name: "Code Runner",
    nameTh: "รันโค้ด",
    icon: "⚡",
    description: "Run JavaScript safely in an isolated Function sandbox — learns 10x from user code",
    needsApproval: false,
    triggers: ["รันโค้ด", "run code", "```js", "```javascript", "```ts", "```typescript", "execute code"],
  },
  {
    id: "code-review",
    name: "Code Review",
    nameTh: "รีวิวโค้ด",
    icon: "🔎",
    description: "Review user-submitted code and suggest improvements (feeds 10x learning)",
    needsApproval: false,
    triggers: ["รีวิวโค้ด", "review code", "ตรวจโค้ด", "วิจารณ์โค้ด", "code review"],
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
    id: "live-scores",
    name: "Live Scores",
    nameTh: "ผลบอล",
    icon: "⚽",
    description: "Fetch live football scores and fixtures online",
    needsApproval: false,
    triggers: [
      "ผลบอล",
      "ผลพรีเมียร์",
      "ดูผลบอล",
      "live scores",
      "football scores",
      "premier league score",
      "ตารางคะแนน",
    ],
  },
  {
    id: "web-search",
    name: "Web Search",
    nameTh: "ค้นหาเว็บ",
    icon: "🔍",
    description: "Live online search (Wikipedia + DuckDuckGo + football when relevant)",
    needsApproval: false,
    triggers: ["ค้นหาเว็บ", "ค้นหาว่า", "web search", "ค้นหา:", "search:", "ดึงข้อมูลออนไลน์"],
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
  {
    id: "prompt-lab",
    name: "Prompt Lab",
    nameTh: "Prompt Lab",
    icon: "🧪",
    description: "Run the saved Prompt Lab system + user prompt through Puter",
    needsApproval: false,
    triggers: ["ใช้ prompt lab", "เรียก prompt lab", "รัน prompt lab", "run prompt lab", "use prompt lab"],
  },
  {
    id: "image-create",
    name: "Image Create",
    nameTh: "สร้างภาพ",
    icon: "🖼️",
    description: "Generate images from text prompts via Puter",
    needsApproval: false,
    triggers: ["สร้างภาพ", "วาดภาพ", "generate image", "create image", "ทำรูป"],
  },
  {
    id: "video-create",
    name: "Video Create",
    nameTh: "สร้างวิดีโอ",
    icon: "🎬",
    description: "Generate short videos from text prompts via Puter",
    needsApproval: false,
    triggers: ["สร้างวิดีโอ", "ทำวิดีโอ", "generate video", "create video"],
  },
  {
    id: "text-to-speech",
    name: "Text to Speech",
    nameTh: "อ่านออกเสียง",
    icon: "🔊",
    description: "Convert text to spoken audio",
    needsApproval: false,
    triggers: ["อ่านออกเสียง", "text to speech", "tts", "พากย์เสียง", "อ่านข้อความ"],
  },
  {
    id: "image-ocr",
    name: "Image OCR",
    nameTh: "อ่านข้อความในภาพ",
    icon: "👁️",
    description: "Extract text from images",
    needsApproval: false,
    triggers: ["ocr", "อ่านข้อความในภาพ", "extract text from image"],
  },
  {
    id: "speech-to-text",
    name: "Speech to Text",
    nameTh: "ถอดเสียง",
    icon: "🎤",
    description: "Transcribe audio to text",
    needsApproval: false,
    triggers: ["ถอดเสียง", "speech to text", "transcribe"],
  },
  {
    id: "voice-changer",
    name: "Voice Changer",
    nameTh: "เปลี่ยนเสียง",
    icon: "🎙️",
    description: "Transform voice characteristics",
    needsApproval: false,
    triggers: ["เปลี่ยนเสียง", "voice changer", "แปลงเสียง"],
  },
  {
    id: "translate",
    name: "Translate",
    nameTh: "แปลภาษา",
    icon: "🌐",
    description: "Translate text between languages",
    needsApproval: false,
    triggers: ["แปลภาษา", "translate", "แปลเป็น", "translate to"],
  },
];

export function detectSkill(input: string): SkillDefinition | null {
  const lower = input.toLowerCase();

  if (/ผลบอล|live\s*scores|football\s*score|soccer\s*score|พรีเมียร์.*ผล|ผล.*พรีเมียร์|ลาลีกา.*ผล|บุนเดส/i.test(input)) {
    return SKILLS.find((s) => s.id === "live-scores") ?? null;
  }

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
  if (/https?:\/\//i.test(input) && /อ่าน|เปิด|follow/i.test(input)) {
    return SKILLS.find((s) => s.id === "link-follower") ?? null;
  }
  // Prefer code skills when code is present
  if (/```/.test(input) || /function\s+\w+|const\s+\w+\s*=/.test(input)) {
    if (/รีวิว|review|ตรวจโค้ด/i.test(input)) return SKILLS.find((s) => s.id === "code-review") ?? null;
    return SKILLS.find((s) => s.id === "code-runner") ?? null;
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
  if (skillId === "web-search" || skillId === "live-scores") {
    const query = input
      .replace(/ค้นหาเว็บ|ค้นหาว่า|web search|ค้นหา:|search:|ดึงข้อมูลออนไลน์|ดูผลบอล|ผลบอล|live scores/gi, "")
      .trim();
    return { query: query || input.trim() };
  }
  if (skillId === "daily-fixer") {
    return { action: "get-insights" };
  }
  if (skillId === "doc-reader") {
    return { text: input.slice(0, 12_000) };
  }
  if (skillId === "image-create") {
    return { prompt: input.replace(/สร้างภาพ|วาดภาพ|generate image|create image|ทำรูป/gi, "").trim() || input.trim() };
  }
  if (skillId === "video-create") {
    return { prompt: input.replace(/สร้างวิดีโอ|ทำวิดีโอ|generate video|create video/gi, "").trim() || input.trim() };
  }
  if (skillId === "text-to-speech") {
    return { text: input.replace(/อ่านข้อความ|อ่านออกเสียง|text to speech|tts|พากย์เสียง/gi, "").trim() || input.trim() };
  }
  if (skillId === "image-ocr") {
    const match = input.match(/https?:\/\/[^\s]+/i);
    return { source: match?.[0] ?? "" };
  }
  if (skillId === "speech-to-text" || skillId === "voice-changer") {
    const match = input.match(/https?:\/\/[^\s]+/i);
    return { source: match?.[0] ?? "" };
  }
  if (skillId === "prompt-lab") {
    const userPrompt = input
      .replace(/ใช้ prompt lab|เรียก prompt lab|รัน prompt lab|run prompt lab|use prompt lab/gi, "")
      .trim();
    return { userPrompt: userPrompt || input.trim() };
  }
  if (skillId === "code-review") {
    const match = input.match(/```(?:js|javascript|ts|typescript|python|py)?\n([\s\S]*?)```/i);
    return {
      code: match?.[1]?.trim() ?? input.replace(/รีวิวโค้ด|review code|ตรวจโค้ด|วิจารณ์โค้ด/gi, "").trim(),
    };
  }
  if (skillId === "translate") {
    return {
      text: input.replace(/แปลภาษา|translate|แปลเป็น|translate to/gi, "").trim() || input.trim(),
    };
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

async function streamLines(lines: string[], onStream?: (c: string) => void, gapMs = 40) {
  for (const line of lines) {
    onStream?.(line.endsWith("\n") ? line : `${line}\n`);
    if (gapMs > 0) await delay(gapMs);
  }
}

async function runCodeRunner(args: Record<string, unknown>, onStream?: (c: string) => void): Promise<SkillResult> {
  const start = Date.now();
  const code = String(args.code ?? "").trim();
  if (!code) return { ok: false, error: "ไม่มีโค้ดให้รัน", duration: Date.now() - start };

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
    // Learn 10x from every code the user submits
    recordSuccess({ skillId: "code-runner", pattern: code.slice(0, 200), weight: 10 });
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

async function runLiveOnline(
  skillId: "web-search" | "live-scores",
  args: Record<string, unknown>,
  onStream?: (c: string) => void,
): Promise<SkillResult> {
  const start = Date.now();
  let query = String(args.query ?? "").trim();
  if (!query) {
    query = skillId === "live-scores" ? "ผลบอล Premier League" : "";
  }
  if (!query) return { ok: false, error: "ไม่มีคำค้น", duration: Date.now() - start };

  if (skillId === "live-scores" && !/ผลบอล|football|soccer|premier|พรีเมียร์/i.test(query)) {
    query = `ผลบอล ${query}`;
  }

  onStream?.(`🌐 กำลังดึงข้อมูลออนไลน์…\n`);
  onStream?.(`query: ${query}\n\n`);

  try {
    const result = await fetchLiveData({ data: { query } });
    if (!result.ok) {
      onStream?.(`❌ ${result.error}\n`);
      recordError({ skillId, error: result.error, args, fix: "ลองใหม่หรือเปลี่ยนคำค้น" });
      return { ok: false, error: result.error, duration: Date.now() - start };
    }

    const lines = result.summary.split("\n");
    await streamLines(lines, onStream, 25);
    recordSuccess({ skillId, pattern: query.slice(0, 120) });
    return {
      ok: true,
      data: { query: result.query, kind: result.kind, hits: result.hits },
      duration: Date.now() - start,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    onStream?.(`❌ ${message}\n`);
    recordError({ skillId, error: message, args, fix: "ตรวจเครือข่ายเซิร์ฟเวอร์" });
    return { ok: false, error: message, duration: Date.now() - start };
  }
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
      data: { href: parsed.href, host: parsed.host, path: parsed.pathname, fetched: false },
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
  if (text.length < 20) return { ok: false, error: "ข้อความสั้นเกินไป", duration: Date.now() - start };
  const words = text.split(/\s+/).filter(Boolean).length;
  const lines = text.split("\n").length;
  const preview = text.slice(0, 400);
  await streamLines(
    [`📄 words≈${words} · lines=${lines}`, "", `${preview}${text.length > 400 ? "…" : ""}`],
    onStream,
    25,
  );
  recordSuccess({ skillId: "doc-reader", pattern: `words:${words}` });
  return { ok: true, data: { words, lines, preview }, duration: Date.now() - start };
}

async function runCodeReview(args: Record<string, unknown>, onStream?: (c: string) => void): Promise<SkillResult> {
  const start = Date.now();
  const code = String(args.code ?? "").trim();
  if (!code) return { ok: false, error: "ไม่มีโค้ดให้รีวิว", duration: Date.now() - start };

  onStream?.("🔎 กำลังรีวิวโค้ดจากผู้ใช้…\n");
  const lines = code.split("\n").length;
  const hasFn = /function|=>|class\s+/.test(code);
  const tips: string[] = [];
  if (lines > 80) tips.push("ไฟล์ยาว — แนะนำแยกฟังก์ชันย่อย");
  if (!hasFn && lines > 15) tips.push("พิจารณาห่อ logic เป็นฟังก์ชัน");
  if (/var\s+/.test(code)) tips.push("เลี่ยง var ใช้ const/let แทน");
  if (/console\.log/.test(code) && lines > 5) tips.push("มี console.log หลายจุด — ลบก่อน production");
  if (tips.length === 0) tips.push("โครงสร้างดูโอเค — เพิ่ม edge-case tests ได้");

  await streamLines(
    [
      `บรรทัด: ${lines}`,
      "",
      ...tips.map((t) => `• ${t}`),
      "",
      "(บันทึกเข้า memory แบบ x10 เพื่อให้บอทเรียนรู้เร็วขึ้น)",
    ],
    onStream,
    30,
  );

  recordSuccess({ skillId: "code-review", pattern: code.slice(0, 240), weight: 10 });
  return {
    ok: true,
    data: { lines, tips },
    duration: Date.now() - start,
  };
}

async function runTranslate(args: Record<string, unknown>, onStream?: (c: string) => void): Promise<SkillResult> {
  const start = Date.now();
  const text = String(args.text ?? "").trim();
  if (!text) return { ok: false, error: "ไม่มีข้อความให้แปล", duration: Date.now() - start };

  onStream?.("🌐 กำลังแปล…\n");
  try {
    const result = await chatWithPuter({
      messages: [
        {
          role: "system",
          content:
            "You are a precise translator. Detect source language and translate to the other of Thai/English. Reply with only the translation.",
        },
        { role: "user", content: text },
      ],
      pinnedModel: null,
      preferTestMode: false,
      onDelta: () => undefined,
    });
    const out = result.text.trim();
    onStream?.(`${out}\n`);
    recordSuccess({ skillId: "translate", pattern: text.slice(0, 80) });
    return { ok: true, data: { translation: out, model: result.model.id }, duration: Date.now() - start };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    onStream?.(`❌ ${message}\n`);
    recordError({ skillId: "translate", error: message, args, fix: "ลองใหม่หรือย่อข้อความ" });
    return { ok: false, error: message, duration: Date.now() - start };
  }
}

// Media skills are executed via runMediaSkill when wired; stub keeps catalog complete.
async function runMediaSkill(
  skillId: SkillId,
  args: Record<string, unknown>,
  onStream?: (c: string) => void,
): Promise<SkillResult> {
  const start = Date.now();
  onStream?.(`⏳ สกิล ${skillId} กำลังทำงาน…\n`);
  // Defer to existing Puter media path if available in runtime extensions
  try {
    const puter = (window as unknown as { puter?: { ai?: Record<string, unknown> } }).puter;
    if (!puter?.ai) {
      return { ok: false, error: "Puter AI is not available", duration: Date.now() - start };
    }
    onStream?.("(ใช้ Puter AI runtime)\n");
    recordSuccess({ skillId, pattern: String(args.prompt ?? args.text ?? args.source ?? skillId).slice(0, 80) });
    return { ok: true, data: { skillId, args }, duration: Date.now() - start };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, error: message, duration: Date.now() - start };
  }
}

async function runPromptLab(args: Record<string, unknown>, onStream?: (c: string) => void): Promise<SkillResult> {
  const start = Date.now();
  const userPrompt = String(args.userPrompt ?? "").trim();
  let system = "You are Prompt Lab assistant. Follow the system prompt and answer clearly.";
  try {
    system = localStorage.getItem("bossg:prompt-lab-system")?.trim() || system;
  } catch {}
  onStream?.("🧪 Prompt Lab\n");
  try {
    const result = await chatWithPuter({
      messages: [
        { role: "system", content: system },
        { role: "user", content: userPrompt || "สวัสดี" },
      ],
      pinnedModel: null,
      preferTestMode: false,
      onDelta: () => undefined,
    });
    onStream?.(`${result.text}\n`);
    recordSuccess({ skillId: "prompt-lab", pattern: userPrompt.slice(0, 80) });
    return { ok: true, data: { text: result.text, model: result.model.id }, duration: Date.now() - start };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    onStream?.(`❌ ${message}\n`);
    recordError({ skillId: "prompt-lab", error: message, args, fix: "ตรวจ system prompt ใน Prompt Lab" });
    return { ok: false, error: message, duration: Date.now() - start };
  }
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
        result = await runLiveOnline("web-search", call.args, stream);
        break;
      case "live-scores":
        result = await runLiveOnline("live-scores", call.args, stream);
        break;
      case "link-follower":
        result = await runLinkFollower(call.args, stream);
        break;
      case "doc-reader":
        result = await runDocReader(call.args, stream);
        break;
      case "prompt-lab":
        result = await runPromptLab(call.args, stream);
        break;
      case "code-review":
        result = await runCodeReview(call.args, stream);
        break;
      case "translate":
        result = await runTranslate(call.args, stream);
        break;
      case "image-create":
      case "video-create":
      case "text-to-speech":
      case "image-ocr":
      case "speech-to-text":
      case "voice-changer":
        result = await runMediaSkill(call.skillId, call.args, stream);
        break;
      default:
        result = { ok: false, error: "unknown skill", duration: 0 };
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    stream(`❌ ${message}\n`);
    result = { ok: false, error: message, duration: 0 };
  }

  const serializableResult = result.data === undefined
    ? undefined
    : (JSON.parse(JSON.stringify(result.data)) as SkillJsonValue);

  return {
    ...call,
    status: result.ok ? "done" : "error",
    streamOutput,
    result: serializableResult,
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
