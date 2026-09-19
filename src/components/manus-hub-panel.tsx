import { useEffect, useMemo, useState } from "react";
import { Activity, Archive, ArrowLeft, ArrowRight, ArrowUpRight, Bot, CalendarClock, Check, ChevronRight, CircleDashed, ExternalLink, FileText, FolderKanban, Globe2, HardDrive, Library, Link2, ListTodo, MonitorUp, PackageOpen, Play, Power, RefreshCw, Search, Settings2, ShieldCheck, Sparkles, TerminalSquare, UploadCloud, Workflow, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBossStore } from "@/lib/store";
import { cn } from "@/lib/utils";

type HubTab = "overview" | "tasks" | "projects" | "files" | "browser" | "skills" | "catalog" | "automation";
const TABS: { id: HubTab; label: string; icon: typeof ListTodo }[] = [
  { id: "overview", label: "Overview", icon: Activity }, { id: "tasks", label: "Tasks", icon: ListTodo }, { id: "projects", label: "Projects", icon: FolderKanban }, { id: "files", label: "Files", icon: HardDrive }, { id: "browser", label: "Browser / OS", icon: MonitorUp }, { id: "skills", label: "Skills", icon: Sparkles }, { id: "catalog", label: "Catalog", icon: Library }, { id: "automation", label: "Schedules", icon: CalendarClock },
];
const SKILLS = ["web-design-engineer", "video-generator", "tts-prompter", "manus-api", "deep-research", "data-analysis", "imagegen", "automation-and-scheduling", "persistent-computing", "typst-pdf-maker"];
const CATALOG = [{ name: "Tasks", detail: "Create, continue, stop, inspect", icon: ListTodo }, { name: "Projects", detail: "Durable instructions and workspaces", icon: FolderKanban }, { name: "Connectors", detail: "Apps, APIs, MCP servers", icon: Link2 }, { name: "Agents", detail: "Profiles and specialist workers", icon: Bot }, { name: "Artifacts", detail: "Files, reports, websites, media", icon: Archive }, { name: "Usage", detail: "Quota, logs and team statistics", icon: Activity }];

