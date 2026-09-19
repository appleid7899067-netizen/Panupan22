import { createFileRoute } from "@tanstack/react-router";
import { getCompetitionSnapshot } from "@/lib/competition";

export const Route = createFileRoute("/api/capabilities")({
  server: {
    handlers: {
      GET: () => Response.json({ ok: true, ...getCompetitionSnapshot() }),
    },
  },
});