import { useEffect, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { ArrowUp, Check, Eraser, Paperclip, ShieldAlert, X } from "lucide-react";
import { Markdown } from "@/components/markdown";
import { SkillCallCard } from "@/components/SkillCallCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { generateSystemPrompt, ROLE_META, roleLabel } from "@/lib/agents";
import { createSkillCall, executeSkill } from "@/lib/bossnugrok/skills";
import type { SkillCall } from "@/lib/bossnugrok/skills/skill-types";
import { COPY } from "@/lib/copy";
import { chatGrok } from "@/lib/grok";
import { allKnownModels, isXaiModel, shortModelLabel, type FreeModel } from "@/lib/models";
import { chatWithPuter, listPuterModels } from "@/lib/puter-ai";
import { usePuterAuth } from "@/lib/puter-auth";
import { useBossStore } from "@/lib/store";
import { cn, uid } from "@/lib/utils";

type LocalFile = { name: string; mime: string; text: string };
type ApprovalRequest = { conversationId: string; messageId: string; command: string };

function needsApproval(command: string) {
  return /github|git push|commit|deploy|vercel|production|แก้(ไข)?ไฟล์|เพิ่มฟีเจอร์|ลบไฟล์|ส่งขึ้น|push|publish/i.test(command);
}

function routeWorkspaceCommand(command: string, setWorkspaceMode: (mode: "command" | "create" | "sandbox" | "live" | "terminal" | "super" | "manus") => void) {
  const value = command.toLowerCase();
  const routes = [
    { match: /manus|browser\s*\/?\s*os|เบราว์เซอร์|บราวเซอร์|จำลองระบบ/, mode: "manus" as const, label: "Manus Hub · Browser / OS Mock Simulation" },
    { match: /sandbox|prompt\s*lab|พรอมต์|แซนด์บ็อกซ์/, mode: "sandbox" as const, label: "Sandbox · Prompt Lab และ JavaScript Sandbox" },
    { match: /live\s*stream|สตรีมสด|telemetry|ไลฟ์/, mode: "live" as const, label: "Live Stream · telemetry และ event log" },
    { match: /terminal|เทอร์มินอล|คำสั่ง shell/, mode: "terminal" as const, label: "Terminal · browser-safe command simulator" },
    { match: /groksuper|grok\s*super/, mode: "super" as const, label: "GrokSuper · test lab" },
    { match: /สร้างภาพ|generate image|image generation|create mode/, mode: "create" as const, label: "Create · image generation" },
  ];
  const route = routes.find((item) => item.match.test(value));
  if (!route) return null;
  setWorkspaceMode(route.mode);
  return `เปิด ${route.label} แล้ว — ใช้แชทนี้สั่งงานต่อได้ บอทจะเรียกใช้เครื่องมือจำลองที่เกี่ยวข้องให้อัตโนมัติ`;
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
  }, [convo?.messages.length, busy, agent?.id]);

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
      const routed = routeWorkspaceCommand(payload, setWorkspaceMode);
      if (routed) {
        appendMessage(id, { id: assistantId, role: "assistant", content: routed, createdAt: Date.now(), model: "workspace-router" });
        setBusy(false);
        return;
      }

      // Inline tool call: detect skill and finish inside this chat
      const skillSeed = createSkillCall(payload);
      if (skillSeed) {
        if (skillSeed.status === "pending") {
          appendMessage(id, {
            id: assistantId,
            role: "assistant",
            content:
              language === "th"
                ? `ต้องการใช้เครื่องมือ **${skillSeed.skillId}** — กดอนุญาตด้านล่าง`
                : `Tool **${skillSeed.skillId}** needs approval — confirm below`,
            createdAt: Date.now(),
            model: `skill:${skillSeed.skillId}`,
            skillCall: {
              id: skillSeed.id,
              skillId: skillSeed.skillId,
              status: "pending",
              args: skillSeed.args,
            },
          });
          setBusy(false);
          return;
        }

        appendMessage(id, {
          id: assistantId,
          role: "assistant",
          content:
            language === "th"
              ? `กำลังใช้เครื่องมือ **${skillSeed.skillId}**…`
              : `Running tool **${skillSeed.skillId}**…`,
          createdAt: Date.now(),
          model: `skill:${skillSeed.skillId}`,
          skillCall: {
            id: skillSeed.id,
            skillId: skillSeed.skillId,
            status: "running",
            args: skillSeed.args,
            streamOutput: "",
          },
        });

        try {
          const updated = await executeSkill({ ...skillSeed, status: "running" }, (chunk) => {
            const prev = useBossStore.getState().conversations.find((c) => c.id === id);
            const msg = prev?.messages.find((m) => m.id === assistantId);
            const so = (msg?.skillCall?.streamOutput ?? "") + chunk;
            patchMessage(id, assistantId, {
              skillCall: {
                id: skillSeed.id,
                skillId: skillSeed.skillId,
                status: "running",
                args: skillSeed.args,
                streamOutput: so,
              },
            });
          });
          const summary =
            updated.status === "done"
              ? language === "th"
                ? `เครื่องมือ **${updated.skillId}** เสร็จแล้ว${updated.duration != null ? ` (${updated.duration}ms)` : ""}`
                : `Tool **${updated.skillId}** finished${updated.duration != null ? ` (${updated.duration}ms)` : ""}`
              : language === "th"
                ? `เครื่องมือ **${updated.skillId}** ผิดพลาด: ${updated.error ?? ""}`
                : `Tool **${updated.skillId}** failed: ${updated.error ?? ""}`;
          patchMessage(id, assistantId, {
            content: summary,
            model: `skill:${updated.skillId}`,
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
        } catch (err) {
          const raw = err instanceof Error ? err.message : String(err);
          patchMessage(id, assistantId, {
            content: raw,
            skillCall: {
              id: skillSeed.id,
              skillId: skillSeed.skillId,
              status: "error",
              args: skillSeed.args,
              error: raw,
            },
          });
        } finally {
          setBusy(false);
        }
        return;
      }
    }
    if (needsApproval(payload) && !approved) {
      const request = `ขออนุญาตก่อนดำเนินการ\n\nคำสั่งนี้อาจแก้ไขไฟล์หรือส่งผลต่อ GitHub / Vercel:\n“${trimmed || "คำสั่งพร้อมไฟล์แนบ"}”\n\nขอบเขตที่รออนุญาต: วิเคราะห์ → แก้ไฟล์ → ตรวจสอบ → commit / push → deploy production\n\nกรุณากด “อนุญาต” หรือ “ปฏิเสธ” ด้านล่าง บอทจะไม่ทำการเปลี่ยนแปลงใด ๆ ก่อนมีคำยืนยัน`;
      appendMessage(id, { id: assistantId, role: "assistant", content: request, createdAt: Date.now() });
      setApproval({ conversationId: id, messageId: assistantId, command: payload });
      setBusy(false);
      return;
    }
    appendMessage(id, { id: assistantId, role: "assistant", content: "", createdAt: Date.now() });
    try {
      const history = (useBossStore.getState().conversations.find((c) => c.id === id)?.messages ?? [])
        .filter((m) => m.content.length > 0)
        .slice(-16)
        .map((m) => ({ role: m.role, content: m.content }));
      const system = generateSystemPrompt(agent, language);
      if (isXaiModel(modelMode)) {
        const result = await chatGrok({ data: { messages: history, system } });
        if (!result.ok) throw new Error(result.error);
        patchMessage(id, assistantId, { content: result.text, model: result.model });
        setLastModelId(result.model);
      } else {
        const result = await chatWithPuter({
          messages: [{ role: "system", content: system }, ...history],
          pinnedModel: modelMode,
          preferTestMode: false,
          onDelta: (next) => patchMessage(id, assistantId, { content: next }),
        });
        patchMessage(id, assistantId, { content: result.text, model: result.model.id });
        setLastModelId(result.model.id);
      }
    } catch (err) {
      const raw = err instanceof Error ? err.message : t.noModels;
      const quota = /quota|usage-limited|usage limit/i.test(raw);
      patchMessage(id, assistantId, { content: quota ? t.quota : raw });
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
          <Button
            variant="ghost"
            size="icon"
            className="size-9"
            onClick={() => clearConversation(agent.id)}
            aria-label={t.newChat}
          >
            <Eraser className="size-4" />
          </Button>
        </div>
      </div>

      <div ref={scroller} className="boss-scroll flex-1 overflow-y-auto px-4 py-5 sm:px-6">
        {!convo || convo.messages.length === 0 ? (
          <div className="mx-auto flex max-w-xl flex-col items-start gap-4 pt-6">
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
          </div>
        ) : (
          <div className="mx-auto flex max-w-2xl flex-col gap-5">
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
                  {msg.role === "assistant" && !msg.content && busy ? (
                    <p className="boss-shimmer text-sm">{t.thinking}</p>
                  ) : msg.role === "assistant" ? (
                    <>
                      <Markdown text={msg.content} />
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
                    <div className="mt-3 flex flex-wrap gap-2 border-t border-border pt-3">
                      <Button
                        type="button"
                        size="sm"
                        className="h-8 rounded-full bg-lime-300 text-black hover:bg-lime-200"
                        onClick={() => {
                          const command = approval.command;
                          setApproval(null);
                          void send(command, true);
                        }}
                      >
                        <Check className="size-3.5" /> อนุญาต
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="h-8 rounded-full"
                        onClick={() => {
                          patchMessage(approval.conversationId, approval.messageId, {
                            content: "ปฏิเสธแล้ว — ไม่มีการเปลี่ยนแปลงใด ๆ",
                          });
                          setApproval(null);
                        }}
                      >
                        <ShieldAlert className="size-3.5" /> ปฏิเสธ
                      </Button>
                    </div>
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

      <form onSubmit={onSubmit} className="border-t border-border p-3 sm:p-4">
        {files.length > 0 ? (
          <div className="mx-auto mb-2 flex max-w-2xl flex-wrap gap-2">
            {files.map((f) => (
              <span
                key={f.name}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-2.5 py-1 text-[11px]"
              >
                {f.name}
                <button type="button" onClick={() => setFiles((prev) => prev.filter((x) => x.name !== f.name))} aria-label="remove">
                  <X className="size-3" />
                </button>
              </span>
            ))}
          </div>
        ) : null}
        <div className="mx-auto flex max-w-2xl items-end gap-2 rounded-[24px] border border-border bg-card px-3 py-2">
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
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="mb-0.5 size-11 shrink-0 rounded-full"
            onClick={() => fileRef.current?.click()}
            aria-label={t.attach}
          >
            <Paperclip className="size-4" />
          </Button>
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onKey}
            placeholder={t.composePh}
            rows={1}
            className="max-h-36 min-h-11 flex-1 py-2.5"
          />
          <Button
            type="submit"
            size="icon"
            className="mb-0.5 size-11 shrink-0 rounded-full"
            disabled={busy || (!draft.trim() && files.length === 0)}
            aria-label={t.send}
          >
            <ArrowUp className="size-4" />
          </Button>
        </div>
        <p className="mx-auto mt-2 max-w-2xl px-1 text-[11px] text-subtle">{modelHint}</p>
      </form>
    </div>
  );
}
