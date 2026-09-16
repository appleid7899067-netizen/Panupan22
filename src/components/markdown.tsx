import { cn } from "@/lib/utils";

function inline(text: string, keyBase: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    const key = `${keyBase}-${i}`;
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={key} className="font-medium text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={key} className="rounded-[var(--radius-xs)] bg-secondary px-1 py-px font-mono text-xs">
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={key}>{part}</span>;
  });
}

export function Markdown({ text, className }: { text: string; className?: string }) {
  const chunks = text.split(/```([\s\S]*?)```/g);
  return (
    <div className={cn("space-y-3 text-sm leading-relaxed text-foreground", className)}>
      {chunks.map((chunk, ci) => {
        if (ci % 2 === 1) {
          const nl = chunk.indexOf("\n");
          const lang = nl === -1 ? "" : chunk.slice(0, nl).trim();
          const code = nl === -1 ? chunk : chunk.slice(nl + 1);
          return (
            <pre
              key={ci}
              className="overflow-x-auto rounded-[var(--radius-md)] border border-border bg-secondary px-3 py-2.5 font-mono text-xs text-foreground"
            >
              {lang ? <span className="mb-2 block text-[10px] uppercase tracking-wider text-subtle">{lang}</span> : null}
              <code>{code.replace(/\n$/, "")}</code>
            </pre>
          );
        }
        const blocks = chunk.split(/\n{2,}/);
        return blocks.map((block, bi) => {
          if (!block.trim()) return null;
          const lines = block.split("\n");
          if (/^#{1,3}\s/.test(lines[0] ?? "")) {
            return (
              <p key={`${ci}-${bi}`} className="font-display text-base tracking-tight text-foreground">
                {inline(lines[0]!.replace(/^#{1,3}\s+/, ""), `${ci}-${bi}`)}
              </p>
            );
          }
          const isList = lines.filter((l) => l.trim()).every((l) => /^[-*]\s+/.test(l) || /^\d+\.\s+/.test(l));
          if (isList) {
            return (
              <ul key={`${ci}-${bi}`} className="space-y-1.5 pl-4">
                {lines
                  .filter((l) => l.trim())
                  .map((l, li) => (
                    <li key={li} className="list-disc text-muted-foreground">
                      {inline(l.replace(/^([-*]|\d+\.)\s+/, ""), `${ci}-${bi}-${li}`)}
                    </li>
                  ))}
              </ul>
            );
          }
          return (
            <p key={`${ci}-${bi}`} className="text-pretty text-muted-foreground">
              {lines.map((line, li) => (
                <span key={li}>
                  {li > 0 ? <br /> : null}
                  {inline(line, `${ci}-${bi}-${li}`)}
                </span>
              ))}
            </p>
          );
        });
      })}
    </div>
  );
}
