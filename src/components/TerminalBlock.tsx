import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type TerminalBlockProps = {
  title?: string;
  command?: string;
  output: string;
  status: "running" | "done" | "error";
  duration?: number;
};

export function TerminalBlock({
  title = "Terminal",
  command,
  output,
  status,
  duration,
}: TerminalBlockProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [output]);

  const statusText =
    status === "running"
      ? "running…"
      : status === "done"
        ? `done${duration != null ? ` · ${duration}ms` : ""}`
        : "error";

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-[#0d0d0d] font-mono text-xs">
      <div className="flex items-center justify-between gap-2 border-b border-white/10 bg-[#1a1a1a] px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f56]" />
          <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="size-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <span className="text-[10px] text-white/50">{title}</span>
        <span
          className={cn(
            "text-[10px]",
            status === "running" && "text-amber-300",
            status === "done" && "text-lime-300",
            status === "error" && "text-rose-300",
          )}
        >
          {statusText}
        </span>
      </div>

      {command ? (
        <div className="border-b border-white/5 bg-black/40 px-3 py-2 text-[11px] text-violet-300">
          <span className="mr-1.5 text-lime-300">$</span>
          {command}
        </div>
      ) : null}

      <div ref={scrollRef} className="max-h-72 overflow-y-auto px-3 py-3 text-[11px] leading-relaxed text-zinc-300">
        {output ? (
          <pre className="whitespace-pre-wrap break-words font-mono">
            {output}
            {status === "running" ? (
              <span className="ml-0.5 inline-block h-3 w-1.5 animate-pulse bg-lime-300 align-middle" />
            ) : null}
          </pre>
        ) : (
          <span className="italic text-zinc-500">
            {status === "running" ? "waiting…" : "(no output)"}
          </span>
        )}
      </div>
    </div>
  );
}
