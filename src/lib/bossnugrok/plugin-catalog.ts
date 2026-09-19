import { SKILLS, createSkillCall, executeSkill } from "@/lib/bossnugrok/skills";
import type { SkillCall, SkillDefinition } from "@/lib/bossnugrok/skills/skill-types";

export type PluginCapability = "skill" | "ai" | "workspace" | "browser" | "automation";
export type PluginStatus = "ready" | "foundation";

export type PluginRecord = {
  id: string;
  name: string;
  nameTh: string;
  description: string;
  category: string;
  capability: PluginCapability;
  status: PluginStatus;
  skillId?: SkillDefinition["id"];
  permissions: string[];
  executable: boolean;
  enabledByDefault: boolean;
};

const SKILL_CATEGORY: Record<string, string> = {
  "code-runner": "Developer",
  "daily-fixer": "Agent",
  "live-scores": "Live Data",
  "web-search": "Web",
  "link-follower": "Web",
  "doc-reader": "Documents",
};

export const PLUGIN_CATALOG: PluginRecord[] = SKILLS.map((skill) => ({
  id: `skill:${skill.id}`,
  name: skill.name,
  nameTh: skill.nameTh,
  description: skill.description,
  category: SKILL_CATEGORY[skill.id] ?? "Skills",
  capability: "skill",
  status: "ready",
  skillId: skill.id,
  permissions: skill.needsApproval ? ["user approval"] : [],
  executable: true,
  enabledByDefault: true,
}));

export function getPluginById(id: string): PluginRecord | undefined {
  return PLUGIN_CATALOG.find((plugin) => plugin.id === id);
}

export function getExecutablePlugins(): PluginRecord[] {
  return PLUGIN_CATALOG.filter((plugin) => plugin.executable && plugin.status === "ready");
}

export function createPluginCall(pluginId: string, input: string): SkillCall | null {
  const plugin = getPluginById(pluginId);
  if (!plugin?.skillId || !plugin.executable) return null;
  const call = createSkillCall(input);
  if (!call || call.skillId !== plugin.skillId) {
    return {
      id: `plugin_${Date.now().toString(36)}`,
      skillId: plugin.skillId,
      args: {},
      status: "running",
    };
  }
  return call;
}

export async function executePlugin(
  pluginId: string,
  call: SkillCall,
  onStream?: (chunk: string) => void,
): Promise<SkillCall> {
  const plugin = getPluginById(pluginId);
  if (!plugin?.executable || plugin.status !== "ready") {
    return { ...call, status: "error", error: "Plugin is not executable." };
  }
  return executeSkill(call, onStream);
}
