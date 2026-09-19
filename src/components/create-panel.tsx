import { useState, type FormEvent } from "react";
import { ImagePlus, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COPY } from "@/lib/copy";
import { loadPuter, puterErrorMessage } from "@/lib/puter";
import { useBossStore } from "@/lib/store";
import { uid } from "@/lib/utils";

const RATIO: Record<string, { w: number; h: number }> = {
  "16:9": { w: 16, h: 9 }, "9:16": { w: 9, h: 16 }, "1:1": { w: 1, h: 1 },
  "4:3": { w: 4, h: 3 }, "3:4": { w: 3, h: 4 },
};

export function CreatePanel() {
  const language = useBossStore((s) => s.language);
  const t = COPY[language];
  const creates = useBossStore((s) => s.creates);
  const addCreate = useBossStore((s) => s.addCreate);
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [provider, setProvider] = useState("openai-image-generation");
  const [model, setModel] = useState("gpt-image-1-mini");
  const [quality, setQuality] = useState("low");
  const [style, setStyle] = useState("cinematic noir");
  const [ratio, setRatio] = useState("16:9");
  const presets = ["BossG command center", "cyberpunk city at night", "minimal product hero"];

  const selectProvider = (next: string) => {
    setProvider(next);
    if (next === "gemini") { setModel("gemini-3.1-flash-image-preview"); setQuality("1K"); }
    else if (next === "xai") { setModel("grok-imagine-image"); setQuality("1k"); }
    else if (next === "together") { setModel("black-forest-labs/FLUX.1-schnell"); setQuality("low"); }
    else if (next === "replicate-image-generation") { setModel("black-forest-labs/flux-schnell"); setQuality("low"); }
    else { setModel("gpt-image-1-mini"); setQuality("low"); }
  };

  const generate = async (e?: FormEvent) => {
    e?.preventDefault();
    const trimmed = prompt.trim();
    if (trimmed.length < 3 || busy) return;
    setBusy(true); setError(null);
    try {
      const puter = window.puter ?? (await loadPuter());
      if (!puter.ai?.txt2img) throw new Error("Puter image generation is not available yet.");
      const image = await puter.ai.txt2img(
        `${trimmed}, ${style}, ${ratio} composition`,
        { provider, model, quality, ratio: RATIO[ratio] ?? RATIO["16:9"], test_mode: false },
      );
      if (!image?.src) throw new Error("Puter returned no image.");
      addCreate({ id: uid("img"), prompt: `${trimmed}, ${style}, ${ratio}`, url: image.src, createdAt: Date.now() });
      setPrompt("");
    } catch (err) {
      setError(puterErrorMessage(err));
    } finally { setBusy(false); }
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="border-b border-border px-4 py-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.18em] text-subtle">{t.modeCreate}</p>
        <h2 className="mt-1 font-display text-2xl tracking-tight">{t.createTitle}</h2>
        <p className="mt-1 text-sm text-muted-foreground">สร้างภาพด้วยผู้ให้บริการที่รองรับผ่าน Puter — ใช้บัญชี/เครดิตของคุณเอง</p>
      </div>
      <form onSubmit={generate} className="border-b border-border px-4 py-4 sm:px-6">
        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder={t.createPh} rows={3}
          className="w-full rounded-[var(--radius-lg)] border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-subtle outline-none focus-visible:ring-2 focus-visible:ring-ring/60" />
        <div className="mt-3 flex flex-wrap gap-2">
          {presets.map((preset) => <button key={preset} type="button" onClick={() => setPrompt(preset)} className="rounded-full border border-border px-3 py-1.5 text-[11px] text-muted-foreground hover:bg-secondary">{preset}</button>)}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <select value={provider} onChange={(e) => selectProvider(e.target.value)} className="h-10 rounded-[var(--radius-md)] border border-border bg-card px-3 text-xs outline-none">
            <option value="openai-image-generation">OpenAI Image</option>
            <option value="gemini">Gemini Image</option>
            <option value="xai">Grok Image</option>
            <option value="together">Together Image</option>
            <option value="replicate-image-generation">Replicate</option>
          </select>
          <select value={model} onChange={(e) => setModel(e.target.value)} className="h-10 rounded-[var(--radius-md)] border border-border bg-card px-3 text-xs outline-none">
            {provider === "openai-image-generation" && <><option value="gpt-image-1-mini">GPT Image 1 Mini</option><option value="gpt-image-1">GPT Image 1</option><option value="gpt-image-2">GPT Image 2</option></>}
            {provider === "gemini" && <><option value="gemini-3.1-flash-image-preview">Gemini 3.1 Flash Image</option><option value="gemini-3-pro-image-preview">Gemini 3 Pro Image</option></>}
            {provider === "xai" && <><option value="grok-imagine-image">Grok Imagine</option><option value="grok-imagine-image-quality">Grok Imagine Quality</option></>}
            {provider === "together" && <option value="black-forest-labs/FLUX.1-schnell">FLUX.1 Schnell</option>}
            {provider === "replicate-image-generation" && <option value="black-forest-labs/flux-schnell">FLUX Schnell</option>}
          </select>
          <select value={quality} onChange={(e) => setQuality(e.target.value)} className="h-10 rounded-[var(--radius-md)] border border-border bg-card px-3 text-xs outline-none">
            {provider === "gemini" ? <><option>512</option><option>1K</option><option>2K</option><option>4K</option></> : provider === "xai" ? <><option>1k</option><option>2k</option></> : <><option>low</option><option>medium</option><option>high</option></>}
          </select>
          <select value={style} onChange={(e) => setStyle(e.target.value)} className="h-10 rounded-[var(--radius-md)] border border-border bg-card px-3 text-xs outline-none">
            <option>cinematic noir</option><option>editorial studio</option><option>3D soft light</option><option>anime key visual</option>
          </select>
          <select value={ratio} onChange={(e) => setRatio(e.target.value)} className="h-10 rounded-[var(--radius-md)] border border-border bg-card px-3 text-xs outline-none">
            <option>16:9</option><option>9:16</option><option>1:1</option><option>4:3</option><option>3:4</option>
          </select>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <Button type="submit" className="h-11 rounded-[var(--radius-lg)] px-5" disabled={busy || prompt.trim().length < 3}>
            {busy ? <LoaderCircle className="size-4 animate-spin" /> : <ImagePlus className="size-4" />}
            {busy ? t.creating : t.createCta}
          </Button>
          {error ? <p className="text-xs text-destructive">{error}</p> : null}
        </div>
      </form>
      <div className="boss-scroll flex-1 overflow-y-auto px-4 py-4 sm:px-6">
        {creates.length === 0 ? <p className="py-10 text-center text-sm text-subtle">{t.createEmpty}</p> : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {creates.map((item) => <figure key={item.id} className="overflow-hidden rounded-[var(--radius-xl)] border border-border bg-card">
              <img src={item.url} alt={item.prompt} className="aspect-[16/10] w-full object-cover" crossOrigin="anonymous" />
              <figcaption className="px-3 py-2 text-xs leading-relaxed text-muted-foreground">{item.prompt}</figcaption>
            </figure>)}
          </div>
        )}
      </div>
    </div>
  );
}
