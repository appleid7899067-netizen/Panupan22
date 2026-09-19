# เรียกบอทในห้องแชท — BossnuGrok

ระบบถูกจัดให้ **บอทเป็นคนเรียกสกิล** ในห้องที่คุยอยู่ ไม่ต้องส่งผู้ใช้ไปโหมดอื่น

## ห้องที่รองรับ

| ห้อง | วิธีเรียก | Endpoint / ไฟล์ |
|---|---|---|
| เว็บ Command Center | พิมพ์ตามปกติ | `src/components/chat-panel.tsx` → kernel |
| GitHub Copilot Chat | เลือก agent **BossnuGrok** | `.github/agents/*.agent.md` |
| GitHub Issue / PR | คอมเมนต์ `/boss คำถาม` | `.github/workflows/chat-mention.yml` |
| Discord | `@บอท` หรือ `/boss` | `POST /api/bot/discord` |
| Telegram กลุ่ม | `/boss คำถาม` | `POST /api/bot/telegram` |
| HTTP อื่น ๆ | JSON | `POST /api/chat` |

## HTTP (`POST /api/chat`)

```json
{
  "text": "สรุป README ของรีโปนี้",
  "lang": "th",
  "room": "api",
  "system": "optional override"
}
```

ตอบ:

```json
{ "ok": true, "text": "...", "model": "grok-4.5", "skillCalls": [] }
```

ไม่ต้องใส่ API key ในบอดี — เซิร์ฟเวอร์ใช้ `XAI_API_KEY` ที่ deploy แล้วเท่านั้น.

ถ้าตั้ง `CHAT_API_SECRET` จะต้องส่งเฮดเดอร์ `x-boss-secret`.

## Discord

1. สร้าง Application + Bot ใน Discord Developer Portal
2. Privileged intent: Message Content
3. Interactions Endpoint URL: `https://panupan22.vercel.app/api/bot/discord`
4. ใส่ `DISCORD_PUBLIC_KEY` และ `DISCORD_BOT_TOKEN` ใน Vercel env
5. Invite บอทเข้าห้อง แล้วพิมพ์ `/boss สวัสดี` หรือ mention

## Telegram

1. คุยกับ [@BotFather](https://t.me/BotFather) สร้างบอท
2. ตั้ง webhook: `https://panupan22.vercel.app/api/bot/telegram`
3. ใส่ `TELEGRAM_BOT_TOKEN` ใน Vercel env
4. (แนะนำ) `TELEGRAM_WEBHOOK_SECRET` แล้วตั้ง secret_token ของ webhook ให้ตรงกัน
5. ในกลุ่ม: `/boss คำถาม` — ในแชทส่วนตัวพิมพ์ได้เลย

## GitHub issue chat

Repo secret ที่ต้องมี: `XAI_API_KEY`

คอมเมนต์ใน issue/PR:

```
/boss อธิบาย chat-kernel ทำงานยังไง
```

Action จะตอบเป็นคอมเมนต์ในเธรดเดียวกัน.

## Kernel

`src/lib/bossnugrok/chat-kernel.ts`

1. ฉีด SKILL.md ที่เปิดใช้เข้า system prompt
2. ส่ง tools แบบ OpenAI ให้ Grok 4.5
3. ถ้าโมเดลเรียก tool — รันสกิล แล้วส่งผลกลับในรอบเดียวกัน
4. คำตอบสุดท้ายอยู่ห้องเดิม
