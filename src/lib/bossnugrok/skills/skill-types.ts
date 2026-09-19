export type SkillId =
  | "code-runner"
  | "code-review"
  | "daily-fixer"
  | "web-search"
  | "live-scores"
  | "link-follower"
  | "doc-reader"
  | "prompt-lab"
  | "image-create"
  | "video-create"
  | "text-to-speech"
  | "image-ocr"
  | "speech-to-text"
  | "voice-changer"
  | "translate";

export type SkillStatus = "pending" | "running" | "done" | "error" | "rejected";

export type SkillDefinition = {
  id: SkillId;
  name: string;
  nameTh: string;
  icon: string;
  description: string;
  needsApproval: boolean;
  triggers: string[];
};

export type SkillCall = {
  id: string;
  skillId: SkillId;
  args: Record<string, unknown>;
  status: SkillStatus;
  streamOutput?: string;
  result?: unknown;
  error?: string;
  duration?: number;
};

export type SkillResult = {
  ok: boolean;
  data?: unknown;
  error?: string;
  duration: number;
};
