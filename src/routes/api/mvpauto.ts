import { createFileRoute } from "@tanstack/react-router";
import { executeMvpAutoSearch, planMvpAuto } from "@/lib/mvpauto";
export const Route = createFileRoute("/api/mvpauto")({
  server: { handlers: {
    GET: async () => Response.json({ tool: "mvpa.auto", version: "2", description: "One tool surface for goal-based provider routing.", execution: "providers stay behind MVPAUTO", google: "server-side adapter; requires GOOGLE_API_KEY and GOOGLE_CSE_ID" }),
    POST: async ({ request }) => {
      try {
        const body = await request.json() as { goal?: unknown; context?: unknown; preferredProvider?: unknown; execute?: unknown; start?: unknown };
        if (typeof body.goal !== "string" || body.goal.trim().length < 2) return Response.json({ ok: false, error: "goal is required" }, { status: 400 });
        const input = { goal: body.goal.trim(), context: body.context && typeof body.context === "object" ? body.context as Record<string, unknown> : undefined, preferredProvider: typeof body.preferredProvider === "string" ? body.preferredProvider as any : "auto", start: typeof body.start === "number" ? body.start : 1 };
        return Response.json(body.execute === true ? await executeMvpAutoSearch(input) : planMvpAuto(input));
      } catch (error) { return Response.json({ ok: false, error: error instanceof Error ? error.message : "invalid request" }, { status: 400 }); }
    },
  }},
});
