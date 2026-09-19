import { useEffect, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { ArrowUp, Eraser, Paperclip, X } from "lucide-react";
import { Markdown } from "@/components/markdown";
import { ApprovalCard } from "@/components/ApprovalCard";
import { BotFlowOptions } from "@/components/BotFlowOptions";
import { BotVisualizer } from "@/components/BotVisualizer";
import { SkillCallCard } from "@/components/SkillCallCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { generateSystemPrompt, ROLE_META, roleLabel } from "@/lib/agents";
import { executeSkill } from "@/lib/bossnugrok/skills";
import { isExplicitModeSwitch, runAutoTools, toolContextForModel } from "@/lib/auto-tools";
import type { SkillCall } from "@/lib/bossnugrok/skills/skill-types";
import { LiveFlow, snapshotToPatch, createDefaultFlow } from "@/lib/bot-flow";
import { COPY } from "@/lib/copy";
import { chatGrok } from "@/lib/grok";
import { allKnownModels, isXaiModel, shortModelLabel, type FreeModel } from "@/lib/models";
import { chatWithPuter, listPuterModels } from "@/lib/puter-ai";
import { usePuterAuth } from "@/lib/puter-auth";
import { useBossStore, type ChatMessage } from "@/lib/store";
import { needsApproval } from "@/lib/chat-guards";
import { cn, uid } from "@/lib/utils";
import { StreamingMessage } from "@/components/StreamingMessage";
import { streamText } from "@/lib/bossnugrok/stream-text";
import { InChatTools } from "@/components/InChatTools";
import { ActivityTicker } from "@/components/ActivityTicker";

type LocalFile = { name: string; mime: string; text: string };
type ApprovalRequest = { conversationId: string; messageId: string; command: string };

const beat = () => new Promise((r) => setTimeout(r, 70));

function paintFlow(
  conversationId: string,
  messageId: string,
  flow: LiveFlow,
  extra: Partial<ChatMessage> = {},
  pending = true,
) {
  useBossStore.getState().patchMessage(conversationId, messageId, {
    ...snapshotToPatch(flow.snapshot(pending)),
    ...extra,
  });
}

function quickNextActions(message: string, skillId?: string): string[] {
  const text = message.toLowerCase();
  if (skillId === "image-create" || /สร้างภาพ|image/.test(text)) return ["ทำเป็นวิดีโอ", "แก้ภาพให้สวยขึ้น", "ทำอีก 3 แบบ", "เปิดใน Create Hub"];
  if (skillId === "video-create" || /สร้างวิดีโอ|video/.test(text)) return ["สร้างอีกเวอร์ชัน", "เปลี่ยนเป็นแนวตั้ง", "เพิ่มเสียง", "เปิดใน Create Hub"];
  if (skillId === "image-ocr" || /ocr|อ่านข้อความในภาพ/.test(text)) return ["สรุปข้อความ", "แปลเป็นอังกฤษ", "จัดเป็นเอกสาร", "อ่านออกเสียง"];
  if (skillId === "speech-to-text" || /ถอดเสียง|transcri/.test(text)) return ["สรุปเสียง", "แปลภาษา", "จัดเป็นหัวข้อ", "สร้างเอกสาร"];
  if (skillId === "text-to-speech" || /อ่านออกเสียง|เสียง/.test(text)) return ["เปลี่ยนเสียง", "พูดช้าลง", "สร้างอีกเวอร์ชัน", "บันทึกไว้ใน Create Hub"];
  if (skillId === "voice-changer") return ["ลองเสียงอื่น", "อ่านข้อความใหม่", "สร้างไฟล์เสียงใหม่", "เปิดใน Create Hub"];
  return ["ทำต่อให้เลย", "อธิบายขั้นตอน", "สร้างเวอร์ชันอื่น", "เปิดเครื่องมือที่เกี่ยวข้อง"];
}

function routeWorkspaceCommand(command: string, setWorkspaceMode: (mode: "command" | "create" | "sandbox" | "live" | "terminal" | "super" | "manus") => void) {
  const value = command.toLowerCase();
  const routes = [
    { match: /manus|browser\s*\/?\s*os|เบราว์เซอร์|บราวเซอร์|จำลองระบบ/, mode: "manus" as const, label: "Manus Hub · Browser / OS Mock Simulation" },
    { match: /sandbox|prompt\s*lab|promptlab|พรอมต์\s*lab|พรอมต์แล็บ|แซนด์บ็อกซ์/, mode: "sandbox" as const, label: "Sandbox · Prompt Lab และ JavaScript Sandbox" },
    { match: /live\s*stream|สตรีมสด|telemetry|ไลฟ์/, mode: "live" as const, label: "Live Stream · telemetry และ event log" },
    { match: /terminal|เทอร์มินอล|คำสั่ง shell/, mode: "terminal" as const, label: "Terminal · browser-safe command simulator" },
    { match: /groksuper|grok\s*super/, mode: "super" as const, label: "GrokSuper · test lab" },
    { match: /สร้างภาพ|generate image|image generation|create mode/, mode: "create" as const, label: "Create · image generation" },
  ];
  const route = routes.find((item) => item.match.test(value));
  if (!route) return null;
  setWorkspaceMode(route.mode);
  return `เปิด ${route.label} แล้ว — กลับมาคุยต่อในแชทได้เสมอ`;
}

async function readFile(file: File): Promise<LocalFile> {
  const mime = file.type || "application/octet-stream";
  if (mime.startsWith("image/")) {
    const data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result ?? ""));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
    return { name: file.name, mime, text: `[image data-url omitted, length=${data.length}]` };
  }
  const text = await file.text();
  return { name: file.name, mime, text: text.slice(0, 24_000) };
}

