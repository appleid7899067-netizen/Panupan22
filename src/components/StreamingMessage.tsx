import { useEffect, useRef } from "react";
import { Markdown } from "@/components/markdown";

export interface StreamingMessageProps {
  content: string;
  isStreaming: boolean;
  code?: { language: string; code: string };
  output?: string;
  status?: "streaming" | "running" | "done" | "error";
}

export function StreamingMessage({
  content,
  isStreaming,
  code,
  output,
  status = "streaming",
}: StreamingMessageProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [content, output]);

  return (
    <div className="streaming-message">
      {content ? (
        <div className="streaming-text">
          <Markdown text={content} />
          {isStreaming ? <span className="streaming-cursor" aria-hidden="true">▋</span> : null}
        </div>
      ) : null}

      {code ? (
        <div className="streaming-code">
          <div className="streaming-code-header">
            <span className="streaming-code-lang">{code.language}</span>
            <span className="streaming-code-label">code</span>
          </div>
          <pre>{code.code}</pre>
        </div>
      ) : null}

      {output !== undefined ? (
        <div className="streaming-terminal">
          <div className="streaming-terminal-header">
            <span className="streaming-terminal-dots" aria-hidden="true">
              <span className="streaming-dot streaming-dot-red" />
              <span className="streaming-dot streaming-dot-yellow" />
              <span className="streaming-dot streaming-dot-green" />
            </span>
            <span>Terminal</span>
            <span className={`terminal-status ${status}`}>
              {status === "running" ? "⏳ running…" : null}
              {status === "done" ? `✓ done` : null}
              {status === "error" ? "✕ error" : null}
            </span>
          </div>
          <div className="streaming-terminal-body" ref={scrollRef}>
            <pre>{output || "waiting…"}</pre>
            {status === "running" ? <span className="streaming-cursor" aria-hidden="true">▋</span> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
