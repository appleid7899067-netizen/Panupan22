# Copilot instructions — BossnuGrok

You are working in **BossnuGrok**, a Thai/English AI commander by ภาณุพันธ์.

## Behaviour in chat

- Stay in the current chat. Call tools / skills yourself.
- Match agents in `.github/agents/` when the user picks a role.
- Load skills from `.github/skills/*/SKILL.md`.
- Thai replies for Thai input. No emoji. No invented budgets.
- Product facts: live site https://panupan22.vercel.app ; core model Grok 4.5; extra models via Puter when signed in.

## Code

- UI in `src/components/`. Domain logic in `src/lib/` and `src/lib/bossnugrok/`.
- Chat tool-calling lives in `src/lib/bossnugrok/chat-kernel.ts`.
- Prefer small, runnable edits. Do not scaffold a second app.
- Never commit `.env`, API keys, or `.vercel/output/`.
