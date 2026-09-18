import { DataTable } from "@/components/DataTable";
import { parseMarkdownTables, hasMarkdownTable } from "@/lib/bossnugrok/parse-table";
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
        <code
          key={key}
          className="rounded-[var(--radius-xs)] bg-secondary px-1 py-px font-mono text-xs"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={key}>{part}</span>;
  });
}

function renderTextBlock(text: string, keyBase: string) {
  const chunks = text.split(/```([\s\S]*?)```/g);
  return chunks.map((chunk, ci) => {
    if (ci % 2 === 1) {
      const nl = chunk.indexOf("\n");
      const lang = nl === -1 ? "" : chunk.slice(0, nl).trim();
      const code = nl === -1 ? chunk : chunk.slice(nl + 1);
      return (
        <pre
          key={`${keyBase}-code-${ci}`}
          className="overflow-x-auto rounded-[var(--radius-md)] border border-border bg-secondary px-3 py-2.5 font-mono text-xs text-foreground"
        >
          {lang ? (
            <span className="mb-2 block text-[10px] uppercase tracking-wider text-subtle">
              {lang}
            </span>
          ) : null}
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
          <p
            key={`${keyBase}-${ci}-${bi}`}
            className="font-display text-base tracking-tight text-foreground"
          >
            {inline(lines[0]!.replace(/^#{1,3}\s+/, ""), `${keyBase}-${ci}-${bi}`)}
          </p>
        );
      }
      const isList = lines
        .filter((l) => l.trim())
        .every((l) => /^[-*]\s+/.test(l) || /^\d+\.\s+/.test(l));
      if (isList) {
        return (
          <ul key={`${keyBase}-${ci}-${bi}`} className="space-y-1.5 pl-4">
            {lines
              .filter((l) => l.trim())
              .map((l, li) => (
                <li key={li} className="list-disc text-muted-foreground">
                  {inline(
                    l.replace(/^([-*]|\d+\.)\s+/, ""),
                    `${keyBase}-${ci}-${bi}-${li}`,
                  )}
                </li>
              ))}
          </ul>
        );
      }
      return (
        <p
          key={`${keyBase}-${ci}-${bi}`}
          className="text-pretty text-muted-foreground"
        >
          {lines.map((line, li) => (
            <span key={li}>
              {li > 0 ? <br /> : null}
              {inline(line, `${keyBase}-${ci}-${bi}-${li}`)}
            </span>
          ))}
        </p>
      );
    });
  });
}

export function Markdown({
  text,
  content,
  className,
}: {
  text?: string;
  content?: string;
  className?: string;
}) {
  const source = text ?? content ?? "";

  // Fast path: no tables → original markdown renderer
  if (!hasMarkdownTable(source)) {
    return (
      <div
        className={cn(
          "space-y-3 text-sm leading-relaxed text-foreground",
          className,
        )}
      >
        {renderTextBlock(source, "md")}
      </div>
    );
  }

  // Mixed / table content
  const blocks = parseMarkdownTables(source);

  return (
    <div
      className={cn(
        "space-y-3 text-sm leading-relaxed text-foreground",
        className,
      )}
    >
      {blocks.map((block, i) => {
        if (block.type === "table") {
          return (
            <DataTable
              key={`table-${i}`}
              title={block.table.title}
              headers={block.table.headers}
              rows={block.table.rows}
            />
          );
        }
        return (
          <div key={`text-${i}`} className="space-y-3">
            {renderTextBlock(block.text, `t${i}`)}
          </div>
        );
      })}
    </div>
  );
}
