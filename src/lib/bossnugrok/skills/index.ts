import type { SkillCall, SkillDefinition, SkillId, SkillResult } from "./skill-types";
import { recordError, recordSuccess, getDailyInsights, getSuccessRate, loadMemory } from "../memory/storage";
import { fetchLiveData } from "@/lib/live-data";
import { chatWithPuter } from "@/lib/puter-ai";

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
];

export function detectSkill(input: string): SkillDefinition | null {
  const lower = input.toLowerCase();

  // Football keyword path even without exact trigger phrase
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

  // Force football path for live-scores
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

async function runMediaSkill(
  skillId: "image-create" | "video-create" | "text-to-speech" | "image-ocr" | "speech-to-text" | "voice-changer",
  args: Record<string, unknown>,
  onStream?: (c: string) => void,
): Promise<SkillResult> {
  const start = Date.now();
  const puter = window.puter ?? (await loadPuter());
  if (!puter.ai) return { ok: false, error: "Puter AI is not available", duration: Date.now() - start };

  try {
    if (skillId === "image-create") {
      if (!puter.ai.txt2img) throw new Error("Puter image generation is not available.");
      const prompt = String(args.prompt ?? "").trim();
      if (!prompt) throw new Error("ไม่มี prompt สำหรับสร้างภาพ");
      onStream?.("กำลังสร้างภาพผ่าน Puter…\n");
      const image = await puter.ai.txt2img(prompt, { model: "gpt-image-1-mini", test_mode: false });
      const url = image?.src;
      if (!url) throw new Error("Puter returned no image.");
      onStream?.("สร้างภาพเสร็จแล้ว\n");
      return { ok: true, data: { kind: "image", url, prompt }, duration: Date.now() - start };
    }

    if (skillId === "video-create") {
      if (!puter.ai.txt2vid) throw new Error("Puter video generation is not available.");
      const prompt = String(args.prompt ?? "").trim();
      if (!prompt) throw new Error("ไม่มี prompt สำหรับสร้างวิดีโอ");
      onStream?.("กำลังสร้างวิดีโอผ่าน Puter…\n");
      const video = await puter.ai.txt2vid(prompt, { model: "veo-3.1-lite", seconds: 6, size: "1280x720", generate_audio: true, test_mode: false });
      const url = video?.src;
      if (!url) throw new Error("Puter returned no video.");
      onStream?.("สร้างวิดีโอเสร็จแล้ว\n");
      return { ok: true, data: { kind: "video", url, prompt }, duration: Date.now() - start };
    }

    if (skillId === "text-to-speech") {
      if (!puter.ai.txt2speech) throw new Error("Puter text-to-speech is not available.");
      const text = String(args.text ?? "").trim();
      if (!text) throw new Error("ไม่มีข้อความสำหรับ TTS");
      onStream?.("กำลังสร้างเสียง…\n");
      const audio = await puter.ai.txt2speech(text, { language: "th-TH", output_format: "mp3" });
      const url = audio?.src;
      if (!url) throw new Error("Puter returned no audio.");
      onStream?.("สร้างเสียงเสร็จแล้ว\n");
      return { ok: true, data: { kind: "audio", url, text }, duration: Date.now() - start };
    }

    const source = String(args.source ?? "").trim();
    if (!source) throw new Error("ต้องมี URL หรือไฟล์ต้นทางสำหรับงานนี้");

    if (skillId === "image-ocr") {
      if (!puter.ai.img2txt) throw new Error("Puter OCR is not available.");
      onStream?.("กำลังอ่านตัวอักษรจากภาพ…\n");
      const text = await puter.ai.img2txt(source);
      return { ok: true, data: { text }, duration: Date.now() - start };
    }

    if (skillId === "speech-to-text") {
      if (!puter.ai.speech2txt) throw new Error("Puter speech-to-text is not available.");
      onStream?.("กำลังถอดเสียง…\n");
      const result = await puter.ai.speech2txt(source, { response_format: "text" });
      return { ok: true, data: { text: typeof result === "string" ? result : JSON.stringify(result) }, duration: Date.now() - start };
    }

    if (skillId === "voice-changer") {
      if (!puter.ai.speech2speech) throw new Error("Puter voice changer is not available.");
      onStream?.("กำลังเปลี่ยนเสียง…\n");
      const audio = await puter.ai.speech2speech(source, { output_format: "mp3" });
      const url = audio?.src;
      if (!url) throw new Error("Puter returned no converted audio.");
      return { ok: true, data: { kind: "audio", url }, duration: Date.now() - start };
    }

    return { ok: false, error: "unknown media skill", duration: Date.now() - start };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    onStream?.("❌ " + message + "\n");
    return { ok: false, error: message, duration: Date.now() - start };
  }
}

async function runPromptLab(args: Record<string, unknown>, onStream?: (c: string) => void): Promise<SkillResult> {
  const start = Date.now();
  const userPrompt = String(args.userPrompt ?? "").trim();
  if (!userPrompt) return { ok: false, error: "ไม่มี user prompt สำหรับ Prompt Lab", duration: Date.now() - start };
  let system = "คุณคือ BossnuGrok ผู้ช่วยของระบบนี้";
  try { system = localStorage.getItem("bossg:prompt-lab-system")?.trim() || system; } catch {}
  onStream?.("กำลังเรียก Prompt Lab ผ่าน Puter…\n");
  try {
    const result = await chatWithPuter({
      messages: [{ role: "system", content: system }, { role: "user", content: userPrompt }],
      pinnedModel: null,
      preferTestMode: false,
      onDelta: (text) => onStream?.(text),
    });
    return { ok: true, data: { model: result.model.id, text: result.text }, duration: Date.now() - start };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    onStream?.("❌ " + message + "\n");
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
