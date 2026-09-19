export type SkillId =
  | "code-runner"
  | "daily-fixer"
  | "web-search"
  | "live-scores"
  | "link-follower"
  | "doc-reader"
  | "prompt-lab"\n  | "image-create"\n  | "video-create"\n  | "text-to-speech"\n  | "image-ocr"\n  | "speech-to-text"\n  | "voice-changer";

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
