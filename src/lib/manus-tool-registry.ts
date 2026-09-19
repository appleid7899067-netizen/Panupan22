export type ManusToolId =
  | "manus.task.create"
  | "manus.task.send"
  | "manus.task.detail"
  | "manus.task.messages"
  | "manus.task.stop"
  | "manus.task.confirm"
  | "manus.project.list"
  | "manus.project.create"
  | "manus.connector.list"
  | "manus.skill.list"
  | "manus.browser.list"
  | "manus.file.upload"
  | "puter.mcp";

export type ManusToolDefinition = {
  id: ManusToolId;
  label: string;
  description: string;
  endpoint?: string;
  requires?: string[];
  status: "live" | "bridge-required";
};

export const MANUS_TOOL_REGISTRY: ManusToolDefinition[] = [
  { id: "manus.task.create", label: "Create Task", description: "สร้างงาน Manus จริง", endpoint: "/api/manus?action=create", status: "live" },
  { id: "manus.task.send", label: "Continue Task", description: "ส่งข้อความต่อให้ task เดิม", endpoint: "/api/manus action=send", status: "live" },
  { id: "manus.task.detail", label: "Task Detail", description: "อ่านสถานะและ metadata ของ task", endpoint: "/api/manus?action=task", status: "live" },
  { id: "manus.task.messages", label: "Task Messages", description: "อ่าน event/message ของ task", endpoint: "/api/manus?action=messages", status: "live" },
  { id: "manus.task.stop", label: "Stop Task", description: "หยุด task ที่กำลังทำงาน", endpoint: "/api/manus action=stop", status: "live" },
  { id: "manus.task.confirm", label: "Confirm Action", description: "ยืนยัน action ที่ Manus รอการอนุมัติ", endpoint: "/api/manus action=confirm", status: "live" },
  { id: "manus.project.list", label: "Projects", description: "อ่าน project จริงจาก Manus", endpoint: "/api/manus?action=projects", status: "live" },
  { id: "manus.project.create", label: "Create Project", description: "สร้าง project จริงใน Manus", endpoint: "/api/manus action=createProject", status: "live" },
  { id: "manus.connector.list", label: "Connectors", description: "อ่าน connector ที่บัญชี Manus authorize แล้ว", endpoint: "/api/manus?action=connectors", status: "live" },
  { id: "manus.skill.list", label: "Skills", description: "อ่าน skill จริงและนำ ID ไป enable/force ใน task", endpoint: "/api/manus?action=skills", status: "live" },
  { id: "manus.browser.list", label: "My Browser", description: "อ่าน browser session ที่ Manus เปิดให้ใช้จริง", endpoint: "/api/manus?action=browsers", status: "live" },
  { id: "manus.file.upload", label: "File Upload", description: "เตรียมการอัปโหลดไฟล์ผ่าน Manus presigned URL", endpoint: "/api/manus action=uploadPrepare", status: "live" },
  { id: "puter.mcp", label: "Puter MCP", description: "Bridge สำหรับให้ MCP-compatible agent ใช้ Puter resources", requires: ["Puter OAuth"], status: "bridge-required" },
];

export function getManusTool(id: ManusToolId) {
  return MANUS_TOOL_REGISTRY.find((tool) => tool.id === id);
}
