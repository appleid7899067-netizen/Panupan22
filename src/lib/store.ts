import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CORE_BOSS, makeAgentId, type AgentRecord, type AgentRole } from "@/lib/agents";
import { DEFAULT_FLOW_OPTIONS, type FlowOptions, type FlowStep, type TimelineEvent } from "@/lib/bot-flow";
import type { Lang } from "@/lib/copy";
import { uid } from "@/lib/utils";

export type WorkspaceMode = "command" | "apps" | "create" | "sandbox" | "live" | "terminal" | "super" | "manus";
export type { FlowOptions };

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: number;
  model?: string;
  imageUrl?: string;
  attachments?: { name: string; mime: string }[];
  /** Inline tool/skill call result rendered inside the chat bubble */
  skillCall?: {
    id: string;
    skillId: string;
    status: "pending" | "running" | "done" | "error" | "rejected";
    args?: Record<string, unknown>;
    streamOutput?: string;
    error?: string;
    duration?: number;
  };
  pending?: boolean;
  progress?: number;
  flowSteps?: FlowStep[];
  flowEvents?: TimelineEvent[];
  durationMs?: number;
};

export type CreatedImage = {
  id: string;
  prompt: string;
  url: string;
  createdAt: number;
};

export type Conversation = {
  id: string;
  agentId: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: ChatMessage[];
};

export type WorkspaceSlice = {
  agents: AgentRecord[];
  conversations: Conversation[];
  activeAgentId: string;
  language: Lang;
  modelMode: "auto" | string;
  lastModelId: string | null;
  workspaceMode: WorkspaceMode;
  sandboxCode: string;
  creates: CreatedImage[];
  flowOptions: FlowOptions;
};

type BossState = WorkspaceSlice & {
  hydrated: boolean;
  markHydrated: () => void;
  setLanguage: (language: Lang) => void;
  setModelMode: (mode: "auto" | string) => void;
  setLastModelId: (id: string | null) => void;
  setWorkspaceMode: (mode: WorkspaceMode) => void;
  setSandboxCode: (code: string) => void;
  setFlowOptions: (patch: Partial<FlowOptions>) => void;
  addCreate: (item: CreatedImage) => void;
  setActiveAgent: (id: string) => void;
  forgeAgent: (input: { role: AgentRole; task: string; constraints?: string[] }) => string;
  retireAgent: (id: string) => boolean;
  bumpMessageCount: (agentId: string) => void;
  ensureConversation: (agentId: string) => string;
  clearConversation: (agentId: string) => void;
  appendMessage: (conversationId: string, message: ChatMessage) => void;
  patchMessage: (conversationId: string, messageId: string, patch: Partial<ChatMessage>) => void;
  replaceWorkspace: (slice: WorkspaceSlice) => void;
};

function withCore(agents: AgentRecord[]): AgentRecord[] {
  if (agents.some((a) => a.id === CORE_BOSS.id)) return agents;
  return [{ ...CORE_BOSS, createdAt: Date.now() }, ...agents];
}

function blankConversation(agentId: string): Conversation {
  const now = Date.now();
  return {
    id: uid("chat"),
    agentId,
    title: "New chat",
    createdAt: now,
    updatedAt: now,
    messages: [],
  };
}

const emptySlice: WorkspaceSlice = {
  agents: [{ ...CORE_BOSS, createdAt: Date.now() }],
  conversations: [],
  activeAgentId: CORE_BOSS.id,
  language: "th",
  modelMode: "auto",
  lastModelId: null,
  workspaceMode: "command",
  sandboxCode: `// BossnuGrok sandbox — no network, no parent DOM\nconsole.log("ready");\nconst sum = [1, 2, 3].reduce((a, b) => a + b, 0);\nconsole.log("sum", sum);`,
  creates: [],
  flowOptions: DEFAULT_FLOW_OPTIONS,
};

