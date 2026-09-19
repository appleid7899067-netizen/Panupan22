---
name: web-search
description: Live web search. Bot must call this itself in the chat room.
---

# web-search

Use when the user asks for current facts, news, docs, or says ค้นหาเว็บ.

## Sequence
1. Call the web-search / live-data tool from the kernel.
2. Answer from the tool output in the same room.
3. Never claim you have no internet if the tool returned data.

Triggers: ค้นหาเว็บ, ค้นหาว่า, web search, ดึงข้อมูลออนไลน์, ข่าวล่าสุด
