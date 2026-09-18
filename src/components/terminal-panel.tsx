import { useMemo, useState } from "react";
import { ChevronRight, Circle, Copy, Play, RotateCcw, Terminal as TerminalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Line = { type: "command" | "output" | "error"; text: string };

const HELP = ["help", "status", "agents", "models", "clear"];

export function TerminalPanel() {
  const [command, setCommand] = useState("");
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: "GrokSuper Terminal v0.1 · browser-safe preview" },
    { type: "output", text: "Type help to see available commands." },
  ]);

  const prompt = useMemo(() => (typeof window === "undefined" ? "bossg@web" : "bossg@" + window.location.hostname), []);
  const run = () => {
    const value = command.trim();
    if (!value) return;
    if (value === "clear") {
      setLines([]);
      setCommand("");
      return;
    }
    const output: Line = value === "help"
      ? { type: "output", text: "help · status · agents · models · clear" }
      : value === "status"
        ? { type: "output", text: "LIVE preview · Puter optional · no server shell access" }
        : value === "agents"
          ? { type: "output", text: "Commander online · specialists ready" }
          : value === "models"
            ? { type: "output", text: "Auto · Grok · Puter catalog (when connected)" }
            : { type: "error", text: `Command not available in preview: ${value}` };
    const nextLines: Line[] = [{ type: "command", text: value }, output];
    setLines((prev) => [...prev, ...nextLines].slice(-40));
    setCommand("");
  };
  const reset = () => setLines([{ type: "output", text: "Terminal reset. Browser-safe preview ready." }]);

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#090b0d] text-[#d9ff3f]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]"><TerminalIcon className="size-4" /></span><div><p className="text-[10px] tracking-[0.2em] text-white/40">GROKSUPER TOOL</p><h2 className="font-display text-xl text-white">Terminal</h2></div></div>
        <Button variant="ghost" size="sm" className="text-white/50 hover:text-white" onClick={reset}><RotateCcw className="size-3.5" /> Reset</Button>
      </div>
      <div className="flex flex-wrap gap-2 border-b border-white/10 px-4 py-3 text-[11px] text-white/50 sm:px-6"><span className="inline-flex items-center gap-1.5"><Circle className="size-2 fill-lime-300 text-lime-300" /> Browser-safe</span><span>·</span><span>No OS shell access</span>{HELP.map((item) => <button key={item} type="button" className="rounded-md border border-white/10 px-2 py-1 font-mono hover:border-lime-300/50 hover:text-lime-200" onClick={() => setCommand(item)}>{item}</button>)}</div>
      <div className="min-h-0 flex-1 overflow-y-auto p-4 font-mono text-xs leading-6 sm:p-6">{lines.map((line, index) => <div key={`${index}-${line.text}`} className={cn(line.type === "command" ? "text-white" : line.type === "error" ? "text-rose-300" : "text-white/60")}><span className={line.type === "command" ? "text-lime-300" : "text-white/20"}>{line.type === "command" ? `${prompt} $ ` : "  "}</span>{line.text}</div>)}</div>
      <div className="border-t border-white/10 p-4 sm:p-6"><div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-3 py-2"><ChevronRight className="size-4 shrink-0 text-lime-300" /><input value={command} onChange={(e) => setCommand(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") run(); }} placeholder="ลองพิมพ์ help หรือ status" className="min-w-0 flex-1 bg-transparent font-mono text-xs text-white outline-none placeholder:text-white/25" /><Button size="sm" className="h-8" onClick={run}><Play className="size-3.5" /> Run</Button></div><p className="mt-2 text-[10px] text-white/30">Terminal v0 เป็น command simulator ที่ปลอดภัย ไม่รันคำสั่งบนเซิร์ฟเวอร์</p></div>
    </div>
  );
}
