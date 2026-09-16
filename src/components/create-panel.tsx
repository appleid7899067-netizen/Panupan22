import { useState, type FormEvent } from "react";
import { ImagePlus, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COPY } from "@/lib/copy";
import { imagineGrok } from "@/lib/grok";
import { useBossStore } from "@/lib/store";
import { uid } from "@/lib/utils";

export function CreatePanel() {
  const language = useBossStore((s) => s.language);
  const t = COPY[language];
  const creates = useBossStore((s) => s.creates);
  const addCreate = useBossStore((s) => s.addCreate);
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async (e?: FormEvent) => {
    e?.preventDefault();
    const trimmed = prompt.trim();
    if (trimmed.length < 3 || busy) return;
    setBusy(true);
    setError(null);
    try {
      const result = await imagineGrok({ data: { prompt: trimmed } });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      addCreate({ id: uid("img"), prompt: trimmed, url: result.url, createdAt: Date.now() });
      setPrompt("");
    } catch (err) {
      setError(err instanceof Error ? err.message : t.noModels);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="border-b border-border px-4 py-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.18em] text-subtle">{t.modeCreate}</p>
        <h2 className="mt-1 font-display text-2xl tracking-tight">{t.createTitle}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{t.createLead}</p>
      </div>
      <form onSubmit={generate} className="border-b border-border px-4 py-4 sm:px-6">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={t.createPh}
          rows={3}
          className="w-full rounded-[var(--radius-lg)] border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-subtle outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
        />
        <div className="mt-3 flex items-center gap-3">
          <Button type="submit" className="h-11 rounded-[var(--radius-lg)] px-5" disabled={busy || prompt.trim().length < 3}>
            {busy ? <LoaderCircle className="size-4 animate-spin" /> : <ImagePlus className="size-4" />}
            {busy ? t.creating : t.createCta}
          </Button>
          {error ? <p className="text-xs text-destructive">{error}</p> : null}
        </div>
      </form>
      <div className="boss-scroll flex-1 overflow-y-auto px-4 py-4 sm:px-6">
        {creates.length === 0 ? (
          <p className="py-10 text-center text-sm text-subtle">{t.createEmpty}</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {creates.map((item) => (
              <figure key={item.id} className="overflow-hidden rounded-[var(--radius-xl)] border border-border bg-card">
                <img
                  src={item.url}
                  alt={item.prompt}
                  className="aspect-[16/10] w-full object-cover"
                  crossOrigin="anonymous"
                />
                <figcaption className="px-3 py-2 text-xs leading-relaxed text-muted-foreground">{item.prompt}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
