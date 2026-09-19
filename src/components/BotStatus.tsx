import { Bot, Check, CirclePause, Loader2, Target, Timer, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface BotStatusProps {
  live?: boolean;
  duration?: number;
  skill?: string;
  model?: string;
  status?: "idle" | "running" | "done" | "error";
}

export function BotStatus({
  live = true,
  duration,
  skill,
  model,
  status = "running",
}: BotStatusProps) {
  return (
    <div className="bot-status-bar">
      <div className="bot-status-item">
        <span className={cn("status-dot", live ? "live" : "offline")} />
        <span>{live ? "LIVE" : "OFFLINE"}</span>
      </div>

      <div className={cn("bot-status-item", `status-${status}`)}>
        {status === "running" ? <Loader2 className="size-3 animate-spin" /> : null}
        {status === "done" ? <Check className="size-3 text-success" /> : null}
        {status === "error" ? <X className="size-3 text-destructive" /> : null}
        {status === "idle" ? <CirclePause className="size-3" /> : null}
        <span>{status}</span>
      </div>

      {skill ? (
        <div className="bot-status-item">
          <Target className="size-3" />
          <span>{skill}</span>
        </div>
      ) : null}

      {model ? (
        <div className="bot-status-item">
          <Bot className="size-3" />
          <span>{model}</span>
        </div>
      ) : null}

      {duration !== undefined ? (
        <div className="bot-status-item">
          <Timer className="size-3" />
          <span>{duration}ms</span>
        </div>
      ) : null}
    </div>
  );
}
