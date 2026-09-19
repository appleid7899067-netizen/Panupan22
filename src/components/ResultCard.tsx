import { CheckCircle2, Clock3, Copy, Download, Sparkles } from "lucide-react";
import { useState } from "react";

type ResultCardProps = {
  text: string;
  model?: string;
  durationMs?: number;
  skill?: string;
};

function estimateTokens(text: string) {
  return Math.max(1, Math.ceil(text.length / 4));
}

export function ResultCard({ text, model, durationMs, skill }: ResultCardProps) {
  const [copied, setCopied] = useState(false);
  const tokens = estimateTokens(text);

  async function copyResult() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  function downloadResult() {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "bossnugrok-result.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="mt-3 overflow-hidden rounded-2xl border border-primary/20 bg-primary/[0.04]" aria-label="BossnuGrok result">
      <div className="flex items-center justify-between gap-3 border-b border-border/70 px-3 py-2.5">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-lg bg-primary/10 text-primary">
            <Sparkles className="size-3.5" />
          </span>
          <div>
            <p className="text-xs font-semibold">Result</p>
            <p className="text-[10px] text-subtle">BossnuGrok verified response</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background/60 px-2 py-1 text-[10px] text-subtle">
          <CheckCircle2 className="size-3" /> Ready
        </span>
      </div>
      <div className="grid grid-cols-2 gap-px bg-border/70 sm:grid-cols-4">
        <div className="bg-card/80 px-3 py-2">
          <p className="text-[10px] text-subtle">Model</p>
          <p className="mt-0.5 truncate text-xs font-medium">{model ?? "Auto"}</p>
        </div>
        <div className="bg-card/80 px-3 py-2">
          <p className="text-[10px] text-subtle">Tokens≈</p>
          <p className="mt-0.5 text-xs font-medium">{tokens.toLocaleString()}</p>
        </div>
        <div className="bg-card/80 px-3 py-2">
          <p className="text-[10px] text-subtle">Time</p>
          <p className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium"><Clock3 className="size-3" /> {durationMs ? `${durationMs}ms` : "live"}</p>
        </div>
        <div className="bg-card/80 px-3 py-2">
          <p className="text-[10px] text-subtle">Skill</p>
          <p className="mt-0.5 truncate text-xs font-medium">{skill ?? "chat"}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 px-3 py-2.5">
        <button type="button" onClick={() => void copyResult()} className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-[11px] transition hover:bg-secondary">
          <Copy className="size-3" /> {copied ? "Copied" : "Copy"}
        </button>
        <button type="button" onClick={downloadResult} className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-[11px] transition hover:bg-secondary">
          <Download className="size-3" /> Download
        </button>
      </div>
    </section>
  );
}
