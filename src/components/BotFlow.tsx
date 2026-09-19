import {
  Bot,
  Check,
  CirclePause,
  Code2,
  FileText,
  Globe,
  Link2,
  Loader2,
  Radio,
  Search,
  Shield,
  Target,
  User,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { FlowIconKey, FlowLayout, FlowStep, StepStatus } from "@/lib/bot-flow";

const ICONS: Record<FlowIconKey, LucideIcon> = {
  user: User,
  shield: Shield,
  target: Target,
  bot: Bot,
  zap: Zap,
  check: Check,
  search: Search,
  code: Code2,
  globe: Globe,
  file: FileText,
  radio: Radio,
  link: Link2,
};

function StatusGlyph({ status }: { status: StepStatus }) {
  if (status === "done") return <Check className="size-3.5 text-success" aria-hidden />;
  if (status === "running") return <Loader2 className="size-3.5 animate-spin text-foreground" aria-hidden />;
  if (status === "error") return <X className="size-3.5 text-destructive" aria-hidden />;
  return <CirclePause className="size-3.5 text-subtle" aria-hidden />;
}

export function FlowIcon({ name, className }: { name: FlowIconKey; className?: string }) {
  const Icon = ICONS[name] ?? Zap;
  return <Icon className={cn("size-3.5", className)} aria-hidden />;
}

interface BotFlowProps {
  steps: FlowStep[];
  title?: string;
  compact?: boolean;
  layout?: FlowLayout;
}

export function BotFlow({ steps, title, compact = false, layout = "stack" }: BotFlowProps) {
  const rail = layout === "rail";

  return (
    <div className={cn("bot-flow", compact && "compact", rail && "rail")}>
      {title ? <h4 className="bot-flow-title">{title}</h4> : null}

      <div className={cn("bot-flow-steps", rail && "bot-flow-steps-rail")}>
        {steps.map((step, i) => {
          const Icon = ICONS[step.icon] ?? Zap;
          return (
            <div key={step.id} className={cn("bot-flow-wrapper", rail && "bot-flow-wrapper-rail")}>
              <div className={cn("bot-flow-step", `status-${step.status}`)}>
                <span className="bot-flow-icon">
                  <Icon className="size-3.5" />
                </span>
                <div className="bot-flow-body">
                  <span className="bot-flow-label">{step.label}</span>
                  {step.detail && !compact ? <span className="bot-flow-detail">{step.detail}</span> : null}
                </div>
                {step.duration !== undefined && !compact ? (
                  <span className="bot-flow-duration">{step.duration}ms</span>
                ) : null}
                <span className="bot-flow-status-icon">
                  <StatusGlyph status={step.status} />
                </span>
              </div>
              {i < steps.length - 1 ? (
                <div
                  className={cn("bot-flow-arrow", `arrow-${step.status}`, rail && "bot-flow-arrow-rail")}
                  aria-hidden
                >
                  {rail ? "→" : "↓"}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function createDefaultFlow() {
  return [
    { id: "receive", label: "รับข้อความ", icon: "user" as const, status: "pending" as const },
    { id: "guards", label: "ตรวจ Guards", icon: "shield" as const, status: "pending" as const },
    { id: "skill", label: "เลือกทักษะ", icon: "target" as const, status: "pending" as const },
    { id: "model", label: "เลือกโมเดล", icon: "bot" as const, status: "pending" as const },
    { id: "process", label: "ประมวลผล", icon: "zap" as const, status: "pending" as const },
    { id: "render", label: "แสดงผล", icon: "check" as const, status: "pending" as const },
  ];
}
