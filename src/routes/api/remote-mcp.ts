import { createFileRoute } from "@tanstack/react-router";
import { getRemoteMcpRegistry } from "@/lib/bossnugrok/remote-mcp-registry";

export const Route = createFileRoute("/api/remote-mcp")({
  server: { handlers: {
    GET: () => Response.json({ ok: true, servers: getRemoteMcpRegistry() }),
  }},
});