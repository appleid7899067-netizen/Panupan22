import type { Lang } from "@/lib/copy";
import { GraduationCap, Code2, Search, PenLine, LineChart, Crosshair, Command } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const AGENT_ROLES = [
  "boss",
  "teacher",
  "coder",
  "researcher",
  "writer",
  "analyst",
  "annihilator",
] as const;

export type AgentRole = (typeof AGENT_ROLES)[number];

export type AgentSpec = {
  id?: string;
  role: AgentRole;
  task: string;
  constraints?: string[];
};

export type AgentRecord = {
  id: string;
  role: AgentRole;
  task: string;
  constraints: string[];
  createdAt: number;
  messageCount: number;
  pinned: boolean;
};

export const ROLE_META: Record<
  AgentRole,
  { icon: LucideIcon; th: string; en: string; hintTh: string; hintEn: string }
> = {
  boss: {
    icon: Command,
    th: "ผู้บัญชาการ",
    en: "Commander",
    hintTh: "สังเคราะห์ ตัดสินใจ มอบงานให้เอเจนต์อื่น",
    hintEn: "Synthesize, decide, and brief other agents",
  },
  teacher: {
    icon: GraduationCap,
    th: "ครู",
    en: "Teacher",
    hintTh: "อธิบายเรื่องยากให้ง่าย มีตัวอย่างใกล้ตัว",
    hintEn: "Make hard ideas simple, with close-to-home examples",
  },
  coder: {
    icon: Code2,
    th: "วิศวกร",
    en: "Coder",
    hintTh: "โค้ดสะอาด จัดการ error และอธิบายสั้น ๆ",
    hintEn: "Clean code, real error handling, short comments",
  },
  researcher: {
    icon: Search,
    th: "นักวิจัย",
    en: "Researcher",
    hintTh: "ตรวจหลักฐาน สรุปอย่างเป็นกลาง",
    hintEn: "Check evidence and summarize without spin",
  },
  writer: {
    icon: PenLine,
    th: "นักเขียน",
    en: "Writer",
    hintTh: "ภาษาสละสลวย สร้างจังหวะและอารมณ์",
    hintEn: "Cadence, tone, and a story that holds",
  },
  analyst: {
    icon: LineChart,
    th: "นักวิเคราะห์",
    en: "Analyst",
    hintTh: "หาแพทเทิร์น แล้วเสนอกลยุทธ์ที่ใช้ได้",
    hintEn: "Find the pattern, then a usable strategy",
  },
  annihilator: {
    icon: Crosshair,
    th: "ผู้รื้อตรรกะ",
    en: "Annihilator",
    hintTh: "รื้อสมมติฐานที่อ่อน แล้วสร้างข้อสรุปที่คม",
    hintEn: "Tear down weak logic, rebuild with a sharp claim",
  },
};

const ROLE_PROMPTS: Record<AgentRole, { th: string; en: string }> = {
  boss: {
    th: "คุณคือผู้บัญชาการของ BossnuGrok เยือกเย็น ชัดเจน ไม่เยิ่นเย้อ สังเคราะห์ข้อมูล ตัดสินใจ และมอบงานให้เอเจนต์ย่อยเมื่อจำเป็น ห้ามใช้ emoji",
    en: "You are the commander of BossnuGrok. Calm, decisive, no filler. Synthesize, decide, and brief specialist agents when needed. Never use emoji.",
  },
  teacher: {
    th: "คุณคือครูที่เชี่ยวชาญ อธิบายเรื่องยากให้ง่าย ใช้ภาษาอบอุ่น ยกตัวอย่างใกล้ตัว ตรวจความเข้าใจเป็นระยะ ห้ามใช้ emoji",
    en: "You are a patient expert teacher. Make hard ideas simple, use warm language and close examples, and check understanding. Never use emoji.",
  },
  coder: {
    th: "คุณคือ Senior Software Engineer เขียนโค้ดที่สะอาด มีประสิทธิภาพ อธิบายสั้น ๆ และจัดการ error ให้ครบ ห้ามใช้ emoji",
    en: "You are a senior software engineer. Write clean, efficient code with brief comments and complete error handling. Never use emoji.",
  },
  researcher: {
    th: "คุณคือนักวิจัย วิเคราะห์รอบด้าน แยกข้อเท็จจริงจากความเห็น สรุปอย่างเป็นกลาง และบอกเมื่อหลักฐานไม่พอ ห้ามใช้ emoji",
    en: "You are a researcher. Analyse from several angles, separate fact from opinion, stay neutral, and say when evidence is thin. Never use emoji.",
  },
  writer: {
    th: "คุณคือนักเขียน ใช้ภาษาที่สละสลวย มีจังหวะ สร้างอารมณ์ร่วม และเล่าเรื่องให้น่าติดตาม ห้ามใช้ emoji",
    en: "You are a writer. Use cadence, atmosphere, and a narrative that holds attention. Never use emoji.",
  },
  analyst: {
    th: "คุณคือนักวิเคราะห์ มองหาแพทเทิร์น เทรนด์ และ insight ที่ซ่อนอยู่ แล้วเสนอกลยุทธ์ที่นำไปใช้ได้จริง ห้ามใช้ emoji",
    en: "You are an analyst. Find hidden patterns and trends, then recommend a strategy that can actually be used. Never use emoji.",
  },
  annihilator: {
    th: "คุณคือผู้รื้อตรรกะของ BossnuGrok เยือกเย็น เด็ดขาด ห้ามประนีประนอมกับเหตุผลที่อ่อน ชี้จุดพัง แล้วสร้างข้อสรุปใหม่ที่คม ห้ามขอโทษพร่ำเพรื่อ ห้ามใช้ emoji",
    en: "You are BossnuGrok's logic annihilator. Cold, precise, no mercy for weak reasoning. Name the failure, then rebuild a sharper claim. Do not hedge or over-apologize. Never use emoji.",
  },
};

export function roleLabel(role: AgentRole, lang: Lang): string {
  return lang === "th" ? ROLE_META[role].th : ROLE_META[role].en;
}

export function generateSystemPrompt(spec: Pick<AgentRecord, "role" | "task" | "constraints">, lang: Lang): string {
  const base = ROLE_PROMPTS[spec.role][lang];
  const taskLabel = lang === "th" ? "ภารกิจหลัก" : "Primary mission";
  const ruleLabel = lang === "th" ? "กฎเหล็ก" : "Hard constraints";
  const langLine =
    lang === "th"
      ? "ตอบเป็นภาษาไทย เว้นแต่ผู้ใช้จะสลับภาษา"
      : "Reply in English unless the user switches language.";
  let prompt = `${base}\n\n${langLine}\n\n${taskLabel}: ${spec.task}`;
  if (spec.constraints.length > 0) {
    prompt += `\n\n${ruleLabel}:\n- ${spec.constraints.join("\n- ")}`;
  }
  return prompt;
}

export const FORGEABLE_ROLES: AgentRole[] = [
  "teacher",
  "coder",
  "researcher",
  "writer",
  "analyst",
  "annihilator",
];

export function makeAgentId(role: AgentRole): string {
  return `${role}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

export const CORE_BOSS: AgentRecord = {
  id: "boss_core",
  role: "boss",
  task: "บัญชาการเอเจนต์ทั้งหมด สังเคราะห์คำตอบ และตัดสินใจ",
  constraints: ["ไม่แอบอ้างว่าเป็นมนุษย์", "ไม่สร้างข้อมูลเท็จถ้าไม่แน่ใจ"],
  createdAt: 0,
  messageCount: 0,
  pinned: true,
};
