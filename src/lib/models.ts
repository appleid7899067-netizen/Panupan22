export type FreeModel = {
  id: string;
  label: string;
  vendor: string;
  via?: "xai" | "puter";
};

export const GROK_MODEL: FreeModel = {
  id: "grok-4.5",
  label: "Grok 4.5",
  vendor: "xAI",
  via: "xai",
};

/** Always available via server (xAI key). */
export const XAI_MODELS: FreeModel[] = [
  GROK_MODEL,
  { id: "grok-4", label: "Grok 4", vendor: "xAI", via: "xai" },
  { id: "grok-3", label: "Grok 3", vendor: "xAI", via: "xai" },
  { id: "grok-3-mini", label: "Grok 3 Mini", vendor: "xAI", via: "xai" },
  { id: "grok-2", label: "Grok 2", vendor: "xAI", via: "xai" },
];

/** Fast / lite models Puter can serve without a developer API key. */
export const FREE_MODELS: FreeModel[] = [
  { id: "gemini-2.5-flash", label: "Gemini 2.5 Flash", vendor: "Google", via: "puter" },
  { id: "gemini-2.0-flash", label: "Gemini 2.0 Flash", vendor: "Google", via: "puter" },
  { id: "gemini-3.8-flash", label: "Gemini 3.8 Flash", vendor: "Google", via: "puter" },
  { id: "gemini-3.5-flash-lite", label: "Gemini 3.5 Lite", vendor: "Google", via: "puter" },
  { id: "gpt-4o-mini", label: "GPT-4o Mini", vendor: "OpenAI", via: "puter" },
  { id: "gpt-4.1-nano", label: "GPT-4.1 Nano", vendor: "OpenAI", via: "puter" },
  { id: "gpt-5-nano", label: "GPT-5 Nano", vendor: "OpenAI", via: "puter" },
  { id: "gpt-5.4-nano", label: "GPT-5.4 Nano", vendor: "OpenAI", via: "puter" },
  { id: "o4-mini", label: "o4 Mini", vendor: "OpenAI", via: "puter" },
  { id: "qwen/qwen3-flash", label: "Qwen 3 Flash", vendor: "Alibaba", via: "puter" },
  { id: "qwen/qwen3.8-flash", label: "Qwen 3.8 Flash", vendor: "Alibaba", via: "puter" },
  { id: "deepseek/deepseek-chat", label: "DeepSeek Chat", vendor: "DeepSeek", via: "puter" },
  { id: "deepseek/deepseek-v4.1-flash", label: "DeepSeek V4.1 Flash", vendor: "DeepSeek", via: "puter" },
  { id: "meta-llama/llama-3.3-70b", label: "Llama 3.3 70B", vendor: "Meta", via: "puter" },
  { id: "meta-llama/llama-4-scout", label: "Llama 4 Scout", vendor: "Meta", via: "puter" },
  { id: "mistral/mistral-small", label: "Mistral Small", vendor: "Mistral", via: "puter" },
  { id: "mistral/mistral-large", label: "Mistral Large", vendor: "Mistral", via: "puter" },
];

export const PIN_MODELS: FreeModel[] = [
  { id: "claude-haiku-4-5", label: "Claude Haiku 4.5", vendor: "Anthropic", via: "puter" },
  { id: "claude-sonnet-4-5", label: "Claude Sonnet 4.5", vendor: "Anthropic", via: "puter" },
  { id: "claude-sonnet-4-6", label: "Claude Sonnet 4.6", vendor: "Anthropic", via: "puter" },
  { id: "claude-opus-4", label: "Claude Opus 4", vendor: "Anthropic", via: "puter" },
  { id: "gemini-2.5-pro", label: "Gemini 2.5 Pro", vendor: "Google", via: "puter" },
  { id: "gemini-3.5-flash", label: "Gemini 3.5 Flash", vendor: "Google", via: "puter" },
  { id: "gpt-4o", label: "GPT-4o", vendor: "OpenAI", via: "puter" },
  { id: "gpt-4.1", label: "GPT-4.1", vendor: "OpenAI", via: "puter" },
  { id: "o3", label: "o3", vendor: "OpenAI", via: "puter" },
  { id: "moonshotai/kimi-k2", label: "Kimi K2", vendor: "Moonshot", via: "puter" },
  { id: "moonshotai/kimi-k3", label: "Kimi K3", vendor: "Moonshot", via: "puter" },
  { id: "minimax/minimax-m2", label: "MiniMax M2", vendor: "MiniMax", via: "puter" },
  { id: "minimax/minimax-m3", label: "MiniMax M3", vendor: "MiniMax", via: "puter" },
  { id: "x-ai/grok-2", label: "Grok 2 (Puter)", vendor: "xAI", via: "puter" },
  { id: "x-ai/grok-3", label: "Grok 3 (Puter)", vendor: "xAI", via: "puter" },
];

export function allKnownModels(): FreeModel[] {
  const seen = new Set<string>();
  const out: FreeModel[] = [];
  for (const m of [...XAI_MODELS, ...FREE_MODELS, ...PIN_MODELS]) {
    if (seen.has(m.id)) continue;
    seen.add(m.id);
    out.push(m);
  }
  return out;
}

export function isXaiModel(id: string | null | undefined): boolean {
  if (!id || id === "auto") return false;
  const known = modelById(id);
  if (known) return known.via === "xai";
  return id.startsWith("grok") && !id.includes("/");
}

export function modelById(id: string | null | undefined): FreeModel | undefined {
  if (!id) return undefined;
  return allKnownModels().find((m) => m.id === id);
}

export function shortModelLabel(id: string | null | undefined): string {
  if (!id || id === "auto") return "Grok 4.5";
  return modelById(id)?.label ?? id;
}

export function prettyModelId(id: string): FreeModel {
  const known = modelById(id);
  if (known) return known;
  const parts = id.split("/");
  const leaf = parts[parts.length - 1] ?? id;
  const vendor = parts.length > 1 ? parts[0] : "Puter";
  const label = leaf.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return { id, label, vendor, via: "puter" };
}

export function parsePuterModels(raw: unknown): FreeModel[] {
  if (!Array.isArray(raw)) return [];
  const out: FreeModel[] = [];
  const seen = new Set<string>();
  for (const item of raw) {
    if (typeof item === "string" && item.trim()) {
      const m = prettyModelId(item.trim());
      if (seen.has(m.id)) continue;
      seen.add(m.id);
      out.push(m);
      continue;
    }
    if (item && typeof item === "object") {
      const rec = item as Record<string, unknown>;
      const id = String(rec.id ?? rec.model ?? rec.name ?? "").trim();
      if (!id || seen.has(id)) continue;
      seen.add(id);
      const vendor = String(rec.vendor ?? rec.provider ?? rec.owned_by ?? "Puter");
      const label = String(rec.label ?? rec.display_name ?? prettyModelId(id).label);
      out.push({ id, label, vendor, via: "puter" });
    }
  }
  return out;
}
