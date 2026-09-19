import { useEffect, useMemo, useState } from "react";
import { Braces, Clock3, Copy, Eraser, FlaskConical, Play, RotateCcw, Send, SlidersHorizontal, TerminalSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { allKnownModels, shortModelLabel } from "@/lib/models";
import { chatWithPuter } from "@/lib/puter-ai";
import { usePuterAuth } from "@/lib/puter-auth";
import { COPY } from "@/lib/copy";
import { useBossStore } from "@/lib/store";
import { CORE_BOSS, generateSystemPrompt } from "@/lib/agents";

type LogLine = { kind: "log" | "err"; text: string };
type PromptRun = { id: number; model: string; prompt: string; output: string; ms: number; ok: boolean };

const SRC_WRAP = (code: string) => `<!doctype html><html><head><meta charset="utf-8" /><style>html,body{margin:0;background:#0a0b0d;color:#eceef1;font:13px/1.45 ui-monospace,monospace}#root{padding:12px}</style></head><body><div id="root"></div><script>(function(){function send(kind,text){parent.postMessage({source:"bossnugrok-sandbox",kind,text:String(text)},"*")}console.log=function(){send("log",Array.from(arguments).map(String).join(" "))};console.error=function(){send("err",Array.from(arguments).map(String).join(" "))};window.onerror=function(m){send("err",m)};try{${code.replace(/<\/script/gi,"<\\/script")} }catch(e){send("err",e&&e.stack?e.stack:e)}})();</script></body></html>`;

export function SandboxPanel() {
  const language = useBossStore((s) => s.language);
  const t = COPY[language];
  const sandboxCode = useBossStore((s) => s.sandboxCode);
  const setSandboxCode = useBossStore((s) => s.setSandboxCode);
  const { status } = usePuterAuth();
  const signedIn = status === "signed_in";
  const models = useMemo(() => allKnownModels(), []);
  const [tab, setTab] = useState<"prompt" | "code">("prompt");
  const [model, setModel] = useState("qwen3.5");
  const [system, setSystem] = useState(() => generateSystemPrompt(CORE_BOSS, language));
  const [prompt, setPrompt] = useState("สรุปว่าตอนนี้ BossnuGrok มีโหมด เครื่องมือ และทักษะอะไรที่บอทเรียกใช้ได้บ้าง");
  const [temperature, setTemperature] = useState("0.45");
  const [maxTokens, setMaxTokens] = useState("800");
  const [busy, setBusy] = useState(false);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [history, setHistory] = useState<PromptRun[]>([]);
  const [nonce, setNonce] = useState(0);
  const [logs, setLogs] = useState<LogLine[]>([]);
  const srcDoc = useMemo(() => (nonce === 0 ? "<!doctype html><title>idle</title>" : SRC_WRAP(sandboxCode)), [nonce, sandboxCode]);

  useEffect(() => {
    try {
      localStorage.setItem("bossg:prompt-lab-system", system);
      localStorage.setItem("bossg:prompt-lab-user", prompt);
    } catch {}
  }, [system, prompt]);

  useEffect(() => { const onMsg = (ev: MessageEvent) => { const d = ev.data; if (!d || d.source !== "bossnugrok-sandbox") return; const entry: LogLine = { kind: d.kind === "err" ? "err" : "log", text: String(d.text ?? "") }; setLogs((prev) => [...prev, entry].slice(-80)); }; window.addEventListener("message", onMsg); return () => window.removeEventListener("message", onMsg); }, []);

  const runPrompt = async () => {
    if (!prompt.trim() || busy) return;
    setBusy(true); setError(""); setOutput(""); const started = performance.now();
    try {
      const result = await chatWithPuter({ messages: [{ role: "system", content: system }, { role: "user", content: prompt }], pinnedModel: model, preferTestMode: !signedIn, onDelta: setOutput });
      const text = result.text || output || "(empty response)";
      setOutput(text); setHistory((prev) => [{ id: Date.now(), model: result.model.id, prompt, output: text, ms: Math.round(performance.now() - started), ok: true }, ...prev].slice(0, 12));
    } catch (err) { const message = err instanceof Error ? err.message : "Model did not respond"; setError(message); setHistory((prev) => [{ id: Date.now(), model, prompt, output: message, ms: Math.round(performance.now() - started), ok: false }, ...prev].slice(0, 12)); }
    finally { setBusy(false); }
  };
  const runCode = () => { setLogs([]); setNonce((n) => n + 1); };
  const copyOutput = () => void navigator.clipboard?.writeText(output);
  const th = language === "th";

  return <div className="flex h-full min-h-0 flex-col"><header className="border-b border-border px-4 py-3 sm:px-6"><div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-xl border border-border bg-secondary text-lime-300"><FlaskConical className="size-4" /></span><div><p className="text-[10px] uppercase tracking-[0.2em] text-subtle">{th ? "LAB MODE" : "LAB MODE"}</p><h2 className="font-display text-xl tracking-tight">{th ? "Prompt Lab" : "Prompt Lab"}</h2></div></div><div className="flex rounded-full border border-border p-0.5 text-xs"><button type="button" className={`rounded-full px-3 py-1.5 ${tab === "prompt" ? "bg-secondary text-foreground" : "text-subtle"}`} onClick={() => setTab("prompt")}><SlidersHorizontal className="mr-1 inline size-3.5" />Prompt</button><button type="button" className={`rounded-full px-3 py-1.5 ${tab === "code" ? "bg-secondary text-foreground" : "text-subtle"}`} onClick={() => setTab("code")}><Braces className="mr-1 inline size-3.5" />Code</button></div></div><p className="mt-1 text-xs text-muted-foreground">{th ? "ทดลอง prompt และโมเดลหลายแบบใน workspace เดียว" : "Test prompts and multiple models in one workspace"}</p></header>
    {tab === "prompt" ? <div className="grid min-h-0 flex-1 gap-4 overflow-y-auto p-4 sm:p-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_280px]"><section className="space-y-4"><div className="rounded-2xl border border-border bg-card/50 p-4"><div className="flex items-center justify-between"><label className="text-xs font-medium">{th ? "โมเดล" : "Model"}</label><span className="text-[10px] text-lime-300">{signedIn ? "Puter connected" : "Puter sign-in required"}</span></div><select value={model} onChange={(e) => setModel(e.target.value)} className="mt-2 h-10 w-full rounded-xl border border-border bg-background px-3 text-xs outline-none">{models.map((item) => <option key={item.id} value={item.id}>{item.label} · {item.vendor}</option>)}</select><div className="mt-3 grid grid-cols-2 gap-2"><label className="text-[10px] text-subtle">Temperature<input value={temperature} onChange={(e) => setTemperature(e.target.value)} className="mt-1 h-9 w-full rounded-lg border border-border bg-background px-2 text-xs outline-none" /></label><label className="text-[10px] text-subtle">Max tokens<input value={maxTokens} onChange={(e) => setMaxTokens(e.target.value)} className="mt-1 h-9 w-full rounded-lg border border-border bg-background px-2 text-xs outline-none" /></label></div><p className="mt-2 text-[10px] text-subtle">{th ? `ค่าพารามิเตอร์แสดงเพื่อเทียบการทดลอง · ${shortModelLabel(model)}` : `Parameters are shown for experiment notes · ${shortModelLabel(model)}`}</p></div><div className="rounded-2xl border border-border bg-card/50 p-4"><label className="text-xs font-medium">System prompt</label><textarea value={system} onChange={(e) => setSystem(e.target.value)} rows={4} className="mt-2 w-full resize-y rounded-xl border border-border bg-background p-3 text-xs leading-relaxed outline-none" /><label className="mt-4 block text-xs font-medium">User prompt</label><textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={7} className="mt-2 w-full resize-y rounded-xl border border-border bg-background p-3 text-sm leading-relaxed outline-none" /><div className="mt-3 flex gap-2"><Button onClick={() => void runPrompt()} disabled={busy || !prompt.trim()} className="h-10"><Send className="size-3.5" />{busy ? "Running…" : "Run prompt"}</Button><Button variant="secondary" onClick={() => { setPrompt(""); setOutput(""); setError(""); }} className="h-10"><Eraser className="size-3.5" />Clear</Button><span className="flex items-center rounded-lg border border-border px-3 text-[10px] text-lime-300">บอทเรียกใช้ได้: “เรียก Prompt Lab …”</span></div>{error ? <p className="mt-3 text-xs text-destructive">{error}</p> : null}</div></section><section className="flex min-h-[360px] flex-col rounded-2xl border border-border bg-card/50"><div className="flex items-center justify-between border-b border-border p-4"><div><h3 className="text-sm font-medium">Output</h3><p className="mt-1 text-[10px] text-subtle">{shortModelLabel(model)} · {temperature} temp · {maxTokens} max</p></div><Button variant="ghost" size="icon" className="size-8" onClick={copyOutput} aria-label="Copy output"><Copy className="size-3.5" /></Button></div><div className="boss-scroll flex-1 overflow-y-auto p-4 text-sm leading-7">{busy && !output ? <p className="animate-pulse text-subtle">Model is thinking…</p> : output ? <p className="whitespace-pre-wrap">{output}</p> : <p className="text-subtle">Run a prompt to see the response.</p>}</div></section><aside className="rounded-2xl border border-border bg-card/50"><div className="flex items-center justify-between border-b border-border p-4"><h3 className="text-sm font-medium">Run history</h3><Clock3 className="size-4 text-subtle" /></div><div className="divide-y divide-border">{history.length === 0 ? <p className="p-5 text-xs text-subtle">No runs yet.</p> : history.map((run) => <button key={run.id} type="button" onClick={() => { setModel(run.model); setPrompt(run.prompt); setOutput(run.output); }} className="w-full p-3 text-left hover:bg-secondary/40"><div className="flex items-center justify-between gap-2"><span className="truncate text-xs font-medium">{shortModelLabel(run.model)}</span><span className={run.ok ? "text-lime-300" : "text-rose-300"}>{run.ok ? "OK" : "ERR"}</span></div><p className="mt-1 line-clamp-2 text-[10px] text-muted-foreground">{run.prompt}</p><p className="mt-1 text-[10px] text-subtle">{run.ms}ms</p></button>)}</div></aside></div> : <div className="grid min-h-0 flex-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1"><div className="flex min-h-0 flex-col border-b border-border lg:border-b-0 lg:border-r"><div className="flex items-center justify-between border-b border-border px-4 py-2"><span className="text-[10px] uppercase tracking-wider text-subtle">JavaScript Sandbox</span><Button size="sm" className="h-8" onClick={runCode}><Play className="size-3.5" />{t.sandboxRun}</Button></div><textarea value={sandboxCode} onChange={(e) => setSandboxCode(e.target.value)} spellCheck={false} className="boss-scroll h-full min-h-[180px] resize-none bg-background p-4 font-mono text-xs text-foreground outline-none" /></div><div className="flex min-h-0 flex-col"><iframe title="sandbox" sandbox="allow-scripts" srcDoc={srcDoc} className="h-1/2 min-h-[120px] w-full border-b border-border bg-background" /><div className="boss-scroll min-h-0 flex-1 overflow-y-auto bg-card px-4 py-3 font-mono text-xs"><p className="mb-2 text-[10px] uppercase tracking-wider text-subtle">{t.sandboxConsole}</p>{logs.length === 0 ? <p className="text-subtle">—</p> : logs.map((l, i) => <p key={i} className={l.kind === "err" ? "text-destructive" : "text-muted-foreground"}>{l.text}</p>)}</div></div></div>}
  </div>;
}
