import { useEffect, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { ArrowUp, Eraser, Paperclip, X } from "lucide-react";
import { Markdown } from "@/components/markdown";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { generateSystemPrompt, ROLE_META, roleLabel } from "@/lib/agents";
import { COPY } from "@/lib/copy";
import { chatGrok } from "@/lib/grok";
import { allKnownModels, isXaiModel, shortModelLabel, type FreeModel } from "@/lib/models";
import { chatWithPuter, listPuterModels } from "@/lib/puter-ai";
import { usePuterAuth } from "@/lib/puter-auth";
import { useBossStore } from "@/lib/store";
import { cn, uid } from "@/lib/utils";

type LocalFile = { name: string; mime: string; text: string };

async function readFile(file: File): Promise<LocalFile> {
  const mime = file.type || "application/octet-stream";
  if (mime.startsWith("image/")) {
    const data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result ?? ""));
      reader.onerror = () => reject(new Error("read failed"));
      reader.readAsDataURL(file);
    });
    return { name: file.name, mime, text: `[image ${file.name}] ${data.slice(0, 80)}…` };
  }
  const raw = await file.text();
  return { name: file.name, mime, text: raw.slice(0, 12_000) };
}

export function ChatPanel() {
  const { status } = usePuterAuth();
  const signedIn = status === "signed_in";
  const language = useBossStore((s) => s.language);
  const t = COPY[language];
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

  const send = async (text: string) => {
    const trimmed = text.trim();
    if ((!trimmed && files.length === 0) || busy || !agent) return;
    const id = ensureConversation(agent.id);
    const fileNote =
      files.length > 0
        ? `\n\n${t.attached}:\n${files.map((f) => `- ${f.name} (${f.mime})\n${f.text.slice(0, 4000)}`).join("\n\n")}`
        : "";
    const payload = `${trimmed}${fileNote}`.trim();
    appendMessage(id, {
      id: uid("msg"),
      role: "user",
      content: payload,
      createdAt: Date.now(),
      attachments: files.map((f) => ({ name: f.name, mime: f.mime })),
    });
    bumpMessageCount(agent.id);
    setDraft("");
    setFiles([]);
    setBusy(true);
    const assistantId = uid("msg");
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
            <p className="font-display text-3xl tracking-tight">{t.emptyTitle}</p>
            <p className="text-sm text-muted-foreground">{t.emptyBody}</p>
            <div className="flex w-full flex-col gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="rounded-[var(--radius-lg)] border border-border bg-card px-4 py-3 text-left text-sm text-muted-foreground hover:bg-secondary"
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
        <p className="mx-auto mt-2 max-w-2xl px-1 text-[11px] text-subtle">
          {modelHint}
        </p>
      </form>
    </div>
  );
}
