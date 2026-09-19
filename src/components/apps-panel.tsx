import { useMemo, useState } from "react";
import { Bot, Box, Code2, FileText, Globe2, Image, LayoutGrid, Search, Sparkles, Wrench, Zap } from "lucide-react";
import { useBossStore } from "@/lib/store";
import { cn } from "@/lib/utils";

type AppItem = {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: typeof Bot;
  status: "ready" | "foundation";
  capabilities: string[];
};

const APPS: AppItem[] = [
  { id: "ai-chat", name: "AI Chat", description: "คุยกับ AI และเรียกใช้ความสามารถของ Agent", category: "AI", icon: Bot, status: "ready", capabilities: ["chat", "agent", "puter-ai"] },
  { id: "app-builder", name: "App Builder", description: "สร้างเว็บแอปจากคำสั่งและต่อยอดเป็นโปรเจกต์", category: "สร้างแอป", icon: Code2, status: "foundation", capabilities: ["code", "scaffold", "workspace"] },
  { id: "browser", name: "Browser Automation", description: "ชั้นความสามารถสำหรับเชื่อม Browser ที่ผู้ใช้อนุญาต", category: "Automation", icon: Globe2, status: "foundation", capabilities: ["browser", "automation", "permissions"] },
  { id: "files", name: "Files & Workspace", description: "ทำงานกับไฟล์และพื้นที่ทำงานของโปรเจกต์", category: "Workspace", icon: FileText, status: "foundation", capabilities: ["files", "artifacts", "workspace"] },
  { id: "image-studio", name: "Image Studio", description: "สร้างและจัดการงานภาพ", category: "Media", icon: Image, status: "foundation", capabilities: ["image", "media", "artifacts"] },
  { id: "skills", name: "Skills", description: "ชุดทักษะที่ Agent เรียกใช้ตามงาน", category: "Agent", icon: Sparkles, status: "foundation", capabilities: ["skills", "tools", "agent"] },
  { id: "plugins", name: "Plugin Catalog", description: "ศูนย์รวมปลั๊กอินและเครื่องมือที่เพิ่มความสามารถให้ระบบ", category: "Extensions", icon: Box, status: "foundation", capabilities: ["plugins", "connectors", "tools"] },
  { id: "automation", name: "Automation", description: "วางงานอัตโนมัติและ workflow หลายขั้นตอน", category: "Automation", icon: Zap, status: "foundation", capabilities: ["workflow", "tasks", "schedules"] },
];

export function AppsPanel() {
  const language = useBossStore((s) => s.language);
  const th = language === "th";
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const categories = useMemo(() => ["all", ...Array.from(new Set(APPS.map((app) => app.category)))], []);
  const filtered = useMemo(() => APPS.filter((app) => {
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || [app.name, app.description, app.category, ...app.capabilities].join(" ").toLowerCase().includes(q);
    return matchesQuery && (category === "all" || app.category === category);
  }), [query, category]);

  return (
    <div className="flex h-full min-h-0 flex-col overflow-y-auto">
      <header className="border-b border-border px-4 py-4 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/5 p-2.5"><LayoutGrid className="size-5 text-cyan-300" /></div>
          <div>
            <div className="text-[10px] font-semibold tracking-[0.22em] text-cyan-300">APPS</div>
            <h2 className="mt-1 font-display text-3xl tracking-tight">{th ? "แอพ" : "Apps"}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{th ? "ศูนย์รวมแอพ ความสามารถ Skills และ Plugin Catalog" : "A unified catalog for apps, skills and plugins."}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <label className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-border bg-card/40 px-3">
            <Search className="size-4 text-subtle" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={th ? "ค้นหาแอพ ความสามารถ หรือปลั๊กอิน..." : "Search apps, capabilities or plugins..."} className="h-10 min-w-0 flex-1 bg-transparent text-xs outline-none" />
          </label>
          <div className="flex gap-1 overflow-x-auto rounded-xl border border-border bg-card/40 p-1">
            {categories.map((item) => (
              <button key={item} type="button" onClick={() => setCategory(item)} className={cn("shrink-0 rounded-lg px-3 py-2 text-[11px]", category === item ? "bg-secondary text-foreground" : "text-subtle hover:text-foreground")}>
                {item === "all" ? (th ? "ทั้งหมด" : "All") : item}
              </button>
            ))}
          </div>
        </div>
      </header>
      <main className="p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs text-subtle">{filtered.length} {th ? "รายการ" : "items"}</p>
          <span className="inline-flex items-center gap-1.5 text-[10px] text-cyan-300"><Wrench className="size-3.5" /> {th ? "Catalog foundation" : "Catalog foundation"}</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((app) => {
            const Icon = app.icon;
            return (
              <article key={app.id} className="rounded-2xl border border-border bg-card/40 p-4 transition-colors hover:border-cyan-300/25">
                <div className="flex items-start justify-between gap-3">
                  <div className="rounded-xl border border-border bg-background p-2"><Icon className="size-5 text-cyan-300" /></div>
                  <span className={cn("rounded-full border px-2 py-1 text-[9px]", app.status === "ready" ? "border-lime-300/30 bg-lime-300/10 text-lime-300" : "border-amber-300/30 bg-amber-300/10 text-amber-300")}>{app.status === "ready" ? "READY" : "FOUNDATION"}</span>
                </div>
                <h3 className="mt-4 text-sm font-medium">{app.name}</h3>
                <p className="mt-1 min-h-10 text-[11px] leading-relaxed text-muted-foreground">{app.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">{app.capabilities.map((cap) => <span key={cap} className="rounded-md border border-border px-2 py-1 text-[9px] text-subtle">{cap}</span>)}</div>
              </article>
            );
          })}
        </div>
        {!filtered.length ? <div className="rounded-2xl border border-dashed border-border p-10 text-center text-xs text-subtle">{th ? "ไม่พบแอพที่ค้นหา" : "No matching apps."}</div> : null}
      </main>
    </div>
  );
}
