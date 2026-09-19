import { createFileRoute } from "@tanstack/react-router";

const MANUS_API = "https://api.manus.ai/v2";
const MANUS_COOKIE = "boss_manus_api_key";

function json(data: unknown, status = 200, extraHeaders: HeadersInit = {}) {
  return Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store", ...extraHeaders },
  });
}

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}

function cookieValue(request: Request, name: string) {
  const raw = request.headers.get("cookie") ?? "";
  const match = raw.split(";").map((item) => item.trim()).find((item) => item.startsWith(`${name}=`));
  if (!match) return "";
  try { return decodeURIComponent(match.slice(name.length + 1)); } catch { return ""; }
}

function getManusKey(request: Request) {
  return process.env.MANUS_API_KEY?.trim() || cookieValue(request, MANUS_COOKIE).trim();
}

async function manusFetch(request: Request, path: string, init: RequestInit = {}) {
  const key = getManusKey(request);
  if (!key) return json({ ok: false, error: "Manus is not configured." }, 503);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(`${MANUS_API}${path}`, {
      ...init,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        ...(init.body ? { "Content-Type": "application/json" } : {}),
        "x-manus-api-key": key,
        ...(init.headers ?? {}),
      },
    });
    const text = await response.text();
    let payload: unknown;
    try { payload = JSON.parse(text); } catch { payload = { ok: false, error: "Invalid response from Manus." }; }
    return json(payload, response.status);
  } catch (error) {
    const message = error instanceof Error && error.name === "AbortError"
      ? "Manus request timed out."
      : "Unable to reach Manus.";
    return json({ ok: false, error: message }, 502);
  } finally {
    clearTimeout(timeout);
  }
}

function validId(value: unknown) {
  return typeof value === "string" && value.trim().length > 0 && value.trim().length <= 200;
}

