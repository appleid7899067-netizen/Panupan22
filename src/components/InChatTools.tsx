import { useEffect, useMemo, useState } from "react";
import { Braces, ChevronDown, ChevronUp, Play, Terminal as TerminalIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBossStore } from "@/lib/store";

type Line = { kind: "cmd" | "out" | "err"; text: string };

const wrapSandbox = (code: string) =>
  `<!doctype html><html><body style="margin:0;background:#090b0d;color:#e8eaed;font:13px/1.5 ui-monospace,monospace;padding:12px"><script>
  const send=(kind,text)=>parent.postMessage({source:"bossnugrok-inchat-sandbox",kind,text:String(text)},"*");
  console.log=(...x)=>send("out",x.join(" "));
  console.error=(...x)=>send("err",x.join(" "));
  window.onerror=(m)=>send("err",m);
  try { ${code.replace(/<\\/script/gi,"<\\\\/script")} } catch(e) { send("err",e?.stack||e) }
  </script></body></html>`;

function parseRunCommand(value: string) {
  const match = value.match(/^run\\s+(?:js|javascript)\\s+([\\s\\S]+)$/i);
  return match?.[1]?.trim() ?? null;
}

export function InChatTools() {
  const sandboxCode = useBossStore((s) => s.sandboxCode);
  const setSandboxCode = useBossStore((s) => s.setSandboxCode);
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"terminal" | "sandbox">("terminal");
  const [command, setCommand] = useState("");
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: "BossnuGrok Terminal · in-chat runtime" },
    { kind: "out", text: "help · status · agents · models · run js <code> · clear" },
  ]);
  const [runId, setRunId] = useState(0);
  const [running, setRunning] = useState(false);

  const srcDoc = useMemo(
    () => (runId ? wrapSandbox(sandboxCode) : "<!doctype html><body></body>"),
    [runId, sandboxCode],
  );

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const data = event.data;
      if (!data || data.source !== "bossnugrok-inchat-sandbox") return;
      setLines((prev) => [
        ...prev,
        { kind: data.kind === "err" ? "err" : "out", text: String(data.text ?? "") },
      ].slice(-48));
      setRunning(false);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const executeCode = (code: string) => {
    setSandboxCode(code);
    setRunning(true);
    setTab("sandbox");
    setRunId((n) => n + 1);
  };

  const runTerminal = () => {
    const value = command.trim();
    if (!value) return;
    if (value === "clear") {
      setLines([]);
      setCommand("");
      return;
    }

    const code = parseRunCommand(value);
    if (code) {
      setLines((prev) => [...prev, { kind: "cmd", text: value }].slice(-48));
      executeCode(code);
      setCommand("");
      return;
    }

    const output =
      value === "help"
        ? "help · status · agents · models · run js <code> · clear"
        : value === "status"
          ? "READY · in-chat JavaScript sandbox · no OS shell"
          : value === "agents"
            ? "Commander online · skills runtime available"
            : value === "models"
              ? "Auto · Grok · Puter catalog"
              : `Unknown command: ${value}. Use 'help' for commands.`;
    setLines((prev) =>
      [...prev, { kind: "cmd", text: value }, { kind: value.match(/^(help|status|agents|models)$/) ? "out" : "err", text: output }].slice(-48),
    );
    setCommand("");
  };

  return (
    <div className="mx-auto w-full max-w-[1400px] border-t border-border">
      <button
        type="button"
        className="flex w-full items-center justify-between px-1 py-2 text-left text-xs text-subtle hover:text-foreground"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-2.5 py-1">
            <TerminalIcon className="size-3.5" /> Terminal
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-2.5 py-1">
            <Braces className="size-3.5" /> Sandbox
          </span>
          <span className="hidden sm:inline">ใช้ได้ในแชทเดียวกัน</span>
        </span>
        {open ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
      </button>

      {open ? (
        <div className="mb-3 overflow-hidden rounded-2xl border border-border bg-[#090b0d] text-white">
          <div className="flex items-center gap-1 border-b border-white/10 p-2">
            <button type="button" onClick={() => setTab("terminal")} className={`rounded-lg px-3 py-1.5 text-xs ${tab === "terminal" ? "bg-white/10 text-white" : "text-white/45"}`}>
              Terminal
            </button>
            <button type="button" onClick={() => setTab("sandbox")} className={`rounded-lg px-3 py-1.5 text-xs ${tab === "sandbox" ? "bg-white/10 text-white" : "text-white/45"}`}>
              Sandbox
            </button>
          </div>

          {tab === "terminal" ? (
            <div className="p-3">
              <div className="max-h-48 overflow-y-auto rounded-xl bg-black/30 p-3 font-mono text-xs leading-6">
                {lines.map((line, i) => (
                  <div key={`${i}-${line.text}`} className={line.kind === "err" ? "text-rose-300" : line.kind === "cmd" ? "text-white" : "text-white/60"}>
                    {line.kind === "cmd" ? "$ " : "  "}{line.text}
                  </div>
                ))}
                {running ? <div className="text-cyan-300">  running…</div> : null}
              </div>
              <div className="mt-2 flex gap-2">
                <input
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") runTerminal(); }}
                  placeholder="run js console.log(2 + 2)"
                  className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-xs outline-none placeholder:text-white/25"
                />
                <Button size="sm" onClick={runTerminal} disabled={running}><Play className="size-3.5" /> Run</Button>
                <Button size="sm" variant="ghost" onClick={() => setLines([])} aria-label="clear terminal"><Trash2 className="size-3.5" /></Button>
              </div>
              <p className="mt-2 text-[10px] text-white/35">run js ใช้ isolated browser sandbox; ไม่มี OS shell, filesystem หรือ network access</p>
            </div>
          ) : (
            <div className="grid min-h-[300px] md:grid-cols-2">
              <div className="flex min-h-0 flex-col border-b border-white/10 md:border-b-0 md:border-r">
                <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
                  <span className="text-[10px] uppercase tracking-wider text-white/40">JavaScript Sandbox</span>
                  <Button size="sm" className="h-7" onClick={() => { setRunning(true); setRunId((n) => n + 1); }} disabled={running}><Play className="size-3" /> Run</Button>
                </div>
                <textarea
                  value={sandboxCode}
                  onChange={(e) => setSandboxCode(e.target.value)}
                  spellCheck={false}
                  className="min-h-[180px] flex-1 resize-none bg-transparent p-3 font-mono text-xs outline-none"
                  placeholder="console.log('hello')"
                />
              </div>
              <div className="flex min-h-[180px] flex-col">
                <iframe title="in-chat sandbox preview" sandbox="allow-scripts" srcDoc={srcDoc} className="min-h-[130px] flex-1 bg-white" onLoad={() => setRunning(false)} />
                <div className="max-h-28 overflow-y-auto border-t border-white/10 p-2 font-mono text-[10px]">
                  {lines.filter((line) => line.kind !== "cmd").slice(-12).map((line, i) => (
                    <div key={`${i}-${line.text}`} className={line.kind === "err" ? "text-rose-300" : "text-cyan-200"}>{line.text}</div>
                  ))}
                </div>
                <p className="border-t border-white/10 px-3 py-2 text-[10px] text-white/35">แยกจากหน้าเว็บหลัก · browser sandbox เท่านั้น</p>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
