import { createServerFn } from "@tanstack/react-start";

const CHAT_MODEL = "grok-4.5";
const IMAGE_MODEL = "grok-imagine-image";
const MAX_TOKENS = 1400;
const MAX_PROMPT = 8_000;

export type GrokChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type GrokChatResult =
  | { ok: true; text: string; model: string }
  | { ok: false; error: string };

export type GrokImageResult =
  | { ok: true; url: string; model: string }
  | { ok: false; error: string };

function clip(text: string, max = MAX_PROMPT) {
  if (text.length <= max) return text;
  return `${text.slice(0, max)}\n\n[truncated]`;
}

export const chatGrok = createServerFn({ method: "POST" })
  .validator((input: { messages: GrokChatMessage[]; system?: string; liveSearch?: boolean }) => input)
  .handler(async ({ data }): Promise<GrokChatResult> => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false, error: "Grok is not available in this environment." };

    const messages: GrokChatMessage[] = [];
    if (data.system?.trim()) {
      messages.push({ role: "system", content: clip(data.system, 4_000) });
    }
    for (const m of data.messages.slice(-18)) {
      if (!m?.content?.trim()) continue;
      if (m.role !== "user" && m.role !== "assistant" && m.role !== "system") continue;
      messages.push({ role: m.role, content: clip(m.content) });
    }
    if (messages.length === 0) return { ok: false, error: "Empty message." };

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: CHAT_MODEL,
        messages,
        max_tokens: MAX_TOKENS,
        temperature: 0.5,
        ...(data.liveSearch
          ? {
              search_parameters: {
                mode: "auto",
                return_citations: true,
              },
            }
          : {}),
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      if (res.status === 429) return { ok: false, error: "Grok is busy. Wait a moment, then retry." };
      return { ok: false, error: `xAI error ${res.status}${body ? `: ${body.slice(0, 180)}` : ""}` };
    }

    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = json.choices?.[0]?.message?.content?.trim() ?? "";
    if (!text) return { ok: false, error: "Grok returned an empty reply." };
    return { ok: true, text, model: CHAT_MODEL };
  });

export const imagineGrok = createServerFn({ method: "POST" })
  .validator((input: { prompt: string }) => input)
  .handler(async ({ data }): Promise<GrokImageResult> => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false, error: "Imagine is not available in this environment." };

    const prompt = data.prompt.trim().slice(0, 1_500);
    if (prompt.length < 3) return { ok: false, error: "Prompt is too short." };

    const res = await fetch("https://api.x.ai/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: IMAGE_MODEL,
        prompt,
        n: 1,
        response_format: "url",
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      if (res.status === 429) return { ok: false, error: "Imagine is busy. Wait a moment, then retry." };
      return { ok: false, error: `Imagine error ${res.status}${body ? `: ${body.slice(0, 180)}` : ""}` };
    }

    const json = (await res.json()) as { data?: { url?: string }[] };
    const url = json.data?.[0]?.url ?? "";
    if (!url) return { ok: false, error: "Imagine returned no image." };
    return { ok: true, url, model: IMAGE_MODEL };
  });