export const Route = createFileRoute("/api/manus")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const action = url.searchParams.get("action") ?? "status";

        if (action === "status") {
          return json({ ok: true, configured: Boolean(getManusKey(request)) });
        }

        if (action === "tasks") {
          const limit = Math.min(100, Math.max(1, Number(url.searchParams.get("limit") || 20) || 20));
          const cursor = url.searchParams.get("cursor")?.trim();
          const params = new URLSearchParams({ limit: String(limit), order: url.searchParams.get("order") === "asc" ? "asc" : "desc" });
          if (cursor) params.set("cursor", cursor);
          const projectId = url.searchParams.get("projectId")?.trim();
          if (projectId) {
            params.set("scope", "project");
            params.set("project_id", projectId);
          }
          return manusFetch(request, `/task.list?${params.toString()}`);
        }

        if (action === "task") {
          const taskId = url.searchParams.get("taskId");
          if (!validId(taskId)) return json({ ok: false, error: "Valid taskId is required." }, 400);
          return manusFetch(request, `/task.detail?task_id=${encodeURIComponent(taskId!.trim())}`);
        }

        if (action === "messages") {
          const taskId = url.searchParams.get("taskId");
          if (!validId(taskId)) return json({ ok: false, error: "Valid taskId is required." }, 400);
          const limit = Math.min(100, Math.max(1, Number(url.searchParams.get("limit") || 50) || 50));
          const order = url.searchParams.get("order") === "desc" ? "desc" : "asc";
          const verbose = url.searchParams.get("verbose") === "true";
          return manusFetch(request, `/task.listMessages?task_id=${encodeURIComponent(taskId!.trim())}&order=${order}&limit=${limit}&verbose=${verbose}`);
        }

        if (action === "projects") return manusFetch(request, "/project.list");
        if (action === "connectors") return manusFetch(request, "/connector.list");

        if (action === "skills") {
          const projectId = url.searchParams.get("projectId")?.trim();
          return manusFetch(request, projectId ? `/skill.list?project_id=${encodeURIComponent(projectId)}` : "/skill.list");
        }

        if (action === "browsers") return manusFetch(request, "/browser.onlineList");

        return json({ ok: false, error: "Unsupported action" }, 400);
      },

      POST: async ({ request }) => {
        if (!sameOrigin(request)) return json({ ok: false, error: "Cross-origin request blocked." }, 403);

        let body: {
          action?: string;
          prompt?: string;
          taskId?: string;
          eventId?: string;
          apiKey?: string;
          projectId?: string;
          title?: string;
          agentProfile?: "standard" | "lite" | "max";
          connectorIds?: string[];
          enableSkills?: string[];
          forceSkills?: string[];
          taskReferences?: string[];
          input?: Record<string, unknown>;
          fileId?: string;
          filename?: string;
          fileUrl?: string;
        };

        try { body = (await request.json()) as typeof body; }
        catch { return json({ ok: false, error: "Invalid JSON" }, 400); }

        if (body.action === "configure") {
          const apiKey = body.apiKey?.trim() ?? "";
          if (!apiKey || apiKey.length > 500) return json({ ok: false, error: "Valid Manus API key is required." }, 400);
          return json({ ok: true, configured: true }, 200, {
            "Set-Cookie": `${MANUS_COOKIE}=${encodeURIComponent(apiKey)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`,
          });
        }

        if (body.action === "disconnect") {
          return json({ ok: true, configured: Boolean(process.env.MANUS_API_KEY?.trim()) }, 200, {
            "Set-Cookie": `${MANUS_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`,
          });
        }

        if (body.action === "create") {
          const prompt = body.prompt?.trim() ?? "";
          if (!prompt) return json({ ok: false, error: "Prompt is required." }, 400);
          if (prompt.length > 20000) return json({ ok: false, error: "Prompt is too long." }, 413);

          const message: Record<string, unknown> = {
            content: prompt,
            ...(body.connectorIds?.length ? { connectors: body.connectorIds.slice(0, 50) } : {}),
            ...(body.enableSkills?.length ? { enable_skills: body.enableSkills.slice(0, 100) } : {}),
            ...(body.forceSkills?.length ? { force_skills: body.forceSkills.slice(0, 100) } : {}),
            ...(body.taskReferences?.length ? { task_references: body.taskReferences.slice(0, 20) } : {}),
          };

          return manusFetch(request, "/task.create", {
            method: "POST",
            body: JSON.stringify({
              message,
              ...(body.projectId ? { project_id: body.projectId } : {}),
              ...(body.title ? { title: body.title.slice(0, 200) } : {}),
              ...(body.agentProfile ? { agent_profile: body.agentProfile } : {}),
            }),
          });
        }

        if (body.action === "send") {
          if (!validId(body.taskId)) return json({ ok: false, error: "Valid taskId is required." }, 400);
          const prompt = body.prompt?.trim() ?? "";
          if (!prompt) return json({ ok: false, error: "Prompt is required." }, 400);
          return manusFetch(request, "/task.sendMessage", {
            method: "POST",
            body: JSON.stringify({
              task_id: body.taskId!.trim(),
              message: {
                content: prompt,
                ...(body.connectorIds?.length ? { connectors: body.connectorIds.slice(0, 50) } : {}),
              },
            }),
          });
        }

        if (body.action === "confirm") {
          if (!validId(body.taskId) || !validId(body.eventId)) return json({ ok: false, error: "taskId and eventId are required." }, 400);
          return manusFetch(request, "/task.confirmAction", {
            method: "POST",
            body: JSON.stringify({
              task_id: body.taskId!.trim(),
              event_id: body.eventId!.trim(),
              ...(body.input && typeof body.input === "object" ? { input: body.input } : {}),
            }),
          });
        }

        if (body.action === "stop") {
          if (!validId(body.taskId)) return json({ ok: false, error: "Valid taskId is required." }, 400);
          return manusFetch(request, "/task.stop", {
            method: "POST",
            body: JSON.stringify({ task_id: body.taskId!.trim() }),
          });
        }

        if (body.action === "createProject") {
          const name = body.title?.trim() ?? "";
          if (!name) return json({ ok: false, error: "Project name is required." }, 400);
          return manusFetch(request, "/project.create", {
            method: "POST",
            body: JSON.stringify({ name: name.slice(0, 200) }),
          });
        }

        if (body.action === "uploadPrepare") {
          const filename = body.filename?.trim() ?? "";
          if (!filename) return json({ ok: false, error: "Filename is required." }, 400);
          return manusFetch(request, "/file.upload", {
            method: "POST",
            body: JSON.stringify({ filename: filename.slice(0, 255) }),
          });
        }

        if (body.action === "fileDelete") {
          if (!validId(body.fileId)) return json({ ok: false, error: "Valid fileId is required." }, 400);
          return manusFetch(request, `/file.delete?file_id=${encodeURIComponent(body.fileId!.trim())}`, { method: "POST" });
        }

        return json({ ok: false, error: "Unsupported action" }, 400);
      },
    },
  },
});
