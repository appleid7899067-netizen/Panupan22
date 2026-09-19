const KEY = "bossnugrok-skill-memory-v1";

export type MemoryError = {
  id: string;
  skillId: string;
  error: string;
  argsSnapshot: string;
  fix: string;
  success: boolean;
  at: number;
};

export type MemorySuccess = {
  id: string;
  skillId: string;
  pattern: string;
  at: number;
  weight?: number;
};

export type SkillMemory = {
  errors: MemoryError[];
  successes: MemorySuccess[];
  lastUpdated: number;
};

function blank(): SkillMemory {
  return { errors: [], successes: [], lastUpdated: Date.now() };
}

export function loadMemory(): SkillMemory {
  if (typeof window === "undefined") return blank();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return blank();
    const parsed = JSON.parse(raw) as SkillMemory;
    return {
      errors: Array.isArray(parsed.errors) ? parsed.errors.slice(-200) : [],
      successes: Array.isArray(parsed.successes) ? parsed.successes.slice(-400) : [],
      lastUpdated: parsed.lastUpdated || Date.now(),
    };
  } catch {
    return blank();
  }
}

function save(memory: SkillMemory) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      KEY,
      JSON.stringify({
        ...memory,
        errors: memory.errors.slice(-200),
        successes: memory.successes.slice(-400),
        lastUpdated: Date.now(),
      }),
    );
  } catch {
    // quota / private mode
  }
}

export function recordError(input: {
  skillId: string;
  error: string;
  args?: Record<string, unknown>;
  fix: string;
}) {
  const memory = loadMemory();
  memory.errors.unshift({
    id: `err_${Date.now().toString(36)}`,
    skillId: input.skillId,
    error: input.error.slice(0, 500),
    argsSnapshot: JSON.stringify(input.args ?? {}).slice(0, 300),
    fix: input.fix.slice(0, 400),
    success: false,
    at: Date.now(),
  });
  save(memory);
}

/** Record a success. weight=10 means learn 10x from this example (used for user code). */
export function recordSuccess(input: {
  skillId: string;
  pattern: string;
  weight?: number;
}) {
  const memory = loadMemory();
  const weight = Math.max(1, Math.min(20, input.weight ?? 1));
  // Write multiple weighted entries so learning compounds
  for (let i = 0; i < weight; i++) {
    memory.successes.unshift({
      id: `ok_${Date.now().toString(36)}_${i}`,
      skillId: input.skillId,
      pattern: input.pattern.slice(0, 400),
      at: Date.now(),
      weight,
    });
  }
  save(memory);
}

export function getDailyInsights(): string[] {
  const memory = loadMemory();
  const dayAgo = Date.now() - 24 * 60 * 60 * 1000;
  const recentErrors = memory.errors.filter((e) => e.at >= dayAgo);
  const recentOk = memory.successes.filter((s) => s.at >= dayAgo);

  const insights: string[] = [];
  if (recentErrors.length === 0 && recentOk.length === 0) {
    insights.push("ยังไม่มีบทเรียนวันนี้ — ลองรัน skill สักอัน");
    return insights;
  }
  const weightedOk = recentOk.reduce((sum, s) => sum + (s.weight ?? 1), 0);
  insights.push(
    `วันนี้มี error ${recentErrors.length} ครั้ง / สำเร็จ ${recentOk.length} ครั้ง (น้ำหนักเรียนรู้ ≈ ${weightedOk})`,
  );

  const bySkill = new Map<string, number>();
  for (const e of recentErrors) {
    bySkill.set(e.skillId, (bySkill.get(e.skillId) ?? 0) + 1);
  }
  for (const [skill, count] of bySkill) {
    insights.push(`${skill}: error ${count} ครั้ง`);
  }

  // Highlight code learning
  const codeOk = recentOk.filter((s) => s.skillId === "code-runner" || s.skillId === "code-review");
  if (codeOk.length > 0) {
    insights.push(`เรียนรู้จากโค้ดผู้ใช้ ${codeOk.length} ตัวอย่าง (x10)`);
  }

  const topFix = recentErrors.find((e) => e.fix)?.fix;
  if (topFix) insights.push(`วิธีแก้ล่าสุด: ${topFix}`);

  return insights.slice(0, 10);
}

export function getSuccessRate(): number {
  const memory = loadMemory();
  const ok = memory.successes.reduce((sum, s) => sum + (s.weight ?? 1), 0);
  const bad = memory.errors.length;
  const total = ok + bad;
  if (total === 0) return 1;
  return ok / total;
}
