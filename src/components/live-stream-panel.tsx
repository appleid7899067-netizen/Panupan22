import { useEffect, useMemo, useState } from "react";
import { Activity, ArrowUpRight, BarChart3, Bot, Check, CircleAlert, Clock3, Download, Filter, MessageSquare, Pause, Play, Radio, Search, Server, Trash2, Video, Volume2, XCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBossStore } from "@/lib/store";
import { cn } from "@/lib/utils";

type EventKind = "agent" | "chat" | "generation" | "system" | "alert";
type StreamEvent = { id: number; kind: EventKind; title: string; detail: string; timestamp: string; accent: string; status?: "queued" | "running" | "succeeded" | "failed" };

const SEED_EVENTS: StreamEvent[] = [
  { id: 1, kind: "agent", title: "Commander routed a new brief", detail: "Researcher → market signal scan", timestamp: "2026-09-19 00:27:04", accent: "text-cyan-300" },
  { id: 2, kind: "chat", title: "New chat message received", detail: "BossG Command Center · 184 chars", timestamp: "2026-09-19 00:27:01", accent: "text-sky-300" },
  { id: 3, kind: "generation", title: "Image generation completed", detail: "Create / command-room-neon · 4.8s", timestamp: "2026-09-19 00:26:52", accent: "text-lime-300", status: "succeeded" },
  { id: 4, kind: "system", title: "Puter model catalog refreshed", detail: "42 models available · cache warm", timestamp: "2026-09-19 00:26:28", accent: "text-violet-300" },
  { id: 5, kind: "alert", title: "Quota watch raised", detail: "Preview telemetry only — provider quota is not connected", timestamp: "2026-09-19 00:26:11", accent: "text-amber-300", status: "failed" },
];
const TEMPLATES: Omit<StreamEvent, "id" | "timestamp">[] = [
  { kind: "agent", title: "Agent heartbeat received", detail: "Analyst is ready for the next assignment", accent: "text-cyan-300" },
  { kind: "chat", title: "Chat response streamed", detail: "Commander · 320 tokens delivered", accent: "text-sky-300" },
  { kind: "generation", title: "Video job queued", detail: "Video Studio · narration span 01", accent: "text-lime-300", status: "queued" },
  { kind: "system", title: "Workspace state synced", detail: "Local persistence checkpoint completed", accent: "text-violet-300" },
  { kind: "alert", title: "Preview telemetry only", detail: "Connect a server stream to show real events", accent: "text-amber-300", status: "failed" },
];
const FILTERS: Array<"all" | EventKind> = ["all", "agent", "chat", "generation", "system", "alert"];

function kindLabel(kind: "all" | EventKind, th: boolean) {
  if (kind === "all") return th ? "ทั้งหมด" : "All";
  return ({ agent: th ? "เอเจนต์" : "Agent", chat: th ? "แชต" : "Chat", generation: th ? "งานสร้าง" : "Generation", system: th ? "ระบบ" : "System", alert: th ? "แจ้งเตือน" : "Alert" })[kind];
}
function iconFor(kind: EventKind) {
  return kind === "alert" ? CircleAlert : kind === "generation" ? Zap : kind === "system" ? Server : kind === "chat" ? MessageSquare : Bot;
}
function statusIcon(status?: StreamEvent["status"]) {
  if (status === "succeeded") return <Check className="size-3 text-lime-300" />;
  if (status === "failed") return <XCircle className="size-3 text-rose-300" />;
  if (status === "running") return <Activity className="size-3 animate-pulse text-cyan-300" />;
  return status === "queued" ? <Clock3 className="size-3 text-amber-300" /> : null;
}

