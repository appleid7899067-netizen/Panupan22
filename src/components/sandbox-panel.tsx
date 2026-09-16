import { useEffect, useMemo, useState } from "react";
import { Play, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COPY } from "@/lib/copy";
import { useBossStore } from "@/lib/store";

type LogLine = { kind: "log" | "err"; text: string };

const SRC_WRAP = (code: string) => `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      html, body { margin: 0; background: #0a0b0d; color: #eceef1; font: 13px/1.45 ui-monospace, SF Mono, Menlo, Consolas, monospace; }
      #root { padding: 12px; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script>
      (function () {
        function send(kind, text) {
          parent.postMessage({ source: "bossnugrok-sandbox", kind: kind, text: String(text) }, "*");
        }
        console.log = function () { send("log", Array.from(arguments).map(String).join(" ")); };
        console.error = function () { send("err", Array.from(arguments).map(String).join(" ")); };
        window.onerror = function (m) { send("err", m); };
        try {
${code.replace(/<\/script/gi, "<\\/script")}
        } catch (e) {
          send("err", e && e.stack ? e.stack : e);
        }
      })();
    </script>
  </body>
</html>`;

export function SandboxPanel() {
  const language = useBossStore((s) => s.language);
  const t = COPY[language];
  const sandboxCode = useBossStore((s) => s.sandboxCode);
  const setSandboxCode = useBossStore((s) => s.setSandboxCode);
  const [nonce, setNonce] = useState(0);
  const [logs, setLogs] = useState<LogLine[]>([]);
  const srcDoc = useMemo(() => (nonce === 0 ? "<!doctype html><title>idle</title>" : SRC_WRAP(sandboxCode)), [nonce, sandboxCode]);

  useEffect(() => {
    const onMsg = (ev: MessageEvent) => {
      const d = ev.data;
      if (!d || d.source !== "bossnugrok-sandbox") return;
      setLogs((prev) =>
        [...prev, { kind: d.kind === "err" ? ("err" as const) : ("log" as const), text: String(d.text ?? "") }].slice(-80),
      );
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const run = () => {
    setLogs([]);
    setNonce((n) => n + 1);
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.18em] text-subtle">{t.modeSandbox}</p>
          <h2 className="font-display text-xl tracking-tight">{t.sandboxTitle}</h2>
          <p className="text-xs text-muted-foreground">{t.sandboxLead}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="h-10"
            onClick={() => {
              setSandboxCode("");
              setLogs([]);
              setNonce(0);
            }}
          >
            <Trash2 className="size-4" />
            {t.sandboxClear}
          </Button>
          <Button size="sm" className="h-10" onClick={run}>
            <Play className="size-4" />
            {t.sandboxRun}
          </Button>
        </div>
      </div>
      <div className="grid min-h-0 flex-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1">
        <textarea
          value={sandboxCode}
          onChange={(e) => setSandboxCode(e.target.value)}
          spellCheck={false}
          className="boss-scroll h-full min-h-[180px] resize-none border-b border-border bg-background p-4 font-mono text-xs text-foreground outline-none lg:border-b-0 lg:border-r"
        />
        <div className="flex min-h-0 flex-col">
          <iframe
            title="sandbox"
            sandbox="allow-scripts"
            srcDoc={srcDoc}
            className="h-1/2 min-h-[120px] w-full border-b border-border bg-background"
          />
          <div className="boss-scroll min-h-0 flex-1 overflow-y-auto bg-card px-4 py-3 font-mono text-xs">
            <p className="mb-2 text-[10px] uppercase tracking-wider text-subtle">{t.sandboxConsole}</p>
            {logs.length === 0 ? <p className="text-subtle">—</p> : null}
            {logs.map((l, i) => (
              <p key={i} className={l.kind === "err" ? "text-destructive" : "text-muted-foreground"}>
                {l.text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
