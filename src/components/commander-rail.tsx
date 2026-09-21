import { Activity, Bot, Boxes, Code2, FileSearch, GitBranch, Globe2, Layers3, Search, ShieldCheck, Sparkles, Wrench, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WorkspaceMode } from "@/lib/store";

type CommanderRailProps = {
  activeMode: WorkspaceMode;
  onMode: (mode: WorkspaceMode) => void;
  onAgents: () => void;
  onForge: () => void;
  language: "th" | "en";
};

const labels = {
  th: {
    commander: "COMMANDER",
    newTask: "งานใหม่",
    workspace: "WORKSPACE",
    tools: "TOOLS",
    agents: "AGENTS",
    trace: "TRACE",
    results: "RESULTS",
    connect: "CONNECT",
    research: "Research",
    build: "Build",
    browser: "Browser",
    code: "Code",
    files: "Files",
    deploy: "Deploy",
    mcp: "MCP",
    live: "Live",
    settings: "ตั้งค่า",
    botflow: "BotFlow",
  },
  en: {
    commander: "COMMANDER",
    newTask: "New task",
    workspace: "WORKSPACE",
    tools: "TOOLS",
    agents: "AGENTS",
    trace: "TRACE",
    results: "RESULTS",
    connect: "CONNECT",
    research: "Research",
    build: "Build",
    browser: "Browser",
    code: "Code",
    files: "Files",
    deploy: "Deploy",
    mcp: "MCP",
    live: "Live",
    settings: "Settings",
    botflow: "BotFlow",
  },
} as const;

const workspaceItems: { mode: WorkspaceMode; icon: LucideIcon; key: "newTask" | "research" | "build" | "browser" | "code" | "live" | "botflow" }[] = [
  { mode: "command", icon: Sparkles, key: "newTask" },
  { mode: "manus", icon: Globe2, key: "browser" },
  { mode: "sandbox", icon: Code2, key: "code" },
  { mode: "live", icon: Activity, key: "live" },
  { mode: "super", icon: Bot, key: "research" },
  { mode: "apps", icon: Boxes, key: "build" },
  { mode: "botflow", icon: GitBranch, key: "botflow" },
];

const toolItems: { icon: LucideIcon; key: "research" | "code" | "browser" | "files" | "deploy" | "mcp" }[] = [
  { icon: Search, key: "research" },
  { icon: Code2, key: "code" },
  { icon: Globe2, key: "browser" },
  { icon: FileSearch, key: "files" },
  { icon: GitBranch, key: "deploy" },
  { icon: Wrench, key: "mcp" },
];

export function CommanderRail({ activeMode, onMode, onAgents, onForge, language }: CommanderRailProps) {
  const t = labels[language];

  return (
    <aside className="hidden w-[232px] shrink-0 border-r border-border bg-card/30 xl:flex xl:flex-col">
      <div className="border-b border-border p-3">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-xl border border-border bg-secondary">
            <Sparkles className="size-4 text-brand" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-wider">{t.commander}</p>
            <p className="text-[10px] text-subtle">Goal → Plan → Execute</p>
          </div>
        </div>
        <button type="button" onClick={() => onMode("command")} className="mt-3 flex w-full items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-left text-xs font-medium transition hover:bg-secondary">
          <Sparkles className="size-3.5" />
          {t.newTask}
          <span className="ml-auto text-[10px] text-subtle">⌘K</span>
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-2.5">
        <p className="px-2 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-subtle">{t.workspace}</p>
        <nav className="space-y-0.5">
          {workspaceItems.map((item) => (
            <button key={item.mode} type="button" onClick={() => onMode(item.mode)} className={cn("flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs transition", activeMode === item.mode ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground")}>
              <item.icon className="size-3.5" />
              <span>{t[item.key]}</span>
              {activeMode === item.mode ? <span className="ml-auto size-1.5 rounded-full bg-lime-300" /> : null}
            </button>
          ))}
        </nav>

        <p className="mt-4 px-2 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-subtle">{t.tools}</p>
        <div className="grid grid-cols-2 gap-1">
          {toolItems.map((item) => (
            <div key={item.key} className="flex items-center gap-1.5 rounded-lg border border-border/70 bg-background/60 px-2 py-2 text-[10px] text-muted-foreground" title={t[item.key]}>
              <item.icon className="size-3" />
              {t[item.key]}
            </div>
          ))}
        </div>

        <p className="mt-4 px-2 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-subtle">{t.agents}</p>
        <button type="button" onClick={onAgents} className="flex w-full items-center gap-2 rounded-lg border border-border bg-background/60 px-2.5 py-2 text-left text-xs text-muted-foreground transition hover:bg-secondary hover:text-foreground">
          <Bot className="size-3.5" />
          Agent Registry
          <span className="ml-auto">›</span>
        </button>

        <button type="button" onClick={onForge} className="mt-1 flex w-full items-center gap-2 rounded-lg border border-border bg-background/60 px-2.5 py-2 text-left text-xs text-muted-foreground transition hover:bg-secondary hover:text-foreground">
          <Layers3 className="size-3.5" />
          {t.connect}
          <span className="ml-auto">›</span>
        </button>
      </div>

      <div className="border-t border-border p-2.5">
        <div className="grid grid-cols-3 gap-1 text-[9px] text-subtle">
          <div className="rounded-lg bg-secondary/50 px-2 py-2 text-center"><Activity className="mx-auto mb-1 size-3" />{t.trace}</div>
          <div className="rounded-lg bg-secondary/50 px-2 py-2 text-center"><ShieldCheck className="mx-auto mb-1 size-3" />{t.results}</div>
          <div className="rounded-lg bg-secondary/50 px-2 py-2 text-center"><Wrench className="mx-auto mb-1 size-3" />{t.settings}</div>
        </div>
      </div>
    </aside>
  );
}
