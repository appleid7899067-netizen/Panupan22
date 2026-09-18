/**
 * BossnuGrok — Chat Guards
 * Intent detection + approval gate
 * Developer: ภาณุพันธ์
 */

export type CommandIntent =
  | "url"
  | "git"
  | "deploy"
  | "file-mutation"
  | "database"
  | "system"
  | "package"
  | "network"
  | "safe";

export type IntentMeta = {
  icon: string;
  label: string;
  labelTh: string;
  color: "blue" | "orange" | "red" | "green" | "yellow";
  dangerous: boolean;
};

const URL_PATTERNS: RegExp[] = [
  /^https?:\/\/\S+$/i,
  /^www\.\S+$/i,
  /^panupan22\.vercel\.app(\/\S*)?$/i,
  /^github\.com\/[\w.-]+\/[\w.-]+(\/\S*)?$/i,
  /^localhost(:\d+)?(\/\S*)?$/i,
  /^127\.0\.0\.1(:\d+)?(\/\S*)?$/i,
];

const MUTATION_PATTERNS: Record<CommandIntent, RegExp[]> = {
  git: [
    /\bgit\s+push\b/i,
    /\bgit\s+commit\b/i,
    /\bgit\s+reset\s+--hard\b/i,
    /\bgit\s+clean\s+-[fd]/i,
    /\bgit\s+rebase\b/i,
    /\bgit\s+merge\b/i,
    /\bcommit\s+and\s+push\b/i,
    /\bpush\s+to\s+(github|origin|remote|gitlab)\b/i,
    /\bcommit\s*โค้ด\b/i,
    /\bpush\s*โค้ด\b/i,
    /\bcommit\b.*\bpush\b/i,
  ],
  deploy: [
    /\bdeploy\s+to\s+production\b/i,
    /\bdeploy\s+production\b/i,
    /\bdeploy\b.*\bproduction\b/i,
    /\bpublish\s+to\s+vercel\b/i,
    /\bpublish\s+to\s+production\b/i,
    /\bส่งขึ้น\s*(production|github|vercel|prod)\b/i,
    /\bดีพลอย\b/i,
    /\brelease\s+to\s+production\b/i,
  ],
  "file-mutation": [
    /\brm\s+-rf\b/i,
    /\brm\s+-f\b/i,
    /\bdelete\s+file\b/i,
    /\bremove\s+file\b/i,
    /\bลบไฟล์ถาวร\b/i,
    /\bลบไฟล์\b/i,
    /\bแก้ไฟล์ใน\s*(repo|โปรเจกต์|project)\b/i,
    /\bwrite\s+file\b/i,
    /\boverwrite\b/i,
  ],
  database: [
    /\bdrop\s+table\b/i,
    /\btruncate\s+table\b/i,
    /\bdelete\s+from\b/i,
    /\bdrop\s+database\b/i,
  ],
  system: [
    /\bsudo\s+rm\b/i,
    /\bformat\s+disk\b/i,
    /\bshutdown\b/i,
    /\breboot\b/i,
    /\bkill\s+-9\b/i,
    /\bchmod\s+777\b/i,
  ],
  package: [
    /\bnpm\s+install\s+-g\b/i,
    /\bnpm\s+publish\b/i,
    /\byarn\s+publish\b/i,
    /\bpnpm\s+publish\b/i,
  ],
  network: [
    /\bcurl\b.*\b(-X\s+POST|-d\s|--data)\b/i,
    /\bwget\b.*\b--post-data\b/i,
  ],
  url: [],
  safe: [],
};

export function isJustUrl(text: string): boolean {
  const t = text.trim();
  if (!t) return false;
  // Single-token URL-like only
  if (/\s/.test(t) && !/^https?:\/\/\S+$/i.test(t)) return false;
  return URL_PATTERNS.some((p) => p.test(t));
}

export function hasMutationIntent(text: string): boolean {
  return Object.values(MUTATION_PATTERNS).some((patterns) =>
    patterns.some((p) => p.test(text)),
  );
}

