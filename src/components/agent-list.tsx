import { ROLE_META, roleLabel } from "@/lib/agents";
import { COPY } from "@/lib/copy";
import { useBossStore } from "@/lib/store";
import { cn, relativeTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function AgentList({ onSelect }: { onSelect?: () => void }) {
  const language = useBossStore((s) => s.language);
  const agents = useBossStore((s) => s.agents);
  const activeAgentId = useBossStore((s) => s.activeAgentId);
  const setActiveAgent = useBossStore((s) => s.setActiveAgent);
  const retireAgent = useBossStore((s) => s.retireAgent);
  const t = COPY[language];
  const specialists = agents.filter((a) => !a.pinned);
  const core = agents.filter((a) => a.pinned);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="border-b border-border px-5 py-4">
        <p className="text-xs uppercase tracking-[0.18em] text-subtle">{t.registry}</p>
        <h2 className="mt-1 font-display text-xl tracking-tight">
          {language === "th" ? "เอเจนต์ที่ทำงานอยู่" : "Live agents"}{" "}
          <span className="ml-2 font-sans text-sm text-muted-foreground">{agents.length}</span>
        </h2>
      </div>
      <div className="boss-scroll flex-1 space-y-2 overflow-y-auto px-3 py-3">
        {[...core, ...specialists].map((agent) => {
          const Icon = ROLE_META[agent.role].icon;
          const selected = agent.id === activeAgentId;
          return (
            <div
              key={agent.id}
              className={cn(
                "rounded-[var(--radius-lg)] border p-3 transition-[background-color,border-color] duration-[var(--motion-quick)]",
                selected ? "border-border-strong bg-secondary" : "border-transparent hover:bg-secondary/50",
              )}
            >
              <button
                type="button"
                className="flex w-full items-start gap-3 text-left"
                onClick={() => {
                  setActiveAgent(agent.id);
                  onSelect?.();
                }}
              >
                <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-[12px] border border-border bg-background">
                  <Icon className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium">{roleLabel(agent.role, language)}</span>
                    <span className="text-[11px] tabular-nums text-subtle">
                      {agent.messageCount} {t.msgs}
                    </span>
                  </span>
                  <span className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{agent.task}</span>
                  <span className="mt-1 block text-[11px] text-subtle">{relativeTime(agent.createdAt, language)}</span>
                </span>
              </button>
              {selected && !agent.pinned ? (
                <Button
                  variant="destructive"
                  size="sm"
                  className="mt-2 h-9 w-full"
                  onClick={() => retireAgent(agent.id)}
                >
                  {t.retire}
                </Button>
              ) : null}
            </div>
          );
        })}
        {specialists.length === 0 ? (
          <p className="px-2 py-8 text-center text-sm text-subtle">{t.emptyAgents}</p>
        ) : null}
      </div>
    </div>
  );
}
