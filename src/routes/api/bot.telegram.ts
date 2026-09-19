import { createFileRoute } from "@tanstack/react-router";
import { runChatTurn } from "@/lib/bossnugrok/chat-kernel";

type TelegramUpdate = {
  message?: {
    chat?: { id: number; type?: string };
    text?: string;
    message_id?: number;
  };
};

function extractText(text: string) {
  const trimmed = text.trim();
  const match = trimmed.match(/^\/boss(?:@[\w_]+)?\s*([\s\S]*)$/i);
  if (match) return { invoked: true, asked: match[1].trim() };
  if (trimmed.startsWith("/")) return { invoked: false, asked: "" };
  return { invoked: true, asked: trimmed };
}

export const Route = createFileRoute("/api/bot/telegram")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const token = process.env.TELEGRAM_BOT_TOKEN;
        if (!token) return Response.json({ ok: false, error: "Telegram is not configured" }, { status: 503 });

        const expected = process.env.TELEGRAM_WEBHOOK_SECRET;
        if (expected && request.headers.get("x-telegram-bot-api-secret-token") !== expected) {
          return Response.json({ ok: false }, { status: 401 });
        }

        let update: TelegramUpdate;
        try {
          update = (await request.json()) as TelegramUpdate;
        } catch {
          return Response.json({ ok: false }, { status: 400 });
        }

        const msg = update.message;
        const chatId = msg?.chat?.id;
        const raw = msg?.text ?? "";
        if (!chatId || !raw) return Response.json({ ok: true });

        const isGroup = msg.chat?.type === "group" || msg.chat?.type === "supergroup";
        const { invoked, asked } = extractText(raw);
        if (isGroup && !/^\/boss/i.test(raw.trim())) return Response.json({ ok: true });
        if (!invoked) return Response.json({ ok: true });

        const question = asked || (isGroup ? "" : raw);
        if (!question) {
          await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              text: "ใช้ /boss ตามด้วยคำถาม เช่น /boss สรุปงานวันนี้",
              reply_to_message_id: msg.message_id,
            }),
          });
          return Response.json({ ok: true });
        }

        const lang: "th" | "en" = /[ก-๙]/.test(question) ? "th" : "en";
        const result = await runChatTurn({
          messages: [{ role: "user", content: question }],
          lang,
        });
        const text = result.ok ? result.text.slice(0, 3500) : `เรียกบอทไม่สำเร็จ: ${result.error}`;
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text,
            reply_to_message_id: msg.message_id,
          }),
        });
        return Response.json({ ok: true });
      },
    },
  },
});
