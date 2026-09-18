import { useEffect, useMemo, useState } from "react";
import { Activity, ArrowUpRight, BarChart3, Bot, CircleAlert, Filter, Pause, Play, Radio, RefreshCw, Search, Server, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBossStore } from "@/lib/store";
import { cn } from "@/lib/utils";

type EventKind = "agent" | "generation" | "system" | "alert";
type StreamEvent = { id: number; kind: EventKind; title: string; detail: string; time: string; accent: string };

const SEED_EVENTS: StreamEvent[] = [
  { id: 1, kind: "agent", title: "Commander routed a new brief", detail: "Researcher → market signal scan", time: "now", accent: "text-cyan-300" },
  { id: 2, kind: "generation", title: "Image generation completed", detail: "Create / command-room-neon · 4.8s", time: "12s ago", accent: "text-lime-300" },
  { id: 3, kind: "system", title: "Puter model catalog refreshed", detail: "42 models available · cache warm", time: "28s ago", accent: "text-violet-300" },
  { id: 4, kind: "alert", title: "Quota watch raised", detail: "Preview data only — no live provider connected", time: "41s ago", accent: "text-amber-300" },
];

const EVENT_TEMPLATES: Omit<StreamEvent, "id" | "time">[] = [
  { kind: "agent", title: "Agent heartbeat received", detail: "Analyst is ready for the next assignment", accent: "text-cyan-300" },
  { kind: "generation", title: "Generation job queued", detail: "Create pipeline · mock stream", accent: "text-lime-300" },
  { kind: "system", title: "Workspace state synced", detail: "Local persistence checkpoint completed", accent: "text-violet-300" },
  { kind: "alert", title: "Preview telemetry only", detail: "Connect a server stream to show real events", accent: "text-amber-300" },
];

const FILTERS: Array<"all" | EventKind> = ["all", "agent", "generation", "system", "alert"];

function kindLabel(kind: "all" | EventKind, language: "th" | "en") {
  if (kind === "all") return language === "th" ? "ทั้งหมด" : "All";
  const labels = {
    agent: language === "th" ? "เอเจนต์" : "Agent",
    generation: language === "th" ? "งานสร้าง" : "Generation",
    system: language === "th" ? "ระบบ" : "System",
    alert: language === "th" ? "แจ้งเตือน" : "Alert",
  };
  return labels[kind];
}

