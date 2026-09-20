/**
 * Boss Action Bridge
 *
 * Central action layer for the chat commander.
 * CI verifies every change before release.
 * The model chooses actions; this module performs them server-side.
 * Secrets stay in environment variables and are never returned to the model.
 */

export type BossActionName =
  | "repo_inspect"
  | "repo_read_file"
  | "repo_write_file"
  | "ci_check"
  | "web_check"
  | "memory_learn";

export type BossActionResult = {
  ok: boolean;
  action: BossActionName;
  summary: string;
  data?: unknown;
  error?: string;
};

const GITHUB_API = "https://api.github.com";
const GITHUB_VERSION = "2026-03-10";
const DEFAULT_REPO = "appleid7899067-netizen/Panupan22";

function githubToken() {
  return process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";
}

function githubHeaders() {
  const token = githubToken();
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": GITHUB_VERSION,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

function repoName(value?: string) {
  const repo = (value || DEFAULT_REPO).trim().replace(/^https?:\/\/github.com\//i, "").replace(/\.git$/i, "").replace(/\/$/, "");
  if (!/^[^/]+\/[^/]+$/.test(repo)) throw new Error("Invalid GitHub repository. Use owner/name.");
  return repo;
}

function apiUrl(path: string) {
  return `${GITHUB_API}${path.startsWith("/") ? path : `/${path}`}`;
}

async function github(path: string, init?: RequestInit) {
  const res = await fetch(apiUrl(path), {
    ...init,
    headers: { ...githubHeaders(), ...(init?.headers || {}) },
  });
  const text = await res.text();
  let body: any = null;
  try { body = text ? JSON.parse(text) : null; } catch { body = text; }
  if (!res.ok) {
    throw new Error(`GitHub ${res.status}: ${typeof body === "string" ? body.slice(0, 240) : body?.message || "request failed"}`);
  }
  return body;
}

function requireWriteAccess() {
  if (!githubToken()) throw new Error("GITHUB_TOKEN is not configured on the server.");
}

async function inspectRepo(args: Record<string, unknown>): Promise<BossActionResult> {
  const repo = repoName(String(args.repo || DEFAULT_REPO));
  const meta = await github(`/repos/${repo}`);
  const tree = await github(`/repos/${repo}/git/trees/${meta.default_branch}?recursive=1`);
  const paths = Array.isArray(tree.tree) ? tree.tree.filter((x: any) => x.type === "blob").map((x: any) => x.path) : [];
  return {
    ok: true,
    action: "repo_inspect",
    summary: `ตรวจ ${repo}: branch=${meta.default_branch}, files=${paths.length}`,
    data: { repo, defaultBranch: meta.default_branch, private: meta.private, size: meta.size, paths: paths.slice(0, 250) },
  };
}

async function readFile(args: Record<string, unknown>): Promise<BossActionResult> {
  const repo = repoName(String(args.repo || DEFAULT_REPO));
  const path = String(args.path || "").replace(/^\//, "");
  if (!path) throw new Error("File path is required.");
  const ref = args.ref ? `?ref=${encodeURIComponent(String(args.ref))}` : "";
  const body = await github(`/repos/${repo}/contents/${encodeURIComponent(path).replace(/%2F/g, "/")}${ref}`);
  if (Array.isArray(body)) throw new Error("Path is a directory, not a file.");
  const content = Buffer.from(String(body.content || "").replace(/\n/g, ""), "base64").toString("utf8");
  return {
    ok: true,
    action: "repo_read_file",
    summary: `อ่าน ${repo}/${path} สำเร็จ`,
    data: { repo, path, sha: body.sha, content: content.slice(0, 60000) },
  };
}

async function writeFile(args: Record<string, unknown>): Promise<BossActionResult> {
  requireWriteAccess();
  const repo = repoName(String(args.repo || DEFAULT_REPO));
  const path = String(args.path || "").replace(/^\//, "");
  const content = String(args.content ?? "");
  if (!path) throw new Error("File path is required.");
  if (content.length > 250000) throw new Error("File is too large for one safe chat edit.");
  const branch = String(args.branch || "main");
  let existing: any = null;
  try { existing = await github(`/repos/${repo}/contents/${encodeURIComponent(path).replace(/%2F/g, "/")}?ref=${encodeURIComponent(branch)}`); } catch {}
  const payload = {
    message: String(args.message || `boss: update ${path}`),
    content: Buffer.from(content, "utf8").toString("base64"),
    branch,
    ...(existing?.sha ? { sha: existing.sha } : {}),
  };
  const result = await github(`/repos/${repo}/contents/${encodeURIComponent(path).replace(/%2F/g, "/")}`, {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });
  return {
    ok: true,
    action: "repo_write_file",
    summary: `แก้ ${repo}/${path} และ commit แล้ว`,
    data: { repo, path, branch, commitSha: result.commit?.sha, contentSha: result.content?.sha },
  };
}

async function ciCheck(args: Record<string, unknown>): Promise<BossActionResult> {
  const repo = repoName(String(args.repo || DEFAULT_REPO));
  const sha = String(args.sha || "").trim();
  const query = sha ? `?head_sha=${encodeURIComponent(sha)}&per_page=20` : "?per_page=10";
  const runs = await github(`/repos/${repo}/actions/runs${query}`);
  const items = (runs.workflow_runs || []).map((r: any) => ({
    id: r.id,
    name: r.name,
    status: r.status,
    conclusion: r.conclusion,
    sha: r.head_sha,
    branch: r.head_branch,
    url: r.html_url,
  }));
  const failed = items.filter((r: any) => r.conclusion && r.conclusion !== "success");
  const running = items.filter((r: any) => r.status !== "completed");
  return {
    ok: failed.length === 0 && running.length === 0,
    action: "ci_check",
    summary: failed.length ? `CI พบ ${failed.length} รายการล้มเหลว` : running.length ? `CI ยังทำงาน ${running.length} รายการ` : "CI ผ่านจาก workflow runs ที่ตรวจพบ",
    data: { repo, sha: sha || null, runs: items },
  };
}

async function webCheck(args: Record<string, unknown>): Promise<BossActionResult> {
  const url = String(args.url || "").trim();
  if (!/^https:\/\//i.test(url)) throw new Error("web_check requires an HTTPS URL.");
  const started = Date.now();
  const res = await fetch(url, { redirect: "follow" });
  const text = await res.text();
  return {
    ok: res.ok,
    action: "web_check",
    summary: `${res.status} ${res.statusText} · ${Date.now() - started}ms · ${res.url}`,
    data: { status: res.status, statusText: res.statusText, finalUrl: res.url, responseTimeMs: Date.now() - started, bytes: text.length, preview: text.slice(0, 500) },
  };
}

async function remember(args: Record<string, unknown>): Promise<BossActionResult> {
  const text = String(args.text || "").trim();
  if (!text) throw new Error("Memory text is required.");
  return {
    ok: true,
    action: "memory_learn",
    summary: "บันทึกบทเรียนสำหรับรอบถัดไป",
    data: { text: text.slice(0, 1000) },
  };
}

export async function executeBossAction(name: BossActionName, args: Record<string, unknown> = {}): Promise<BossActionResult> {
  try {
    if (name === "repo_inspect") return await inspectRepo(args);
    if (name === "repo_read_file") return await readFile(args);
    if (name === "repo_write_file") return await writeFile(args);
    if (name === "ci_check") return await ciCheck(args);
    if (name === "web_check") return await webCheck(args);
    if (name === "memory_learn") return await remember(args);
    return { ok: false, action: name, summary: "Unknown action." };
  } catch (error) {
    return {
      ok: false,
      action: name,
      summary: "การกระทำล้มเหลว",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export const BOSS_ACTIONS = [
  { name: "repo_inspect", description: "Inspect repository structure and default branch.", write: false },
  { name: "repo_read_file", description: "Read a text file from the repository.", write: false },
  { name: "repo_write_file", description: "Write/update a repository file and create a commit.", write: true },
  { name: "ci_check", description: "Check GitHub Actions workflow runs for a repository or commit.", write: false },
  { name: "web_check", description: "Check an HTTPS URL and report status, final URL and response time.", write: false },
  { name: "memory_learn", description: "Record a concise lesson from the current task for the next run.", write: false },
] as const;
