import type { AppRole } from "./verify.server";

export type Permission =
  | "chat.use"
  | "workspace.read"
  | "workspace.write"
  | "users.read"
  | "users.manage"
  | "settings.manage"
  | "audit.read";

const ROLE_PERMISSIONS: Record<AppRole, readonly Permission[]> = {
  OWNER: ["chat.use", "workspace.read", "workspace.write", "users.read", "users.manage", "settings.manage", "audit.read"],
  CEO: ["chat.use", "workspace.read", "workspace.write", "users.read", "users.manage", "settings.manage", "audit.read"],
  ADMIN: ["chat.use", "workspace.read", "workspace.write", "users.read", "users.manage"],
  USER: ["chat.use", "workspace.read"],
};

export function hasPermission(role: AppRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}

export function assertPermission(role: AppRole, permission: Permission): void {
  if (!hasPermission(role, permission)) {
    const error = new Error("Forbidden");
    Object.assign(error, { status: 403 });
    throw error;
  }
}

export function permissionsForRole(role: AppRole): readonly Permission[] {
  return ROLE_PERMISSIONS[role];
}
