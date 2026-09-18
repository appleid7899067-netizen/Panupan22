import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  CircleDashed,
  Command,
  Loader2,
  Radio,
  Send,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { Markdown } from "@/components/markdown";
import { SkillsLabPanel } from "@/components/SkillsLabPanel";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  generateSystemPrompt,
  ROLE_META,
  roleLabel,
  type AgentRecord,
} from "@/lib/agents";
import { chatGrok } from "@/lib/grok";
import { useBossStore } from "@/lib/store";
import { cn, uid } from "@/lib/utils";

type AllianceReply = {
  agentId: string;
  role: string;
  name: string;
  status: "idle" | "thinking" | "done" | "error";
  text: string;
  model?: string;
};

export function GrokSuperPanel() {
  const language = useBossStore((s) => s.language);
  const agents = useBossStore((s) => s.agents);
  const setActiveAgent = useBossStore((s) => s.setActiveAgent);
  const setWorkspaceMode = useBossStore((s) => s.setWorkspaceMode);
  const ensureConversation = useBossStore((s) => s.ensureConversation);
  const appendMessage = useBossStore((s) => s.appendMessage);
  const bumpMessageCount = useBossStore((s) => s.bumpMessageCount);

  const th = language === "th";
  const [mission, setMission] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [replies, setReplies] = useState<AllianceReply[]>([]);
  const [running, setRunning] = useState(false);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (agents.length > 0 && selected.size === 0) {
      setSelected(new Set(agents.map((a) => a.id)));
    }
  }, [agents]);

  const alliance = useMemo(
    () => agents.filter((a) => selected.has(a.id)),
    [agents, selected],
  );

  const toggleAgent = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => setSelected(new Set(agents.map((a) => a.id)));
  const clearAll = () => setSelected(new Set());

  const briefAlliance = async () => {
    const text = mission.trim();
    if (!text || alliance.length === 0 || running) return;

    setRunning(true);
    const initial: AllianceReply[] = alliance.map((a) => ({
      agentId: a.id,
      role: a.role,
      name: roleLabel(a.role, language),
      status: "thinking",
      text: "",
    }));
    setReplies(initial);

    await Promise.all(
      alliance.map(async (agent) => {
        const system = generateSystemPrompt(agent, language);
        const conversationId = ensureConversation(agent.id);

        appendMessage(conversationId, {
          id: uid("msg"),
          role: "user",
          content: text,
          createdAt: Date.now(),
        });
        bumpMessageCount(agent.id);

        try {
          const result = await chatGrok({
            data: {
              system,
              messages: [{ role: "user", content: text }],
            },
          });

          if (result.ok) {
            appendMessage(conversationId, {
              id: uid("msg"),
              role: "assistant",
              content: result.text,
              createdAt: Date.now(),
              model: result.model,
            });
            bumpMessageCount(agent.id);

            setReplies((prev) =>
              prev.map((r) =>
                r.agentId === agent.id
                  ? {
                      ...r,
                      status: "done",
                      text: result.text,
                      model: result.model,
                    }
                  : r,
              ),
            );
          } else {
            setReplies((prev) =>
              prev.map((r) =>
                r.agentId === agent.id
                  ? { ...r, status: "error", text: result.error }
                  : r,
              ),
            );
          }
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          setReplies((prev) =>
            prev.map((r) =>
              r.agentId === agent.id
                ? { ...r, status: "error", text: msg }
                : r,
            ),
          );
        }
      }),
    );

    setRunning(false);
  };

  const openAgent = (agent: AgentRecord) => {
    setActiveAgent(agent.id);
    setWorkspaceMode("command");
  };

  const labels = th
    ? {
        eyebrow: "GROKSUPER ALLIANCE",
        title: "พันมิตร GrokSuper",
        lead: "ส่งภารกิจเดียวไปยังเอเจนต์หลายตัวพร้อมกัน แล้วสังเคราะห์คำตอบแบบเรียลไทม์",
        live: "LIVE",
        select: "เลือกพันมิตร",
        all: "เลือกทั้งหมด",
        none: "ล้าง",
        mission: "ภารกิจร่วม",
        missionPh: "เช่น วิเคราะห์ตลาด + ออกแบบแผน + เขียนสรุปสำหรับผู้บริหาร",
        brief: "สั่งพันมิตร",
        briefing: "กำลังสั่งการ…",
        replies: "คำตอบจากพันมิตร",
        empty: "ยังไม่มีคำตอบ สั่งภารกิจด้านบน",
        thinking: "กำลังคิด",
        done: "เสร็จ",
        error: "ผิดพลาด",
        open: "เปิดแชท",
        members: "สมาชิก",
        skills: "ทักษะ + ความจำ",
      }
    : {
        eyebrow: "GROKSUPER ALLIANCE",
        title: "GrokSuper Alliance",
        lead: "Broadcast one mission to multiple agents in parallel and get real-time replies",
        live: "LIVE",
        select: "Select alliance",
        all: "Select all",
        none: "Clear",
        mission: "Shared mission",
        missionPh: "e.g. Analyse the market, design a plan, and write an executive summary",
        brief: "Brief alliance",
        briefing: "Briefing…",
        replies: "Alliance replies",
        empty: "No replies yet. Brief a mission above.",
        thinking: "Thinking",
        done: "Done",
        error: "Error",
        open: "Open chat",
        members: "Members",
        skills: "Skills + Memory",
      };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-y-auto">
      <header className="border-b border-border px-4 py-5 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.22em] text-yellow-300">
              <Zap className="size-3.5" />
              {labels.eyebrow}
            </div>
            <h2 className="mt-2 font-display text-3xl tracking-tight">
              {labels.title}
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              {labels.lead}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-lime-300/30 bg-lime-300/10 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-lime-300">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-1.5 animate-ping rounded-full bg-lime-300 opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-lime-300" />
              </span>
              {labels.live}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {now.toLocaleTimeString(th ? "th-TH" : "en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>
          </div>
        </div>
      </header>

      <div className="grid gap-4 p-4 sm:p-6 xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="space-y-4">
          <section className="rounded-2xl border border-border bg-card/50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="size-4 text-yellow-300" />
                <h3 className="text-sm font-medium">{labels.select}</h3>
              </div>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-subtle">
                {alliance.length}/{agents.length}
              </span>
            </div>
            <div className="mt-3 flex gap-2">
              <Button size="sm" variant="secondary" className="h-7 flex-1 text-[11px]" onClick={selectAll}>
                {labels.all}
              </Button>
              <Button size="sm" variant="ghost" className="h-7 flex-1 text-[11px]" onClick={clearAll}>
                {labels.none}
              </Button>
            </div>
            <div className="mt-3 max-h-[420px] space-y-1.5 overflow-y-auto">
              {agents.map((agent) => {
                const active = selected.has(agent.id);
                const meta = ROLE_META[agent.role];
                const Icon = meta.icon;
                return (
                  <button
                    key={agent.id}
                    type="button"
                    onClick={() => toggleAgent(agent.id)}
                    className={cn(
                      "flex w-full items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-colors",
                      active
                        ? "border-yellow-300/40 bg-yellow-300/10"
                        : "border-border bg-background hover:bg-secondary/40",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-lg border",
                        active
                          ? "border-yellow-300/40 text-yellow-300"
                          : "border-border text-muted-foreground",
                      )}
                    >
                      <Icon className="size-3.5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium">
                        {roleLabel(agent.role, language)}
                      </p>
                      <p className="truncate text-[10px] text-subtle">
                        {agent.task.slice(0, 42)}
                        {agent.task.length > 42 ? "…" : ""}
                      </p>
                    </div>
                    {active ? (
                      <CheckCircle2 className="size-3.5 shrink-0 text-yellow-300" />
                    ) : (
                      <CircleDashed className="size-3.5 shrink-0 text-subtle" />
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card/50 p-4">
            <div className="flex items-center gap-2">
              <Command className="size-4 text-cyan-300" />
              <h3 className="text-sm font-medium">{labels.members}</h3>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
              {th
                ? "พันมิตรที่เลือกจะได้รับภารกิจพร้อมกัน และคำตอบจะถูกบันทึกในประวัติของแต่ละเอเจนต์"
                : "Selected agents receive the mission in parallel. Replies are saved to each agent’s history."}
            </p>
          </section>
        </aside>

        <div className="space-y-4">
          <section className="rounded-2xl border border-border bg-card/50 p-4">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-yellow-300" />
              <h3 className="text-sm font-medium">{labels.mission}</h3>
            </div>
            <Textarea
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              placeholder={labels.missionPh}
              className="mt-3 min-h-[100px] resize-none border-border bg-background"
              disabled={running}
            />
            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-[10px] text-subtle">
                {alliance.length} {th ? "เอเจนต์จะได้รับคำสั่ง" : "agents will receive the brief"}
              </p>
              <Button
                size="sm"
                className="h-9 gap-1.5"
                disabled={running || !mission.trim() || alliance.length === 0}
                onClick={() => void briefAlliance()}
              >
                {running ? <Loader2 className="size-3.5 animate-spin" /> : <Send className="size-3.5" />}
                {running ? labels.briefing : labels.brief}
              </Button>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card/50">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-2">
                <Radio className="size-4 text-lime-300" />
                <h3 className="text-sm font-medium">{labels.replies}</h3>
              </div>
              {replies.length > 0 ? (
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-subtle">
                  {replies.filter((r) => r.status === "done").length}/{replies.length}
                </span>
              ) : null}
            </div>

            {replies.length === 0 ? (
              <p className="p-10 text-center text-sm text-subtle">{labels.empty}</p>
            ) : (
              <div className="divide-y divide-border">
                {replies.map((reply) => {
                  const agent = agents.find((a) => a.id === reply.agentId);
                  const meta = agent ? ROLE_META[agent.role] : null;
                  const Icon = meta?.icon ?? Sparkles;
                  return (
                    <div key={reply.agentId} className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <span className="flex size-8 items-center justify-center rounded-lg border border-border bg-background text-yellow-300">
                            <Icon className="size-3.5" />
                          </span>
                          <div>
                            <p className="text-sm font-medium">{reply.name}</p>
                            <p className="text-[10px] text-subtle">
                              {reply.status === "thinking"
                                ? labels.thinking
                                : reply.status === "done"
                                  ? labels.done
                                  : labels.error}
                              {reply.model ? ` · ${reply.model}` : ""}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {reply.status === "thinking" ? (
                            <Loader2 className="size-3.5 animate-spin text-cyan-300" />
                          ) : reply.status === "done" ? (
                            <CheckCircle2 className="size-3.5 text-lime-300" />
                          ) : (
                            <CircleDashed className="size-3.5 text-rose-300" />
                          )}
                          {agent ? (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 text-[11px]"
                              onClick={() => openAgent(agent)}
                            >
                              {labels.open}
                            </Button>
                          ) : null}
                        </div>
                      </div>
                      {reply.text ? (
                        <div className="mt-3 rounded-xl border border-border bg-background/80 p-3 text-sm leading-relaxed">
                          {reply.status === "error" ? (
                            <p className="text-rose-300">{reply.text}</p>
                          ) : (
                            <Markdown content={reply.text} />
                          )}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Skills + Memory — additive, does not replace chat */}
      <div className="border-t border-border p-4 sm:p-6">
        <p className="mb-3 text-[10px] font-semibold tracking-[0.18em] text-violet-300">
          {labels.skills}
        </p>
        <SkillsLabPanel />
      </div>
    </div>
  );
}
