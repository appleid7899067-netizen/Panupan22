# BossnuGrok — project instructions for coding / chat bots

This repository is **BossnuGrok** (developer: ภาณุพันธ์ / Phanuphan).
Live app: https://panupan22.vercel.app

Grok App Builder: keep the sandbox `AGENTS.md` as the platform contract.
**This file** is what product bots (Copilot, Grok in GitHub chat, Cursor) must follow.

## What this product is

A finished **AI commander**, not a framework. Users open the web app, type in the **same chat room**, and get a result. Do not send them to another mode unless they explicitly say so.

## Chat-room rule (non-negotiable)

When the user talks in a chat room (web Command Center, GitHub issue comment, Copilot Chat, Discord, Telegram):

1. **Stay in that room.** Answer there. Do not bounce them to Sandbox / Terminal / Manus unless they clearly ask to open that mode (`เปิด sandbox`, `switch to terminal`).
2. **The bot calls tools itself.** Do not tell the user to “go run this elsewhere”.
3. Invoke skills from `.github/skills/*/SKILL.md` when they match the request.
4. Reply in the user’s language (Thai unless they write English).
5. No emoji. No fake token budgets. Developer name is ภาณุพันธ์.

## Invoke the bot

| Room | How |
|---|---|
| Web | Type normally in Command Center chat |
| GitHub Copilot Chat | Pick agent **BossnuGrok** (or Teacher / Coder / …) |
| GitHub issue / PR | Comment `/boss` then the question |
| Discord | Mention the bot or `/boss` |
| Telegram | Talk to the bot, or `/boss` in a group |
| HTTP | `POST /api/chat` |

Details: `docs/CHAT_BOT.md`

## Code map

- Chat UI: `src/components/chat-panel.tsx`
- Kernel (Grok + tool calls): `src/lib/bossnugrok/chat-kernel.ts`
- Skills runtime: `src/lib/bossnugrok/skills/`
- Roles: `src/lib/agents.ts`
- Room webhooks: `src/routes/api/chat.ts`, `src/routes/api/bot.discord.ts`, `src/routes/api/bot.telegram.ts`

Do not rewrite the stack. Do not add auth unless asked. Do not invent secrets.
