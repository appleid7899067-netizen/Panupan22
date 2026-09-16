import { useState } from "react";
import { Hammer, ImagePlus, LayoutGrid, LogOut, SquareTerminal } from "lucide-react";
import { AgentList } from "@/components/agent-list";
import { ChatPanel } from "@/components/chat-panel";
import { CreatePanel } from "@/components/create-panel";
import { ForgePanel } from "@/components/forge-panel";
import { SandboxPanel } from "@/components/sandbox-panel";
import { AppMark, PuterMark } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { APP_DEVELOPER, APP_SHORT_NAME } from "@/lib/brand";
import { COPY } from "@/lib/copy";
import { usePuterAuth } from "@/lib/puter-auth";
import { useBossStore, type WorkspaceMode } from "@/lib/store";
import { cn } from "@/lib/utils";

const MODES: { id: WorkspaceMode; icon: typeof ImagePlus }[] = [
  { id: "command", icon: LayoutGrid },
  { id: "create", icon: ImagePlus },
  { id: "sandbox", icon: SquareTerminal },
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

  const syncLabel =
    syncStatus === "synced" ? t.synced : syncStatus === "syncing" ? t.syncing : syncStatus === "error" ? t.syncError : null;

  const modeLabel = (id: WorkspaceMode) =>
    id === "create" ? t.modeCreate : id === "sandbox" ? t.modeSandbox : t.modeCommand;

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-background">
      <header className="flex items-center gap-2 border-b border-border px-3 py-2.5 sm:px-4">
        <AppMark className="size-8 shrink-0 text-brand" />
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg leading-none tracking-tight">{APP_SHORT_NAME}</p>
          <p className="truncate text-[11px] text-subtle">
            {t.developedBy}
            {signedIn ? ` · ${user?.username ?? "Puter"}` : ""}
            {syncLabel ? ` · ${syncLabel}` : ""}
          </p>
        </div>
        <div className="hidden rounded-full border border-border p-0.5 sm:flex">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setWorkspaceMode(m.id)}
              className={cn(
                "inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs",
                workspaceMode === m.id ? "bg-secondary text-foreground" : "text-muted-foreground",
              )}
            >
              <m.icon className="size-3.5" />
              {modeLabel(m.id)}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <div className="flex rounded-full border border-border p-0.5 text-[11px]">
            <button
              type="button"
              className={cn("h-7 rounded-full px-2.5", language === "th" ? "bg-secondary" : "text-muted-foreground")}
              onClick={() => setLanguage("th")}
            >
              TH
            </button>
            <button
              type="button"
              className={cn("h-7 rounded-full px-2.5", language === "en" ? "bg-secondary" : "text-muted-foreground")}
              onClick={() => setLanguage("en")}
            >
              EN
            </button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-10 lg:hidden"
            onClick={() => setAgentsOpen(true)}
            aria-label={t.registry}
          >
            <LayoutGrid className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-10 xl:hidden"
            onClick={() => setForgeOpen(true)}
            aria-label={t.forge}
          >
            <Hammer className="size-4" />
          </Button>
          {signedIn ? (
            <Button variant="ghost" size="icon" className="size-10" onClick={() => void signOut()} aria-label={t.signOut}>
              <LogOut className="size-4" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="size-10"
              onClick={() => void signIn()}
              disabled={pending}
              aria-label={t.signInNow}
            >
              <PuterMark className="size-4" />
            </Button>
          )}
        </div>
      </header>

      <div className="flex gap-1 border-b border-border px-3 py-2 sm:hidden">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setWorkspaceMode(m.id)}
            className={cn(
              "inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-[var(--radius-md)] text-xs",
              workspaceMode === m.id ? "bg-secondary text-foreground" : "text-muted-foreground",
            )}
          >
            <m.icon className="size-3.5" />
            {modeLabel(m.id)}
          </button>
        ))}
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)_320px]">
        <aside className="hidden min-h-0 border-r border-border lg:block">
          <AgentList />
        </aside>
        <main className="flex min-h-0 flex-col">
          <div className="min-h-0 flex-1">
            {workspaceMode === "create" ? (
              <CreatePanel />
            ) : workspaceMode === "sandbox" ? (
              <SandboxPanel />
            ) : (
              <ChatPanel />
            )}
          </div>
        </main>
        <aside className="hidden min-h-0 border-l border-border xl:block">
          <ForgePanel />
        </aside>
      </div>

      <p className="hidden border-t border-border px-4 py-1.5 text-center text-[10px] tracking-wide text-subtle sm:block">
        {APP_SHORT_NAME} · {APP_DEVELOPER}
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
