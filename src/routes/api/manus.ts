import { createFileRoute } from "@tanstack/react-router";
import { requireUserId } from "@/lib/auth/verify.server";

const MANUS_API = "https://api.manus.ai/v2";

function json(data: unknown, status = 200) {
  return Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}

async function manusFetch(path: string, init: RequestInit = {}) {
  const key = process.env.MANUS_API_KEY?.trim();
  if (!key) return json({ ok: false, error: "Manus is not configured on the server." }, 503);

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
        try { await requireUserId(); } catch { return json({ ok: false, error: "Unauthorized" }, 401); }
        const url = new URL(request.url);
        const action = url.searchParams.get("action") ?? "status";
        if (action === "status") {
          const configured = Boolean(process.env.MANUS_API_KEY?.trim());
          return json({ ok: true, configured });
        }
        if (action === "tasks") {
          const limit = Math.min(20, Math.max(1, Number(url.searchParams.get("limit") || 10) || 10));
          return manusFetch(`/task.list?limit=${limit}&order=desc`);
        }
        if (action === "messages") {
          const taskId = url.searchParams.get("taskId")?.trim() ?? "";
          if (!taskId || taskId.length > 200) return json({ ok: false, error: "Valid taskId is required." }, 400);
          const limit = Math.min(50, Math.max(1, Number(url.searchParams.get("limit") || 20) || 20));
          return manusFetch(`/task.listMessages?task_id=${encodeURIComponent(taskId)}&order=asc&limit=${limit}`);
        }
        if (action === "projects") return manusFetch("/project.list");
        return json({ ok: false, error: "Unsupported action" }, 400);
      },
      POST: async ({ request }) => {
        if (!sameOrigin(request)) return json({ ok: false, error: "Cross-origin request blocked." }, 403);
        try { await requireUserId(); } catch { return json({ ok: false, error: "Unauthorized" }, 401); }
        let body: { action?: string; prompt?: string; taskId?: string };
        try { body = (await request.json()) as typeof body; } catch { return json({ ok: false, error: "Invalid JSON" }, 400); }

        if (body.action === "create") {
          const prompt = body.prompt?.trim() ?? "";
          if (!prompt) return json({ ok: false, error: "Prompt is required." }, 400);
          if (prompt.length > 12000) return json({ ok: false, error: "Prompt is too long." }, 413);
          return manusFetch("/task.create", {
            method: "POST",
            body: JSON.stringify({ message: { content: prompt } }),
          });
        }

        if (body.action === "stop") {
          const taskId = body.taskId?.trim() ?? "";
          if (!taskId || taskId.length > 200) return json({ ok: false, error: "Valid taskId is required." }, 400);
          return manusFetch("/task.stop", {
            method: "POST",
            body: JSON.stringify({ task_id: taskId }),
          });
        }

        return json({ ok: false, error: "Unsupported action" }, 400);
      },
    },
  },
});
