import { useMemo, useState } from "react";
import { ArrowLeft, Bot, Box, Code2, FileText, Globe2, Image, LayoutGrid, Search, Sparkles, Wrench, Zap } from "lucide-react";
import { useBossStore } from "@/lib/store";
import { cn } from "@/lib/utils";

type AppItem = {
  id: string; name: string; description: string; category: string; icon: typeof Bot;
  status: "ready" | "foundation"; capabilities: string[];
  skills: string[]; tools: string[]; permissions: string[];
};

const APPS: AppItem[] = [
  { id:"ai-chat",name:"AI Chat",description:"คุยกับ AI และเรียกใช้ความสามารถของ Agent",category:"AI",icon:Bot,status:"ready",capabilities:["chat","agent","puter-ai"],skills:["chat","reasoning"],tools:["Puter AI"],permissions:["AI usage"] },
  { id:"app-builder",name:"App Builder",description:"สร้างเว็บแอปจากคำสั่งและต่อยอดเป็นโปรเจกต์",category:"สร้างแอป",icon:Code2,status:"foundation",capabilities:["code","scaffold","workspace"],skills:["app generation","coding"],tools:["Code Workspace"],permissions:["workspace write"] },
  { id:"browser",name:"Browser Automation",description:"ชั้นความสามารถสำหรับเชื่อม Browser ที่ผู้ใช้อนุญาต",category:"Automation",icon:Globe2,status:"foundation",capabilities:["browser","automation","permissions"],skills:["web navigation","browser actions"],tools:["Chrome bridge"],permissions:["browser control"] },
  { id:"files",name:"Files & Workspace",description:"ทำงานกับไฟล์และพื้นที่ทำงานของโปรเจกต์",category:"Workspace",icon:FileText,status:"foundation",capabilities:["files","artifacts","workspace"],skills:["file operations"],tools:["Workspace"],permissions:["file access"] },
  { id:"image-studio",name:"Image Studio",description:"สร้างและจัดการงานภาพ",category:"Media",icon:Image,status:"foundation",capabilities:["image","media","artifacts"],skills:["image creation"],tools:["Image generation"],permissions:["media access"] },
  { id:"skills",name:"Skills",description:"ชุดทักษะที่ Agent เรียกใช้ตามงาน",category:"Agent",icon:Sparkles,status:"foundation",capabilities:["skills","tools","agent"],skills:["skill routing","planning"],tools:["Skill runtime"],permissions:["tool execution"] },
  { id:"plugins",name:"Plugin Catalog",description:"ศูนย์รวมปลั๊กอินและเครื่องมือที่เพิ่มความสามารถให้ระบบ",category:"Extensions",icon:Box,status:"foundation",capabilities:["plugins","connectors","tools"],skills:["plugin discovery"],tools:["Plugin runtime"],permissions:["connector access"] },
  { id:"automation",name:"Automation",description:"วางงานอัตโนมัติและ workflow หลายขั้นตอน",category:"Automation",icon:Zap,status:"foundation",capabilities:["workflow","tasks","schedules"],skills:["workflow planning"],tools:["Task runner"],permissions:["automation"] },
];

