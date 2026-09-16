import { FREE_MODELS, modelById, parsePuterModels, prettyModelId, type FreeModel } from "@/lib/models";
import { getPuter, loadPuter, puterErrorMessage, type PuterChatMessage } from "@/lib/puter";

const CACHE_KEY = "bossg:last-puter-model";

export function getCachedModelId(): string | null {
  try {
    return localStorage.getItem(CACHE_KEY);
  } catch {
    return null;
  }
}

export function setCachedModelId(id: string) {
  try {
    localStorage.setItem(CACHE_KEY, id);
  } catch {
    /* private mode */
  }
}

function orderedModels(preferred?: string | null): FreeModel[] {
  const list = [...FREE_MODELS];
  if (!preferred) return list;
  const known = modelById(preferred) ?? prettyModelId(preferred);
  const i = list.findIndex((m) => m.id === preferred);
  if (i === 0) return list;
  if (i > 0) {
    const [hit] = list.splice(i, 1);
    return [hit, ...list];
  }
  return [known, ...list];
}

function blockText(block: unknown): string {
  if (typeof block === "string") return block;
  if (!block || typeof block !== "object") return "";
  const rec = block as Record<string, unknown>;
  if (typeof rec.text === "string") return rec.text;
  if (typeof rec.content === "string") return rec.content;
  return "";
}

export function extractChatText(value: unknown): string {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object") return "";
  const rec = value as Record<string, unknown>;
  if (typeof rec.text === "string" && rec.text) return rec.text;
  if (typeof rec.content === "string" && rec.content) return rec.content;
  if (Array.isArray(rec.content)) return rec.content.map(blockText).join("");
  const message = rec.message;
  if (typeof message === "string") return message;
  if (message && typeof message === "object") {
    const m = message as Record<string, unknown>;
    if (typeof m.content === "string") return m.content;
    if (Array.isArray(m.content)) return m.content.map(blockText).join("");
  }
  return "";
}

function isAsyncIterable(value: unknown): value is AsyncIterable<unknown> {
  return Boolean(value && typeof value === "object" && Symbol.asyncIterator in value);
}

async function consume(result: unknown, onDelta: (text: string) => void): Promise<string> {
  if (isAsyncIterable(result)) {
    let acc = "";
    for await (const part of result) {
      let piece = "";
      if (part && typeof part === "object") {
        const rec = part as { type?: string; text?: string };
        if (rec.type === "text" && typeof rec.text === "string") piece = rec.text;
        else if (rec.type === "error") {
          throw new Error(extractChatText(part) || "Model stream error");
        } else piece = extractChatText(part);
      } else if (typeof part === "string") {
        piece = part;
      }
      if (piece) {
        acc += piece;
        onDelta(acc);
      }
    }
    return acc;
  }
  const text = extractChatText(result);
  onDelta(text);
  return text;
}

async function once(
  messages: PuterChatMessage[],
  model: string,
  testMode: boolean,
  stream: boolean,
  onDelta: (text: string) => void,
): Promise<string> {
  const puter = getPuter() ?? (await loadPuter());
  if (!puter.ai?.chat) throw new Error("Puter AI is not available yet.");
  const result = await puter.ai.chat(messages, {
    model,
    stream,
    temperature: 0.45,
    normalize: true,
    testMode,
  });
  return (await consume(result, onDelta)).trim();
}

export type ChatPuterResult = {
  text: string;
  model: FreeModel;
  testMode: boolean;
};

export async function chatWithPuter(opts: {
  messages: PuterChatMessage[];
  pinnedModel?: string | null;
  preferTestMode?: boolean;
  onDelta: (text: string) => void;
}): Promise<ChatPuterResult> {
  await loadPuter();
  const preferred = opts.pinnedModel && opts.pinnedModel !== "auto" ? opts.pinnedModel : getCachedModelId();
  const models = orderedModels(preferred);
  let lastError: unknown;
  const modes = opts.preferTestMode ? [true, false] : [false, true];

  for (const testMode of modes) {
    for (const model of models) {
      try {
        let text = "";
        try {
          text = await once(opts.messages, model.id, testMode, true, opts.onDelta);
        } catch {
          text = await once(opts.messages, model.id, testMode, false, opts.onDelta);
        }
        if (!text) throw new Error("empty");
        setCachedModelId(model.id);
        return { text, model: modelById(model.id) ?? model, testMode };
      } catch (err) {
        lastError = err;
      }
    }
  }

  throw new Error(puterErrorMessage(lastError) || "No model responded. Sign in with Puter and try again.");
}

export async function listPuterModels(): Promise<FreeModel[]> {
  try {
    const puter = getPuter() ?? (await loadPuter());
    if (!puter.ai?.listModels) return [];
    const raw = await puter.ai.listModels();
    return parsePuterModels(raw);
  } catch {
    return [];
  }
}
