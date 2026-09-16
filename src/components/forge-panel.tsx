import { useState } from "react";
import { Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FORGEABLE_ROLES, ROLE_META, type AgentRole } from "@/lib/agents";
import { COPY } from "@/lib/copy";
import { useBossStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ForgePanel({ onForged }: { onForged?: () => void }) {
  const language = useBossStore((s) => s.language);
  const forgeAgent = useBossStore((s) => s.forgeAgent);
  const t = COPY[language];
  const [role, setRole] = useState<AgentRole>("teacher");
  const [task, setTask] = useState("");
  const [constraints, setConstraints] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const forge = () => {
    const trimmed = task.trim();
    if (trimmed.length < 10) {
      setError(t.taskTooShort);
      return;
    }
    setBusy(true);
    setError(null);
    forgeAgent({
      role,
      task: trimmed,
      constraints: constraints
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean),
    });
    setTask("");
    setConstraints("");
    setBusy(false);
    onForged?.();
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="border-b border-border px-5 py-4">
        <p className="text-xs uppercase tracking-[0.18em] text-subtle">{t.forge}</p>
        <h2 className="mt-1 font-display text-xl tracking-tight">{language === "th" ? "หล่อเอเจนต์" : "Forge"}</h2>
      </div>
      <div className="boss-scroll flex-1 space-y-4 overflow-y-auto px-5 py-4">
        <div>
          <label className="mb-2 block text-xs font-medium text-muted-foreground">{t.role}</label>
          <div className="grid grid-cols-2 gap-2">
            {FORGEABLE_ROLES.map((id) => {
              const meta = ROLE_META[id];
              const Icon = meta.icon;
              const selected = role === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setRole(id)}
                  className={cn(
                    "flex min-h-11 items-center gap-2 rounded-[var(--radius-md)] border px-3 py-2 text-left text-sm transition-[background-color,border-color] duration-[var(--motion-quick)]",
                    selected
                      ? "border-border-strong bg-secondary text-foreground"
                      : "border-border bg-transparent text-muted-foreground hover:bg-secondary/60",
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  <span className="truncate">{language === "th" ? meta.th : meta.en}</span>
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-xs leading-relaxed text-subtle">
            {language === "th" ? ROLE_META[role].hintTh : ROLE_META[role].hintEn}
          </p>
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-muted-foreground" htmlFor="mission">
            {t.mission}
          </label>
          <textarea
            id="mission"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder={t.missionPh}
            rows={5}
            className="w-full rounded-[var(--radius-lg)] border border-border bg-secondary px-3 py-2.5 text-sm text-foreground placeholder:text-subtle outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-muted-foreground" htmlFor="rules">
            {t.constraints}
          </label>
          <textarea
            id="rules"
            value={constraints}
            onChange={(e) => setConstraints(e.target.value)}
            placeholder={t.constraintsPh}
            rows={3}
            className="w-full rounded-[var(--radius-lg)] border border-border bg-secondary px-3 py-2.5 text-sm text-foreground placeholder:text-subtle outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
          />
        </div>

        {error ? <p className="text-xs text-destructive">{error}</p> : null}
      </div>
      <div className="border-t border-border p-4">
        <Button className="h-11 w-full rounded-[var(--radius-lg)]" onClick={forge} disabled={busy}>
          <Hammer className="size-4" />
          {busy ? t.forging : t.forgeCta}
        </Button>
      </div>
    </div>
  );
}
