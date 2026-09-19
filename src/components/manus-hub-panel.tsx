import { useEffect, useMemo, useState } from "react";
import { Activity, Archive, ArrowLeft, ArrowRight, ArrowUpRight, Bot, CalendarClock, Check, ChevronRight, CircleDashed, ExternalLink, FileText, FolderKanban, Globe2, HardDrive, Library, Link2, ListTodo, MonitorUp, PackageOpen, Play, Power, RefreshCw, Search, Settings2, ShieldCheck, Sparkles, TerminalSquare, UploadCloud, Workflow, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBossStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { chatWithPuter, type ChatPuterResult } from "@/lib/puter-ai";
import { getPuter, loadPuter, puterErrorMessage, type PuterChatMessage } from "@/lib/puter";

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

type PuterTask = {
  id: string;
  status: "running" | "completed" | "error";
  title: string;
  prompt: string;
  result?: string;
  model?: string;
  created_at: number;
};

function LiveTasks({ th }: { th: boolean }) {
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [tasks, setTasks] = useState<PuterTask[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [liveText, setLiveText] = useState("");

  const refreshAuth = async () => {
    try {
      const puter = getPuter() ?? await loadPuter();
      setSignedIn(Boolean(puter.auth?.isSignedIn()));
    } catch {
      setSignedIn(false);
    }
  };

  useEffect(() => { void refreshAuth(); }, []);

  const runTask = async () => {
    const value = prompt.trim();
    if (!value || busy) return;
    setBusy(true);
    setError("");
    setLiveText("");

    const task: PuterTask = {
      id: crypto.randomUUID(),
      status: "running",
      title: value.slice(0, 72),
      prompt: value,
      created_at: Date.now(),
    };
    setTasks((prev) => [task, ...prev]);
    setSelectedTaskId(task.id);
    setPrompt("");

    try {
      await loadPuter();
      const messages: PuterChatMessage[] = [
        {
          role: "system",
          content: "You are the Manus Hub execution agent inside BossnuGrok. Plan the task briefly, then produce the requested result. Use the user's language when practical. Do not claim external browser/OS actions unless an explicitly connected tool actually performed them.",
        },
        { role: "user", content: value },
      ];
      const result: ChatPuterResult = await chatWithPuter({
        messages,
        pinnedModel: "auto",
        onDelta: (text) => {
          setLiveText(text);
          setTasks((prev) => prev.map((item) => item.id === task.id ? { ...item, result: text } : item));
        },
      });
      setTasks((prev) => prev.map((item) => item.id === task.id ? {
        ...item,
        status: "completed",
        result: result.text,
        model: result.model.label || result.model.id,
      } : item));
    } catch (e) {
      const message = puterErrorMessage(e);
      setError(message);
      setTasks((prev) => prev.map((item) => item.id === task.id ? { ...item, status: "error", result: message } : item));
    } finally {
      setBusy(false);
      await refreshAuth();
    }
  };

  const selected = tasks.find((task) => task.id === selectedTaskId);

  return <Card
    title={th ? "งาน Manus Hub · Puter" : "Manus Hub · Puter Tasks"}
    icon={ListTodo}
    action={<div className="flex items-center gap-2">
      <StatusPill tone={signedIn ? "lime" : "amber"}>
        {signedIn === null ? "CHECKING" : signedIn ? "PUTER CONNECTED" : "PUTER LOGIN REQUIRED"}
      </StatusPill>
      <Button size="sm" variant="ghost" className="h-8" onClick={() => void refreshAuth()}>
        <RefreshCw className="size-3.5" />
      </Button>
    </div>}
  >
    <div className="space-y-3">
      <div className="rounded-xl border border-cyan-300/15 bg-cyan-300/5 p-3">
        <div className="flex items-center gap-2 text-xs font-medium text-cyan-200">
          <Bot className="size-4" />
          {th ? "Manus Hub ใช้ Puter เป็น AI Runtime" : "Manus Hub uses Puter as its AI runtime"}
        </div>
        <p className="mt-1 text-[10px] text-muted-foreground">
          {th
            ? "งานที่สั่งจาก Hub จะส่งเข้า Puter โดยตรง และใช้บัญชี/โมเดลของ Puter ที่คุณเชื่อมต่ออยู่"
            : "Tasks started here are sent directly to Puter and use the Puter account/model available to you."}
        </p>
      </div>

      <div className="flex gap-2">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void runTask(); } }}
          disabled={busy || signedIn === false}
          placeholder={signedIn ? (th ? "สั่งงาน Manus Hub..." : "Give Manus Hub a task...") : (th ? "ล็อกอิน Puter ก่อนใช้งาน" : "Sign in to Puter first")}
          className="min-w-0 flex-1 rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none"
        />
        <Button size="sm" className="h-9 shrink-0" disabled={busy || !prompt.trim() || signedIn === false} onClick={() => void runTask()}>
          <Play className="size-3.5" />{busy ? "..." : th ? "เริ่ม" : "Run"}
        </Button>
      </div>

      {!signedIn && signedIn !== null ? (
        <div className="rounded-xl border border-amber-300/20 bg-amber-300/5 p-3 text-[10px] text-amber-200">
          {th ? "เปิดการเข้าสู่ระบบ Puter จากแถบด้านบนของแอป แล้วกลับมากดรีเฟรช" : "Sign in to Puter from the app header, then refresh this panel."}
        </div>
      ) : null}

      {error ? <p className="rounded-lg border border-red-300/20 bg-red-300/5 p-2 text-[10px] text-red-300">{error}</p> : null}

      {tasks.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-5 text-center text-xs text-subtle">
          {th ? "ยังไม่มีงาน · พิมพ์คำสั่งเพื่อเริ่ม" : "No tasks yet · enter a command to start"}
        </p>
      ) : (
        <div className="grid gap-3 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="space-y-2">
            {tasks.map((task) => (
              <button
                key={task.id}
                type="button"
                onClick={() => setSelectedTaskId(task.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl border bg-background p-3 text-left transition-colors",
                  selectedTaskId === task.id ? "border-cyan-300/40 bg-cyan-300/5" : "border-border hover:border-cyan-300/20"
                )}
              >
                <CircleDashed className={cn(
                  "size-4 shrink-0",
                  task.status === "running" ? "animate-spin text-cyan-300" :
                  task.status === "completed" ? "text-lime-300" : "text-red-300"
                )} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs">{task.title}</p>
                  <p className="text-[10px] text-subtle">{task.model || task.status}</p>
                </div>
                <ChevronRight className="size-3.5 text-subtle" />
              </button>
            ))}
          </div>

          {selected ? (
            <div className="rounded-2xl border border-border bg-background">
              <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-2">
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium">{selected.title}</p>
                  <p className="text-[10px] text-subtle">
                    {selected.status}{selected.model ? ` · ${selected.model}` : ""}
                  </p>
                </div>
                {selected.status === "running" ? <StatusPill tone="cyan">LIVE</StatusPill> : null}
              </div>
              <div className="max-h-96 overflow-y-auto p-3">
                <p className="mb-3 whitespace-pre-wrap break-words text-[11px] leading-relaxed text-muted-foreground">{selected.prompt}</p>
                <div className="rounded-xl border border-cyan-300/15 bg-cyan-300/5 p-3">
                  <div className="mb-1 text-[9px] uppercase tracking-wider text-cyan-300">PUTER RESULT</div>
                  <p className="whitespace-pre-wrap break-words text-xs leading-relaxed">{selected.result || liveText || (th ? "กำลังประมวลผล..." : "Processing...")}</p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}
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
