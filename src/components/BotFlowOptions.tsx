import { useState } from "react";
import { GitBranch, LayoutList, Rows3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COPY } from "@/lib/copy";
import { useBossStore, type FlowOptions } from "@/lib/store";
import { cn } from "@/lib/utils";

const TOGGLES: { key: keyof Omit<FlowOptions, "layout">; th: string; en: string }[] = [
  { key: "showFlow", th: "โฟลว์", en: "Flow" },
  { key: "showTimeline", th: "ไทม์ไลน์", en: "Timeline" },
  { key: "showProgress", th: "ความคืบหน้า", en: "Progress" },
  { key: "showStatus", th: "สถานะ", en: "Status" },
  { key: "compact", th: "กะทัดรัด", en: "Compact" },
];

export function BotFlowOptions() {
  const language = useBossStore((s) => s.language);
  const options = useBossStore((s) => s.flowOptions);
  const setFlowOptions = useBossStore((s) => s.setFlowOptions);
  const [open, setOpen] = useState(false);
  const t = COPY[language];

  return (
    <div className="relative">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn("size-9", open && "bg-secondary")}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={t.flowOptions}
        title={t.flowOptions}
      >
        <GitBranch className="size-4" />
      </Button>
      {open ? (
        <div className="absolute right-0 top-[calc(100%+6px)] z-30 w-[min(92vw,18rem)] rounded-[16px] border border-border bg-card p-3 shadow-[var(--shadow-soft)]">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-subtle">{t.flowOptions}</p>
          <div className="flex flex-wrap gap-1.5">
            {TOGGLES.map((item) => {
              const on = options[item.key];
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setFlowOptions({ [item.key]: !on })}
                  className={cn(
                    "h-8 rounded-full border px-2.5 text-[11px] font-medium",
                    on
                      ? "border-border-strong bg-secondary text-foreground"
                      : "border-border text-muted-foreground",
                  )}
                >
                  {language === "th" ? item.th : item.en}
                </button>
              );
            })}
          </div>
          <div className="mt-2 flex gap-1.5">
            <button
              type="button"
              onClick={() => setFlowOptions({ layout: "stack" })}
              className={cn(
                "inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-[10px] border text-[11px]",
                options.layout === "stack"
                  ? "border-border-strong bg-secondary text-foreground"
                  : "border-border text-muted-foreground",
              )}
            >
              <LayoutList className="size-3.5" />
              {t.flowStack}
            </button>
            <button
              type="button"
              onClick={() => setFlowOptions({ layout: "rail" })}
              className={cn(
                "inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-[10px] border text-[11px]",
                options.layout === "rail"
                  ? "border-border-strong bg-secondary text-foreground"
                  : "border-border text-muted-foreground",
              )}
            >
              <Rows3 className="size-3.5" />
              {t.flowRail}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
