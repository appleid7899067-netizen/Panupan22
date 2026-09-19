# Grokathon / judge-ready notes

## Capability manifest
BossnuGrok now exposes a read-only machine-readable capability manifest at GET /api/capabilities. It contains no secrets and points to repository evidence for each declared capability.

## Demo path
1. Open the command center and start a normal Grok chat.
2. Ask for a current web lookup; the same chat can invoke web-search.
3. Ask for a football score; live-scores runs without leaving the room.
4. Ask for a small JavaScript calculation; the sandbox executes it.
5. Generate an image from Create.
6. Show BotFlow to make the tool/model/process pipeline visible.
7. Open /api/capabilities for the machine-readable feature manifest.

## Architecture
- src/lib/grok.ts — xAI chat and image generation.
- src/lib/bossnugrok/chat-kernel.ts — Grok tool-calling loop.
- src/lib/auto-tools.ts — automatic skill selection.
- src/lib/live-data.ts — server-side live data adapters.
- src/lib/bossnugrok/skills/ — executable skills.
- src/lib/bot-flow.ts and src/components/BotVisualizer.tsx — execution visibility.
- src/lib/models.ts and src/lib/puter-ai.ts — model catalog/fallback path.
- src/routes/api/capabilities.ts — judge/demo capability endpoint.

## Pre-existing work disclosure
If an event requires code demoed to be written during the event, do not claim that the entire repository was written during the event. This repository contains pre-existing work. Clearly identify what was built or materially changed for the specific event and preserve the relevant Git history.

The current public Grokathon rules say code demoed must be written during the hackathon, while open-source libraries, frameworks, boilerplate, and pre-trained models are allowed. Verify the official rules for the exact event before submitting.

## Final verification
Run npm run typecheck, npm run lint, npm test, and npm run build. Then verify the live deployment and /api/capabilities. Never commit API keys or other secrets.