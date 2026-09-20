import { useEffect, useState } from "react";
import { KeyRound, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  clearOpenRouterKey,
  connectOpenRouterKey,
  getOpenRouterKey,
  OPENROUTER_KEY_EVENT,
} from "@/lib/openrouter-keys";
import { useBossStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function OpenRouterKeyBar({ className }: { className?: string }) {
  const language = useBossStore((s) => s.language);
  const [value, setValue] = useState("");
  const [status, setStatus] = useState(() => (getOpenRouterKey() ? "OpenRouter connected" : ""));
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const sync = () => setStatus(getOpenRouterKey() ? "OpenRouter connected" : "");
    window.addEventListener(OPENROUTER_KEY_EVENT, sync);
    return () => window.removeEventListener(OPENROUTER_KEY_EVENT, sync);
  }, []);

  async function connect() {
    const key = value.trim();
    if (!key) return;
    setBusy(true);
    try {
      const result = await connectOpenRouterKey(key);
      setStatus(`OpenRouter · ${result.models.length} models`);
      setValue("");
      toast.success(
        language === "th"
          ? "เชื่อม OpenRouter แล้ว — แชทได้โดยไม่ต้องล็อกอิน Puter"
          : "OpenRouter connected — chat without Puter login",
      );
    } catch (error) {
      setStatus("");
      toast.error(error instanceof Error ? error.message : "Key check failed");
    } finally {
      setBusy(false);
    }
  }

  function disconnect() {
    clearOpenRouterKey();
    setStatus("");
    setValue("");
    toast.success(language === "th" ? "ถอด OpenRouter key แล้ว" : "OpenRouter key removed");
  }

  return (
    <div
      className={cn(
        "flex w-full flex-wrap items-center gap-2 rounded-xl border border-border bg-card/80 px-2 py-1.5",
        className,
      )}
    >
      <KeyRound className="size-3.5 shrink-0 text-cyan-300" />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") void connect();
        }}
        type="password"
        autoComplete="off"
        placeholder={language === "th" ? "OpenRouter key (sk-or-...)" : "OpenRouter key (sk-or-...)"}
        className="h-8 min-w-[12rem] flex-1 border-0 bg-transparent px-1 text-xs shadow-none focus-visible:ring-0"
      />
      <Button size="sm" className="h-8 text-xs" onClick={() => void connect()} disabled={busy || !value.trim()}>
        {busy ? <Loader2 className="mr-1 size-3 animate-spin" /> : null}
        {language === "th" ? "ตรวจคีย์" : "Connect"}
      </Button>
      {status ? (
        <>
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
            {status}
          </span>
          <Button size="icon" variant="ghost" className="size-7" onClick={disconnect} aria-label="Disconnect">
            <X className="size-3.5" />
          </Button>
        </>
      ) : null}
    </div>
  );
}
