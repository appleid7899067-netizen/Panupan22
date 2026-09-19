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

type ManusBrowser = { client_id: string; client_name?: string; ua?: string };

function RealBrowser({ th }: { th: boolean }) {
  const [browsers, setBrowsers] = useState<ManusBrowser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState("");
  const load = async () => {
    setLoading(true); setError("");
    try {
      const r = await fetch("/api/manus?action=browsers", { credentials: "same-origin" });
      const d = await r.json();
      if (!r.ok || !d.ok) throw new Error(d.error?.message || d.error || "โหลด browser ไม่สำเร็จ");
      setBrowsers(Array.isArray(d.data) ? d.data : []);
      if (d.data?.[0]?.client_id) setSelected((v: string) => v || d.data[0].client_id);
    } catch (e) { setError(e instanceof Error ? e.message : "โหลด browser ไม่สำเร็จ"); }
    finally { setLoading(false); }
  };
  useEffect(() => { void load(); }, []);
  return <div className="space-y-4">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div><h3 className="text-lg font-medium">{th ? "Manus My Browser" : "Manus My Browser"}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{th ? "นี่คือ browser ที่ Manus มองเห็นจริงผ่าน API ไม่ใช่หน้าจำลอง" : "These are real browser clients exposed by the Manus API, not a mock."}</p></div>
      <StatusPill tone={browsers.length ? "lime" : "amber"}>{loading ? "CHECKING" : browsers.length ? `${browsers.length} ONLINE` : "NO BROWSER"}</StatusPill>
    </div>
    <div className="rounded-2xl border border-border bg-[#101519] p-4">
      {browsers.length ? <div className="space-y-2">{browsers.map((browser) => <label key={browser.client_id} className={cn("flex cursor-pointer items-center gap-3 rounded-xl border p-3", selected === browser.client_id ? "border-cyan-300/40 bg-cyan-300/5" : "border-white/10")}><input type="radio" name="manus-browser" checked={selected === browser.client_id} onChange={() => setSelected(browser.client_id)} /><MonitorUp className="size-4 text-cyan-300" /><div className="min-w-0 flex-1"><p className="truncate text-xs text-white">{browser.client_name || browser.client_id}</p><p className="truncate text-[10px] text-white/45">{browser.ua || "Authorized Manus browser client"}</p></div><StatusPill tone="lime">ONLINE</StatusPill></label>)}</div> :
      <div className="py-8 text-center"><MonitorUp className="mx-auto size-8 text-cyan-300" /><p className="mt-3 text-sm text-white">{th ? "ยังไม่พบ browser ที่เชื่อมต่อ" : "No connected browser found"}</p><p className="mx-auto mt-2 max-w-md text-xs text-white/50">{th ? "ติดตั้ง/เปิด Manus My Browser extension แล้ว authorize browser จากนั้นกดรีเฟรช" : "Install/enable the Manus My Browser extension and authorize a browser, then refresh."}</p><a href="https://manus.im/my-browser" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs text-white"><ExternalLink className="size-3.5" />My Browser</a></div>}
    </div>
    {error ? <p className="rounded-lg border border-red-300/20 bg-red-300/5 p-2 text-[10px] text-red-300">{error}</p> : null}
    <div className="rounded-xl border border-cyan-300/15 bg-cyan-300/5 p-3 text-[10px] text-cyan-100"><ShieldCheck className="mr-1 inline size-3.5" />{th ? "การควบคุม browser จริงต้องได้รับอนุญาตผ่าน Manus My Browser; หน้าเว็บนี้ไม่แอบควบคุม Chrome ของคุณ" : "Real browser control requires explicit Manus My Browser authorization; this site never silently controls your Chrome."}</div>
    <Button size="sm" variant="secondary" onClick={() => void load()} disabled={loading}><RefreshCw className={cn("size-3.5", loading && "animate-spin")} />Refresh browsers</Button>
  </div>;
}

type ManusTask = { id: string; status?: string; title?: string; task_url?: string; created_at?: number };

type ManusMessage = {
  id: string;
  type: "user_message" | "assistant_message" | "error_message" | "status_update" | "user_stop" | "structured_output_result";
  timestamp?: number;
  user_message?: { content?: string };
  assistant_message?: { content?: string; question_expectation?: { options?: string[]; selection_mode?: string } };
  error_message?: { content?: string; error_type?: string };
  status_update?: { agent_status?: string; brief?: string; description?: string; status_detail?: { waiting_for_event_type?: string; waiting_description?: string } };
  structured_output_result?: { success?: boolean; value?: unknown; error?: string | null };
};

function LiveTasks({ th, onConfigured }: { th: boolean; onConfigured?: () => void }) {
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [tasks, setTasks] = useState<ManusTask[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [messages, setMessages] = useState<ManusMessage[]>([]);
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [error, setError] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [configuring, setConfiguring] = useState(false);
  const [useBrowser, setUseBrowser] = useState(false);

  const load = async () => {
    setError("");
    try {
      const status = await fetch("/api/manus?action=status", { credentials: "same-origin" }).then((r) => r.json());
      setConfigured(Boolean(status.configured));
      if (!status.configured) {
        setTasks([]);
        setMessages([]);
        return;
      }
      const response = await fetch("/api/manus?action=tasks&limit=8", { credentials: "same-origin" });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error?.message || data.error || "โหลดงานไม่สำเร็จ");
      setTasks(Array.isArray(data.data) ? data.data : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "โหลด Manus ไม่สำเร็จ");
    }
  };

  const loadMessages = async (taskId = selectedTaskId) => {
    if (!taskId) return;
    setLoadingMessages(true);
    try {
      const response = await fetch(`/api/manus?action=messages&taskId=${encodeURIComponent(taskId)}&limit=50`, { credentials: "same-origin" });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error?.message || data.error || "โหลดผลลัพธ์ไม่สำเร็จ");
      setMessages(Array.isArray(data.messages) ? data.messages : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "โหลดผลลัพธ์ไม่สำเร็จ");
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => { void load(); }, []);

  useEffect(() => {
    if (!selectedTaskId) return;
    void loadMessages(selectedTaskId);
    const timer = window.setInterval(() => { void loadMessages(selectedTaskId); }, 4000);
    return () => window.clearInterval(timer);
  }, [selectedTaskId]);

  const selectedTask = tasks.find((task) => task.id === selectedTaskId);
  const latestStatus = [...messages].reverse().find((message) => message.type === "status_update")?.status_update?.agent_status;
  const effectiveStatus = latestStatus || selectedTask?.status;

  const configure = async () => {
    const value = apiKey.trim();
    if (!value || configuring) return;
    setConfiguring(true);
    setError("");
    try {
      const response = await fetch("/api/manus", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "configure", apiKey: value }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error || "เชื่อมต่อ Manus ไม่สำเร็จ");
      setApiKey("");
      onConfigured?.();
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "เชื่อมต่อ Manus ไม่สำเร็จ");
    } finally {
      setConfiguring(false);
    }
  };

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
        body: JSON.stringify({ action: "create", prompt: value, useBrowser }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error?.message || data.error || "สร้างงานไม่สำเร็จ");
      setPrompt("");
      if (data.task_id) setSelectedTaskId(data.task_id);
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
    setError("");
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
      await loadMessages(taskId);
    } catch (e) {
      setError(e instanceof Error ? e.message : "หยุดงานไม่สำเร็จ");
    } finally {
      setBusy(false);
    }
  };

  return <Card title={th ? "งาน Manus จริง" : "Live Manus tasks"} icon={ListTodo}
    action={<div className="flex items-center gap-2"><StatusPill tone={configured ? "lime" : "amber"}>{configured === null ? "CHECKING" : configured ? "CONNECTED" : "NOT CONFIGURED"}</StatusPill><Button size="sm" variant="ghost" className="h-8" onClick={() => void load()}><RefreshCw className="size-3.5" /></Button></div>}>
    <div className="space-y-3">
      {!configured ? <div className="rounded-xl border border-amber-300/20 bg-amber-300/5 p-3">
        <p className="text-xs font-medium">{th ? "ใส่ Manus API Key" : "Enter Manus API key"}</p>
        <p className="mt-1 text-[10px] text-subtle">{th ? "คีย์จะถูกเก็บใน HttpOnly cookie และส่งไปยังเซิร์ฟเวอร์เท่านั้น" : "The key is stored in an HttpOnly cookie and sent only to the server."}</p>
        <div className="mt-2 flex gap-2">
          <input type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") void configure(); }} id="manus-live-key" placeholder="manus_..." autoComplete="off" className="min-w-0 flex-1 rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none" />
          <Button size="sm" className="h-9 shrink-0" disabled={!apiKey.trim() || configuring} onClick={() => void configure()}><Link2 className="size-3.5" />{configuring ? "..." : th ? "เชื่อมต่อ" : "Connect"}</Button>
        </div>
      </div> : null}
      <div className="flex gap-2">
        <input value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void createTask(); } }} disabled={!configured || busy} placeholder={configured ? (th ? "สั่งงาน Manus..." : "Give Manus a task...") : (th ? "ตั้ง MANUS_API_KEY บนเซิร์ฟเวอร์ก่อน" : "Configure MANUS_API_KEY on the server")} className="min-w-0 flex-1 rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none" />
        <Button size="sm" className="h-9 shrink-0" disabled={!configured || busy || !prompt.trim()} onClick={() => void createTask()}><Play className="size-3.5" />{busy ? "..." : th ? "เริ่ม" : "Run"}</Button>
      </div>
      {configured ? <button type="button" onClick={async () => { await fetch("/api/manus", { method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "disconnect" }) }); await load(); }} className="text-[10px] text-subtle hover:text-foreground">{th ? "เปลี่ยน/ถอด API key" : "Change / disconnect API key"}</button> : null}
      {error ? <p className="rounded-lg border border-red-300/20 bg-red-300/5 p-2 text-[10px] text-red-300">{error}</p> : null}

      {configured && tasks.length === 0 ? <p className="rounded-xl border border-dashed border-border p-5 text-center text-xs text-subtle">{th ? "ยังไม่มีงานจาก Manus API" : "No Manus API tasks yet."}</p> : null}

      {tasks.map((task) => <div key={task.id} role="button" tabIndex={0} onClick={() => setSelectedTaskId(task.id)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedTaskId(task.id); } }} className={cn("flex w-full cursor-pointer items-center gap-3 rounded-xl border bg-background p-3 text-left transition-colors", selectedTaskId === task.id ? "border-cyan-300/40 bg-cyan-300/5" : "border-border hover:border-cyan-300/20")}>
        <CircleDashed className={cn("size-4 shrink-0", task.status === "running" ? "animate-spin text-cyan-300" : task.status === "stopped" ? "text-lime-300" : "text-amber-300")} />
        <div className="min-w-0 flex-1"><p className="truncate text-xs">{task.title || task.id}</p><p className="text-[10px] text-subtle">{task.status || "unknown"}</p></div>
        {task.task_url ? <a href={task.task_url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="text-cyan-300" aria-label="Open Manus task"><ExternalLink className="size-3.5" /></a> : null}
        {task.status === "running" ? <span onClick={(e) => { e.stopPropagation(); void stopTask(task.id); }} className={cn("rounded-md px-2 py-1 text-[10px] text-red-300", busy ? "pointer-events-none opacity-50" : "hover:bg-red-300/10")}>Stop</span> : null}
      </div>)}

      {selectedTaskId ? <div className="rounded-2xl border border-border bg-background">
        <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-2">
          <div className="min-w-0"><p className="truncate text-xs font-medium">{selectedTask?.title || selectedTaskId}</p><p className="text-[10px] text-subtle">{effectiveStatus || "unknown"}{loadingMessages ? " · syncing…" : ""}</p></div>
          <Button size="sm" variant="ghost" className="h-7 px-2" onClick={() => void loadMessages()}><RefreshCw className={cn("size-3.5", loadingMessages && "animate-spin")} /></Button>
        </div>
        <div className="max-h-80 space-y-2 overflow-y-auto p-3">
          {messages.length === 0 ? <p className="py-6 text-center text-xs text-subtle">{th ? "กำลังรอข้อความจาก Manus…" : "Waiting for Manus events…"}</p> : messages.map((message) => {
            const status = message.status_update;
            const text = message.type === "assistant_message" ? message.assistant_message?.content : message.type === "user_message" ? message.user_message?.content : message.type === "error_message" ? message.error_message?.content : message.type === "status_update" ? (status?.brief || status?.description || `status: ${status?.agent_status || "unknown"}`) : message.type === "structured_output_result" ? JSON.stringify(message.structured_output_result?.value ?? message.structured_output_result?.error ?? "") : "";
            if (!text) return null;
            return <div key={message.id} className={cn("rounded-xl border p-3 text-xs", message.type === "assistant_message" ? "border-cyan-300/20 bg-cyan-300/5" : message.type === "error_message" ? "border-red-300/20 bg-red-300/5 text-red-300" : message.type === "status_update" ? "border-border bg-card/40 text-subtle" : "border-border bg-background")}>
              <div className="mb-1 text-[9px] uppercase tracking-wider text-subtle">{message.type.replaceAll("_", " ")}</div>
              <p className="whitespace-pre-wrap break-words leading-relaxed">{text}</p>
              {message.type === "status_update" && status?.agent_status === "waiting" ? <p className="mt-2 rounded-lg border border-amber-300/20 bg-amber-300/5 p-2 text-[10px] text-amber-200">{status.status_detail?.waiting_description || (th ? "Manus กำลังรอการยืนยัน/ข้อมูลจากคุณ" : "Manus is waiting for input or confirmation.")}</p> : null}
            </div>;
          })}
        </div>
      </div> : null}
    </div>
  </Card>;
}

