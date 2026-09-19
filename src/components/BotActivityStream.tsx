import { cn } from "@/lib/utils";
import type { FlowStep, TimelineEvent } from "@/lib/bot-flow";

interface BotActivityStreamProps {
  steps?: FlowStep[];
  events?: TimelineEvent[];
  className?: string;
  maxItems?: number;
}

export function BotActivityStream({
  steps = [],
  events = [],
  className,
  maxItems = 14,
}: BotActivityStreamProps) {
  // Build a clean chronological list from steps + events
  const items: { id: string; label: string; status: "running" | "done" }[] = [];

  for (const s of steps) {
    if (s.status === "done" || s.status === "running") {
      items.push({
        id: `step_${s.id}`,
        label: s.detail || s.label,
        status: s.status,
      });
    }
  }

  for (const e of events) {
    items.push({
      id: e.id,
      label: e.label,
      status: "done",
    });
  }

  // Keep only the latest items so the stream doesn't grow forever
  const visible = items.slice(-maxItems);
  const lastId = visible[visible.length - 1]?.id;

  if (visible.length === 0) return null;

  return (
    <div className={cn("bot-activity-stream", className)} aria-live="polite">
      {visible.map((item) => {
        const isLatest = item.id === lastId;
        const isRunning = item.status === "running";

        return (
          <div
            key={item.id}
            className={cn(
              "item",
              isRunning && "running",
              !isRunning && "done",
              isLatest && "latest",
            )}
          >
            {item.label}
          </div>
        );
      })}
    </div>
  );
}
