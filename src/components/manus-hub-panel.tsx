import { useEffect, useMemo, useState } from "react";
import { Activity, ArrowUpRight, Bot, CalendarClock, Check, ChevronRight, CircleDashed, ExternalLink, FileUp, FolderKanban, HardDrive, Library, Link2, ListTodo, MonitorUp, RefreshCw, Search, ShieldCheck, Sparkles, Square, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBossStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { MANUS_TOOL_REGISTRY } from "@/lib/manus-tool-registry";

type HubTab = "overview" | "tasks" | "projects" | "files" | "browser" | "skills" | "catalog" | "automation";
const TABS: { id: HubTab; label: string; icon: typeof ListTodo }[] = [
  { id: "overview", label: "Overview", icon: Activity },
  { id: "tasks", label: "Tasks", icon: ListTodo },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "files", label: "Files", icon: HardDrive },
  { id: "browser", label: "Browser / OS", icon: MonitorUp },
  { id: "skills", label: "Skills", icon: Sparkles },
  { id: "catalog", label: "Catalog", icon: Library },
  { id: "automation", label: "Schedules", icon: CalendarClock },
];

function StatusPill({ children, tone = "muted" }: { children: React.ReactNode; tone?: "muted" | "lime" | "cyan" | "amber" }) {
  return <span className={cn("rounded-full border px-2 py-1 text-[10px]", tone === "lime" ? "border-lime-300/30 bg-lime-300/10 text-lime-300" : tone === "cyan" ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-300" : tone === "amber" ? "border-amber-300/30 bg-amber-300/10 text-amber-300" : "border-border bg-secondary text-subtle")}>{children}</span>;
}

function Card({ title, icon: Icon, children, action }: { title: string; icon: typeof Activity; children: React.ReactNode; action?: React.ReactNode }) {
  return <section className="rounded-2xl border border-border bg-card/50 p-4"><div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2"><Icon className="size-4 text-cyan-300" /><h3 className="text-sm font-medium">{title}</h3></div>{action}</div><div className="mt-4">{children}</div></section>;
}

async function apiGet(action: string, params: Record<string, string> = {}) {
  const query = new URLSearchParams({ action, ...params });
  const response = await fetch("/api/manus?" + query.toString(), { credentials: "same-origin" });
  const data = await response.json();
  if (!response.ok || !data.ok) throw new Error(typeof data.error === "string" ? data.error : data.error?.message || "Manus API error");
  return data;
}

async function apiPost(body: Record<string, unknown>) {
  const response = await fetch("/api/manus", { method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const data = await response.json();
  if (!response.ok || !data.ok) throw new Error(typeof data.error === "string" ? data.error : data.error?.message || "Manus API error");
  return data;
}

type ManusTask = {
  id: string;
  title?: string;
  status?: string;
  task_url?: string;
  created_at?: number;
  agent_profile?: string;
  credit_usage?: number;
};

type ManusProject = { id: string; name: string; instruction?: string; created_at?: number };
type ManusConnector = { id: string; name: string; description?: string; category?: string; type?: string };
type ManusSkill = { id: string; name: string; description?: string; owner_type?: string };
type ManusBrowser = { client_id: string; client_name?: string; ua?: string };

function useManusStatus() {
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [error, setError] = useState("");
  const refresh = async () => {
    try {
      const data = await apiGet("status");
      setConfigured(Boolean(data.configured));
      setError("");
    } catch (e) {
      setConfigured(false);
      setError(e instanceof Error ? e.message : "ตรวจสอบ Manus ไม่สำเร็จ");
    }
  };
  useEffect(() => { void refresh(); }, []);
  return { configured, error, refresh };
}

function TaskWorkspace({ th }: { th: boolean }) {
  const [tasks, setTasks] = useState<ManusTask[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [detail, setDetail] = useState<ManusTask | null>(null);

  const loadTasks = async () => {
    setLoading(true); setError("");
    try {
      const data = await apiGet("tasks", { limit: "50" });
      setTasks(Array.isArray(data.data) ? data.data : []);
      setSelectedId((v) => v || data.data?.[0]?.id || data.data?.[0]?.task_id || "");
    } catch (e) { setError(e instanceof Error ? e.message : "โหลด tasks ไม่สำเร็จ"); }
    finally { setLoading(false); }
  };

  const loadSelected = async (id: string) => {
    if (!id) return;
    try {
      const [d, m] = await Promise.all([apiGet("task", { taskId: id }), apiGet("messages", { taskId: id, limit: "100", verbose: "true" })]);
      setDetail(d.data ?? d.task ?? null);
      setMessages(Array.isArray(m.data) ? m.data : m.messages ?? []);
    } catch (e) { setError(e instanceof Error ? e.message : "โหลด task ไม่สำเร็จ"); }
  };

  useEffect(() => { void loadTasks(); }, []);
  useEffect(() => { void loadSelected(selectedId); }, [selectedId]);

  const create = async () => {
    const value = prompt.trim();
    if (!value || sending) return;
    setSending(true); setError("");
    try {
      const data = await apiPost({ action: "create", prompt: value, agentProfile: "standard" });
      const id = data.task_id;
      setPrompt("");
      await loadTasks();
      if (id) setSelectedId(id);
    } catch (e) { setError(e instanceof Error ? e.message : "สร้าง task ไม่สำเร็จ"); }
    finally { setSending(false); }
  };

  const send = async () => {
    const value = prompt.trim();
    if (!selectedId || !value || sending) return;
    setSending(true); setError("");
    try {
      await apiPost({ action: "send", taskId: selectedId, prompt: value });
      setPrompt("");
      await loadSelected(selectedId);
    } catch (e) { setError(e instanceof Error ? e.message : "ส่งข้อความไม่สำเร็จ"); }
    finally { setSending(false); }
  };

  const stop = async () => {
    if (!selectedId) return;
    setSending(true); setError("");
    try { await apiPost({ action: "stop", taskId: selectedId }); await loadSelected(selectedId); await loadTasks(); }
    catch (e) { setError(e instanceof Error ? e.message : "หยุด task ไม่สำเร็จ"); }
    finally { setSending(false); }
  };

  const confirm = async (eventId: string) => {
    try { await apiPost({ action: "confirm", taskId: selectedId, eventId }); await loadSelected(selectedId); }
    catch (e) { setError(e instanceof Error ? e.message : "ยืนยัน action ไม่สำเร็จ"); }
  };

  return <Card title={th ? "Manus Tasks จริง" : "Live Manus Tasks"} icon={ListTodo} action={<div className="flex items-center gap-2"><StatusPill tone={tasks.length ? "lime" : "cyan"}>{loading ? "LOADING" : `${tasks.length} TASKS`}</StatusPill><Button size="sm" variant="ghost" className="h-8" onClick={() => void loadTasks()}><RefreshCw className={cn("size-3.5", loading && "animate-spin")} /></Button></div>}>
    <div className="space-y-3">
      <div className="flex gap-2">
        <input value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void (selectedId ? send() : create()); } }} placeholder={selectedId ? (th ? "ส่งคำสั่งต่อให้ task นี้..." : "Continue this Manus task...") : (th ? "สร้างงาน Manus จริง..." : "Create a real Manus task...")} disabled={sending} className="min-w-0 flex-1 rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none" />
        <Button size="sm" disabled={sending || !prompt.trim()} onClick={() => void (selectedId ? send() : create())}><Play className="size-3.5" />{sending ? "..." : selectedId ? "Send" : "Create"}</Button>
        {selectedId ? <Button size="sm" variant="destructive" disabled={sending} onClick={() => void stop()}><Square className="size-3.5" />Stop</Button> : null}
      </div>
      {error ? <p className="rounded-lg border border-red-300/20 bg-red-300/5 p-2 text-[10px] text-red-300">{error}</p> : null}
      <div className="grid gap-3 xl:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
        <div className="space-y-2">
          {tasks.map((task) => { const id = task.id || (task as any).task_id; return <button key={id} type="button" onClick={() => setSelectedId(id)} className={cn("flex w-full items-center gap-3 rounded-xl border bg-background p-3 text-left", selectedId === id ? "border-cyan-300/40 bg-cyan-300/5" : "border-border")}><CircleDashed className={cn("size-4", task.status === "running" ? "animate-spin text-cyan-300" : task.status === "completed" ? "text-lime-300" : "text-subtle")} /><div className="min-w-0 flex-1"><p className="truncate text-xs">{task.title || id}</p><p className="text-[10px] text-subtle">{task.status || "unknown"}{task.credit_usage != null ? ` · ${task.credit_usage} credits` : ""}</p></div><ChevronRight className="size-3.5 text-subtle" /></button>; })}
          {!tasks.length && !loading ? <div className="rounded-xl border border-dashed border-border p-6 text-center text-xs text-subtle">ยังไม่มี task จริงในบัญชี Manus</div> : null}
        </div>
        <div className="min-h-64 rounded-2xl border border-border bg-background">
          {selectedId ? <><div className="flex items-center justify-between border-b border-border px-3 py-2"><div><p className="text-xs font-medium">{detail?.title || selectedId}</p><p className="text-[10px] text-subtle">{detail?.status || "loading"}</p></div>{detail?.task_url ? <a href={detail.task_url} target="_blank" rel="noreferrer" className="text-cyan-300"><ExternalLink className="size-3.5" /></a> : null}</div><div className="max-h-[420px] space-y-2 overflow-y-auto p-3">{messages.length ? messages.map((message, i) => { const eventId = message.event_id || message.id; const waiting = message.type === "status_update" && message.status_update?.status === "waiting"; return <div key={eventId || i} className="rounded-xl border border-border p-3 text-xs"><div className="mb-1 text-[9px] uppercase tracking-wider text-subtle">{message.type || "event"}</div><pre className="whitespace-pre-wrap break-words font-sans leading-relaxed">{message.assistant_message?.content || message.content || message.status_update?.description || message.status_update?.brief || JSON.stringify(message, null, 2)}</pre>{waiting && message.status_update?.status_detail?.waiting_for_event_id ? <Button size="sm" className="mt-2 h-7" onClick={() => void confirm(message.status_update.status_detail.waiting_for_event_id)}><Check className="size-3.5" />Confirm</Button> : null}</div>; }) : <p className="p-6 text-center text-xs text-subtle">ยังไม่มีข้อความจาก task</p>}</div></> : <div className="flex h-full min-h-64 items-center justify-center p-8 text-center text-xs text-subtle">เลือก task หรือสร้าง task ใหม่</div>}
        </div>
      </div>
    </div>
  </Card>;
}

function Projects({ th }: { th: boolean }) {
  const [items, setItems] = useState<ManusProject[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const load = async () => { setLoading(true); try { const d = await apiGet("projects"); setItems(Array.isArray(d.data) ? d.data : []); } catch (e) { setError(e instanceof Error ? e.message : "โหลด projects ไม่สำเร็จ"); } finally { setLoading(false); } };
  useEffect(() => { void load(); }, []);
  const create = async () => { if (!name.trim()) return; try { await apiPost({ action: "createProject", title: name.trim() }); setName(""); await load(); } catch (e) { setError(e instanceof Error ? e.message : "สร้าง project ไม่สำเร็จ"); } };
  return <Card title={th ? "Projects จริงจาก Manus" : "Live Manus Projects"} icon={FolderKanban} action={<Button size="sm" variant="ghost" onClick={() => void load()}><RefreshCw className={cn("size-3.5", loading && "animate-spin")} /></Button>}><div className="flex gap-2"><input value={name} onChange={(e) => setName(e.target.value)} placeholder={th ? "ชื่อ project ใหม่" : "New project name"} className="min-w-0 flex-1 rounded-xl border border-border bg-background px-3 py-2 text-xs" /><Button size="sm" onClick={() => void create()}>Create</Button></div>{error ? <p className="mt-2 text-[10px] text-red-300">{error}</p> : null}<div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">{items.map((item) => <div key={item.id} className="rounded-xl border border-border bg-background p-3"><FolderKanban className="size-4 text-violet-300" /><p className="mt-2 truncate text-xs">{item.name}</p><p className="mt-1 line-clamp-2 text-[10px] text-subtle">{item.instruction || "No shared instruction"}</p></div>)}</div>{!items.length && !loading ? <p className="mt-4 text-center text-xs text-subtle">ไม่พบ project ในบัญชี Manus</p> : null}</Card>;
}

function Connectors({ th }: { th: boolean }) {
  const [items, setItems] = useState<ManusConnector[]>([]);
  const [error, setError] = useState("");
  const load = async () => { try { const d = await apiGet("connectors"); setItems(Array.isArray(d.data) ? d.data : []); } catch (e) { setError(e instanceof Error ? e.message : "โหลด connectors ไม่สำเร็จ"); } };
  useEffect(() => { void load(); }, []);
  return <Card title={th ? "Connectors ที่ authorize จริง" : "Authorized Manus Connectors"} icon={Link2} action={<Button size="sm" variant="ghost" onClick={() => void load()}><RefreshCw className="size-3.5" /></Button>}>{error ? <p className="text-[10px] text-red-300">{error}</p> : null}<div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">{items.map((item) => <div key={item.id} className="rounded-xl border border-border bg-background p-3"><div className="flex items-center justify-between"><p className="text-xs font-medium">{item.name}</p><StatusPill tone="lime">LIVE</StatusPill></div><p className="mt-1 text-[10px] text-subtle">{item.description || item.category || item.type || item.id}</p><p className="mt-2 break-all text-[9px] text-subtle">{item.id}</p></div>)}</div>{!items.length && !error ? <p className="py-6 text-center text-xs text-subtle">ยังไม่มี connector ที่ authorize ให้ API นี้</p> : null}</Card>;
}

function Skills({ th }: { th: boolean }) {
  const [items, setItems] = useState<ManusSkill[]>([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  useEffect(() => { void apiGet("skills").then((d) => setItems(Array.isArray(d.data) ? d.data : [])).catch((e) => setError(e instanceof Error ? e.message : "โหลด skills ไม่สำเร็จ")); }, []);
  const filtered = useMemo(() => items.filter((s) => (s.name + " " + (s.description || "")).toLowerCase().includes(query.toLowerCase())), [items, query]);
  return <Card title={th ? "Skills จริงจาก Manus" : "Live Manus Skills"} icon={Sparkles} action={<div className="flex items-center gap-2 rounded-full border border-border bg-background px-3"><Search className="size-3.5 text-subtle" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" className="h-8 w-32 bg-transparent text-xs outline-none" /></div>}>{error ? <p className="text-[10px] text-red-300">{error}</p> : null}<div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{filtered.map((skill) => <div key={skill.id} className="rounded-xl border border-border bg-background p-4"><div className="flex items-center justify-between"><Sparkles className="size-4 text-lime-300" /><StatusPill tone="lime">{skill.owner_type || "available"}</StatusPill></div><p className="mt-3 text-sm font-medium">{skill.name}</p><p className="mt-1 text-[10px] text-subtle">{skill.description || "No description"}</p><p className="mt-2 break-all text-[9px] text-subtle">ID: {skill.id}</p></div>)}</div>{!filtered.length && !error ? <p className="py-6 text-center text-xs text-subtle">ไม่พบ skill ที่ API เปิดให้บัญชีนี้</p> : null}</Card>;
}

function RealBrowser({ th }: { th: boolean }) {
  const [browsers, setBrowsers] = useState<ManusBrowser[]>([]);
  const [error, setError] = useState("");
  const load = async () => { try { const d = await apiGet("browsers"); setBrowsers(Array.isArray(d.data) ? d.data : []); } catch (e) { setError(e instanceof Error ? e.message : "โหลด browser ไม่สำเร็จ"); } };
  useEffect(() => { void load(); }, []);
  return <Card title="Manus My Browser" icon={MonitorUp} action={<Button size="sm" variant="ghost" onClick={() => void load()}><RefreshCw className="size-3.5" /></Button>}><p className="mb-3 text-xs text-muted-foreground">{th ? "แสดงเฉพาะ browser session ที่ Manus API มองเห็นจริง ไม่มี simulation" : "Only browser sessions actually exposed by the Manus API are shown. No simulation."}</p>{error ? <p className="text-[10px] text-red-300">{error}</p> : null}<div className="space-y-2">{browsers.map((browser) => <div key={browser.client_id} className="flex items-center gap-3 rounded-xl border border-border bg-background p-3"><MonitorUp className="size-4 text-cyan-300" /><div className="min-w-0 flex-1"><p className="truncate text-xs">{browser.client_name || browser.client_id}</p><p className="truncate text-[10px] text-subtle">{browser.ua || "Authorized browser client"}</p></div><StatusPill tone="lime">ONLINE</StatusPill></div>)}</div>{!browsers.length && !error ? <div className="rounded-xl border border-dashed border-border p-6 text-center"><MonitorUp className="mx-auto size-7 text-cyan-300" /><p className="mt-2 text-xs">{th ? "ยังไม่มี browser ที่ authorize" : "No authorized browser is online"}</p><a href="https://manus.im/my-browser" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs text-cyan-300">My Browser <ExternalLink className="size-3" /></a></div> : null}<div className="mt-3 rounded-xl border border-cyan-300/15 bg-cyan-300/5 p-3 text-[10px] text-cyan-100"><ShieldCheck className="mr-1 inline size-3.5" />{th ? "ไม่มีปุ่มจำลองการควบคุม OS ถ้าไม่มี session จริง ปุ่มจะไม่ถูกแสดง" : "No fake OS-control button is shown when there is no real session."}</div></Card>;
}

function Files() {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState("");
  const upload = async (file: File) => {
    setBusy(true); setResult("");
    try {
      const prepared = await apiPost({ action: "uploadPrepare", filename: file.name });
      const put = await fetch(prepared.upload_url, { method: "PUT", body: file });
      if (!put.ok) throw new Error("อัปโหลดไฟล์ไป Manus ไม่สำเร็จ");
      setResult(`อัปโหลดแล้ว: ${file.name} · file_id=${prepared.file?.id || "unknown"}`);
    } catch (e) { setResult(e instanceof Error ? e.message : "อัปโหลดไม่สำเร็จ"); }
    finally { setBusy(false); }
  };
  return <Card title="Files · Manus upload" icon={HardDrive}><label className={cn("flex cursor-pointer flex-col items-center rounded-xl border border-dashed border-border p-8 text-center", busy && "pointer-events-none opacity-60")}><FileUp className="size-7 text-cyan-300" /><p className="mt-2 text-xs">{busy ? "กำลังอัปโหลด..." : "เลือกไฟล์เพื่ออัปโหลดเข้า Manus จริง"}</p><p className="mt-1 text-[10px] text-subtle">ไฟล์จะถูกส่งผ่าน presigned upload URL ของ Manus</p><input type="file" className="hidden" disabled={busy} onChange={(e) => { const file = e.target.files?.[0]; if (file) void upload(file); e.currentTarget.value = ""; }} /></label>{result ? <p className={cn("mt-3 rounded-lg border p-2 text-[10px]", result.startsWith("อัปโหลดแล้ว") ? "border-lime-300/20 text-lime-300" : "border-red-300/20 text-red-300")}>{result}</p> : null}</Card>;
}

function Catalog({ th }: { th: boolean }) {
  return <div className="grid gap-4 xl:grid-cols-2"><Card title={th ? "Tool Registry จริง" : "Live Tool Registry"} icon={Library}><div className="grid gap-2 sm:grid-cols-2">{MANUS_TOOL_REGISTRY.map((tool) => <div key={tool.id} className="rounded-xl border border-border bg-background p-3"><div className="flex items-center justify-between gap-2"><p className="text-xs font-medium">{tool.label}</p><StatusPill tone={tool.status === "live" ? "lime" : "amber"}>{tool.status === "live" ? "LIVE" : "BRIDGE"}</StatusPill></div><p className="mt-1 text-[10px] text-subtle">{tool.description}</p></div>)}</div></Card><Card title="Puter Bridge" icon={Bot}><p className="text-xs text-muted-foreground">Puter มี MCP server สำหรับ filesystem, hosting, workers, KV, apps, docs และ account. ส่วน Puter AI chat ยังใช้ Puter.js ใน browser ของแอปนี้ จึงไม่ถูกหลอกให้เป็น Manus connector จนกว่าจะมี bridge ที่ authenticate จริง</p><div className="mt-3 rounded-xl border border-amber-300/20 bg-amber-300/5 p-3 text-[10px] text-amber-200">สถานะ: bridge-required · ไม่มีปุ่มปลอม</div><a href="https://docs.puter.com/mcp/" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs text-cyan-300">Puter MCP docs <ArrowUpRight className="size-3.5" /></a></Card></div>;
}

export function ManusHubPanel() {
  const language = useBossStore((s) => s.language);
  const [tab, setTab] = useState<HubTab>("overview");
  const th = language === "th";
  const { configured, error: statusError, refresh } = useManusStatus();
  const copy = th
    ? { title: "Manus Hub", lead: "เครื่องมือ Manus ที่เรียก API จริงได้ในที่เดียว", connect: "เชื่อม Manus API", schedules: "Schedules ยังไม่มี endpoint สำหรับแอปนี้" }
    : { title: "Manus Hub", lead: "Real Manus API tools in one surface", connect: "Connect Manus API", schedules: "Schedules are not exposed to this app yet" };

  return <div className="flex h-full min-h-0 flex-col overflow-y-auto">
    <header className="border-b border-border px-4 py-4 sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div><div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.22em] text-cyan-300"><Sparkles className="size-3.5" /> MANUS SUITE</div><h2 className="mt-2 font-display text-3xl tracking-tight">{copy.title}</h2><p className="mt-1 text-sm text-muted-foreground">{copy.lead}</p></div>
        <div className="flex items-center gap-2"><StatusPill tone={configured ? "lime" : "amber"}>{configured === null ? "CHECKING" : configured ? "MANUS CONNECTED" : "API KEY REQUIRED"}</StatusPill><button type="button" onClick={() => document.getElementById("manus-live-key")?.focus()} className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-secondary px-3 text-xs font-medium"><Link2 className="size-3.5" />{copy.connect}</button><Button size="sm" variant="ghost" onClick={() => void refresh()}><RefreshCw className="size-3.5" /></Button></div>
      </div>
      {statusError ? <p className="mt-3 text-[10px] text-red-300">{statusError}</p> : null}
      <div className="mt-4 flex gap-1 overflow-x-auto rounded-2xl border border-border bg-card/40 p-1">{TABS.map(({ id, label, icon: Icon }) => <button key={id} type="button" onClick={() => setTab(id)} className={cn("inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-xs", tab === id ? "bg-secondary text-foreground" : "text-subtle hover:text-foreground")}><Icon className="size-3.5" />{label}</button>)}</div>
    </header>

    <div className="space-y-4 p-4 sm:p-6">
      {tab === "overview" ? <><TaskWorkspace th={th} /><div className="grid gap-4 xl:grid-cols-2"><Projects th={th} /><Connectors th={th} /></div><div className="grid gap-4 xl:grid-cols-2"><Files /><RealBrowser th={th} /></div></> : null}
      {tab === "tasks" ? <TaskWorkspace th={th} /> : null}
      {tab === "projects" ? <Projects th={th} /> : null}
      {tab === "files" ? <Files /> : null}
      {tab === "browser" ? <RealBrowser th={th} /> : null}
      {tab === "skills" ? <Skills th={th} /> : null}
      {tab === "catalog" ? <Catalog th={th} /> : null}
      {tab === "automation" ? <Card title="Schedules" icon={Workflow}><div className="rounded-xl border border-dashed border-border p-8 text-center"><CalendarClock className="mx-auto size-7 text-cyan-300" /><p className="mt-3 text-xs">{copy.schedules}</p><p className="mt-1 text-[10px] text-subtle">จะไม่แสดงปุ่มสร้าง schedule จนกว่าจะมี backend endpoint จริง</p></div></Card> : null}
    </div>
  </div>;
}
