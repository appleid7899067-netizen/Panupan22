/**
 * Boss Adaptive Planner
 * Converts a goal into evidence-driven phases and allows replanning when evidence changes.
 */
export type PlanPhase = {
  id: string;
  title: string;
  action: string;
  verify: string;
  status: "pending" | "running" | "passed" | "failed" | "invalidated";
};

export type Evidence = {
  source: string;
  ok: boolean;
  detail: string;
  at: number;
};

export type AdaptivePlan = {
  goal: string;
  phases: PlanPhase[];
  evidence: Evidence[];
  revision: number;
};

export function createAdaptivePlan(goal: string): AdaptivePlan {
  const clean = goal.trim();
  return {
    goal: clean,
    revision: 1,
    evidence: [],
    phases: [
      { id: "inspect", title: "Inspect", action: "ค้นหาสาเหตุและทรัพยากรที่เกี่ยวข้อง", verify: "มีหลักฐานเพียงพอสำหรับลงมือ", status: "pending" },
      { id: "execute", title: "Execute", action: "ลงมือแก้เฉพาะจุดที่มีหลักฐานรองรับ", verify: "การเปลี่ยนแปลงถูกสร้างจริง", status: "pending" },
      { id: "verify", title: "Verify", action: "ตรวจ build, CI และผลจริง", verify: "ผลจริงตรงกับเป้าหมาย", status: "pending" },
      { id: "recover", title: "Recover", action: "ย้อนกลับหรือเปลี่ยนแผนเมื่อหลักฐานขัดแย้ง", verify: "ระบบกลับสู่สถานะใช้งานได้", status: "pending" },
    ],
  };
}

export function addEvidence(plan: AdaptivePlan, evidence: Omit<Evidence, "at">): AdaptivePlan {
  const next = { ...plan, evidence: [...plan.evidence, { ...evidence, at: Date.now() }] };
  const latestFailure = !evidence.ok;
  if (latestFailure) {
    next.revision += 1;
    next.phases = next.phases.map((p) =>
      p.status === "pending" || p.status === "running"
        ? { ...p, status: "invalidated" }
        : p,
    );
  }
  return next;
}

export function proofOfDone(plan: AdaptivePlan): { done: boolean; missing: string[] } {
  const missing: string[] = [];
  if (!plan.evidence.some((e) => e.ok && /inspect|scan|structure/i.test(e.source))) missing.push("inspection evidence");
  if (!plan.evidence.some((e) => e.ok && /execute|write|commit/i.test(e.source))) missing.push("execution evidence");
  if (!plan.evidence.some((e) => e.ok && /verify|build|ci|production|http/i.test(e.source))) missing.push("verification evidence");
  return { done: missing.length === 0, missing };
}