export function AppsPanel() {
  const language = useBossStore((s) => s.language); const th = language === "th";
  const [query,setQuery]=useState(""); const [category,setCategory]=useState("all"); const [selected,setSelected]=useState<string|null>(null);
  const categories=useMemo(()=>["all",...Array.from(new Set(APPS.map(a=>a.category)))],[]);
  const filtered=useMemo(()=>APPS.filter(a=>{const q=query.trim().toLowerCase();return(!q||[a.name,a.description,a.category,...a.capabilities,...a.skills,...a.tools].join(" ").toLowerCase().includes(q))&&(category==="all"||a.category===category)}),[query,category]);
  const detail=selected?APPS.find(a=>a.id===selected):null;

  if(detail){const Icon=detail.icon;return <div className="flex h-full min-h-0 flex-col overflow-y-auto">
    <header className="border-b border-border px-4 py-4 sm:px-6">
      <button type="button" onClick={()=>setSelected(null)} className="mb-4 inline-flex items-center gap-2 text-xs text-subtle hover:text-foreground"><ArrowLeft className="size-4"/>{th?"กลับไปแอพ":"Back to Apps"}</button>
      <div className="flex items-start gap-3"><div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/5 p-3"><Icon className="size-6 text-cyan-300"/></div><div><div className="text-[10px] font-semibold tracking-[0.22em] text-cyan-300">{detail.category.toUpperCase()}</div><h2 className="mt-1 font-display text-3xl tracking-tight">{detail.name}</h2><p className="mt-1 text-sm text-muted-foreground">{detail.description}</p></div></div>
    </header>
    <main className="grid gap-3 p-4 sm:grid-cols-2 sm:p-6 xl:grid-cols-3">
      {([["Capabilities",detail.capabilities],["Skills",detail.skills],["Tools",detail.tools],["Permissions",detail.permissions]] as const).map(([title,items])=><section key={title} className="rounded-2xl border border-border bg-card/40 p-4"><div className="mb-3 flex items-center gap-2 text-xs font-semibold"><Wrench className="size-4 text-cyan-300"/>{title}</div><div className="flex flex-wrap gap-2">{items.map(x=><span key={x} className="rounded-lg border border-border px-2.5 py-1.5 text-[10px] text-subtle">{x}</span>)}</div></section>)}
      <section className="rounded-2xl border border-border bg-card/40 p-4"><div className="text-xs font-semibold">{th?"สถานะ":"Status"}</div><div className="mt-3 text-xs text-amber-300">{detail.status==="ready"?"READY":"FOUNDATION"}</div><p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">{th?"รายละเอียดนี้เป็น registry ของความสามารถที่แอพสามารถเชื่อมต่อได้ ขั้นต่อไปจะผูกตัว execute จริง":"This registry describes the capabilities this app can connect to; execution wiring follows."}</p></section>
    </main>
  </div>}
  return <div className="flex h-full min-h-0 flex-col overflow-y-auto">
    <header className="border-b border-border px-4 py-4 sm:px-6"><div className="flex items-start gap-3"><div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/5 p-2.5"><LayoutGrid className="size-5 text-cyan-300"/></div><div><div className="text-[10px] font-semibold tracking-[0.22em] text-cyan-300">APPS</div><h2 className="mt-1 font-display text-3xl tracking-tight">{th?"แอพ":"Apps"}</h2><p className="mt-1 text-sm text-muted-foreground">{th?"ศูนย์รวมแอพ ความสามารถ Skills และ Plugin Catalog":"A unified catalog for apps, skills and plugins."}</p></div></div>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row"><label className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-border bg-card/40 px-3"><Search className="size-4 text-subtle"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={th?"ค้นหาแอพ ความสามารถ หรือปลั๊กอิน...":"Search apps, capabilities or plugins..."} className="h-10 min-w-0 flex-1 bg-transparent text-xs outline-none"/></label><div className="flex gap-1 overflow-x-auto rounded-xl border border-border bg-card/40 p-1">{categories.map(item=><button key={item} type="button" onClick={()=>setCategory(item)} className={cn("shrink-0 rounded-lg px-3 py-2 text-[11px]",category===item?"bg-secondary text-foreground":"text-subtle hover:text-foreground")}>{item==="all"?(th?"ทั้งหมด":"All"):item}</button>)}</div></div></header>
    <main className="p-4 sm:p-6"><div className="mb-4 flex items-center justify-between"><p className="text-xs text-subtle">{filtered.length} {th?"รายการ":"items"}</p><span className="inline-flex items-center gap-1.5 text-[10px] text-cyan-300"><Wrench className="size-3.5"/>Catalog</span></div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{filtered.map(app=>{const Icon=app.icon;return <button key={app.id} type="button" onClick={()=>setSelected(app.id)} className="text-left rounded-2xl border border-border bg-card/40 p-4 transition-colors hover:border-cyan-300/25"><div className="flex items-start justify-between gap-3"><div className="rounded-xl border border-border bg-background p-2"><Icon className="size-5 text-cyan-300"/></div><span className={cn("rounded-full border px-2 py-1 text-[9px]",app.status==="ready"?"border-lime-300/30 bg-lime-300/10 text-lime-300":"border-amber-300/30 bg-amber-300/10 text-amber-300")}>{app.status==="ready"?"READY":"FOUNDATION"}</span></div><h3 className="mt-4 text-sm font-medium">{app.name}</h3><p className="mt-1 min-h-10 text-[11px] leading-relaxed text-muted-foreground">{app.description}</p><div className="mt-3 flex flex-wrap gap-1.5">{app.capabilities.map(cap=><span key={cap} className="rounded-md border border-border px-2 py-1 text-[9px] text-subtle">{cap}</span>)}</div></button>})}</div>
      {!filtered.length&&<div className="rounded-2xl border border-dashed border-border p-10 text-center text-xs text-subtle">{th?"ไม่พบแอพที่ค้นหา":"No matching apps."}</div>}</main>
  </div>;
}
