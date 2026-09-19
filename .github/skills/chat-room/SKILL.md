---
name: chat-room
description: How BossnuGrok stays in a chat room and invokes tools.
---

# chat-room

This skill is always on for any room (web, GitHub, Discord, Telegram, Copilot).

## Sequence
1. Read the latest user message in this room.
2. If a skill matches, **the bot calls it**. The user should not have to leave chat.
3. Put the answer in this thread. One bubble on the web; one comment/message on GitHub/Discord/Telegram.
4. Only switch workspace mode on an explicit phrase: `เปิด sandbox`, `switch to terminal`, `เปิด groksuper`.

## Do not
- Say "open another tab to run this".
- Treat a bare URL as git push / deploy.
- Invent API keys or token budgets.