function StatusPill({ children, tone = "muted" }: { children: React.ReactNode; tone?: "muted" | "lime" | "cyan" | "amber" }) { return <span className={cn("rounded-full border px-2 py-1 text-[10px]", tone === "lime" ? "border-lime-300/30 bg-lime-300/10 text-lime-300" : tone === "cyan" ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-300" : tone === "amber" ? "border-amber-300/30 bg-amber-300/10 text-amber-300" : "border-border bg-secondary text-subtle")}>{children}</span>; }
function Card({ title, icon: Icon, children, action }: { title: string; icon: typeof Activity; children: React.ReactNode; action?: React.ReactNode }) { return <section className="rounded-2xl border border-border bg-card/50 p-4"><div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2"><Icon className="size-4 text-cyan-300" /><h3 className="text-sm font-medium">{title}</h3></div>{action}</div><div className="mt-4">{children}</div></section>; }

function BrowserSimulation({ th }: { th: boolean }) {
  const [url, setUrl] = useState("https://demo.manus.local/dashboard");
  const [address, setAddress] = useState(url);
  const [history, setHistory] = useState([url]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [logs, setLogs] = useState<string[]>(["[sim] Browser session initialized", "[sim] OS sandbox ready"]);
  const [osRunning, setOsRunning] = useState(false);
  const [screenshot, setScreenshot] = useState(false);
  const navigate = (next = address) => { const clean = next.trim() || "https://demo.manus.local/home"; const nextHistory = [...history.slice(0, historyIndex + 1), clean]; setHistory(nextHistory); setHistoryIndex(nextHistory.length - 1); setUrl(clean); setAddress(clean); setLogs((prev) => [`[sim] navigate ${clean}`, ...prev].slice(0, 12)); };
  const go = (delta: number) => { const next = Math.max(0, Math.min(history.length - 1, historyIndex + delta)); setHistoryIndex(next); setUrl(history[next]); setAddress(history[next]); setLogs((prev) => [`[sim] history ${history[next]}`, ...prev].slice(0, 12)); };
  const action = (name: string) => setLogs((prev) => [`[sim] ${name}`, ...prev].slice(0, 12));
  return <div className="space-y-4"><div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="text-lg font-medium">{th ? "Browser / OS Mock Simulation" : "Browser / OS Mock Simulation"}</h3><p className="mt-1 text-xs text-muted-foreground">{th ? "จำลองการนำทางและคำสั่ง OS ในเบราว์เซอร์เท่านั้น ไม่แตะเครื่องจริง" : "Simulates navigation and OS actions in-browser only; it never touches the real machine."}</p></div><StatusPill tone="amber">MOCK ONLY</StatusPill></div><div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]"><section className="overflow-hidden rounded-2xl border border-border bg-[#101519]"><div className="flex items-center gap-2 border-b border-white/10 px-3 py-2"><button type="button" onClick={() => go(-1)} className="rounded-lg p-1.5 text-white/60 hover:bg-white/10" aria-label="Back"><ArrowLeft className="size-3.5" /></button><button type="button" onClick={() => go(1)} className="rounded-lg p-1.5 text-white/60 hover:bg-white/10" aria-label="Forward"><ArrowRight className="size-3.5" /></button><button type="button" onClick={() => { setAddress(url); action("refresh") }} className="rounded-lg p-1.5 text-white/60 hover:bg-white/10" aria-label="Refresh"><RefreshCw className="size-3.5" /></button><form className="flex min-w-0 flex-1" onSubmit={(e) => { e.preventDefault(); navigate(); }}><input value={address} onChange={(e) => setAddress(e.target.value)} className="h-8 min-w-0 flex-1 rounded-lg border border-white/10 bg-black/20 px-3 text-xs text-white outline-none" /><button className="ml-2 rounded-lg bg-cyan-300/15 px-3 text-[10px] text-cyan-200">Go</button></form></div><div className="min-h-[330px] bg-[#f5f7f8] p-4 text-slate-900"><div className="mx-auto max-w-2xl"><div className="flex items-center justify-between"><span className="rounded-full bg-slate-900 px-3 py-1 text-[10px] font-semibold text-white">MANUS DEMO</span><span className="text-[10px] text-slate-500">{url.replace("https://", "")}</span></div><div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><p className="text-[10px] font-bold tracking-[0.2em] text-cyan-700">SIMULATED PAGE</p><h4 className="mt-2 text-2xl font-semibold">Browser action surface</h4><p className="mt-2 text-sm text-slate-600">This page is rendered locally by the mock session. Use the buttons to create inspectable events.</p><div className="mt-5 flex flex-wrap gap-2"><button type="button" onClick={() => action("click button: Create task")} className="rounded-full bg-slate-900 px-4 py-2 text-xs text-white">Create task</button><button type="button" onClick={() => action("click link: View artifact")} className="rounded-full border border-slate-300 px-4 py-2 text-xs">View artifact</button><button type="button" onClick={() => setScreenshot(true)} className="rounded-full border border-slate-300 px-4 py-2 text-xs">Capture screenshot</button></div>{screenshot ? <div className="mt-5 rounded-xl border-2 border-dashed border-cyan-400 bg-cyan-50 p-4 text-xs text-cyan-800">Screenshot captured · mock-artifact-001.png <button type="button" onClick={() => setScreenshot(false)} className="float-right"><X className="size-3.5" /></button></div> : null}</div></div></div></section><aside className="space-y-4"><Card title="OS sandbox" icon={TerminalSquare} action={<StatusPill tone={osRunning ? "lime" : "muted"}>{osRunning ? "RUNNING" : "IDLE"}</StatusPill>}><p className="text-xs leading-relaxed text-muted-foreground">{th ? "จำลอง process, filesystem และ terminal state โดยไม่มีคำสั่งจริง" : "Simulated process, filesystem and terminal state. No real commands execute."}</p><div className="mt-3 grid grid-cols-2 gap-2"><Button size="sm" variant="secondary" className="h-8" onClick={() => { setOsRunning((v) => !v); action(osRunning ? "OS process stopped" : "OS process started") }}><Power className="size-3.5" />{osRunning ? "Stop" : "Start"}</Button><Button size="sm" variant="secondary" className="h-8" onClick={() => action("opened /workspace")}>Open FS</Button></div></Card><Card title="Event log" icon={Activity}><div className="max-h-40 overflow-y-auto rounded-lg bg-black/30 p-3 font-mono text-[10px] text-cyan-200">{logs.map((log, index) => <p key={`${log}-${index}`}>{log}</p>)}</div><Button size="sm" variant="ghost" className="mt-2 h-8" onClick={() => setLogs([])}>Clear log</Button></Card></aside></div><div className="flex flex-wrap items-center gap-2 rounded-xl border border-amber-300/20 bg-amber-300/5 p-3 text-[10px] text-amber-200"><ShieldCheck className="size-3.5" />{th ? "Simulation ปลอดภัย: ไม่ควบคุม browser จริง, ไม่อ่านไฟล์จริง, ไม่รันคำสั่ง OS จริง" : "Safe simulation: no real browser control, filesystem access or OS commands."}</div></div>;
}

type ManusTask = { id: string; status?: string; title?: string; task_url?: string; created_at?: number };

function LiveTasks({ th }: { th: boolean }) {
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [tasks, setTasks] = useState<ManusTask[]>([]);
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setError("");
    try {
      const status = await fetch("/api/manus?action=status", { credentials: "same-origin" }).then((r) => r.json());
      setConfigured(Boolean(status.configured));
      if (!status.configured) return;
      const data = await fetch("/api/manus?action=tasks&limit=8", { credentials: "same-origin" }).then((r) => r.json());
      if (!data.ok) throw new Error(data.error?.message || data.error || "โหลดงานไม่สำเร็จ");
      setTasks(Array.isArray(data.data) ? data.data : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "โหลด Manus ไม่สำเร็จ");
    }
  };

  useEffect(() => { void load(); }, []);

  const createTask = async () => {
    const value = prompt.trim();
    if (!value || busy) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/manus", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create", prompt: value }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error?.message || data.error || "สร้างงานไม่สำเร็จ");
      setPrompt("");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "สร้างงานไม่สำเร็จ");
    } finally {
      setBusy(false);
    }
  };

  const stopTask = async (taskId: string) => {
    if (busy) return;
    setBusy(true);
    try {
      const response = await fetch("/api/manus", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "stop", taskId }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error?.message || data.error || "หยุดงานไม่สำเร็จ");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "หยุดงานไม่สำเร็จ");
    } finally {
      setBusy(false);
    }
  };

  return <Card title={th ? "งาน Manus จริง" : "Live Manus tasks"} icon={ListTodo}
    action={<div className="flex items-center gap-2"><StatusPill tone={configured ? "lime" : "amber"}>{configured === null ? "CHECKING" : configured ? "CONNECTED" : "NOT CONFIGURED"}</StatusPill><Button size="sm" variant="ghost" className="h-8" onClick={() => void load()}><RefreshCw className="size-3.5" /></Button></div>}>
    <div className="space-y-3">
      <div className="flex gap-2">
        <input value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void createTask(); } }} disabled={!configured || busy} placeholder={configured ? (th ? "สั่งงาน Manus..." : "Give Manus a task...") : (th ? "ตั้ง MANUS_API_KEY บนเซิร์ฟเวอร์ก่อน" : "Configure MANUS_API_KEY on the server")} className="min-w-0 flex-1 rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none" />
        <Button size="sm" className="h-9 shrink-0" disabled={!configured || busy || !prompt.trim()} onClick={() => void createTask()}><Play className="size-3.5" />{busy ? "..." : th ? "เริ่ม" : "Run"}</Button>
      </div>
      {error ? <p className="rounded-lg border border-red-300/20 bg-red-300/5 p-2 text-[10px] text-red-300">{error}</p> : null}
      {configured && tasks.length === 0 ? <p className="rounded-xl border border-dashed border-border p-5 text-center text-xs text-subtle">{th ? "ยังไม่มีงานจาก Manus API" : "No Manus API tasks yet."}</p> : null}
      {tasks.map((task) => <div key={task.id} className="flex items-center gap-3 rounded-xl border border-border bg-background p-3">
        <CircleDashed className={cn("size-4", task.status === "running" ? "animate-spin text-cyan-300" : task.status === "stopped" ? "text-lime-300" : "text-amber-300")} />
        <div className="min-w-0 flex-1"><p className="truncate text-xs">{task.title || task.id}</p><p className="text-[10px] text-subtle">{task.status || "unknown"}</p></div>
        {task.task_url ? <a href={task.task_url} target="_blank" rel="noreferrer" className="text-cyan-300" aria-label="Open Manus task"><ExternalLink className="size-3.5" /></a> : null}
        {task.status === "running" ? <Button size="sm" variant="ghost" className="h-7 px-2 text-[10px]" disabled={busy} onClick={() => void stopTask(task.id)}>Stop</Button> : null}
      </div>)}
    </div>
  </Card>;
}

