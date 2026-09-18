/**
 * Markdown Table Parser
 * Converts Markdown tables into structured data for DataTable.
 */

export type ParsedTable = {
  title: string;
  headers: string[];
  rows: string[][];
};

export type ContentBlock =
  | { type: "table"; table: ParsedTable }
  | { type: "text"; text: string };

function isTableRow(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed.startsWith("|")) return false;
  return trimmed.split("|").length >= 3;
}

function isSeparatorRow(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed.startsWith("|")) return false;
  const cleaned = trimmed.replace(/\|/g, "").trim();
  return /^[\s\-:]+$/.test(cleaned);
}

function splitCells(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function extractTitle(line: string): string {
  const cleaned = line
    .replace(/\*\*/g, "")
    .replace(/^[#\s]*/, "")
    .replace(/^[🎯📊📋✅❌🌱💎👤💜🔍📈📉🗓️]\s*/, "")
    .trim();
  return cleaned || "Table";
}

/**
 * Parse markdown into ordered blocks of text and tables.
 * Preserves surrounding prose while extracting well-formed GFM tables.
 */
export function parseMarkdownTables(markdown: string): ContentBlock[] {
  const lines = markdown.split("\n");
  const blocks: ContentBlock[] = [];
  let textBuffer: string[] = [];
  let i = 0;

  const flushText = () => {
    const text = textBuffer.join("\n").trim();
    if (text) blocks.push({ type: "text", text });
    textBuffer = [];
  };

  while (i < lines.length) {
    const line = lines[i]!;

    if (
      isTableRow(line) &&
      i + 1 < lines.length &&
      isSeparatorRow(lines[i + 1]!)
    ) {
      // Optional title on the previous non-empty line
      let title = "Table";
      if (textBuffer.length > 0) {
        const last = textBuffer[textBuffer.length - 1]!.trim();
        if (last && !isTableRow(last)) {
          title = extractTitle(last);
          textBuffer.pop();
        }
      }
      flushText();

      const headers = splitCells(line);
      i += 2; // skip header + separator

      const rows: string[][] = [];
      while (i < lines.length && isTableRow(lines[i]!)) {
        const cells = splitCells(lines[i]!);
        // Pad / trim to header length
        while (cells.length < headers.length) cells.push("");
        rows.push(cells.slice(0, headers.length));
        i++;
      }

      blocks.push({ type: "table", table: { title, headers, rows } });
      continue;
    }

    textBuffer.push(line);
    i++;
  }

  flushText();
  return blocks;
}

/** True when the markdown contains at least one GFM table. */
export function hasMarkdownTable(markdown: string): boolean {
  return parseMarkdownTables(markdown).some((b) => b.type === "table");
}
