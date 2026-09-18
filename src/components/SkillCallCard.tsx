import { Loader2, ShieldCheck, X } from "lucide-react";
import { TerminalBlock } from "@/components/TerminalBlock";
import { Button } from "@/components/ui/button";
import { SKILLS } from "@/lib/bossnugrok/skills";
import type { SkillCall } from "@/lib/bossnugrok/skills/skill-types";
import { cn } from "@/lib/utils";

type SkillCallCardProps = {
  call: SkillCall;
  onApprove?: () => void;
  onReject?: () => void;
};

export function SkillCallCard({ call, onApprove, onReject }: SkillCallCardProps) {
  const meta = SKILLS.find((s) => s.id === call.skillId);
  const pending = call.status === "pending";
  const running = call.status === "running";
  const terminalStatus =
    call.status === "error" ? "error" : call.status === "done" ? "done" : "running";

  return (
    <div
      className={cn(
        "rounded-2xl border p-3",
        pending
          ? "border-amber-300/30 bg-amber-300/5"
          : "border-violet-400/25 bg-violet-400/5",
      )}
    >
      <div className="flex items-center gap-2 text-xs font-medium text-violet-300">
        <span>{meta?.icon ?? "🛠️"}</span>
        <span>{meta?.nameTh ?? call.skillId}</span>
        {running ? <Loader2 className="size-3.5 animate-spin text-cyan-300" /> : null}
        {pending ? (
          <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-amber-300">
            <ShieldCheck className="size-3" /> needs approval
          </span>
        ) : null}
      </div>

      {Object.keys(call.args).length > 0 ? (
        <pre className="mt-2 max-h-32 overflow-auto rounded-lg border border-border bg-background/80 p-2 font-mono text-[10px] text-muted-foreground">
          {JSON.stringify(call.args, null, 2)}
        </pre>
      ) : null}

      {pending ? (
        <div className="mt-3 flex gap-2">
          <Button size="sm" className="h-8" onClick={onApprove}>
            Approve
          </Button>
          <Button size="sm" variant="ghost" className="h-8" onClick={onReject}>
            <X className="size-3.5" /> Reject
          </Button>
        </div>
      ) : null}

      {(call.streamOutput || running || call.status === "done" || call.status === "error") && (
        <div className="mt-3">
          <TerminalBlock
            title={meta?.name ?? call.skillId}
            command={call.skillId}
            output={call.streamOutput ?? (call.error ? `❌ ${call.error}` : "")}
            status={terminalStatus}
            duration={call.duration}
          />
        </div>
      )}
    </div>
  );
}
