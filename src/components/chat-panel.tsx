import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent, type KeyboardEvent } from "react";
import {
  ArrowUp,
  Menu,
  Mic,
  Paperclip,
  Plus,
  SquarePen,
  Volume2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useBossStore } from "@/lib/store";
import { usePuterAuth } from "@/lib/puter-auth";
import { chatWithPuter } from "@/lib/puter-ai";
import { uid } from "@/lib/utils";

export function ChatPanel() {
  const agent = useBossStore((s) => s.agents.find((a) => a.id === s.activeAgentId) ?? s.agents[0]);
  const ensureConversation = useBossStore((s) => s.ensureConversation);
  const appendMessage = useBossStore((s) => s.appendMessage);
  const patchMessage = useBossStore((s) => s.patchMessage);
  const clearConversation = useBossStore((s) => s.clearConversation);
  const conversations = useBossStore((s) => s.conversations);
  const modelMode = useBossStore((s) => s.modelMode);
  const { status, user, signIn, pending } = usePuterAuth();
  const signedIn = status === "signed_in";
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [attachment, setAttachment] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const convo = useMemo(
    () => conversations.find((c) => c.agentId === agent?.id) ?? null,
    [conversations, agent?.id],
  );

  useEffect(() => {
    if (agent) ensureConversation(agent.id);
  }, [agent?.id, ensureConversation]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || busy || !agent || !signedIn) return;
    const id = ensureConversation(agent.id);
    appendMessage(id, {
      id: uid("msg"),
      role: "user",
      content: attachment ? `${trimmed}\n\n📎 ${attachment}` : trimmed,
      createdAt: Date.now(),
      attachments: attachment ? [{ name: attachment, mime: "application/octet-stream" }] : undefined,
    });
    setDraft("");
    setAttachment(null);
    setBusy(true);
    const assistantId = uid("msg");
    appendMessage(id, {
      id: assistantId,
      role: "assistant",
      content: "กำลังทำงาน…",
      createdAt: Date.now(),
      pending: true,
    });

    try {
      const history = (useBossStore.getState().conversations.find((c) => c.id === id)?.messages ?? [])
        .filter((m) => m.content.length > 0)
        .slice(-20)
        .map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        }));
      // MVPAUTO becomes the front-door planner for the Boss.
      // The model still answers through Puter, but it receives the agent's
      // current plan/search state instead of being asked to operate blind.
      let mvpContext = "";
      try {
        const response = await fetch("/api/mvpauto", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ goal: trimmed, deep: true }),
        });
        if (response.ok) {
          const plan = await response.json() as {
            selected?: Array<{ provider?: string; capability?: string; reason?: string }>;
            execution?: { sourceCount?: number };
            verification?: { phase?: string; status?: string; checks?: string[] };
          };
          mvpContext = [
            "[MVPAUTO AGENT CONTEXT]",
            JSON.stringify(plan),
            "[/MVPAUTO AGENT CONTEXT]",
            "Use this as working context. Do not claim the user's goal is verified unless the verification state contains actual completion evidence.",
          ].join("\n");
        }
      } catch {
        // The chat model remains usable if the optional agent planner is unavailable.
      }

      const agentHistory = mvpContext
        ? [{ role: "assistant" as const, content: mvpContext }, ...history]
        : history;
      const result = await chatWithPuter({
        messages: agentHistory,
        pinnedModel: modelMode === "auto" ? null : modelMode,
        onDelta: (next) => patchMessage(id, assistantId, { content: next, pending: true }),
      });
      patchMessage(id, assistantId, {
        content: result.text,
        model: result.model.label,
        pending: false,
      });
    } catch (err) {
      patchMessage(id, assistantId, {
        content: err instanceof Error ? err.message : String(err),
        pending: false,
      });
    } finally {
      setBusy(false);
      inputRef.current?.focus();
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

  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAttachment(file.name);
    e.target.value = "";
  };

  const toggleVoice = () => {
    const SpeechRecognition =
      (window as typeof window & { SpeechRecognition?: new () => any; webkitSpeechRecognition?: new () => any })
        .SpeechRecognition ??
      (window as typeof window & { webkitSpeechRecognition?: new () => any }).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    if (listening) {
      setListening(false);
      return;
    }
    const recognition: any = new SpeechRecognition();
    recognition.lang = "th-TH";
    recognition.interimResults = true;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (event: any) => {
      const text = Array.from(event.results)
        .map((r: any) => r[0]?.transcript ?? "")
        .join("");
      setDraft(text);
    };
    recognition.start();
  };

  const speak = (text: string) => {
    if ("speechSynthesis" in window && text) {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
    }
  };

  if (!agent) return null;

  return (
    <div className="relative flex h-full min-h-0 flex-col bg-black text-white">
      {sidebarOpen ? (
        <button
          aria-label="ปิดประวัติแชต"
          className="fixed inset-0 z-40 bg-black/70 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <aside
        className={`absolute inset-y-0 left-0 z-50 flex w-[290px] flex-col border-r border-white/10 bg-[#171717] shadow-2xl transition-transform lg:hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-3 py-3">
          <span className="text-sm font-semibold">Bossnu SlieLo</span>
          <Button variant="ghost" size="icon" className="size-9 text-white" onClick={() => setSidebarOpen(false)}>
            <X className="size-4" />
          </Button>
        </div>
        <button
          type="button"
          className="mx-3 flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2.5 text-sm hover:bg-white/10"
          onClick={() => {
            clearConversation(agent.id);
            setSidebarOpen(false);
          }}
        >
          <SquarePen className="size-4" /> แชตใหม่
        </button>
        <div className="mt-4 flex-1 overflow-y-auto px-2">
          {conversations.filter((c) => c.agentId === agent.id).map((c) => (
            <div key={c.id} className="truncate rounded-lg px-3 py-2 text-sm text-white/70">
              {c.title || "แชตใหม่"}
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 p-3 text-xs text-white/45">
          {signedIn ? user?.username ?? "Puter" : "ยังไม่ได้เชื่อม Puter"}
        </div>
      </aside>

      <header className="flex h-14 shrink-0 items-center justify-between px-3 sm:px-5">
        <Button
          variant="ghost"
          size="icon"
          className="size-10 rounded-full bg-white/10 text-white hover:bg-white/15"
          onClick={() => setSidebarOpen(true)}
          aria-label="เมนู"
        >
          <Menu className="size-5" />
        </Button>
        <div className="min-w-0 text-center">
          <p className="truncate text-sm font-medium">Bossnu SlieLo</p>
          <p className="text-[10px] text-white/40">Puter · {user?.username ?? "Boss"}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="size-10 rounded-full bg-white/10 text-white hover:bg-white/15"
          onClick={() => clearConversation(agent.id)}
          aria-label="แชตใหม่"
        >
          <Plus className="size-5" />
        </Button>
      </header>

      <main className="min-h-0 flex-1 overflow-y-auto px-4 pb-8 sm:px-8">
        <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col justify-end gap-6 py-6">
          {(convo?.messages ?? []).map((msg) => (
            <div key={msg.id} className={msg.role === "user" ? "flex justify-end" : "flex justify-start"}>
              <div className={msg.role === "user" ? "max-w-[82%] rounded-[26px] bg-[#2f2f2f] px-5 py-3 text-[15px] leading-7" : "max-w-[92%] text-[15px] leading-7"}>
                <p className="whitespace-pre-wrap">{msg.content}</p>
                {msg.role === "assistant" && !msg.pending ? (
                  <button
                    type="button"
                    onClick={() => speak(msg.content)}
                    className="mt-2 rounded-full p-1.5 text-white/40 hover:bg-white/10 hover:text-white"
                    aria-label="อ่านข้อความ"
                  >
                    <Volume2 className="size-4" />
                  </button>
                ) : null}
              </div>
            </div>
          ))}
          {!convo?.messages.length ? (
            <div className="flex flex-1 items-center justify-center text-center">
              <div>
                <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-white/10 text-xl font-semibold">B</div>
                <h1 className="text-2xl font-semibold tracking-tight">มีอะไรให้บอสทำ?</h1>
                <p className="mt-2 text-sm text-white/45">บอกเป้าหมายมา บอสจะหาวิธีทำให้เอง</p>
              </div>
            </div>
          ) : null}
        </div>
      </main>

      <footer className="shrink-0 px-3 pb-3 pt-1 sm:px-5 sm:pb-5">
        {!signedIn ? (
          <button
            type="button"
            onClick={() => void signIn()}
            disabled={pending}
            className="mx-auto mb-3 block rounded-full bg-white/10 px-4 py-2 text-xs text-white/70 hover:bg-white/15"
          >
            {pending ? "กำลังเชื่อม Puter…" : "เชื่อมต่อ Puter เพื่อเริ่มแชต"}
          </button>
        ) : null}

        <form onSubmit={onSubmit} className="mx-auto max-w-3xl">
          {attachment ? (
            <div className="mb-2 inline-flex items-center gap-2 rounded-xl bg-[#2f2f2f] px-3 py-2 text-xs text-white/70">
              📎 {attachment}
              <button type="button" onClick={() => setAttachment(null)} aria-label="ลบไฟล์">×</button>
            </div>
          ) : null}
          <div className="rounded-[28px] border border-white/10 bg-[#2f2f2f] p-2 shadow-2xl">
            <div className="flex items-end gap-2">
              <label className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-white/70 hover:bg-white/10">
                <Paperclip className="size-5" />
                <input type="file" className="hidden" onChange={onFile} />
              </label>
              <Textarea
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={onKey}
                placeholder="ตอบกลับไปยัง Bossnu SlieLo"
                rows={1}
                className="min-h-10 max-h-36 flex-1 resize-none border-0 bg-transparent px-1 py-2.5 text-[15px] text-white placeholder:text-white/40 shadow-none focus-visible:ring-0"
              />
              <Button type="button" variant="ghost" size="icon" onClick={toggleVoice} className={`size-10 shrink-0 rounded-full text-white/80 hover:bg-white/10 ${listening ? "bg-red-500/20 text-red-300" : ""}`} aria-label="ไมโครโฟน">
                <Mic className="size-5" />
              </Button>
              <Button
                type="submit"
                size="icon"
                disabled={busy || !signedIn || !draft.trim()}
                className="size-10 shrink-0 rounded-full bg-[#3b82f6] text-white hover:bg-[#2563eb] disabled:bg-white/10"
                aria-label="ส่ง"
              >
                <ArrowUp className="size-5" />
              </Button>
            </div>
          </div>
          <p className="mt-2 text-center text-[10px] text-white/25">
            Boss อาจทำงานผ่านเครื่องมือเบื้องหลัง · ตรวจสอบผลจริงก่อนสรุป
          </p>
        </form>
      </footer>
    </div>
  );
}
