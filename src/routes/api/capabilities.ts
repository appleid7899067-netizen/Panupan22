import { createFileRoute } from "@tanstack/react-router";
import { getCompetitionSnapshot } from "@/lib/competition";
import { getRuntimeCapabilities } from "@/lib/bossnugrok/grok-runtime-adapter";

export const Route = createFileRoute("/api/capabilities")({
  server: {
    handlers: {
      GET: () =>
        Response.json({
          ok: true,
          ...getCompetitionSnapshot(),
          runtime: getRuntimeCapabilities(),
        }),
    },
  },
});