export const useBossStore = create<BossState>()(
  persist(
    (set, get) => ({
      ...emptySlice,
      hydrated: false,
      markHydrated: () => set({ hydrated: true }),
      setLanguage: (language) => set({ language }),
      setModelMode: (modelMode) => set({ modelMode }),
      setLastModelId: (lastModelId) => set({ lastModelId }),
      setWorkspaceMode: (workspaceMode) => set({ workspaceMode }),
      setSandboxCode: (sandboxCode) => set({ sandboxCode }),
      setFlowOptions: (patch) =>
        set((state) => ({ flowOptions: { ...state.flowOptions, ...patch } })),
      addCreate: (item) => set((state) => ({ creates: [item, ...state.creates].slice(0, 24) })),
      setActiveAgent: (id) => set({ activeAgentId: id }),
      forgeAgent: ({ role, task, constraints }) => {
        const agent: AgentRecord = {
          id: makeAgentId(role),
          role,
          task: task.trim(),
          constraints: (constraints ?? []).map((c) => c.trim()).filter(Boolean),
          createdAt: Date.now(),
          messageCount: 0,
          pinned: false,
        };
        set((state) => ({
          agents: [...state.agents, agent],
          activeAgentId: agent.id,
        }));
        get().ensureConversation(agent.id);
        return agent.id;
      },
      retireAgent: (id) => {
        const target = get().agents.find((a) => a.id === id);
        if (!target || target.pinned) return false;
        set((state) => {
          const agents = state.agents.filter((a) => a.id !== id);
          const conversations = state.conversations.filter((c) => c.agentId !== id);
          const activeAgentId =
            state.activeAgentId === id ? (agents[0]?.id ?? CORE_BOSS.id) : state.activeAgentId;
          return { agents, conversations, activeAgentId };
        });
        return true;
      },
      bumpMessageCount: (agentId) =>
        set((state) => ({
          agents: state.agents.map((a) =>
            a.id === agentId ? { ...a, messageCount: a.messageCount + 1 } : a,
          ),
        })),
      ensureConversation: (agentId) => {
        const existing = get().conversations.find((c) => c.agentId === agentId);
        if (existing) return existing.id;
        const convo = blankConversation(agentId);
        set((state) => ({ conversations: [convo, ...state.conversations] }));
        return convo.id;
      },
      clearConversation: (agentId) =>
        set((state) => ({
          conversations: [
            blankConversation(agentId),
            ...state.conversations.filter((c) => c.agentId !== agentId),
          ],
        })),
      appendMessage: (conversationId, message) =>
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === conversationId
              ? {
                  ...c,
                  updatedAt: Date.now(),
                  title:
                    c.messages.length === 0 && message.role === "user"
                      ? message.content.slice(0, 48) || c.title
                      : c.title,
                  messages: [...c.messages, message],
                }
              : c,
          ),
        })),
      patchMessage: (conversationId, messageId, patch) =>
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === conversationId
              ? {
                  ...c,
                  updatedAt: Date.now(),
                  messages: c.messages.map((m) => (m.id === messageId ? { ...m, ...patch } : m)),
                }
              : c,
          ),
        })),
      replaceWorkspace: (slice) =>
        set({
          ...slice,
          agents: withCore(slice.agents ?? []),
          activeAgentId: slice.activeAgentId || CORE_BOSS.id,
          workspaceMode: slice.workspaceMode || "command",
          sandboxCode: slice.sandboxCode ?? get().sandboxCode,
          creates: slice.creates ?? [],
          flowOptions: slice.flowOptions ?? DEFAULT_FLOW_OPTIONS,
        }),
    }),
    {
      name: "bossnugrok-workspace",
      partialize: (state) => ({
        agents: withCore(state.agents).slice(0, 40),
        conversations: state.conversations.slice(0, 40).map((c) => ({
          ...c,
          messages: c.messages.slice(-60).map((m) => ({
            ...m,
            // never persist raw file bodies
            attachments: m.attachments?.map((a) => ({ name: a.name, mime: a.mime })),
          })),
        })),
        activeAgentId: state.activeAgentId,
        language: state.language,
        modelMode: state.modelMode,
        lastModelId: state.lastModelId,
        workspaceMode: state.workspaceMode,
        sandboxCode: state.sandboxCode,
        creates: state.creates.slice(0, 12),
        flowOptions: state.flowOptions ?? DEFAULT_FLOW_OPTIONS,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.agents = withCore(state.agents ?? []);
          if (!state.agents.some((a) => a.id === state.activeAgentId)) {
            state.activeAgentId = CORE_BOSS.id;
          }
          state.flowOptions = { ...DEFAULT_FLOW_OPTIONS, ...state.flowOptions };
        }
        state?.markHydrated();
      },
    },
  ),
);
