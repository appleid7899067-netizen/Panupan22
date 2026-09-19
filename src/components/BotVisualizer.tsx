import { BotFlow } from "@/components/BotFlow";
import { BotTimeline } from "@/components/BotTimeline";
import { BotProgress } from "@/components/BotProgress";
import { BotStatus } from "@/components/BotStatus";
import { createDefaultFlow, type FlowLayout, type FlowStep, type TimelineEvent } from "@/lib/bot-flow";
import { cn } from "@/lib/utils";

interface BotVisualizerProps {
  status?: "idle" | "running" | "done" | "error";
  skill?: string;
  model?: string;
  progress?: number;
  duration?: number;
  steps?: FlowStep[];
  events?: TimelineEvent[];
  showFlow?: boolean;
  showTimeline?: boolean;
  showProgress?: boolean;
  showStatus?: boolean;
  compact?: boolean;
  layout?: FlowLayout;
  title?: string;
  progressLabel?: string;
  timelineTitle?: string;
}

export function BotVisualizer({
  status = "running",
  skill,
  model,
  progress = 0,
  duration,
  steps,
  events = [],
  showFlow = true,
  showTimeline = true,
  showProgress = true,
  showStatus = true,
  compact = false,
  layout = "stack",
  title,
  progressLabel,
  timelineTitle,
}: BotVisualizerProps) {
  const flowSteps = steps ?? createDefaultFlow();
  const live = status === "running";

  return (
    <div className={cn("bot-visualizer", compact && "compact")}>
      {showStatus ? (
        <BotStatus live={live || status === "done"} status={status} skill={skill} model={model} duration={duration} />
      ) : null}

      {showProgress && (status === "running" || progress > 0) ? (
        <BotProgress
          percent={status === "done" ? 100 : progress}
          label={progressLabel}
          status={status === "idle" ? "running" : status}
        />
      ) : null}

      {showFlow ? <BotFlow steps={flowSteps} title={title} compact={compact} layout={layout} /> : null}

      {showTimeline && events.length > 0 ? <BotTimeline events={events} title={timelineTitle} /> : null}
    </div>
  );
}
