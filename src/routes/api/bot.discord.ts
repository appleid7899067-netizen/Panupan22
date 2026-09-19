import { createFileRoute } from "@tanstack/react-router";
import { runChatTurn } from "@/lib/bossnugrok/chat-kernel";

function hexToBytes(hex: string) {
  const clean = hex.trim().toLowerCase();
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  return out;
}

async function verifyDiscord(publicKey: string, signature: string, timestamp: string, body: string) {
  try {
    const key = await crypto.subtle.importKey("raw", hexToBytes(publicKey), { name: "Ed25519" }, false, ["verify"]);
    return crypto.subtle.verify(
      "Ed25519",
      key,
      hexToBytes(signature),
      new TextEncoder().encode(`${timestamp}${body}`),
    );
  } catch {
    return false;
  }
}

function optionText(data: { options?: { name: string; value?: unknown }[] } | undefined) {
  const opt = data?.options?.find((o) => o.name === "text" || o.name === "q" || o.name === "question");
  if (typeof opt?.value === "string") return opt.value;
  const first = data?.options?.find((o) => typeof o.value === "string");
  return typeof first?.value === "string" ? first.value : "";
}

export const Route = createFileRoute("/api/bot/discord")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const publicKey = process.env.DISCORD_PUBLIC_KEY;
        if (!publicKey) return Response.json({ error: "Discord is not configured" }, { status: 503 });

        const signature = request.headers.get("x-signature-ed25519") ?? "";
        const timestamp = request.headers.get("x-signature-timestamp") ?? "";
        const raw = await request.text();
        const ok = await verifyDiscord(publicKey, signature, timestamp, raw);
        if (!ok) return new Response("invalid request signature", { status: 401 });

        const interaction = JSON.parse(raw) as {
          type: number;
          data?: { name?: string; options?: { name: string; value?: unknown }[] };
        };

        if (interaction.type === 1) return Response.json({ type: 1 });

        if (interaction.type === 2) {
          const asked = optionText(interaction.data).trim() || "สวัสดี";
          const lang: "th" | "en" = /[ก-๙]/.test(asked) ? "th" : "en";
          const result = await runChatTurn({
            messages: [{ role: "user", content: asked }],
            lang,
          });
          const content = result.ok ? result.text.slice(0, 1900) : `เรียกบอทไม่สำเร็จ: ${result.error}`;
          return Response.json({ type: 4, data: { content } });
        }

        return Response.json({ type: 4, data: { content: "unsupported interaction" } });
      },
    },
  },
});
