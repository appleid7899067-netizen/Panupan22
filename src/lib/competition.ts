export type CompetitionFeature = { id: string; label: string; status: "ready" | "partial"; evidence: string[]; demo?: string };

export type CompetitionSnapshot = {
  app: string;
  version: string;
  generatedAt: string;
  primaryModel: string;
  pitch: string;
  endpoints: { method: string; path: string; purpose: string }[];
  demos: { id: string; command: string; outcome: string }[];
  features: CompetitionFeature[];
  readiness: {
    grokApiWired: boolean;
    multimodel: boolean;
    toolCalling: boolean;
    liveData: boolean;
    codeSandbox: boolean;
    imageGeneration: boolean;
    integrations: boolean;
    streamingUi: boolean;
    resultCards: boolean;
  };
};

export const COMPETITION_FEATURES: CompetitionFeature[] = [
  { id: "grok-core", label: "Grok-first command center", status: "ready", evidence: ["src/lib/grok.ts", "src/lib/bossnugrok/chat-kernel.ts"], demo: "One prompt → tool → result" },
  { id: "tool-orchestration", label: "In-chat tool orchestration", status: "ready", evidence: ["src/lib/bossnugrok/chat-kernel.ts", "src/lib/auto-tools.ts"], demo: "Ask for live data or code" },
  { id: "live-web", label: "Live web and football data", status: "ready", evidence: ["src/lib/live-data.ts", ".github/skills/web-search", ".github/skills/live-scores"] },
  { id: "code-sandbox", label: "Browser-safe JavaScript sandbox", status: "ready", evidence: ["src/lib/bossnugrok/skills/index.ts", ".github/skills/code-runner"] },
  { id: "botflow", label: "Live BotFlow execution visualizer", status: "ready", evidence: ["src/lib/bot-flow.ts", "src/components/BotVisualizer.tsx"] },
  { id: "image-generation", label: "Grok image generation", status: "ready", evidence: ["src/lib/grok.ts", "src/components/create-panel.tsx"] },
  { id: "multimodel", label: "xAI + Puter model catalog", status: "ready", evidence: ["src/lib/models.ts", "src/lib/puter-ai.ts"] },
  { id: "integrations", label: "GitHub, Discord and Telegram workflows", status: "ready", evidence: [".github/agents", "src/routes/api/bot.discord.ts", "src/routes/api/bot.telegram.ts"] },
  { id: "streaming-ui", label: "Live response streaming UI", status: "ready", evidence: ["src/lib/puter-ai.ts", "src/components/StreamingMessage.tsx", "src/lib/bossnugrok/stream-text.ts"] },
  { id: "result-cards", label: "Actionable result cards", status: "ready", evidence: ["src/components/ResultCard.tsx", "src/components/chat-panel.tsx"] },
];

export function getCompetitionSnapshot(): CompetitionSnapshot {
  return {
    app: "BossnuGrok",
    version: "0.2.1",
    generatedAt: new Date().toISOString(),
    primaryModel: "grok-4.5",
    pitch: "Open web → give one order → BossnuGrok routes tools and returns a visible result.",
    endpoints: [
      { method: "GET", path: "/api/capabilities", purpose: "Machine-readable competition capability manifest" },
      { method: "POST", path: "/api/chat", purpose: "Authenticated HTTP chat endpoint" },
    ],
    demos: [
      { id: "live-web", command: "เช็กข้อมูลล่าสุดให้หน่อย", outcome: "Live web skill can be selected in-chat" },
      { id: "code", command: "คำนวณ 12345 * 67890", outcome: "Code Runner executes in the browser-safe sandbox" },
      { id: "stream", command: "ตอบสั้น ๆ แล้วให้ข้อความไหล", outcome: "Puter provider streaming updates the message as chunks arrive" },
      { id: "result", command: "สรุปผล", outcome: "Assistant replies are wrapped in an actionable Result card" },
    ],
    features: COMPETITION_FEATURES,
    readiness: {
      grokApiWired: true,
      multimodel: true,
      toolCalling: true,
      liveData: true,
      codeSandbox: true,
      imageGeneration: true,
      integrations: true,
      streamingUi: true,
      resultCards: true,
    },
  };
}
