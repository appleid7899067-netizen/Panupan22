export type CompetitionFeature = { id: string; label: string; status: "ready" | "partial"; evidence: string[] };

export type CompetitionSnapshot = {
  app: string;
  version: string;
  generatedAt: string;
  primaryModel: string;
  features: CompetitionFeature[];
  readiness: { grokApiWired: boolean; multimodel: boolean; toolCalling: boolean; liveData: boolean; codeSandbox: boolean; imageGeneration: boolean; integrations: boolean };
};

export const COMPETITION_FEATURES: CompetitionFeature[] = [
  { id: "grok-core", label: "Grok-first command center", status: "ready", evidence: ["src/lib/grok.ts", "src/lib/bossnugrok/chat-kernel.ts"] },
  { id: "tool-orchestration", label: "In-chat tool orchestration", status: "ready", evidence: ["src/lib/bossnugrok/chat-kernel.ts", "src/lib/auto-tools.ts"] },
  { id: "live-web", label: "Live web and football data", status: "ready", evidence: ["src/lib/live-data.ts", ".github/skills/web-search", ".github/skills/live-scores"] },
  { id: "code-sandbox", label: "Browser-safe JavaScript sandbox", status: "ready", evidence: ["src/lib/bossnugrok/skills/index.ts", ".github/skills/code-runner"] },
  { id: "botflow", label: "Live BotFlow execution visualizer", status: "ready", evidence: ["src/lib/bot-flow.ts", "src/components/BotVisualizer.tsx"] },
  { id: "image-generation", label: "Grok image generation", status: "ready", evidence: ["src/lib/grok.ts", "src/components/create-panel.tsx"] },
  { id: "multimodel", label: "xAI + Puter model catalog", status: "ready", evidence: ["src/lib/models.ts", "src/lib/puter-ai.ts"] },
  { id: "integrations", label: "GitHub, Discord and Telegram workflows", status: "ready", evidence: [".github/agents", "src/routes/api/bot.discord.ts", "src/routes/api/bot.telegram.ts"] },
];

export function getCompetitionSnapshot(): CompetitionSnapshot {
  return {
    app: "BossnuGrok", version: "0.2.0", generatedAt: new Date().toISOString(), primaryModel: "grok-4.5",
    features: COMPETITION_FEATURES,
    readiness: { grokApiWired: true, multimodel: true, toolCalling: true, liveData: true, codeSandbox: true, imageGeneration: true, integrations: true },
  };
};