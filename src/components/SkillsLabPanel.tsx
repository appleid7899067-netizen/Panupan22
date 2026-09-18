import { useState } from "react";
import { Loader2, Sparkles, Wrench } from "lucide-react";
import { MemoryPanel } from "@/components/MemoryPanel";
import { SkillCallCard } from "@/components/SkillCallCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  createSkillCall,
  executeSkill,
  SKILLS,
} from "@/lib/bossnugrok/skills";
import type { SkillCall } from "@/lib/bossnugrok/skills/skill-types";
import { useBossStore } from "@/lib/store";

export function SkillsLabPanel() {
  const language = useBossStore((s) => s.language);
  const th = language === "th";
  const [input, setInput] = useState("");
  const [call, setCall] = useState<SkillCall | null>(null);
  const [busy, setBusy] = useState(false);

  const run = async (seed?: SkillCall) => {
    const next =
      seed ??
      createSkillCall(input) ??
      ({
        id: `skill_${Date.now().toString(36)}`,
        skillId: "daily-fixer" as const,
        args: { action: "get-insights" },
        status: "running" as const,
      } satisfies SkillCall);

    if (next.status === "pending" && !seed) {
      setCall(next);
      return;
    }

    setBusy(true);
    setCall({ ...next, status: "running", streamOutput: "" });

    const updated = await executeSkill(
      { ...next, status: "running" },
      (chunk) => {
        setCall((prev) =>
          prev
            ? {
                ...prev,
                streamOutput: (prev.streamOutput ?? "") + chunk,
                status: "running",
              }
            : prev,
        );
      },
    );
    setCall(updated);
    setBusy(false);
  };

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-border bg-card/50 p-4">
        <div className="flex items-center gap-2">
          <Wrench className="size-4 text-violet-300" />
          <h3 className="text-sm font-medium">
            {th ? "ห้องทดลองทักษะ" : "Skills Lab"}
          </h3>
        </div>
        <p className="mt-1 text-[11px] text-muted-foreground">
          {th
            ? "รัน skill แบบปลอดภัยในเบราว์เซอร์ — ไม่แทนที่แชทหลัก"
            : "Browser-safe skills — does not replace the main chat"}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {SKILLS.map((skill) => (
            <button
              key={skill.id}
              type="button"
              className="rounded-full border border-border bg-background px-2.5 py-1 text-[10px] text-muted-foreground hover:bg-secondary"
              onClick={() =>
                setInput(
                  skill.id === "code-runner"
                    ? 'รันโค้ดนี้:\n```js\nconsole.log("BossnuGrok ready")\nconst sum = [1,2,3].reduce((a,b)=>a+b,0)\nconsole.log("sum", sum)\n```'
                    : skill.id === "web-search"
                      ? "ค้นหา multi-agent systems 2026"
                      : skill.id === "link-follower"
                        ? "อ่านลิงก์ https://example.com"
                        : skill.id === "doc-reader"
                          ? "อ่านเอกสาร สรุปสั้น: BossnuGrok is an AI commander workspace with agents, sandbox, and skills."
                          : "ดูบทเรียนวันนี้",
                )
              }
            >
              {skill.icon} {th ? skill.nameTh : skill.name}
            </button>
          ))}
        </div>

        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={th ? "พิมพ์คำสั่ง skill…" : "Type a skill command…"}
          className="mt-3 min-h-[88px] resize-none border-border bg-background"
          disabled={busy}
        />

        <div className="mt-3 flex justify-end">
          <Button
            size="sm"
            className="h-9 gap-1.5"
            disabled={busy || !input.trim()}
            onClick={() => void run()}
          >
            {busy ? <Loader2 className="size-3.5 animate-spin" /> : <Sparkles className="size-3.5" />}
            {th ? "รันทักษะ" : "Run skill"}
          </Button>
        </div>
      </section>

      {call ? (
        <SkillCallCard
          call={call}
          onApprove={() => void run({ ...call, status: "running" })}
          onReject={() => setCall(null)}
        />
      ) : null}

      <MemoryPanel />
    </div>
  );
}
