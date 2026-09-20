/** OpenRouter session key — browser only, never sent to Puter. */

export type OpenRouterModel = {
  id: string;
  name?: string;
};

export const OPENROUTER_KEY_EVENT = "bossnugrok:openrouter-key-changed";

let memoryKey: string | null = null;

function sessionGet() {
  try {
    return sessionStorage.getItem("bossnugrok.openrouter.apiKey");
  } catch {
    return null;
  }
}

function sessionSet(value: string | null) {
  try {
    if (value) sessionStorage.setItem("bossnugrok.openrouter.apiKey", value);
    else sessionStorage.removeItem("bossnugrok.openrouter.apiKey");
  } catch {
    /* private mode */
  }
}

function notify() {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(new Event(OPENROUTER_KEY_EVENT));
  } catch {
    /* ignore */
  }
}

export function getOpenRouterKey(): string | null {
  return memoryKey ?? sessionGet();
}

export function hasOpenRouterKey(): boolean {
  return Boolean(getOpenRouterKey());
}

export function clearOpenRouterKey() {
  memoryKey = null;
  sessionSet(null);
  notify();
}

export function isOpenRouterKeyShape(key: string): boolean {
  return /^sk-or-/i.test(key.trim());
}

/** Map app model ids to OpenRouter catalog ids when possible. */
export function toOpenRouterModelId(appModelId: string | null | undefined): string {
  const id = (appModelId || "").trim();
  if (!id || id === "auto") return "openai/gpt-4o-mini";
  if (id.includes("/")) return id;
  const map: Record<string, string> = {
    "gpt-4o-mini": "openai/gpt-4o-mini",
    "gpt-4o": "openai/gpt-4o",
    "gpt-4.1-nano": "openai/gpt-4.1-nano",
    "o4-mini": "openai/o4-mini",
    "gemini-2.5-flash": "google/gemini-2.5-flash",
    "gemini-2.0-flash": "google/gemini-2.0-flash",
    "claude-haiku-4-5": "anthropic/claude-haiku-4.5",
    "claude-sonnet-4-5": "anthropic/claude-sonnet-4.5",
    "claude-sonnet-4-6": "anthropic/claude-sonnet-4.6",
    "deepseek/deepseek-chat": "deepseek/deepseek-chat",
  };
  if (map[id]) return map[id];
  if (id.startsWith("grok")) return "x-ai/grok-3-mini";
  return id.includes("/") ? id : `openai/${id}`;
}

export async function verifyOpenRouterKey(
  key: string,
): Promise<{ ok: true; models: OpenRouterModel[] } | { ok: false; error: string }> {
  const response = await fetch("https://openrouter.ai/api/v1/models", {
    headers: { Authorization: `Bearer ${key.trim()}` },
  });
  if (!response.ok) {
    const body = await response.text().catch(() => "");
    return {
      ok: false,
      error: `OpenRouter ปฏิเสธคีย์ (${response.status})${body ? `: ${body.slice(0, 160)}` : ""}`,
    };
  }
  const data = (await response.json()) as { data?: OpenRouterModel[] };
  const models = Array.isArray(data.data)
    ? data.data.filter((m) => !/image|audio|video|embedding|rerank|transcription/i.test(m.id))
    : [];
  return { ok: true, models };
}

export async function connectOpenRouterKey(
  key: string,
): Promise<{ models: OpenRouterModel[] }> {
  const value = key.trim();
  if (!value) throw new Error("API key is empty.");
  if (!isOpenRouterKeyShape(value)) throw new Error("ต้องใช้ OpenRouter API key ที่ขึ้นต้นด้วย sk-or-");
  const verified = await verifyOpenRouterKey(value);
  if (!verified.ok) throw new Error(verified.error);
  if (!verified.models.length) throw new Error("คีย์ผ่าน แต่ยังไม่มีโมเดลข้อความที่เรียกได้");
  memoryKey = value;
  sessionSet(value);
  notify();
  return { models: verified.models };
}

export async function callOpenRouter(opts: {
  messages: Array<{ role: "system" | "user" | "assistant"; content: string }>;
  model: string;
  onDelta?: (full: string) => void;
}): Promise<{ ok: true; text: string; model: string } | { ok: false; error: string }> {
  const key = getOpenRouterKey();
  if (!key) return { ok: false, error: "ยังไม่ได้เชื่อม OpenRouter API key" };

  const model = toOpenRouterModelId(opts.model);
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      "HTTP-Referer": typeof location !== "undefined" ? location.origin : "https://panupan22.vercel.app",
      "X-Title": "BossnuGrok",
    },
    body: JSON.stringify({
      model,
      messages: opts.messages,
      stream: true,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    return { ok: false, error: `OpenRouter error ${response.status}: ${body.slice(0, 400)}` };
  }
  if (!response.body) return { ok: false, error: "OpenRouter returned no stream" };

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let full = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const raw of lines) {
      const line = raw.trim();
      if (!line.startsWith("data:")) continue;
      const payload = line.slice(5).trim();
      if (!payload || payload === "[DONE]") continue;
      try {
        const data = JSON.parse(payload) as {
          choices?: Array<{ delta?: { content?: string } }>;
        };
        const piece = data.choices?.[0]?.delta?.content ?? "";
        if (piece) {
          full += piece;
          opts.onDelta?.(full);
        }
      } catch {
        /* ignore partial JSON */
      }
    }
  }

  if (!full.trim()) return { ok: false, error: "OpenRouter returned an empty response" };
  return { ok: true, text: full, model };
}
