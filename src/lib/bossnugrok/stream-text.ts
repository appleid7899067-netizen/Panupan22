/**
 * Normalized text streaming helpers.
 *
 * Default UI cadence: 20ms per 2-character chunk.
 * This is presentation streaming; it does not replace provider-side streaming.
 */
export interface StreamOptions {
  delay?: number;
  chunkSize?: number;
  onChunk?: (chunk: string) => void;
  onDone?: () => void;
  signal?: AbortSignal;
}

export const STREAM_DEFAULTS = {
  delay: 20,
  chunkSize: 2,
} as const;

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function streamText(
  text: string,
  options: StreamOptions = {},
): Promise<void> {
  const {
    delay = STREAM_DEFAULTS.delay,
    chunkSize = STREAM_DEFAULTS.chunkSize,
    onChunk,
    onDone,
    signal,
  } = options;

  if (chunkSize <= 0) throw new Error("chunkSize must be greater than 0");
  if (delay < 0) throw new Error("delay must not be negative");

  for (let i = 0; i < text.length; i += chunkSize) {
    if (signal?.aborted) return;
    onChunk?.(text.slice(i, i + chunkSize));
    if (i + chunkSize < text.length) await wait(delay);
  }

  onDone?.();
}

/**
 * Stream from Puter when the provider exposes an async iterator.
 * Falls back to presentation streaming for non-streaming responses.
 */
export async function streamFromAI(
  prompt: string,
  options: StreamOptions & { model?: string } = {},
): Promise<void> {
  if (typeof window === "undefined") {
    throw new Error("Puter AI streaming is browser-only");
  }

  const puter = (window as Window & { puter?: any }).puter;
  if (!puter?.ai?.chat) throw new Error("Puter.js ยังไม่โหลด");

  const { model = "qwen3.5", onChunk, onDone, signal } = options;
  const response = await puter.ai.chat(prompt, { model, stream: true });

  if (response && typeof response[Symbol.asyncIterator] === "function") {
    for await (const part of response as AsyncIterable<any>) {
      if (signal?.aborted) return;
      const text = part?.text ?? part?.message?.content ?? "";
      if (text) onChunk?.(String(text));
    }
    onDone?.();
    return;
  }

  const text = String(response?.message?.content ?? response ?? "");
  await streamText(text, { ...options, onChunk, onDone });
}

export function createStreamController() {
  const controller = new AbortController();
  return {
    signal: controller.signal,
    abort: () => controller.abort(),
  };
}
