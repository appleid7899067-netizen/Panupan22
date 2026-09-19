import { useEffect, useState } from "react";
import {
  Activity,
  Box,
  Hammer,
  ImagePlus,
  LayoutGrid,
  Library,
  LogOut,
  Radio,
  Sparkles,
  SquareTerminal,
  Terminal,
} from "lucide-react";
import { AgentList } from "@/components/agent-list";
import { ChatPanel } from "@/components/chat-panel";
import { CreatePanel } from "@/components/create-panel";
import { ForgePanel } from "@/components/forge-panel";
import { LiveStreamPanel } from "@/components/live-stream-panel";
import { GrokSuperPanel } from "@/components/grok-super-panel";
import { SandboxPanel } from "@/components/sandbox-panel";
import { TerminalPanel } from "@/components/terminal-panel";
import { ManusHubPanel } from "@/components/manus-hub-panel";
import { AppsPanel } from "@/components/apps-panel";
import { AppMark, PuterMark } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { APP_DEVELOPER, APP_SHORT_NAME } from "@/lib/brand";
import {
  isAutoPilotRunning,
  startAutoPilot,
  stopAutoPilot,
  subscribeAutoPilot,
  type AutoPilotEvent,
} from "@/lib/bossnugrok/auto-pilot";
import { COPY } from "@/lib/copy";
import { usePuterAuth } from "@/lib/puter-auth";
import { useBossStore, type WorkspaceMode } from "@/lib/store";
import { cn } from "@/lib/utils";

const MODES: { id: WorkspaceMode; icon: typeof ImagePlus; color: string }[] = [
  { id: "command", icon: LayoutGrid, color: "text-cyan-300" },
  { id: "apps", icon: Box, color: "text-emerald-300" },
  { id: "manus", icon: Library, color: "text-violet-300" },
  { id: "create", icon: ImagePlus, color: "text-pink-300" },
  { id: "sandbox", icon: SquareTerminal, color: "text-amber-300" },
  { id: "live", icon: Activity, color: "text-lime-300" },
  { id: "terminal", icon: Terminal, color: "text-sky-300" },
  { id: "super", icon: Sparkles, color: "text-yellow-300" },
];

