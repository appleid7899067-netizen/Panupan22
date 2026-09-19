import { createFileRoute } from "@tanstack/react-router";
import { runChatTurn } from "@/lib/bossnugrok/chat-kernel";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env.CHAT_API_SECRET;
        if (secret && request.headers.get("x-boss-secret") !== secret) {
          return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
        }

        let body: {
          text?: string;
          messages?: { role: "user" | "assistant" | "system"; content: string }[];
          system?: string;
          lang?: "th" | "en";
        };
        try {
          body = (await request.json()) as typeof body;
        } catch {
          return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
        }

        const text = body.text?.trim() ?? "";
        const messages = body.messages?.length
          ? body.messages
          : text
            ? [{ role: "user" as const, content: text }]
            : [];
        if (messages.length === 0) {
          return Response.json({ ok: false, error: "Empty message" }, { status: 400 });
        }

        const lang: "th" | "en" =
          body.lang ?? (/[ก-๙]/.test(messages[messages.length - 1]?.content ?? "") ? "th" : "en");

        const result = await runChatTurn({
          messages,
          system: body.system,
          lang,
        });
        return Response.json(result, { status: result.ok ? 200 : 502 });
      },
    },
  },
});
