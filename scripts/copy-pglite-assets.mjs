import { copyFile, mkdir, access } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const source = join(root, "node_modules", "@electric-sql", "pglite", "dist");
const target = join(root, ".output", "server", "_libs");

const assets = ["pglite.data", "pglite.wasm", "initdb.wasm", "nodefs.js"];

await mkdir(target, { recursive: true });

for (const asset of assets) {
  const from = join(source, asset);
  const to = join(target, asset);
  try {
    await access(from);
    await copyFile(from, to);
    console.log(`[pglite-assets] copied ${asset}`);
  } catch {
    if (asset === "pglite.data" || asset === "pglite.wasm" || asset === "initdb.wasm") {
      throw new Error(`Required PGlite runtime asset is missing: ${from}`);
    }
  }
}

console.log("[pglite-assets] production runtime assets verified");