export function CommandCenter() {
  const language = useBossStore((s) => s.language);
  const setLanguage = useBossStore((s) => s.setLanguage);
  const workspaceMode = useBossStore((s) => s.workspaceMode);
  const setWorkspaceMode = useBossStore((s) => s.setWorkspaceMode);
  const t = COPY[language];
  const { status, user, signIn, signOut, pending, syncStatus } = usePuterAuth();
  const signedIn = status === "signed_in";
  const [agentsOpen, setAgentsOpen] = useState(false);
  const [forgeOpen, setForgeOpen] = useState(false);
  // null until client mount — avoids SSR/client text mismatch (React #418)
  const [now, setNow] = useState<Date | null>(null);
  const [autoOn, setAutoOn] = useState(false);
  const [lastPulse, setLastPulse] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  // Auto-pilot starts on by default for continuous receive/run feel
  useEffect(() => {
    startAutoPilot(4000);
    setAutoOn(true);
    const unsub = subscribeAutoPilot((events: AutoPilotEvent[]) => {
      if (events[0]) setLastPulse(events[0].detail);
    });
    return () => {
      unsub();
      stopAutoPilot();
    };
  }, []);

  const toggleAuto = () => {
    if (isAutoPilotRunning()) {
      stopAutoPilot();
      setAutoOn(false);
    } else {
      startAutoPilot(4000);
      setAutoOn(true);
    }
  };

  const syncLabel =
    syncStatus === "synced"
      ? t.synced
      : syncStatus === "syncing"
        ? t.syncing
        : syncStatus === "error"
          ? t.syncError
          : null;

  const modeLabel = (id: WorkspaceMode) =>
    id === "apps"
      ? language === "th"
        ? "แอพ"
        : "Apps"
      : id === "create"
        ? t.modeCreate
        : id === "sandbox"
          ? t.modeSandbox
          : id === "live"
            ? t.modeLive
            : id === "terminal"
              ? t.modeTerminal
              : id === "super"
                ? t.modeSuper
                : id === "manus"
                  ? t.modeManus
                  : t.modeCommand;

  const clockText =
    mounted && now
      ? now.toLocaleTimeString(language === "th" ? "th-TH" : "en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      : "\u00a0\u00a0:\u00a0\u00a0:\u00a0\u00a0";

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-background">
      <div className="flex items-center justify-between gap-3 border-b border-border bg-card/40 px-3 py-1.5 text-[10px] sm:px-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="inline-flex items-center gap-1.5 font-semibold tracking-wider text-lime-300">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-1.5 animate-ping rounded-full bg-lime-300 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-lime-300" />
            </span>
            LIVE
          </span>
          <button
            type="button"
            onClick={toggleAuto}
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-semibold tracking-wider",
              autoOn
                ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-300"
                : "border-border text-muted-foreground",
            )}
            title={language === "th" ? "ระบบอัตโนมัติ" : "Auto-pilot"}
          >
            <span
              className={cn(
                "size-1.5 rounded-full",
                autoOn ? "animate-pulse bg-cyan-300" : "bg-muted-foreground",
              )}
            />
            AUTO
          </button>
          <span className="hidden text-muted-foreground sm:inline" suppressHydrationWarning>
            {clockText}
          </span>
          {mounted && lastPulse && autoOn ? (
            <span className="hidden truncate text-muted-foreground md:inline">
              · {lastPulse}
            </span>
          ) : null}
          {syncLabel ? (
            <span className="text-muted-foreground">· {syncLabel}</span>
          ) : null}
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Radio className="size-3 text-lime-300" />
          <span className="hidden sm:inline">
            {signedIn ? (user?.username ?? "Puter") : t.guest}
          </span>
        </div>
      </div>

      <header className="flex items-center gap-2 border-b border-border px-3 py-2 sm:px-4">
        <AppMark className="size-8 shrink-0 text-brand" />
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg leading-none tracking-tight">
            {APP_SHORT_NAME}
          </p>
          <p className="truncate text-[11px] text-subtle">
            {t.developedBy}
            {signedIn ? ` · ${user?.username ?? "Puter"}` : ""}
          </p>
        </div>

        <div className="hidden max-w-[55vw] items-center gap-0.5 overflow-x-auto rounded-2xl border border-border bg-card/50 p-1 sm:flex">
          {MODES.map((m) => {
            const active = workspaceMode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setWorkspaceMode(m.id)}
                className={cn(
                  "inline-flex h-8 items-center gap-1.5 rounded-xl px-3 text-xs font-medium transition-all",
                  active
                    ? "bg-secondary text-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                )}
              >
                <m.icon className={cn("size-3.5", active ? m.color : "")} />
                <span className="hidden md:inline">{modeLabel(m.id)}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1">
          <div className="flex rounded-full border border-border p-0.5 text-[11px]">
            <button
              type="button"
              className={cn(
                "h-7 rounded-full px-2.5",
                language === "th" ? "bg-secondary" : "text-muted-foreground",
              )}
              onClick={() => setLanguage("th")}
            >
              TH
            </button>
            <button
              type="button"
              className={cn(
                "h-7 rounded-full px-2.5",
                language === "en" ? "bg-secondary" : "text-muted-foreground",
              )}
              onClick={() => setLanguage("en")}
            >
              EN
            </button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="size-9 lg:hidden"
            onClick={() => setAgentsOpen(true)}
            aria-label={t.registry}
          >
            <LayoutGrid className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-9 xl:hidden"
            onClick={() => setForgeOpen(true)}
            aria-label={t.forge}
          >
            <Hammer className="size-4" />
          </Button>

          {signedIn ? (
            <Button
              variant="ghost"
              size="icon"
              className="size-9"
              onClick={() => void signOut()}
              aria-label={t.signOut}
            >
              <LogOut className="size-4" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="size-9"
              onClick={() => void signIn()}
              disabled={pending}
              aria-label={t.continuePuter}
            >
              <PuterMark className="size-4" />
            </Button>
          )}
        </div>
      </header>

      <div className="flex gap-1.5 overflow-x-auto border-b border-border px-3 py-2 sm:hidden">
        {MODES.map((m) => {
          const active = workspaceMode === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setWorkspaceMode(m.id)}
              className={cn(
                "inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-xl px-3.5 text-xs font-medium",
                active
                  ? "bg-secondary text-foreground"
                  : "bg-card/60 text-muted-foreground",
              )}
            >
              <m.icon className={cn("size-3.5", active ? m.color : "")} />
              {modeLabel(m.id)}
            </button>
          );
        })}
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)_300px]">
        <aside className="hidden min-h-0 border-r border-border lg:block">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-subtle">
                {t.registry}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] text-lime-300">
                <span className="size-1.5 rounded-full bg-lime-300" />
                LIVE
              </span>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">
              <AgentList />
            </div>
          </div>
        </aside>

        <main className="flex min-h-0 flex-col">
          <div className="min-h-0 flex-1">
            {workspaceMode === "apps" ? (
              <AppsPanel />
            ) : workspaceMode === "create" ? (
              <CreatePanel />
            ) : workspaceMode === "sandbox" ? (
              <SandboxPanel />
            ) : workspaceMode === "live" ? (
              <LiveStreamPanel />
            ) : workspaceMode === "terminal" ? (
              <TerminalPanel />
            ) : workspaceMode === "super" ? (
              <GrokSuperPanel />
            ) : workspaceMode === "manus" ? (
              <ManusHubPanel />
            ) : (
              <ChatPanel />
            )}
          </div>
        </main>

        <aside className="hidden min-h-0 border-l border-border xl:block">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-subtle">
                {t.forge}
              </span>
              <Hammer className="size-3.5 text-muted-foreground" />
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">
              <ForgePanel />
            </div>
          </div>
        </aside>
      </div>

      <p className="hidden border-t border-border px-4 py-1.5 text-center text-[10px] tracking-wide text-subtle sm:block" suppressHydrationWarning>
        {APP_SHORT_NAME} · {APP_DEVELOPER} · Real-time
        {mounted && autoOn ? " · AUTO" : ""}
      </p>

      <Sheet open={agentsOpen} onOpenChange={setAgentsOpen}>
        <SheetContent side="left" className="pt-10">
          <SheetTitle className="sr-only">{t.registry}</SheetTitle>
          <AgentList onSelect={() => setAgentsOpen(false)} />
        </SheetContent>
      </Sheet>
      <Sheet open={forgeOpen} onOpenChange={setForgeOpen}>
        <SheetContent side="right" className="pt-10">
          <SheetTitle className="sr-only">{t.forge}</SheetTitle>
          <ForgePanel onForged={() => setForgeOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
