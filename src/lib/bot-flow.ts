import type { Lang } from "@/lib/copy";
import type { SkillId } from "@/lib/bossnugrok/skills/skill-types";

export type StepStatus = "pending" | "running" | "done" | "error";
export type TimelineKind = "info" | "success" | "error" | "warning";
export type FlowLayout = "stack" | "rail";
export type FlowIconKey =
  | "user"
  | "shield"
  | "target"
  | "bot"
  | "zap"
  | "check"
  | "search"
  | "code"
  | "globe"
  | "file"
  | "radio"
  | "link";

export type FlowStep = {
  id: string;
  label: string;
  icon: FlowIconKey;
  status: StepStatus;
  duration?: number;
  detail?: string;
};

export type TimelineEvent = {
  id: string;
  time: string;
  label: string;
  icon: FlowIconKey;
  type?: TimelineKind;
  duration?: number;
};

export type FlowOptions = {
  showFlow: boolean;
  showTimeline: boolean;
  showProgress: boolean;
  showStatus: boolean;
  compact: boolean;
  layout: FlowLayout;
};

export const DEFAULT_FLOW_OPTIONS: FlowOptions = {
  showFlow: true,
  showTimeline: true,
  showProgress: true,
  showStatus: true,
  compact: false,
  layout: "stack",
};

export function formatElapsed(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const LABELS: Record<string, { th: string; en: string; icon: FlowIconKey }> = {
  receive: { th: "รับข้อความ", en: "Receive", icon: "user" },
  guards: { th: "ตรวจ Guards", en: "Guards", icon: "shield" },
  skill: { th: "เลือกทักษะ", en: "Pick skill", icon: "target" },
  model: { th: "เลือกโมเดล", en: "Pick model", icon: "bot" },
  process: { th: "ประมวลผล", en: "Process", icon: "zap" },
  render: { th: "แสดงผล", en: "Render", icon: "check" },
  search: { th: "ค้นหาเว็บ", en: "Web search", icon: "search" },
  scores: { th: "ดึงผลสด", en: "Live scores", icon: "radio" },
  code: { th: "รันโค้ด", en: "Run code", icon: "code" },
  link: { th: "อ่านลิงก์", en: "Follow link", icon: "link" },
  doc: { th: "อ่านเอกสาร", en: "Read doc", icon: "file" },
  fetch: { th: "ดึงข้อมูล", en: "Fetch", icon: "globe" },
};

function L(id: string, lang: Lang): { label: string; icon: FlowIconKey } {
  const row = LABELS[id] ?? LABELS.skill;
  return { label: lang === "th" ? row.th : row.en, icon: row.icon };
}

export function createDefaultFlow(lang: Lang = "th"): FlowStep[] {
  return ["receive", "guards", "skill", "model", "process", "render"].map((id) => ({
    id,
    ...L(id, lang),
    status: "pending" as const,
  }));
}

export function createSkillFlow(skillId: SkillId | undefined, lang: Lang = "th"): FlowStep[] {
  const skillStep =
    skillId === "web-search"
      ? "search"
      : skillId === "live-scores"
        ? "scores"
        : skillId === "code-runner"
          ? "code"
          : skillId === "link-follower"
            ? "link"
            : skillId === "doc-reader"
              ? "doc"
              : "skill";
  return ["receive", "guards", skillStep, "model", "process", "render"].map((id) => ({
    id,
    ...L(id, lang),
    status: "pending" as const,
  }));
}

export type FlowSnapshot = {
  steps: FlowStep[];
  events: TimelineEvent[];
  progress: number;
  durationMs: number;
  pending: boolean;
};

export class LiveFlow {
  steps: FlowStep[];
  events: TimelineEvent[] = [];
  startedAt: number;
  lang: Lang;
  private marks = new Map<string, number>();

  constructor(lang: Lang, skillId?: SkillId) {
    this.lang = lang;
    this.startedAt = Date.now();
    this.steps = createSkillFlow(skillId, lang);
    this.event(lang === "th" ? "ผู้ใช้ส่งข้อความ" : "User sent a message", "info", "user");
  }

  elapsed(): number {
    return Date.now() - this.startedAt;
  }

  clock(): string {
    return formatElapsed(this.elapsed());
  }

  event(label: string, type: TimelineKind = "info", icon: FlowIconKey = "zap", duration?: number) {
    this.events.push({
      id: `ev_${this.events.length + 1}`,
      time: this.clock(),
      label,
      icon,
      type,
      duration,
    });
  }

  start(id: string, detail?: string) {
    this.marks.set(id, Date.now());
    this.steps = this.steps.map((s) =>
      s.id === id ? { ...s, status: "running", detail: detail ?? s.detail } : s,
    );
  }

  complete(id: string, detail?: string) {
    const began = this.marks.get(id) ?? this.startedAt;
    const duration = Math.max(1, Date.now() - began);
    this.steps = this.steps.map((s) =>
      s.id === id ? { ...s, status: "done", duration, detail: detail ?? s.detail } : s,
    );
  }

  fail(id: string, detail?: string) {
    this.steps = this.steps.map((s) =>
      s.id === id ? { ...s, status: "error", detail: detail ?? s.detail } : s,
    );
    this.event(detail ?? (this.lang === "th" ? "เกิดข้อผิดพลาด" : "Error"), "error", "zap");
  }

  finishAll(ok: boolean) {
    this.steps = this.steps.map((s) =>
      s.status === "pending" || s.status === "running"
        ? { ...s, status: ok ? "done" : s.id === this.steps[this.steps.length - 1]?.id ? "error" : "done" }
        : s,
    );
    this.event(
      ok ? (this.lang === "th" ? "แสดงผลแล้ว" : "Rendered") : this.lang === "th" ? "ล้มเหลว" : "Failed",
      ok ? "success" : "error",
      "check",
    );
  }

  progress(): number {
    const n = this.steps.length || 1;
    const score = this.steps.reduce((acc, s) => {
      if (s.status === "done") return acc + 1;
      if (s.status === "running") return acc + 0.55;
      if (s.status === "error") return acc + 0.85;
      return acc;
    }, 0);
    return Math.max(4, Math.min(100, Math.round((score / n) * 100)));
  }

  snapshot(pending = true): FlowSnapshot {
    return {
      steps: this.steps,
      events: this.events,
      progress: pending ? this.progress() : 100,
      durationMs: this.elapsed(),
      pending,
    };
  }
}

export function snapshotToPatch(snap: FlowSnapshot) {
  return {
    pending: snap.pending,
    progress: snap.progress,
    flowSteps: snap.steps,
    flowEvents: snap.events,
    durationMs: snap.durationMs,
  };
}