export function ChatPanel() {
  const language = useBossStore((s) => s.language);
  const t = COPY[language];
  const { status: puterStatus } = usePuterAuth();
  const signedIn = puterStatus === "signed_in";
  const agents = useBossStore((s) => s.agents);
  const activeAgentId = useBossStore((s) => s.activeAgentId);
  const conversations = useBossStore((s) => s.conversations);
  const ensureConversation = useBossStore((s) => s.ensureConversation);
  const clearConversation = useBossStore((s) => s.clearConversation);
  const appendMessage = useBossStore((s) => s.appendMessage);
  const patchMessage = useBossStore((s) => s.patchMessage);
  const bumpMessageCount = useBossStore((s) => s.bumpMessageCount);
  const modelMode = useBossStore((s) => s.modelMode);
  const setModelMode = useBossStore((s) => s.setModelMode);
  const lastModelId = useBossStore((s) => s.lastModelId);
  const setLastModelId = useBossStore((s) => s.setLastModelId);
  const setWorkspaceMode = useBossStore((s) => s.setWorkspaceMode);
  const setSandboxCode = useBossStore((s) => s.setSandboxCode);
  const hydrated = useBossStore((s) => s.hydrated);
  const flowOptions = useBossStore((s) => s.flowOptions);

  const agent = agents.find((a) => a.id === activeAgentId) ?? agents[0];
  const convo = conversations.find((c) => c.agentId === agent?.id);

  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [files, setFiles] = useState<LocalFile[]>([]);
  const [remoteModels, setRemoteModels] = useState<FreeModel[]>([]);
  const [approval, setApproval] = useState<ApprovalRequest | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const catalog = useMemo(() => {
    const seenId = new Set<string>();
    const seenLabel = new Set<string>();
    const merged: FreeModel[] = [];
    for (const m of [...allKnownModels(), ...remoteModels]) {
      if (seenId.has(m.id) || seenLabel.has(m.label)) continue;
      seenId.add(m.id);
      seenLabel.add(m.label);
      merged.push(m);
    }
    return merged.slice(0, 80);
  }, [remoteModels]);

  useEffect(() => {
    if (hydrated && agent) ensureConversation(agent.id);
  }, [hydrated, agent?.id, ensureConversation]);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [convo?.messages.length, busy, agent?.id, convo?.messages[convo.messages.length - 1]?.content]);

  useEffect(() => {
    if (!signedIn) return;
    let cancelled = false;
    void listPuterModels().then((models) => {
      if (cancelled || models.length === 0) return;
      setRemoteModels(models);
    });
    return () => {
      cancelled = true;
    };
  }, [signedIn]);

  const send = async (text: string, approved = false) => {
    const trimmed = text.trim();
    if ((!trimmed && files.length === 0) || busy || !agent) return;
    const id = ensureConversation(agent.id);
    const fileNote =
      files.length > 0
        ? `\n\n${t.attached}:\n${files.map((f) => `- ${f.name} (${f.mime})\n${f.text.slice(0, 4000)}`).join("\n\n")}`
        : "";
    const payload = `${trimmed}${fileNote}`.trim();
    if (!approved) {
      appendMessage(id, {
        id: uid("msg"),
        role: "user",
        content: payload,
        createdAt: Date.now(),
        attachments: files.map((f) => ({ name: f.name, mime: f.mime })),
      });
      bumpMessageCount(agent.id);
    }
    setDraft("");
    setFiles([]);
    setBusy(true);
    const assistantId = uid("msg");

    if (!approved && !needsApproval(payload)) {
      // Leave this chat ONLY when user explicitly opens another room
      if (isExplicitModeSwitch(payload)) {
        const routed = routeWorkspaceCommand(payload, setWorkspaceMode);
        if (routed) {
          appendMessage(id, {
            id: assistantId,
            role: "assistant",
            content: routed,
            createdAt: Date.now(),
            model: "workspace-router",
          });
          setBusy(false);
          return;
        }
      }

      // Same room: auto tools → model answer in one bubble
      const flow = new LiveFlow(language);
      appendMessage(id, {
        id: assistantId,
        role: "assistant",
        content: language === "th" ? "กำลังคิด…" : "Thinking…",
        createdAt: Date.now(),
        ...snapshotToPatch(flow.snapshot(true)),
      });
      flow.start("receive");
      paintFlow(id, assistantId, flow);
      await beat();
      flow.complete("receive");
      flow.start("guards");
      flow.event(language === "th" ? "Guards ตรวจสอบ" : "Guards checked", "success", "shield");
      paintFlow(id, assistantId, flow);
      await beat();
      flow.complete("guards");
      const skillStep = flow.steps[2]?.id ?? "skill";
      flow.start(skillStep);
      paintFlow(id, assistantId, flow);

      const toolPack = await runAutoTools(payload, (chunk) => {
        const prev = useBossStore.getState().conversations.find((c) => c.id === id);
        const msg = prev?.messages.find((m) => m.id === assistantId);
        const so = (msg?.skillCall?.streamOutput ?? "") + chunk;
        if (so) {
          patchMessage(id, assistantId, {
            ...snapshotToPatch(flow.snapshot(true)),
            skillCall: {
              id: msg?.skillCall?.id ?? `auto_${Date.now().toString(36)}`,
              skillId: (msg?.skillCall?.skillId as SkillCall["skillId"]) ?? "web-search",
              status: "running",
              args: msg?.skillCall?.args ?? { query: payload },
              streamOutput: so,
            },
          });
        }
      });

      if (toolPack.skillCall) {
        flow.complete(skillStep, toolPack.skillCall.skillId);
        flow.event(
          language === "th" ? `เลือก ${toolPack.skillCall.skillId}` : `Selected ${toolPack.skillCall.skillId}`,
          "info",
          "target",
        );
      } else {
        flow.complete(skillStep, language === "th" ? "สนทนาทั่วไป" : "Direct chat");
        flow.event(language === "th" ? "ไม่ใช้ทักษะพิเศษ" : "No extra skill", "info", "target");
      }

      const toolCtx = toolContextForModel(toolPack, language === "th" ? "th" : "en");

      try {
        const history = (useBossStore.getState().conversations.find((c) => c.id === id)?.messages ?? [])
          .filter((m) => m.content.length > 0)
          .slice(-16)
          .map((m) => ({ role: m.role, content: m.content }));

        let system = generateSystemPrompt(agent, language);
        if (toolCtx) system = `${system}\n\n${toolCtx}`;

        const modelHistory = toolCtx
          ? [
              ...history,
              {
                role: "user" as const,
                content:
                  language === "th"
                    ? `จากข้อมูลเครื่องมือด้านบน ตอบคำถามนี้ให้จบในห้องนี้ (อย่าบอกว่าเข้าเน็ตไม่ได้): ${payload}`
                    : `Using tool data above, answer fully in this same chat: ${payload}`,
              },
            ]
          : history;

        const skillPatch = toolPack.skillCall
          ? {
              id: toolPack.skillCall.id,
              skillId: toolPack.skillCall.skillId,
              status: toolPack.skillCall.status as "done" | "running" | "error",
              args: toolPack.skillCall.args,
              streamOutput: toolPack.skillCall.streamOutput,
              error: toolPack.skillCall.error,
              duration: toolPack.skillCall.duration,
            }
          : undefined;

        flow.start("model", modelMode === "auto" ? "auto" : modelMode);
        flow.event(
          language === "th" ? `เรียก ${shortModelLabel(modelMode === "auto" ? lastModelId : modelMode)}` : `Call ${shortModelLabel(modelMode === "auto" ? lastModelId : modelMode)}`,
          "info",
          "bot",
        );
        paintFlow(id, assistantId, flow, { skillCall: skillPatch });
        await beat();
        flow.complete("model", modelMode);
        flow.start("process");
        flow.event(language === "th" ? "กำลังประมวลผล" : "Processing", "warning", "zap");
        paintFlow(id, assistantId, flow, { skillCall: skillPatch });

        if (modelMode !== "auto" && isXaiModel(modelMode)) {
          const result = await chatGrok({ data: { messages: modelHistory, system } });
          if (!result.ok) throw new Error(result.error);
          const full = result.text;
          const step = Math.max(12, Math.floor(full.length / 40));
          flow.complete("process");
          flow.start("render");
          await streamText(full, {
            delay: 20,
            chunkSize: 2,
            onChunk: (() => {
              let shown = "";
              return (chunk: string) => {
                shown += chunk;
                paintFlow(id, assistantId, flow, { content: shown, model: result.model, skillCall: skillPatch });
              };
            })(),
          });
          flow.complete("render");
          flow.finishAll(true);
          paintFlow(
            id,
            assistantId,
            flow,
            {
              content: full,
              model: result.model,
              skillCall: skillPatch ? { ...skillPatch, status: "done" } : undefined,
            },
            false,
          );
          setLastModelId(result.model);
        } else {
          const result = await chatWithPuter({
            messages: [{ role: "system", content: system }, ...modelHistory],
            pinnedModel: modelMode === "auto" ? null : modelMode,
            preferTestMode: false,
            onDelta: (next) =>
              paintFlow(id, assistantId, flow, { content: next, skillCall: skillPatch }),
          });
          flow.complete("process");
          flow.complete("render");
          flow.finishAll(true);
          paintFlow(
            id,
            assistantId,
            flow,
            {
              content: result.text,
              model: result.model.id,
              skillCall: skillPatch ? { ...skillPatch, status: "done" } : undefined,
            },
            false,
          );
          setLastModelId(result.model.id);
        }
      } catch (err) {
        const raw = err instanceof Error ? err.message : t.noModels;
        flow.fail("process", raw);
        flow.finishAll(false);
        if (toolPack.toolText) {
          paintFlow(
            id,
            assistantId,
            flow,
            {
              content: toolPack.toolText,
              skillCall: toolPack.skillCall
                ? {
                    id: toolPack.skillCall.id,
                    skillId: toolPack.skillCall.skillId,
                    status: "done",
                    args: toolPack.skillCall.args,
                    streamOutput: toolPack.skillCall.streamOutput,
                  }
                : undefined,
            },
            false,
          );
        } else {
          const quota = /quota|usage-limited|usage limit/i.test(raw);
          paintFlow(id, assistantId, flow, { content: quota ? t.quota : raw }, false);
        }
      } finally {
        setBusy(false);
      }
      return;
    }

    if (needsApproval(payload) && !approved) {
      const request = `คำสั่งนี้อาจเปลี่ยนแปลงระบบ — ยืนยันด้านล่างก่อนดำเนินการ`;
      appendMessage(id, { id: assistantId, role: "assistant", content: request, createdAt: Date.now() });
      setApproval({ conversationId: id, messageId: assistantId, command: payload });
      setBusy(false);
      return;
    }

    const flow = new LiveFlow(language);
    appendMessage(id, {
      id: assistantId,
      role: "assistant",
      content: "",
      createdAt: Date.now(),
      ...snapshotToPatch(flow.snapshot(true)),
    });
    flow.start("receive");
    await beat();
    flow.complete("receive");
    flow.complete("guards");
    flow.complete(flow.steps[2]?.id ?? "skill");
    flow.start("model");
    flow.start("process");
    paintFlow(id, assistantId, flow);
    try {
      const history = (useBossStore.getState().conversations.find((c) => c.id === id)?.messages ?? [])
        .filter((m) => m.content.length > 0)
        .slice(-16)
        .map((m) => ({ role: m.role, content: m.content }));
      const system = generateSystemPrompt(agent, language);
      if (isXaiModel(modelMode)) {
        const result = await chatGrok({ data: { messages: history, system } });
        if (!result.ok) throw new Error(result.error);
        const full = result.text;
        flow.complete("model", result.model);
        flow.complete("process");
        flow.start("render");
        await streamText(full, {
          delay: 20,
          chunkSize: 2,
          onChunk: (() => {
            let shown = "";
            return (chunk: string) => {
              shown += chunk;
              paintFlow(id, assistantId, flow, { content: shown, model: result.model });
            };
          })(),
        });
        flow.complete("render");
        flow.finishAll(true);
        paintFlow(id, assistantId, flow, { content: full, model: result.model }, false);
        setLastModelId(result.model);
      } else {
        const result = await chatWithPuter({
          messages: [{ role: "system", content: system }, ...history],
          pinnedModel: modelMode,
          preferTestMode: false,
          onDelta: (next) => paintFlow(id, assistantId, flow, { content: next }),
        });
        flow.complete("model", result.model.id);
        flow.complete("process");
        flow.complete("render");
        flow.finishAll(true);
        paintFlow(id, assistantId, flow, { content: result.text, model: result.model.id }, false);
        setLastModelId(result.model.id);
      }
    } catch (err) {
      const raw = err instanceof Error ? err.message : t.noModels;
      const quota = /quota|usage-limited|usage limit/i.test(raw);
      flow.fail("process", raw);
      flow.finishAll(false);
      paintFlow(id, assistantId, flow, { content: quota ? t.quota : raw }, false);
    } finally {
      setBusy(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void send(draft);
  };

  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send(draft);
    }
  };

  const Icon = agent ? ROLE_META[agent.role].icon : ROLE_META.boss.icon;
  const modelHint =
    modelMode === "auto" ? `${t.auto} · ${shortModelLabel(lastModelId)}` : shortModelLabel(modelMode);
  const suggestions = useMemo(() => [t.suggest1, t.suggest2], [t]);
  const demoSteps = useMemo(() => {
    return createDefaultFlow(language).map((s, i) => ({
      ...s,
      status: (i < 2 ? "done" : i === 2 ? "running" : "pending") as "done" | "running" | "pending",
      duration: i < 2 ? [5, 2][i] : undefined,
    }));
  }, [language]);
  const thinkingText = language === "th" ? "กำลังคิด…" : "Thinking…";

  if (!agent) return null;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-[12px] border border-border bg-secondary">
            <Icon className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{roleLabel(agent.role, language)}</p>
            <p className="truncate text-xs text-subtle">{agent.task}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <label className="sr-only" htmlFor="model-mode">
            {t.model}
          </label>
          <select
            id="model-mode"
            value={modelMode}
            onChange={(e) => setModelMode(e.target.value)}
            className="h-9 max-w-[42vw] rounded-full border border-border bg-secondary px-3 text-xs text-foreground outline-none sm:max-w-52"
          >
            <option value="auto">{t.auto}</option>
            {catalog.map((m) => (
              <option key={m.id} value={m.id}>
                {m.via === "xai" ? m.label : `${m.label} · Puter`}
              </option>
            ))}
          </select>
          <Button variant="ghost" size="icon" className="size-9" onClick={() => clearConversation(agent.id)} aria-label={t.newChat}>
            <Eraser className="size-4" />
          </Button>
          <BotFlowOptions />
        </div>
      </div>

      <div ref={scroller} className="boss-scroll flex-1 overflow-y-auto px-4 py-5 sm:px-6">
        {!convo || convo.messages.length === 0 ? (
          <div className="mx-auto flex w-full max-w-[1400px] flex-col items-start gap-4 pt-6">
            <div>
              <p className="font-display text-2xl tracking-tight">{t.emptyTitle}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t.emptyBody}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-left text-xs text-muted-foreground hover:bg-secondary"
                  onClick={() => void send(s)}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="w-full">
              <p className="mb-2 text-[11px] uppercase tracking-wider text-subtle">{t.flowHint}</p>
              <BotVisualizer
                status="running"
                skill="web-search"
                model={modelMode === "auto" ? "Puter" : shortModelLabel(lastModelId) || shortModelLabel(modelMode)}
                progress={42}
                steps={demoSteps}
                events={[
                  { id: "d1", time: "00:00", label: language === "th" ? "ผู้ใช้ส่งข้อความ" : "User sent a message", icon: "user", type: "info" },
                  { id: "d2", time: "00:01", label: language === "th" ? "Guards ตรวจสอบ" : "Guards checked", icon: "shield", type: "success" },
                  { id: "d3", time: "00:02", label: language === "th" ? "เลือกทักษะ" : "Skill selected", icon: "target", type: "info" },
                ]}
                showFlow={flowOptions.showFlow}
                showTimeline={flowOptions.showTimeline}
                showProgress={flowOptions.showProgress}
                showStatus={flowOptions.showStatus}
                compact={flowOptions.compact}
                layout={flowOptions.layout}
                title={t.flowTitle}
                progressLabel={t.flowProgress}
                timelineTitle={t.flowTimeline}
              />
            </div>
          </div>
        ) : (
          <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5">
            {convo.messages.map((msg) => (
              <div key={msg.id} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[92%] rounded-[20px] px-4 py-3",
                    msg.role === "user"
                      ? "rounded-br-[8px] bg-primary text-primary-foreground"
                      : "rounded-bl-[8px] border border-border bg-card",
                  )}
                >
                  {msg.role === "assistant" ? (
                    <>
                      {(msg.pending || (msg.flowSteps && msg.flowSteps.length > 0)) ? (
                        <div className={msg.content && msg.content !== thinkingText ? "mb-3" : undefined}>
                          {msg.pending ? (
                            <ActivityTicker
                              language={language}
                              steps={msg.flowSteps}
                              events={msg.flowEvents}
                            />
                          ) : (
                            <BotVisualizer
                              status={msg.skillCall?.status === "error" ? "error" : "done"}
                              skill={msg.skillCall?.skillId}
                              model={msg.model ? shortModelLabel(msg.model) : undefined}
                              progress={msg.progress ?? 0}
                              duration={msg.durationMs}
                              steps={msg.flowSteps}
                              events={msg.flowEvents}
                              showFlow={flowOptions.showFlow}
                              showTimeline={flowOptions.showTimeline}
                              showProgress={false}
                              showStatus={flowOptions.showStatus}
                              compact={true}
                              layout={flowOptions.layout}
                              title={t.flowTitle}
                              progressLabel={t.flowProgress}
                              timelineTitle={t.flowTimeline}
                            />
                          )}
                        </div>
                      ) : null}
                      {msg.pending && (!msg.content || msg.content === thinkingText) ? (
                        busy ? <p className="boss-shimmer text-sm">{t.thinking}</p> : null
                      ) : msg.content ? (
                        <StreamingMessage content={msg.content} isStreaming={!!msg.pending} />
                      ) : busy ? (
                        <p className="boss-shimmer text-sm">{t.thinking}</p>
                      ) : null}
                      {msg.role === "assistant" && !msg.pending && msg.content && msg.id === convo.messages[convo.messages.length - 1]?.id ? (
                        <div className="mt-3 border-t border-border/70 pt-3">
                          <p className="mb-2 text-[11px] text-subtle">{language === "th" ? "อยากให้ทำอะไรต่อ?" : "What should I do next?"}</p>
                          <div className="flex flex-wrap gap-2">
                            {quickNextActions(msg.content, msg.skillCall?.skillId).map((action) => (
                              <button
                                key={action}
                                type="button"
                                disabled={busy}
                                onClick={() => { void send(action); }}
                                className="rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-[11px] text-muted-foreground transition hover:bg-secondary hover:text-foreground disabled:opacity-50"
                              >
                                {action}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : null}
                      {msg.skillCall ? (
                        <div className="mt-3">
                          <SkillCallCard
                            call={{
                              id: msg.skillCall.id,
                              skillId: msg.skillCall.skillId as SkillCall["skillId"],
                              status: msg.skillCall.status,
                              args: msg.skillCall.args ?? {},
                              streamOutput: msg.skillCall.streamOutput,
                              error: msg.skillCall.error,
                              duration: msg.skillCall.duration,
                            }}
                            onApprove={() => {
                              void (async () => {
                                const seed: SkillCall = {
                                  id: msg.skillCall!.id,
                                  skillId: msg.skillCall!.skillId as SkillCall["skillId"],
                                  args: msg.skillCall!.args ?? {},
                                  status: "running",
                                };
                                setBusy(true);
                                patchMessage(convo.id, msg.id, {
                                  content: language === "th" ? "กำลังรันเครื่องมือ…" : "Running tool…",
                                  skillCall: { ...msg.skillCall!, status: "running", streamOutput: "" },
                                });
                                const updated = await executeSkill(seed, (chunk) => {
                                  const prev = useBossStore.getState().conversations.find((c) => c.id === convo.id);
                                  const m = prev?.messages.find((x) => x.id === msg.id);
                                  const so = (m?.skillCall?.streamOutput ?? "") + chunk;
                                  patchMessage(convo.id, msg.id, {
                                    skillCall: { ...msg.skillCall!, status: "running", streamOutput: so },
                                  });
                                });
                                patchMessage(convo.id, msg.id, {
                                  content:
                                    updated.status === "done"
                                      ? language === "th"
                                        ? `เครื่องมือ **${updated.skillId}** เสร็จแล้ว`
                                        : `Tool **${updated.skillId}** finished`
                                      : updated.error ?? "error",
                                  skillCall: {
                                    id: updated.id,
                                    skillId: updated.skillId,
                                    status: updated.status,
                                    args: updated.args,
                                    streamOutput: updated.streamOutput,
                                    error: updated.error,
                                    duration: updated.duration,
                                  },
                                });
                                setBusy(false);
                              })();
                            }}
                            onReject={() => {
                              patchMessage(convo.id, msg.id, {
                                content: language === "th" ? "ยกเลิกเครื่องมือแล้ว" : "Tool cancelled",
                                skillCall: { ...msg.skillCall!, status: "rejected" },
                              });
                            }}
                          />
                        </div>
                      ) : null}
                      {/```/.test(msg.content) ? (
                        <button
                          type="button"
                          className="mt-2 text-[11px] text-subtle underline decoration-border underline-offset-2"
                          onClick={() => {
                            const match = msg.content.match(/```(?:\w+)?\n([\s\S]*?)```/);
                            if (match?.[1]) setSandboxCode(match[1]);
                            setWorkspaceMode("sandbox");
                          }}
                        >
                          {t.toSandbox}
                        </button>
                      ) : null}
                    </>
                  ) : (
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                  )}
                  {msg.id === approval?.messageId ? (
                    <ApprovalCard
                      command={approval.command}
                      context="ขอบเขต: วิเคราะห์ → แก้ไฟล์ → ตรวจสอบ → commit / push → deploy production"
                      onApprove={() => {
                        const command = approval.command;
                        setApproval(null);
                        void send(command, true);
                      }}
                      onReject={() => {
                        patchMessage(approval.conversationId, approval.messageId, {
                          content: "ปฏิเสธแล้ว — ไม่มีการเปลี่ยนแปลงใด ๆ",
                        });
                        setApproval(null);
                      }}
                    />
                  ) : null}
                  {msg.role === "assistant" && msg.model ? (
                    <p className="mt-2 text-[10px] uppercase tracking-wider text-subtle">{shortModelLabel(msg.model)}</p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="px-3 sm:px-4"><InChatTools /></div>

      <form onSubmit={onSubmit} className="border-t border-border p-3 sm:p-4">
        {files.length > 0 ? (
          <div className="mx-auto mb-2 flex w-full max-w-[1400px] flex-wrap gap-2">
            {files.map((f) => (
              <span key={f.name} className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-2.5 py-1 text-[11px]">
                {f.name}
                <button type="button" onClick={() => setFiles((prev) => prev.filter((x) => x.name !== f.name))} aria-label="remove">
                  <X className="size-3" />
                </button>
              </span>
            ))}
          </div>
        ) : null}
        <div className="mx-auto flex w-full max-w-[1400px] items-end gap-2 rounded-[24px] border border-border bg-card px-3 py-2">
          <input
            ref={fileRef}
            type="file"
            className="hidden"
            multiple
            onChange={async (e) => {
              const list = Array.from(e.target.files ?? []).slice(0, 4);
              const next: LocalFile[] = [];
              for (const file of list) next.push(await readFile(file));
              setFiles((prev) => [...prev, ...next].slice(0, 6));
              e.target.value = "";
            }}
          />
          <Button type="button" variant="ghost" size="icon" className="mb-0.5 size-11 shrink-0 rounded-full" onClick={() => fileRef.current?.click()} aria-label={t.attach}>
            <Paperclip className="size-4" />
          </Button>
          <Textarea value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={onKey} placeholder={t.composePh} rows={1} className="max-h-36 min-h-11 flex-1 py-2.5" />
          <Button type="submit" size="icon" className="mb-0.5 size-11 shrink-0 rounded-full" disabled={busy || (!draft.trim() && files.length === 0)} aria-label={t.send}>
            <ArrowUp className="size-4" />
          </Button>
        </div>
        <p className="mx-auto mt-2 w-full max-w-[1400px] px-1 text-[11px] text-subtle">{modelHint}</p>
      </form>
    </div>
  );
}