export function LiveStreamPanel() {
  const language = useBossStore((s) => s.language);
  const [events, setEvents] = useState(SEED_EVENTS);
  const [running, setRunning] = useState(true);
  const [filter, setFilter] = useState<"all" | EventKind>("all");
  const [query, setQuery] = useState("");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      const template = EVENT_TEMPLATES[tick % EVENT_TEMPLATES.length];
      setEvents((prev) => [
        { ...template, id: Date.now(), time: "just now" },
        ...prev,
      ].slice(0, 10));
      setTick((value) => value + 1);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [running, tick]);

  const visibleEvents = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return events.filter((event) => {
      const matchesFilter = filter === "all" || event.kind === filter;
      const matchesQuery = !normalized || `${event.title} ${event.detail}`.toLowerCase().includes(normalized);
      return matchesFilter && matchesQuery;
    });
  }, [events, filter, query]);

  const labels = language === "th" ? {
    eyebrow: "LIVE TELEMETRY",
    title: "ห้องสตรีมสด",
    lead: "ภาพรวมกิจกรรมของ BossG แบบจำลองเรียลไทม์",
    preview: "MOCK STREAM",
    pause: "หยุดสตรีม",
    resume: "เริ่มสตรีม",
    events: "เหตุการณ์ล่าสุด",
    search: "ค้นหาเหตุการณ์",
    analytics: "สัญญาณระบบ",
    active: "เอเจนต์ทำงาน",
    rate: "เหตุการณ์/นาที",
    queue: "คิวงานสร้าง",
    uptime: "ความพร้อมใช้งาน",
    snapshot: "SimilarWeb snapshot",
    monthly: "ข้อมูลรายเดือน — ยังไม่ได้เชื่อม API",
    visits: "การเข้าชม",
    rank: "อันดับโลก",
    bounce: "Bounce rate",
    sources: "ช่องทางเข้าเว็บ",
    noEvents: "ไม่พบเหตุการณ์ที่ตรงกัน",
  } : {
    eyebrow: "LIVE TELEMETRY",
    title: "Live Stream",
    lead: "A real-time command surface for BossG activity",
    preview: "MOCK STREAM",
    pause: "Pause stream",
    resume: "Resume stream",
    events: "Recent events",
    search: "Search events",
    analytics: "System signals",
    active: "Active agents",
    rate: "Events / min",
    queue: "Generation queue",
    uptime: "Uptime",
    snapshot: "SimilarWeb snapshot",
    monthly: "Monthly data — API not connected",
    visits: "Visits",
    rank: "Global rank",
    bounce: "Bounce rate",
    sources: "Traffic sources",
    noEvents: "No matching events",
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-y-auto">
      <div className="border-b border-border px-4 py-4 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.22em] text-lime-300">
              <span className="relative flex size-2"><span className="absolute inline-flex size-2 animate-ping rounded-full bg-lime-300 opacity-75" /><span className="relative inline-flex size-2 rounded-full bg-lime-300" /></span>
              {labels.eyebrow}
            </div>
            <h2 className="mt-2 font-display text-3xl tracking-tight">{labels.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{labels.lead}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-lime-300/30 bg-lime-300/10 px-2.5 py-1 text-[10px] font-semibold tracking-[0.16em] text-lime-300">{labels.preview}</span>
            <Button variant="secondary" size="sm" className="h-9" onClick={() => setRunning((value) => !value)}>
              {running ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
              {running ? labels.pause : labels.resume}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-3 border-b border-border p-4 sm:grid-cols-2 sm:px-6 xl:grid-cols-4">
        {[
          { icon: Bot, label: labels.active, value: "07", delta: "+2.4%", color: "text-cyan-300" },
          { icon: Activity, label: labels.rate, value: "128", delta: "+18.2%", color: "text-lime-300" },
          { icon: Zap, label: labels.queue, value: "03", delta: "stable", color: "text-violet-300" },
          { icon: Server, label: labels.uptime, value: "99.98%", delta: "healthy", color: "text-amber-300" },
        ].map(({ icon: Icon, label, value, delta, color }) => (
          <div key={label} className="rounded-[var(--radius-lg)] border border-border bg-card/70 p-4">
            <div className="flex items-center justify-between text-subtle"><span className="text-xs">{label}</span><Icon className={cn("size-4", color)} /></div>
            <div className="mt-3 flex items-end justify-between gap-3"><strong className="font-display text-2xl tracking-tight">{value}</strong><span className={cn("text-[10px]", color)}>{delta}</span></div>
          </div>
        ))}
      </div>

      <div className="grid min-h-0 gap-4 p-4 sm:p-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <section className="min-w-0 rounded-[var(--radius-xl)] border border-border bg-card/40">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
            <div className="flex items-center gap-2"><Radio className="size-4 text-lime-300" /><h3 className="font-medium">{labels.events}</h3><span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-subtle">{visibleEvents.length}</span></div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3"><Search className="size-3.5 text-subtle" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={labels.search} className="h-8 w-32 bg-transparent text-xs outline-none placeholder:text-subtle sm:w-44" /></div>
              <Filter className="size-4 text-subtle" />
            </div>
          </div>
          <div className="flex gap-1 overflow-x-auto border-b border-border px-4 py-2">
            {FILTERS.map((item) => <button key={item} type="button" onClick={() => setFilter(item)} className={cn("rounded-full px-3 py-1.5 text-[11px]", filter === item ? "bg-secondary text-foreground" : "text-subtle hover:bg-secondary/60")}>{kindLabel(item, language)}</button>)}
          </div>
          <div className="divide-y divide-border">
            {visibleEvents.map((event) => <div key={event.id} className="flex gap-3 p-4 transition-colors hover:bg-secondary/30"><div className={cn("mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-background", event.accent)}>{event.kind === "alert" ? <CircleAlert className="size-4" /> : event.kind === "generation" ? <Zap className="size-4" /> : event.kind === "system" ? <Server className="size-4" /> : <Bot className="size-4" />}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-baseline justify-between gap-2"><p className="text-sm font-medium">{event.title}</p><time className="text-[10px] text-subtle">{event.time}</time></div><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{event.detail}</p></div><ArrowUpRight className="mt-1 size-3.5 shrink-0 text-subtle" /></div>)}
            {visibleEvents.length === 0 ? <p className="p-10 text-center text-sm text-subtle">{labels.noEvents}</p> : null}
          </div>
        </section>

        <aside className="space-y-4">
          <section className="rounded-[var(--radius-xl)] border border-border bg-card/40 p-4">
            <div className="flex items-center justify-between"><div className="flex items-center gap-2"><BarChart3 className="size-4 text-cyan-300" /><h3 className="font-medium">{labels.analytics}</h3></div><RefreshCw className="size-3.5 text-subtle" /></div>
            <div className="mt-4 flex h-16 items-end gap-1.5">{[28, 38, 32, 52, 44, 62, 58, 75, 66, 86, 78, 94].map((height, index) => <span key={index} className="flex-1 rounded-t-sm bg-cyan-300/70" style={{ height: `${height}%` }} />)}</div>
            <div className="mt-2 flex justify-between text-[10px] text-subtle"><span>-60m</span><span>now</span></div>
          </section>
          <section className="rounded-[var(--radius-xl)] border border-border bg-card/40 p-4">
            <div className="flex items-center justify-between"><div><h3 className="font-medium">{labels.snapshot}</h3><p className="mt-1 text-[11px] text-subtle">{labels.monthly}</p></div><BarChart3 className="size-4 text-amber-300" /></div>
            <div className="mt-4 grid grid-cols-2 gap-2">{[[labels.visits, "—"], [labels.rank, "—"], [labels.bounce, "—"], [labels.sources, "—"]].map(([label, value]) => <div key={label} className="rounded-lg border border-border bg-background p-3"><p className="text-[10px] text-subtle">{label}</p><p className="mt-1 font-display text-lg">{value}</p></div>)}</div>
          </section>
        </aside>
      </div>
    </div>
  );
}