export function ManusHubPanel() {
  const language = useBossStore((s) => s.language); const [tab, setTab] = useState<HubTab>("overview"); const [query, setQuery] = useState(""); const th = language === "th"; const filteredSkills = useMemo(() => SKILLS.filter((item) => item.includes(query.toLowerCase())), [query]);
  const copy = th ? { title: "Manus Hub", lead: "ศูนย์รวม Tasks, Browser/OS, Skills, Catalog และระบบอัตโนมัติ", preview: "API CONNECTOR REQUIRED", connect: "เชื่อมต่อ Manus API", browser: "Browser และ OS ต้องใช้สิทธิ์/เซสชันภายนอก", task: "งานล่าสุด", project: "โปรเจกต์", file: "ไฟล์และ Artifacts", schedule: "กำหนดการ", no: "ยังไม่ได้เชื่อมต่อข้อมูลจริง" } : { title: "Manus Hub", lead: "One surface for Tasks, Browser/OS, Skills, Catalog and automation", preview: "API CONNECTOR REQUIRED", connect: "Connect Manus API", browser: "Browser and OS require external permission/session", task: "Recent tasks", project: "Projects", file: "Files & artifacts", schedule: "Schedules", no: "Live data is not connected yet" };
  return <div className="flex h-full min-h-0 flex-col overflow-y-auto"><header className="border-b border-border px-4 py-4 sm:px-6"><div className="flex flex-wrap items-start justify-between gap-4"><div><div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.22em] text-cyan-300"><Sparkles className="size-3.5" /> MANUS SUITE</div><h2 className="mt-2 font-display text-3xl tracking-tight">{copy.title}</h2><p className="mt-1 text-sm text-muted-foreground">{copy.lead}</p></div><div className="flex items-center gap-2"><StatusPill tone="amber">{copy.preview}</StatusPill><button type="button" onClick={() => document.getElementById("manus-live-key")?.focus()} className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-secondary px-3 text-xs font-medium"><Link2 className="size-3.5" />{copy.connect}</button></div></div><div className="mt-4 flex gap-1 overflow-x-auto rounded-2xl border border-border bg-card/40 p-1">{TABS.map(({ id, label, icon: Icon }) => <button key={id} type="button" onClick={() => setTab(id)} className={cn("inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-xs transition-colors", tab === id ? "bg-secondary text-foreground" : "text-subtle hover:text-foreground")}><Icon className="size-3.5" />{label}</button>)}</div></header>
    {tab === "browser" ? <div className="p-4 sm:p-6"><RealBrowser th={th} /></div> : tab === "overview" ? <div className="grid gap-4 p-4 sm:p-6 xl:grid-cols-3"><LiveTasks th={th} /><Card title={copy.project} icon={FolderKanban}><div className="grid grid-cols-2 gap-2">{["BossG Command Center", "Research Lab", "Media Studio", "Website MVP"].map((name) => <div key={name} className="rounded-xl border border-border bg-background p-3"><FolderKanban className="size-4 text-violet-300" /><p className="mt-2 truncate text-xs">{name}</p><p className="mt-1 text-[10px] text-subtle">durable instructions</p></div>)}</div></Card><Card title={copy.file} icon={HardDrive}><div className="rounded-xl border border-dashed border-border p-5 text-center"><UploadCloud className="mx-auto size-6 text-cyan-300" /><p className="mt-2 text-xs">Upload, inspect and reuse files</p><p className="mt-1 text-[10px] text-subtle">512 MB/file · API required</p><Button size="sm" variant="secondary" className="mt-3 h-8"><UploadCloud className="size-3.5" />Upload file</Button></div></Card><Card title="Browser / OS" icon={Globe2}><div className="rounded-xl border border-amber-300/20 bg-amber-300/5 p-3"><div className="flex items-center gap-2 text-xs text-amber-300"><ShieldCheck className="size-4" />Permission boundary</div><p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">{copy.browser}. This UI does not silently control a personal browser or operating system.</p><Button size="sm" variant="secondary" className="mt-3 h-8" onClick={() => setTab("browser")}><Play className="size-3.5" />Open simulation</Button></div></Card><Card title="Skills & Catalog" icon={Library}><div className="flex flex-wrap gap-2">{SKILLS.slice(0, 8).map((skill) => <StatusPill key={skill} tone="cyan">{skill}</StatusPill>)}</div><button type="button" onClick={() => setTab("skills")} className="mt-4 inline-flex items-center gap-1 text-xs text-cyan-300">Browse full catalog <ArrowUpRight className="size-3.5" /></button></Card><Card title={copy.schedule} icon={CalendarClock}><div className="flex items-center gap-3 rounded-xl border border-border bg-background p-3"><Workflow className="size-5 text-lime-300" /><div><p className="text-xs">No schedules connected</p><p className="text-[10px] text-subtle">Cron, interval and event triggers</p></div></div></Card></div> : <div className="p-4 sm:p-6">{tab === "skills" ? <Card title="Skills catalog" icon={Sparkles} action={<div className="flex items-center gap-2 rounded-full border border-border bg-background px-3"><Search className="size-3.5 text-subtle" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search skills" className="h-8 w-32 bg-transparent text-xs outline-none" /></div>}><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{filteredSkills.map((skill) => <div key={skill} className="rounded-xl border border-border bg-background p-4"><div className="flex items-center justify-between"><Sparkles className="size-4 text-lime-300" /><StatusPill tone="lime">available</StatusPill></div><p className="mt-3 text-sm font-medium">{skill}</p><p className="mt-1 text-[10px] text-subtle">Reusable Manus capability · project skill</p></div>)}</div></Card> : <div className="grid gap-4 xl:grid-cols-2"><Card title={TABS.find((item) => item.id === tab)?.label ?? "Manus"} icon={TABS.find((item) => item.id === tab)?.icon ?? Activity}><div className="rounded-2xl border border-dashed border-border p-10 text-center"><PackageOpen className="mx-auto size-8 text-cyan-300" /><p className="mt-3 text-sm">{copy.no}</p><p className="mt-1 text-xs text-subtle">Connect Manus API to load live records and actions.</p><Button asChild className="mt-4" size="sm"><a href="https://manus.im/app#settings/integrations/api" target="_blank" rel="noreferrer"><Link2 className="size-3.5" />Connect connector</a></Button></div></Card><Card title="Capability notes" icon={Settings2}><div className="space-y-2 text-xs text-muted-foreground"><p>Tasks: create, continue, inspect, stop.</p><p>Browser/OS: use the Mock Simulation tab for safe local testing.</p><p>Skills: catalog and force/enable controls.</p><p>Artifacts: reports, websites, media and downloadable files.</p></div></Card></div>}</div>}
  </div>;
}
