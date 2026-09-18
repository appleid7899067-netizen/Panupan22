import { useCallback, useEffect, useState } from "react";
import { Brain, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getDailyInsights,
  getSuccessRate,
  loadMemory,
} from "@/lib/bossnugrok/memory/storage";

export function MemoryPanel() {
  const [insights, setInsights] = useState<string[]>([]);
  const [errors, setErrors] = useState(0);
  const [successes, setSuccesses] = useState(0);
  const [rate, setRate] = useState(0);

  const refresh = useCallback(() => {
    const memory = loadMemory();
    setInsights(getDailyInsights());
    setErrors(memory.errors.length);
    setSuccesses(memory.successes.length);
    setRate(getSuccessRate());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <div className="rounded-2xl border border-violet-400/25 bg-violet-400/5 p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm font-medium text-violet-300">
          <Brain className="size-4" />
          Skill Memory
        </div>
        <Button size="sm" variant="ghost" className="h-7 gap-1 text-[11px]" onClick={refresh}>
          <RefreshCw className="size-3" />
          Refresh
        </Button>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        <div className="rounded-xl border border-border bg-background/70 p-3 text-center">
          <p className="font-display text-xl text-rose-300">{errors}</p>
          <p className="text-[10px] text-subtle">errors</p>
        </div>
        <div className="rounded-xl border border-border bg-background/70 p-3 text-center">
          <p className="font-display text-xl text-lime-300">{successes}</p>
          <p className="text-[10px] text-subtle">successes</p>
        </div>
        <div className="rounded-xl border border-border bg-background/70 p-3 text-center">
          <p className="font-display text-xl text-cyan-300">{(rate * 100).toFixed(0)}%</p>
          <p className="text-[10px] text-subtle">success rate</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs font-medium text-foreground">Today</p>
        <ul className="mt-2 space-y-1.5">
          {insights.map((line, i) => (
            <li key={i} className="text-[11px] leading-relaxed text-muted-foreground">
              • {line}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
