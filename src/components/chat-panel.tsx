import { useEffect, useState, type FormEvent, type KeyboardEvent } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { OpenRouterKeyBar } from "@/components/openrouter-key-bar";
import {
  callOpenRouter,
  hasOpenRouterKey,
  OPENROUTER_KEY_EVENT,
} from "@/lib/openrouter-keys";
import { useBossStore } from "@/lib/store";
import { usePuterAuth } from "@/lib/puter-auth";
import { uid } from "@/lib/utils";
import { generateSystemPrompt } from "@/lib/agents";

/** Minimal OpenRouter-first chat panel — chat without Puter login when key is set. */
export function ChatPanel() {
  const language = useBossStore((s) => s.language);
  const agent = useBossStore((s) => s.agents.find((a) => a.id === s.activeAgentId) ?? s.agents[0]);
  const ensureConversation = useBossStore((s) => s.ensureConversation);
  const appendMessage = useBossStore((s) => s.appendMessage);
  const conversations = useBossStore((s) => s.conversations);
  const activeConversationId = useBossStore((s) => s.activeConversationId);
  const convo = conversations.find((c) => c.id === activeConversationId);
  const { status: puterStatus } = usePuterAuth();
  const signedIn = puterStatus === "signed_in";
  const [openRouterOn, setOpenRouterOn] = useState(() => hasOpenRouterKey());
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const sync = () => setOpenRouterOn(hasOpenRouterKey());
    window.addEventListener(OPENROUTER_KEY_EVENT, sync);
    return () => window.removeEventListener(OPENROUTER_KEY_EVENT, sync);
  }, []);

  useEffect(() => {
    if (agent) ensureConversation(agent.id);
  }, [agent?.id, ensureConversation]);

  const canChat = signedIn || openRouterOn;

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || busy || !agent || !canChat) return;
    const id = ensureConversation(agent.id);
    appendMessage(id, {
      id: uid("msg"),
      role: "user",
      content: trimmed,
      createdAt: Date.now(),
    });
    setDraft("");
    setBusy(true);
    const assistantId = uid("msg");
    appendMessage(id, {
      id: assistantId,
      role: "assistant",
      content: language === "th" ? "กำลังคิด…" : "Thinking…",
      createdAt: Date.now(),
    });
    try {
      if (!openRouterOn && !hasOpenRouterKey()) {
        throw new Error(
          language === "th"
            ? "ใส่ OpenRouter key (sk-or-...) เพื่อแชทโดยไม่ต้องล็อกอิน Puter"
            : "Connect OpenRouter key (sk-or-...) to chat without Puter login",
        );
      }
      const history = (useBossStore.getState().conversations.find((c) => c.id === id)?.messages ?? [])
        .filter((m) => m.content.length > 0)
        .slice(-16)
        .map((m) => ({ role: m.role as "user" | "assistant" | "system", content: m.content }));
      const system = generateSystemPrompt(agent, language);
      const patch = useBossStore.getState().patchMessage;
      const or = await callOpenRouter({
        messages: [{ role: "system", content: system }, ...history],
        model: "openai/gpt-4o-mini",
        onDelta: (next) => {
          patch?.(id, assistantId, { content: next });
        },
      });
      if (!or.ok) throw new Error(or.error);
      patch?.(id, assistantId, { content: or.text, model: or.model });
    } catch (err) {
      const raw = err instanceof Error ? err.message : String(err);
      useBossStore.getState().patchMessage?.(id, assistantId, { content: raw });
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

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
        {(convo?.messages ?? []).map((msg) => (
          <div
            key={msg.id}
            className={
              msg.role === "user"
                ? "ml-auto max-w-[85%] rounded-2xl bg-primary/15 px-3 py-2 text-sm"
                : "mr-auto max-w-[85%] rounded-2xl border border-border bg-card px-3 py-2 text-sm"
            }
          >
            <p className="whitespace-pre-wrap">{msg.content}</p>
            {msg.model ? (
              <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">{msg.model}</p>
            ) : null}
          </div>
        ))}
      </div>
      <div className="border-t border-border px-3 pt-3">
        <OpenRouterKeyBar className="mx-auto max-w-[1400px]" />
        {!canChat ? (
          <p className="mx-auto mt-2 max-w-[1400px] text-center text-[11px] text-amber-300/90">
            {language === "th"
              ? "ใส่ OpenRouter key (sk-or-...) เพื่อเริ่มแชทโดยไม่ต้องล็อกอิน Puter"
              : "Connect OpenRouter key (sk-or-...) to chat without Puter login"}
          </p>
        ) : null}
      </div>
      <form onSubmit={onSubmit} className="border-t border-border p-3">
        <div className="mx-auto flex w-full max-w-[1400px] items-end gap-2 rounded-[24px] border border-border bg-card px-3 py-2">
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onKey}
            placeholder={language === "th" ? "พิมพ์คำสั่ง…" : "Type a command…"}
            rows={1}
            className="max-h-36 min-h-11 flex-1 py-2.5"
          />
          <Button
            type="submit"
            size="icon"
            className="mb-0.5 size-11 shrink-0 rounded-full"
            disabled={busy || !canChat || !draft.trim()}
          >
            <ArrowUp className="size-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
