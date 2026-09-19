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
  const timeout = setTimeout(() => controller.abort(), 15000);
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
          const limit = Math.min(20, Math.max(1, Number(url.searchParams.get("limit") || 10) || 10));
          return manusFetch(request, `/task.list?limit=${limit}&order=desc`);
        }
        if (action === "messages") {
          const taskId = url.searchParams.get("taskId")?.trim() ?? "";
          if (!taskId || taskId.length > 200) return json({ ok: false, error: "Valid taskId is required." }, 400);
          const limit = Math.min(50, Math.max(1, Number(url.searchParams.get("limit") || 20) || 20));
          return manusFetch(request, `/task.listMessages?task_id=${encodeURIComponent(taskId)}&order=asc&limit=${limit}`);
        }
        if (action === "projects") return manusFetch(request, "/project.list");
        if (action === "browsers") return manusFetch(request, "/browser.onlineList");
        return json({ ok: false, error: "Unsupported action" }, 400);
      },
      POST: async ({ request }) => {
        if (!sameOrigin(request)) return json({ ok: false, error: "Cross-origin request blocked." }, 403);
        let body: { action?: string; prompt?: string; taskId?: string; eventId?: string; apiKey?: string; input?: Record<string, unknown> };
        try { body = (await request.json()) as typeof body; } catch { return json({ ok: false, error: "Invalid JSON" }, 400); }

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
          if (prompt.length > 12000) return json({ ok: false, error: "Prompt is too long." }, 413);
          return manusFetch(request, "/task.create", { method: "POST", body: JSON.stringify({ message: { content: prompt } }) });
        }

        if (body.action === "confirm") {
          const taskId = body.taskId?.trim() ?? "";
          const eventId = body.eventId?.trim() ?? "";
          if (!taskId || !eventId) return json({ ok: false, error: "taskId and eventId are required." }, 400);
          let input: unknown = undefined;
          if (body.input && typeof body.input === "object") input = body.input;
          return manusFetch(request, "/task.confirmAction", { method: "POST", body: JSON.stringify({ task_id: taskId, event_id: eventId, ...(input !== undefined ? { input } : {}) }) });
        }

        if (body.action === "stop") {
          const taskId = body.taskId?.trim() ?? "";
          if (!taskId || taskId.length > 200) return json({ ok: false, error: "Valid taskId is required." }, 400);
          return manusFetch(request, "/task.stop", { method: "POST", body: JSON.stringify({ task_id: taskId }) });
        }

        return json({ ok: false, error: "Unsupported action" }, 400);
      },
    },
  },
});