export function needsApproval(command: string): boolean {
  const t = command.trim();
  if (!t) return false;
  if (isJustUrl(t)) return false;
  return hasMutationIntent(t);
}

export function classifyIntent(command: string): CommandIntent {
  const t = command.trim();
  if (!t) return "safe";
  if (isJustUrl(t)) return "url";

  const priority: CommandIntent[] = [
    "system",
    "database",
    "deploy",
    "git",
    "file-mutation",
    "package",
    "network",
  ];

  for (const intent of priority) {
    if (MUTATION_PATTERNS[intent].some((p) => p.test(t))) return intent;
  }
  return "safe";
}

const INTENT_META: Record<CommandIntent, IntentMeta> = {
  url: {
    icon: "🔗",
    label: "URL",
    labelTh: "เปิดลิงก์",
    color: "blue",
    dangerous: false,
  },
  git: {
    icon: "📦",
    label: "Git Operation",
    labelTh: "คำสั่ง Git",
    color: "orange",
    dangerous: true,
  },
  deploy: {
    icon: "🚀",
    label: "Deploy",
    labelTh: "ดีพลอยขึ้นระบบ",
    color: "red",
    dangerous: true,
  },
  "file-mutation": {
    icon: "📝",
    label: "File Mutation",
    labelTh: "แก้ไข/ลบไฟล์",
    color: "orange",
    dangerous: true,
  },
  database: {
    icon: "🗄️",
    label: "Database",
    labelTh: "ฐานข้อมูล",
    color: "red",
    dangerous: true,
  },
  system: {
    icon: "⚠️",
    label: "System",
    labelTh: "คำสั่งระบบ",
    color: "red",
    dangerous: true,
  },
  package: {
    icon: "📦",
    label: "Package",
    labelTh: "แพ็กเกจ",
    color: "yellow",
    dangerous: true,
  },
  network: {
    icon: "🌐",
    label: "Network",
    labelTh: "เครือข่าย",
    color: "yellow",
    dangerous: true,
  },
  safe: {
    icon: "✅",
    label: "Safe",
    labelTh: "ปลอดภัย",
    color: "green",
    dangerous: false,
  },
};

export function getIntentMeta(intent: CommandIntent): IntentMeta {
  return INTENT_META[intent];
}

export function guardCommand(command: string): {
  allowed: boolean;
  needsApproval: boolean;
  intent: CommandIntent;
  meta: IntentMeta;
} {
  const intent = classifyIntent(command);
  const meta = getIntentMeta(intent);
  return {
    allowed: !meta.dangerous,
    needsApproval: needsApproval(command),
    intent,
    meta,
  };
}

/** Dev helper — call from console if needed */
export function _selfTest(): { passed: number; failed: number } {
  const cases: [string, boolean][] = [
    ["https://panupan22.vercel.app", false],
    ["https://panupan22.vercel.app/story", false],
    ["panupan22.vercel.app", false],
    ["www.google.com", false],
    ["localhost:3000", false],
    ["git push origin main", true],
    ["git commit -m 'fix'", true],
    ["commit and push", true],
    ["push to github", true],
    ["commit โค้ด", true],
    ["deploy to production", true],
    ["publish to vercel", true],
    ["ส่งขึ้น production", true],
    ["ดีพลอย", true],
    ["rm -rf /tmp", true],
    ["ลบไฟล์ถาวร", true],
    ["แก้ไฟล์ใน repo", true],
    ["drop table users", true],
    ["sudo rm -rf /", true],
    ["สวัสดี", false],
    ["ช่วยอธิบายโค้ดนี้", false],
    ["รันโค้ดนี้ให้ดู", false],
    ["ค้นหาเกี่ยวกับ AI", false],
  ];

  let passed = 0;
  let failed = 0;
  for (const [cmd, expected] of cases) {
    const actual = needsApproval(cmd);
    if (actual === expected) passed++;
    else {
      failed++;
      console.warn(`Failed: "${cmd}" expected ${expected} got ${actual}`);
    }
  }
  console.log(`Self-test: ${passed} passed, ${failed} failed`);
  return { passed, failed };
}
