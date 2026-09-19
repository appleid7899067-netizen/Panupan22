import { useEffect, useMemo, useState } from "react";
import type { Lang } from "@/lib/copy";
import type { FlowStep, TimelineEvent } from "@/lib/bot-flow";

type Props = { language: Lang; steps?: FlowStep[]; events?: TimelineEvent[]; };

const activityAnimation = "@keyframes boss-activity-enter { 0% { opacity: 0; transform: translate3d(18px, 0, 0); } 100% { opacity: 1; transform: translate3d(0, 0, 0); } }";

function stepText(step: FlowStep) { return step.detail || step.label; }

export function ActivityTicker({ language, steps = [], events = [] }: Props) {
  const runningIndex = steps.findIndex((step) => step.status === "running");
  const currentIndex = runningIndex >= 0 ? runningIndex : Math.max(0, steps.length - 1);
  const current = steps[currentIndex];
  const recentEvents = events.slice(-3);

  const sequence = useMemo(() => {
    const items = steps.slice(0, currentIndex + 1)
      .filter((step) => step.status === "done" || step.status === "running")
      .map(stepText);
    for (const event of recentEvents) if (!items.includes(event.label)) items.push(event.label);
    return items.slice(-6);
  }, [steps, currentIndex, recentEvents]);

  const [visibleKey, setVisibleKey] = useState("");
  useEffect(() => {
    setVisibleKey(`${current?.id ?? "working"}:${current?.status ?? "pending"}:${current?.detail ?? ""}:${events.length}`);
  }, [current?.id, current?.status, current?.detail, events.length]);

  const fallback = language === "th" ? "กำลังทำงาน" : "Working";
  return (
    <>
      <style>{activityAnimation}</style>
      <div className="overflow-hidden py-0.5" aria-live="polite" aria-label={language === "th" ? "ขั้นตอนการทำงานของบอส" : "Boss activity"}>
        <div className="flex min-w-0 items-center gap-1 text-[13px] leading-6 text-foreground/90">
          <span className="shrink-0 text-[11px] text-muted-foreground/70">›</span>
          <div key={visibleKey} className="min-w-0 truncate font-mono tracking-tight" style={{ animation: "boss-activity-enter .32s ease-out both" }}>
            {sequence.length > 0 ? sequence.map((label, index) => (
              <span key={label + index}>
                {index > 0 ? <span className="mx-1.5 text-muted-foreground/35">&gt;&gt;&gt;</span> : null}
                <span className={index === sequence.length - 1 ? "text-foreground" : "text-muted-foreground/65"}>{label}</span>
              </span>
            )) : <span className="text-foreground">{current ? stepText(current) : fallback}</span>}
            {current?.status === "running" ? <span className="ml-1 text-muted-foreground/70" aria-hidden="true">…</span> : null}
          </div>
        </div>
      </div>
    </>
  );
}
