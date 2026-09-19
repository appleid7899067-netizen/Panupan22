/**
 * Parse code blocks from chat input.
 * Keeps language normalization in one place for sandbox/tool routing.
 */
export interface CodeArgs {
  language: string;
  code: string;
  isCodeBlock: boolean;
}

const LANGUAGE_ALIASES: Record<string, string> = {
  py: "python",
  python3: "python",
  js: "javascript",
  node: "javascript",
  ts: "typescript",
  sh: "bash",
  shell: "bash",
};

export function parseCodeArgs(input: string): CodeArgs {
  const match = input.match(/\`\`\`([^\n]*)\n?([\s\S]*?)\`\`\`/);

  if (!match) {
    return {
      language: "javascript",
      code: input.trim(),
      isCodeBlock: false,
    };
  }

  const rawLanguage = (match[1] || "javascript").trim().toLowerCase();
  const language = LANGUAGE_ALIASES[rawLanguage] ?? rawLanguage;
  const code = (match[2] ?? "")
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "\t")
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .trim();

  return { language, code, isCodeBlock: true };
}
