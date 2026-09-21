import { spawn } from "node:child_process";

const port = Number(process.env.PORT ?? 8080);
const url = `http://127.0.0.1:${port}/`;
const child = spawn(process.execPath, [".output/server/index.mjs"], {
  stdio: ["ignore", "pipe", "pipe"],
  env: { ...process.env, PORT: String(port), HOST: "0.0.0.0" },
});

let output = "";
child.stdout.on("data", (chunk) => { output += chunk.toString(); });
child.stderr.on("data", (chunk) => { output += chunk.toString(); });

const stop = () => {
  if (!child.killed) child.kill("SIGTERM");
};

try {
  let lastError = null;
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.status >= 200 && response.status < 500) {
        console.log(`[production-smoke] GET / -> ${response.status}`);
        process.exitCode = 0;
        stop();
        await new Promise((resolve) => child.once("exit", resolve));
        process.exit(0);
      }
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Production server did not become reachable: ${lastError?.message ?? "timeout"}`);
} catch (error) {
  console.error("[production-smoke] FAILED:", error);
  console.error(output.slice(-12000));
  stop();
  process.exit(1);
}
