import { cn } from "@/lib/utils";

interface BotProgressProps {
  percent: number;
  label?: string;
  status?: "running" | "done" | "error";
  showPercent?: boolean;
}

export function BotProgress({
  percent,
  label,
  status = "running",
  showPercent = true,
}: BotProgressProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(percent)));

  return (
    <div className={cn("bot-progress", `status-${status}`)}>
      <div className="bot-progress-header">
        {label ? <span className="bot-progress-label">{label}</span> : <span />}
        {showPercent ? <span className="bot-progress-percent">{clamped}%</span> : null}
      </div>
      <div className="bot-progress-bar" role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100}>
        <div className="bot-progress-fill" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}
