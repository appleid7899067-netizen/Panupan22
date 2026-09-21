#!/usr/bin/env node
/**
 * CI Clean Room
 * Removes only generated build/install state. Never deletes source, migrations,
 * lockfiles, env files, or user data.
 */
import { existsSync, rmSync } from "node:fs";

const targets = [".output", "dist", ".vite", "node_modules/.vite", "node_modules/.cache"];
for (const target of targets) {
  if (existsSync(target)) {
    rmSync(target, { recursive: true, force: true });
    console.log(`[clean-room] removed ${target}`);
  }
}
console.log("[clean-room] source and lockfiles preserved");
