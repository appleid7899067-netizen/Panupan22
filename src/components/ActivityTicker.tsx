import { useEffect, useMemo, useState } from "react";
import type { Lang } from "@/lib/copy";
import type { FlowStep, TimelineEvent } from "@/lib/bot-flow";

type Props = {
  language: Lang;
  steps?: FlowStep[];
  events?: TimelineEvent[];
};

const activityAnimation = "@keyframes boss-activity-pop { 0% { opacity: 0; transform: translate3d(0, 7px, 0) scale(.985); } 55% { opacity: 1; transform: translate3d(0, -1px, 0) scale(1.01); } 100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); } }";

export function ActivityTicker({ language, steps = [], events = [] }: Props) {
  const running = steps.find((step) => step.status === "running");
  const recentEvents = events.slice(-5).reverse();

  const lines = useMemo(() => {
    const prefix = language === "th" ? "กำลัง" : "Working on";
    const current = running
      ? `${prefix} ${running.detail || running.label}…`
      : language === "th"
        ? "กำลังทำงาน…"
        : "Working…";
    const eventLines = recentEvents.map((event) => event.label);
    return Array.from(new Set([current, ...eventLines])).slice(0, 4);
  }, [language, running?.id, running?.detail, running?.label, events.map((e) => e.id).join("|")]);

  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
    if (lines.length < 2) return;
    const timer = window.setInterval(() => {
      setActive((value) => (value + 1) % lines.length);
    }, 900);
    return () => window.clearInterval(timer);
  }, [lines.join("|")]);

  return (
    <>
      <style>{activityAnimation}</style>
      <div
        className="min-h-[88px] overflow-hidden py-1"
        aria-live="polite"
        aria-label={language === "th" ? "สถานะการทำงานของบอท" : "Bot activity"}
      >
        <div className="flex items-start gap-3 text-[15px] leading-7 text-foreground/90">
          <span className="mt-[9px] size-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.65)]" />
          <div className="min-w-0">
            <div
              key={lines[active] ?? "working"}
              className="font-mono tracking-tight"
              style={{ animation: "boss-activity-pop .55s ease-out both" }}
            >
              {lines[active] ?? (language === "th" ? "กำลังทำงาน…" : "Working…")}
            </div>
            <div className="mt-1 text-[11px] text-muted-foreground">
              {language === "th" ? "สถานะสด · อัปเดตอัตโนมัติ" : "Live status · updating automatically"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