export function LiveStreamPanel() {
  const language = useBossStore((s) => s.language);
  const th = language === "th";
  const [events, setEvents] = useState(SEED_EVENTS);
  const [running, setRunning] = useState(true);
  const [filter, setFilter] = useState<"all" | EventKind>("all");
  const [query, setQuery] = useState("");
  const [tick, setTick] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [updatedAt, setUpdatedAt] = useState(new Date());

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      const template = TEMPLATES[tick % TEMPLATES.length];
      setEvents((prev) => [{ ...template, id: Date.now(), timestamp: new Date().toISOString().replace("T", " ").slice(0, 19) }, ...prev].slice(0, 40));
      setUpdatedAt(new Date());
      setTick((value) => value + 1);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [running, tick]);

  const visibleEvents = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return events.filter((event) => (filter === "all" || event.kind === filter) && (!needle || `${event.title} ${event.detail}`.toLowerCase().includes(needle)));
  }, [events, filter, query]);
  const clearLog = () => { setEvents([]); setSelected(null); };
  const exportLog = () => {
    const blob = new Blob([JSON.stringify(events, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "bossg-live-stream-log.json"; a.click(); URL.revokeObjectURL(url);
  };
  const labels = th ? { eyebrow: "LIVE TELEMETRY", title: "ห้องสตรีมสด", lead: "กิจกรรม BossG แบบจำลองเรียลไทม์", live: "LIVE", connected: "เชื่อมต่อแล้ว · mock stream", updated: "อัปเดตล่าสุด", pause: "หยุด", resume: "เริ่ม", eps: "events/วินาที", events: "เหตุการณ์ล่าสุด", search: "ค้นหาเหตุการณ์", clear: "ล้าง", export: "ส่งออก", analytics: "Analytics rail", active: "เอเจนต์ทำงาน", messages: "ข้อความ/นาที", usage: "การใช้โมเดล", queue: "คิวงานสร้าง", errors: "อัตรา error", quota: "โควต้า", activity: "Event intensity", heatmap: "Agent activity", similar: "SimilarWeb snapshot", monthly: "ข้อมูลรายเดือน/เดือนล่าสุดที่มี ไม่ใช่ real-time", visits: "การเข้าชม", rank: "อันดับโลก", bounce: "Bounce rate", sources: "Traffic sources", countries: "Top countries", jobs: "TTS / Video jobs", noEvents: "ไม่พบเหตุการณ์", preview: "MOCK STREAM" } : { eyebrow: "LIVE TELEMETRY", title: "Live Stream", lead: "A real-time command surface for BossG activity", live: "LIVE", connected: "Connected · mock stream", updated: "Last update", pause: "Pause", resume: "Resume", eps: "events/sec", events: "Recent events", search: "Search events", clear: "Clear", export: "Export", analytics: "Analytics rail", active: "Active agents", messages: "Messages/min", usage: "Model usage", queue: "Generation queue", errors: "Error rate", quota: "Quota", activity: "Event intensity", heatmap: "Agent activity", similar: "SimilarWeb snapshot", monthly: "Monthly/latest complete data — not real-time", visits: "Visits", rank: "Global rank", bounce: "Bounce rate", sources: "Traffic sources", countries: "Top countries", jobs: "TTS / Video jobs", noEvents: "No matching events", preview: "MOCK STREAM" };

  return <div className="flex h-full min-h-0 flex-col overflow-y-auto">
    <header className="border-b border-border px-4 py-4 sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-4"><div><div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.22em] text-lime-300"><span className="relative flex size-2"><span className="absolute inline-flex size-2 animate-ping rounded-full bg-lime-300 opacity-75" /><span className="relative inline-flex size-2 rounded-full bg-lime-300" /></span>{labels.eyebrow}</div><h2 className="mt-2 font-display text-3xl tracking-tight">{labels.title}</h2><p className="mt-1 text-sm text-muted-foreground">{labels.lead}</p></div><div className="flex items-center gap-2"><span className="rounded-full border border-lime-300/30 bg-lime-300/10 px-2.5 py-1 text-[10px] font-semibold tracking-[0.16em] text-lime-300">{labels.preview}</span><Button variant="secondary" size="sm" className="h-9" onClick={() => setRunning((value) => !value)}>{running ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}{running ? labels.pause : labels.resume}</Button></div></div>
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-2xl border border-border bg-card/60 px-4 py-3 text-xs"><span className="inline-flex items-center gap-2 font-semibold text-lime-300"><Radio className="size-3.5" /> {labels.live}</span><span className="text-muted-foreground">{labels.connected}</span><span className="text-muted-foreground">{labels.updated}: <time className="text-foreground">{updatedAt.toLocaleTimeString()}</time></span><span className="text-cyan-300">12.4 {labels.eps}</span></div>
    </header>

    <div className="grid gap-4 p-4 sm:p-6 xl:grid-cols-[minmax(0,1fr)_230px_280px]">
      <section className="min-w-0 rounded-2xl border border-border bg-card/40"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4"><div className="flex items-center gap-2"><Radio className="size-4 text-lime-300" /><h3 className="font-medium">{labels.events}</h3><span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-subtle">{visibleEvents.length}</span></div><div className="flex items-center gap-2"><div className="flex items-center gap-2 rounded-full border border-border bg-background px-3"><Search className="size-3.5 text-subtle" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={labels.search} className="h-8 w-28 bg-transparent text-xs outline-none placeholder:text-subtle sm:w-40" /></div><Button variant="ghost" size="icon" className="size-8" onClick={clearLog} aria-label={labels.clear}><Trash2 className="size-3.5" /></Button><Button variant="ghost" size="icon" className="size-8" onClick={exportLog} aria-label={labels.export}><Download className="size-3.5" /></Button></div></div><div className="flex gap-1 overflow-x-auto border-b border-border px-4 py-2"><Filter className="mr-1 mt-1 size-3.5 shrink-0 text-subtle" />{FILTERS.map((item) => <button key={item} type="button" onClick={() => setFilter(item)} className={cn("rounded-full px-3 py-1.5 text-[11px]", filter === item ? "bg-secondary text-foreground" : "text-subtle hover:bg-secondary/60")}>{kindLabel(item, th)}</button>)}</div><div className="divide-y divide-border">{visibleEvents.map((event) => { const Icon = iconFor(event.kind); return <button type="button" key={event.id} onClick={() => setSelected(selected === event.id ? null : event.id)} className="flex w-full gap-3 p-4 text-left transition-colors duration-200 hover:bg-secondary/30"><div className={cn("mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-background", event.accent)}><Icon className="size-4" /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-baseline justify-between gap-2"><p className="text-sm font-medium">{event.title}</p><time className="text-[10px] text-subtle">{event.timestamp}</time></div><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{event.detail}</p>{selected === event.id ? <div className="mt-3 flex items-center gap-2 border-t border-border pt-2 text-[10px] text-subtle"><span className="uppercase tracking-wider">{kindLabel(event.kind, th)}</span>{statusIcon(event.status)}<span>{event.status ?? "received"}</span><ArrowUpRight className="ml-auto size-3.5" /></div> : null}</div></button> })}{visibleEvents.length === 0 ? <p className="p-10 text-center text-sm text-subtle">{labels.noEvents}</p> : null}</div></section>

      <aside className="space-y-4"><section className="rounded-2xl border border-border bg-card/40 p-4"><div className="flex items-center gap-2"><BarChart3 className="size-4 text-cyan-300" /><h3 className="font-medium">{labels.analytics}</h3></div><div className="mt-4 space-y-3">{[[labels.active, "07", "text-cyan-300"], [labels.messages, "128", "text-lime-300"], [labels.usage, "64%", "text-violet-300"], [labels.queue, "03", "text-amber-300"], [labels.errors, "0.8%", "text-rose-300"], [labels.quota, "82%", "text-amber-300"]].map(([label, value, color]) => <div key={label} className="flex items-center justify-between"><span className="text-[11px] text-subtle">{label}</span><strong className={cn("font-display text-lg", color)}>{value}</strong></div>)}</div></section><section className="rounded-2xl border border-border bg-card/40 p-4"><h3 className="text-xs font-medium">{labels.activity}</h3><div className="mt-3 flex h-16 items-end gap-1">{[26,42,30,55,45,68,52,78,64,88,70,96].map((height, index) => <span key={index} className="flex-1 rounded-t bg-cyan-300/70 transition-all duration-200" style={{ height: `${height}%` }} />)}</div><div className="mt-2 flex justify-between text-[10px] text-subtle"><span>-60m</span><span>now</span></div><h3 className="mt-5 text-xs font-medium">{labels.heatmap}</h3><div className="mt-3 grid grid-cols-8 gap-1">{Array.from({ length: 32 }, (_, index) => <span key={index} className={cn("aspect-square rounded-sm", [2,5,9,14,18,23,27,30].includes(index) ? "bg-lime-300" : [4,10,17,25].includes(index) ? "bg-lime-300/50" : "bg-secondary")} />)}</div></section></aside>

      <aside className="space-y-4"><section className="rounded-2xl border border-border bg-card/40 p-4"><div className="flex items-start justify-between"><div><h3 className="font-medium">{labels.similar}</h3><p className="mt-1 text-[10px] leading-relaxed text-subtle">{labels.monthly}</p></div><BarChart3 className="size-4 text-amber-300" /></div><div className="mt-4 grid grid-cols-2 gap-2">{[[labels.visits, "—"], [labels.rank, "—"], [labels.bounce, "—"], [labels.sources, "—"]].map(([label, value]) => <div key={label} className="rounded-lg border border-border bg-background p-3"><p className="text-[10px] text-subtle">{label}</p><p className="mt-1 font-display text-lg">{value}</p></div>)}</div><div className="mt-3 rounded-lg border border-dashed border-border p-3 text-[10px] text-subtle">{labels.countries}: —</div></section><section className="rounded-2xl border border-border bg-card/40 p-4"><div className="flex items-center gap-2"><Volume2 className="size-4 text-cyan-300" /><h3 className="font-medium">{labels.jobs}</h3></div><div className="mt-3 space-y-2">{[["TTS narration 01", "running", Volume2], ["Video clip 03", "queued", Video], ["Image hero", "succeeded", Check]].map(([title, status, Icon]) => <div key={String(title)} className="flex items-center gap-2 rounded-lg border border-border bg-background p-2.5"><Icon className="size-3.5 text-cyan-300" /><div className="min-w-0 flex-1"><p className="truncate text-[11px]">{String(title)}</p><p className="text-[10px] text-subtle">{String(status)}</p></div>{status === "running" ? <Activity className="size-3 animate-pulse text-cyan-300" /> : status === "queued" ? <Clock3 className="size-3 text-amber-300" /> : <Check className="size-3 text-lime-300" />}</div>)}</div></section></aside>
    </div>
  </div>;
}