export function ManusHubPanel() {
  const language = useBossStore((s) => s.language); const [tab, setTab] = useState<HubTab>("overview"); const [query, setQuery] = useState(""); const th = language === "th"; const filteredSkills = useMemo(() => SKILLS.filter((item) => item.includes(query.toLowerCase())), [query]);
  const copy = th ? { title: "Manus Hub", lead: "ศูนย์รวม Tasks, Browser/OS, Skills, Catalog และระบบอัตโนมัติ", preview: "API CONNECTOR REQUIRED", connect: "เชื่อมต่อ Manus API", browser: "Browser และ OS ต้องใช้สิทธิ์/เซสชันภายนอก", task: "งานล่าสุด", project: "โปรเจกต์", file: "ไฟล์และ Artifacts", schedule: "กำหนดการ", no: "ยังไม่ได้เชื่อมต่อข้อมูลจริง" } : { title: "Manus Hub", lead: "One surface for Tasks, Browser/OS, Skills, Catalog and automation", preview: "API CONNECTOR REQUIRED", connect: "Connect Manus API", browser: "Browser and OS require external permission/session", task: "Recent tasks", project: "Projects", file: "Files & artifacts", schedule: "Schedules", no: "Live data is not connected yet" };
  return <div className="flex h-full min-h-0 flex-col overflow-y-auto"><header className="border-b border-border px-4 py-4 sm:px-6"><div className="flex flex-wrap items-start justify-between gap-4"><div><div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.22em] text-cyan-300"><Sparkles className="size-3.5" /> MANUS SUITE</div><h2 className="mt-2 font-display text-3xl tracking-tight">{copy.title}</h2><p className="mt-1 text-sm text-muted-foreground">{copy.lead}</p></div><div className="flex items-center gap-2"><StatusPill tone="amber">{copy.preview}</StatusPill><Button asChild size="sm" variant="secondary" className="h-9"><a href="https://manus.im/app#settings/integrations/api" target="_blank" rel="noreferrer"><Link2 className="size-3.5" />{copy.connect}</a></Button></div></div><div className="mt-4 flex gap-1 overflow-x-auto rounded-2xl border border-border bg-card/40 p-1">{TABS.map(({ id, label, icon: Icon }) => <button key={id} type="button" onClick={() => setTab(id)} className={cn("inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-xs transition-colors", tab === id ? "bg-secondary text-foreground" : "text-subtle hover:text-foreground")}><Icon className="size-3.5" />{label}</button>)}</div></header>
    {tab === "browser" ? <div className="p-4 sm:p-6"><BrowserSimulation th={th} /></div> : tab === "overview" ? <div className="grid gap-4 p-4 sm:p-6 xl:grid-cols-3"><LiveTasks th={th} /><Card title={copy.project} icon={FolderKanban}><div className="grid grid-cols-2 gap-2">{["BossG Command Center", "Research Lab", "Media Studio", "Website MVP"].map((name) => <div key={name} className="rounded-xl border border-border bg-background p-3"><FolderKanban className="size-4 text-violet-300" /><p className="mt-2 truncate text-xs">{name}</p><p className="mt-1 text-[10px] text-subtle">durable instructions</p></div>)}</div></Card><Card title={copy.file} icon={HardDrive}><div className="rounded-xl border border-dashed border-border p-5 text-center"><UploadCloud className="mx-auto size-6 text-cyan-300" /><p className="mt-2 text-xs">Upload, inspect and reuse files</p><p className="mt-1 text-[10px] text-subtle">512 MB/file · API required</p><Button size="sm" variant="secondary" className="mt-3 h-8"><UploadCloud className="size-3.5" />Upload file</Button></div></Card><Card title="Browser / OS" icon={Globe2}><div className="rounded-xl border border-amber-300/20 bg-amber-300/5 p-3"><div className="flex items-center gap-2 text-xs text-amber-300"><ShieldCheck className="size-4" />Permission boundary</div><p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">{copy.browser}. This UI does not silently control a personal browser or operating system.</p><Button size="sm" variant="secondary" className="mt-3 h-8" onClick={() => setTab("browser")}><Play className="size-3.5" />Open simulation</Button></div></Card><Card title="Skills & Catalog" icon={Library}><div className="flex flex-wrap gap-2">{SKILLS.slice(0, 8).map((skill) => <StatusPill key={skill} tone="cyan">{skill}</StatusPill>)}</div><button type="button" onClick={() => setTab("skills")} className="mt-4 inline-flex items-center gap-1 text-xs text-cyan-300">Browse full catalog <ArrowUpRight className="size-3.5" /></button></Card><Card title={copy.schedule} icon={CalendarClock}><div className="flex items-center gap-3 rounded-xl border border-border bg-background p-3"><Workflow className="size-5 text-lime-300" /><div><p className="text-xs">No schedules connected</p><p className="text-[10px] text-subtle">Cron, interval and event triggers</p></div></div></Card></div> : <div className="p-4 sm:p-6">{tab === "skills" ? <Card title="Skills catalog" icon={Sparkles} action={<div className="flex items-center gap-2 rounded-full border border-border bg-background px-3"><Search className="size-3.5 text-subtle" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search skills" className="h-8 w-32 bg-transparent text-xs outline-none" /></div>}><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{filteredSkills.map((skill) => <div key={skill} className="rounded-xl border border-border bg-background p-4"><div className="flex items-center justify-between"><Sparkles className="size-4 text-lime-300" /><StatusPill tone="lime">available</StatusPill></div><p className="mt-3 text-sm font-medium">{skill}</p><p className="mt-1 text-[10px] text-subtle">Reusable Manus capability · project skill</p></div>)}</div></Card> : <div className="grid gap-4 xl:grid-cols-2"><Card title={TABS.find((item) => item.id === tab)?.label ?? "Manus"} icon={TABS.find((item) => item.id === tab)?.icon ?? Activity}><div className="rounded-2xl border border-dashed border-border p-10 text-center"><PackageOpen className="mx-auto size-8 text-cyan-300" /><p className="mt-3 text-sm">{copy.no}</p><p className="mt-1 text-xs text-subtle">Connect Manus API to load live records and actions.</p><Button asChild className="mt-4" size="sm"><a href="https://manus.im/app#settings/integrations/api" target="_blank" rel="noreferrer"><Link2 className="size-3.5" />Connect connector</a></Button></div></Card><Card title="Capability notes" icon={Settings2}><div className="space-y-2 text-xs text-muted-foreground"><p>Tasks: create, continue, inspect, stop.</p><p>Browser/OS: use the Mock Simulation tab for safe local testing.</p><p>Skills: catalog and force/enable controls.</p><p>Artifacts: reports, websites, media and downloadable files.</p></div></Card></div>}</div>}
  </div>;
}
