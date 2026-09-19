import { useMemo, useState } from "react";
import {
  Activity,
  Check,
  CirclePause,
  Clock3,
  Copy,
  ExternalLink,
  GitBranch,
  Loader2,
  ShieldCheck,
  Target,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBossStore } from "@/lib/store";
import { formatElapsed, type FlowStep, type TimelineEvent } from "@/lib/bot-flow";
import { shortModelLabel } from "@/lib/models";
import { cn } from "@/lib/utils";

function StepIcon({ step }: { step: FlowStep }) {
  if (step.status === "done") return <Check className="size-4" />;
  if (step.status === "running") return <Loader2 className="size-4 animate-spin" />;
  if (step.status === "error") return <X className="size-4" />;
  return <CirclePause className="size-4" />;
}

function statusLabel(status: FlowStep["status"], th: boolean) {
  if (th) return { pending: "รอ", running: "กำลังทำงาน", done: "เสร็จ", error: "ผิดพลาด" }[status];
  return { pending: "Pending", running: "Running", done: "Done", error: "Error" }[status];
}

export function BotFlowVisualizer() {
  const language = useBossStore((s) => s.language);
  const conversations = useBossStore((s) => s.conversations);
  const agents = useBossStore((s) => s.agents);
  const activeAgentId = useBossStore((s) => s.activeAgentId);
  const [selected, setSelected] = useState<string | null>(null);
  const th = language === "th";

  const conversation = conversations.find((c) => c.agentId === activeAgentId);
  const latest = conversation?.messages[conversation.messages.length - 1];
  const steps = latest?.flowSteps ?? [];
  const events = latest?.flowEvents ?? [];
  const progress = latest?.pending ? latest.progress ?? 0 : steps.length ? 100 : 0;
  const agent = agents.find((a) => a.id === activeAgentId);
  const selectedStep = steps.find((s) => s.id === selected) ?? steps.find((s) => s.status === "running") ?? steps[steps.length - 1];

  const counts = useMemo(() => ({
    done: steps.filter((s) => s.status === "done").length,
    running: steps.filter((s) => s.status === "running").length,
    error: steps.filter((s) => s.status === "error").length,
  }), [steps]);

  const copyTrace = async () => {
    const text = events.map((e) => `[${e.time}] ${e.label}${e.duration ? ` · ${e.duration}ms` : ""}`).join("\n");
    if (text) await navigator.clipboard?.writeText(text);
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-background">
      <header className="flex flex-wrap items-center gap-3 border-b border-border px-4 py-3 sm:px-5">
        <div className="flex size-9 items-center justify-center rounded-xl border border-border bg-secondary">
          <GitBranch className="size-4 text-brand" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">{th ? "BotFlow Visualizer" : "BotFlow Visualizer"}</p>
          <p className="truncate text-[11px] text-subtle">
            {latest?.pending ? (th ? "ติดตามการทำงานแบบสดจาก Chat" : "Live execution state from Chat") : (th ? "ดูเส้นทางการทำงานล่าสุด" : "Inspect the latest execution")}
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[10px]">
          <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-1", latest?.pending ? "border-lime-300/40 text-lime-300" : "border-border text-muted-foreground")}>
            <span className={cn("size-1.5 rounded-full", latest?.pending ? "animate-pulse bg-lime-300" : "bg-muted-foreground")} />
            {latest?.pending ? "LIVE" : th ? "พร้อม" : "READY"}
          </span>
          <span className="rounded-full border border-border px-2 py-1 text-muted-foreground">
            {progress}%
          </span>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section className="min-h-0 overflow-auto p-4 sm:p-5">
          {steps.length === 0 ? (
            <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-dashed border-border bg-card/30 p-8 text-center">
              <div className="max-w-md">
                <Activity className="mx-auto mb-3 size-8 text-subtle" />
                <p className="text-sm font-medium">{th ? "ยังไม่มี BotFlow ของงานล่าสุด" : "No BotFlow run is available yet"}</p>
                <p className="mt-1 text-xs leading-relaxed text-subtle">
                  {th ? "ส่งเป้าหมายในห้อง Chat แล้วสถานะจริงจะปรากฏที่นี่ทันที" : "Send a goal in Chat and the real execution state will appear here."}
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  [th ? "ขั้นตอน" : "Steps", steps.length, Target],
                  [th ? "เสร็จ" : "Done", counts.done, Check],
                  [th ? "กำลังทำงาน" : "Running", counts.running, Loader2],
                  [th ? "ผิดพลาด" : "Errors", counts.error, X],
                ].map(([label, value, Icon]) => (
                  <div key={String(label)} className="rounded-xl border border-border bg-card/50 p-3">
                    <div className="flex items-center justify-between text-[10px] text-subtle">
                      <span>{label as string}</span>
                      <Icon className="size-3" />
                    </div>
                    <p className="mt-1 text-lg font-semibold">{value as number}</p>
                  </div>
                ))}
              </div>

              <div className="mb-4 rounded-2xl border border-border bg-card/50 p-4">
                <div className="mb-4 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-subtle">{th ? "EXECUTION GRAPH" : "EXECUTION GRAPH"}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{agent?.task ?? latest?.content?.slice(0, 100)}</p>
                  </div>
                  <span className="text-xs font-semibold">{progress}%</span>
                </div>
                <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-secondary" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
                  <div className="h-full rounded-full bg-foreground transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>

                <div className="overflow-x-auto pb-2">
                  <div className="flex min-w-max items-center justify-center gap-0 py-4">
                    {steps.map((step, i) => (
                      <div key={step.id} className="flex items-center">
                        <button
                          type="button"
                          onClick={() => setSelected(step.id)}
                          className={cn(
                            "group w-[150px] rounded-2xl border p-3 text-left transition",
                            selectedStep?.id === step.id ? "border-foreground/40 bg-secondary shadow-sm" : "border-border bg-background/70 hover:bg-secondary/70",
                            step.status === "running" && "ring-1 ring-foreground/20",
                          )}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className={cn(
                              "flex size-8 items-center justify-center rounded-xl border",
                              step.status === "done" ? "border-success/30 bg-success/10 text-success" :
                              step.status === "error" ? "border-destructive/30 bg-destructive/10 text-destructive" :
                              step.status === "running" ? "border-foreground/20 bg-secondary text-foreground" :
                              "border-border text-subtle",
                            )}>
                              <StepIcon step={step} />
                            </span>
                            <span className="text-[9px] uppercase text-subtle">{statusLabel(step.status, th)}</span>
                          </div>
                          <p className="mt-2 text-xs font-medium">{step.label}</p>
                          <p className="mt-1 min-h-8 text-[10px] leading-relaxed text-subtle">{step.detail ?? " "}</p>
                          {step.duration !== undefined ? <p className="mt-2 text-[10px] text-muted-foreground">{step.duration}ms</p> : null}
                        </button>
                        {i < steps.length - 1 ? <div className="w-10 text-center text-muted-foreground">→</div> : null}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card/50">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <div>
                    <p className="text-xs font-semibold">{th ? "Execution Timeline" : "Execution Timeline"}</p>
                    <p className="text-[10px] text-subtle">{events.length} {th ? "เหตุการณ์" : "events"}</p>
                  </div>
                  <Button type="button" variant="ghost" size="sm" className="h-8 gap-1.5 text-xs" onClick={() => void copyTrace()} disabled={events.length === 0}>
                    <Copy className="size-3.5" />
                    {th ? "คัดลอก Trace" : "Copy trace"}
                  </Button>
                </div>
                <div className="divide-y divide-border">
                  {events.length === 0 ? (
                    <p className="px-4 py-5 text-xs text-subtle">{th ? "ยังไม่มีเหตุการณ์" : "No events yet"}</p>
                  ) : events.map((event: TimelineEvent) => (
                    <div key={event.id} className="flex items-center gap-3 px-4 py-3">
                      <span className="font-mono text-[10px] text-subtle">{event.time}</span>
                      <span className="size-1.5 shrink-0 rounded-full bg-foreground" />
                      <span className="min-w-0 flex-1 text-xs">{event.label}</span>
                      {event.duration !== undefined ? <span className="text-[10px] text-subtle">{event.duration}ms</span> : null}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </section>

        <aside className="min-h-0 overflow-auto border-t border-border bg-card/20 xl:border-l xl:border-t-0">
          <div className="border-b border-border p-4">
            <p className="text-[10px] uppercase tracking-wider text-subtle">{th ? "NODE INSPECTOR" : "NODE INSPECTOR"}</p>
            {selectedStep ? (
              <>
                <p className="mt-2 text-sm font-semibold">{selectedStep.label}</p>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between rounded-lg bg-secondary/60 px-3 py-2 text-xs">
                    <span className="text-subtle">{th ? "สถานะ" : "Status"}</span>
                    <span>{statusLabel(selectedStep.status, th)}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-secondary/60 px-3 py-2 text-xs">
                    <span className="text-subtle">{th ? "ระยะเวลา" : "Duration"}</span>
                    <span>{selectedStep.duration !== undefined ? `${selectedStep.duration}ms` : "—"}</span>
                  </div>
                  <div className="rounded-lg bg-secondary/60 px-3 py-2 text-xs">
                    <span className="text-subtle">{th ? "รายละเอียด" : "Detail"}</span>
                    <p className="mt-1 leading-relaxed">{selectedStep.detail || "—"}</p>
                  </div>
                </div>
              </>
            ) : (
              <p className="mt-2 text-xs text-subtle">{th ? "เลือก Node เพื่อดูรายละเอียด" : "Select a node to inspect it."}</p>
            )}
          </div>

          <div className="border-b border-border p-4">
            <p className="text-[10px] uppercase tracking-wider text-subtle">{th ? "RUNTIME" : "RUNTIME"}</p>
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2 text-xs"><ShieldCheck className="size-3.5 text-success" />{th ? "Guards / permission gate" : "Guards / permission gate"}</div>
              <div className="flex items-center gap-2 text-xs"><Zap className="size-3.5" />{latest?.skillCall?.skillId ?? "—"}</div>
              <div className="flex items-center gap-2 text-xs"><Clock3 className="size-3.5" />{latest?.durationMs !== undefined ? formatElapsed(latest.durationMs) : "—"}</div>
              <div className="flex items-center gap-2 text-xs"><Target className="size-3.5" />{latest?.model ? shortModelLabel(latest.model) : "—"}</div>
            </div>
          </div>

          <div className="p-4">
            <p className="text-[10px] uppercase tracking-wider text-subtle">{th ? "RUN SUMMARY" : "RUN SUMMARY"}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {latest?.content ? latest.content.slice(0, 280) : th ? "ยังไม่มีผลลัพธ์ล่าสุด" : "No latest result."}
            </p>
            <div className="mt-3 flex gap-2">
              <Button type="button" variant="outline" size="sm" className="h-8 gap-1.5 text-xs" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <ExternalLink className="size-3.5" /> {th ? "กลับด้านบน" : "Top"}
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
