import { useState } from "react";
import { Check, ClipboardCopy, Download, Table2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type DataTableProps = {
  title?: string;
  headers: string[];
  rows: string[][];
  className?: string;
};

function toCsv(headers: string[], rows: string[][]): string {
  const escape = (cell: string) => {
    const needs = /[",\n]/.test(cell);
    const value = cell.replace(/"/g, '""');
    return needs ? `"${value}"` : value;
  };
  const lines = [
    headers.map(escape).join(","),
    ...rows.map((row) => row.map(escape).join(",")),
  ];
  return lines.join("\n");
}

export function DataTable({ title, headers, rows, className }: DataTableProps) {
  const [copied, setCopied] = useState(false);

  const copyTable = async () => {
    const tsv = [headers.join("\t"), ...rows.map((r) => r.join("\t"))].join("\n");
    try {
      await navigator.clipboard.writeText(tsv);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // ignore
    }
  };

  const downloadCsv = () => {
    const csv = toCsv(headers, rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(title || "table").replace(/\s+/g, "-").toLowerCase()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-card/60 shadow-sm",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-2.5 sm:px-4">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-cyan-300">
            <Table2 className="size-3.5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-foreground">
              {title || "Table"}
            </p>
            <p className="text-[10px] text-subtle">
              {rows.length} row{rows.length === 1 ? "" : "s"} · {headers.length}{" "}
              col{headers.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={() => void copyTable()}
            aria-label="Copy table"
            title="Copy as TSV"
          >
            {copied ? (
              <Check className="size-3.5 text-lime-300" />
            ) : (
              <ClipboardCopy className="size-3.5" />
            )}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={downloadCsv}
            aria-label="Download CSV"
            title="Download CSV"
          >
            <Download className="size-3.5" />
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[320px] border-collapse text-left text-xs">
          <thead>
            <tr className="bg-secondary/50">
              {headers.map((header, i) => (
                <th
                  key={i}
                  className="whitespace-nowrap border-b border-border px-3 py-2.5 font-medium text-foreground sm:px-4"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr
                key={ri}
                className="transition-colors hover:bg-secondary/30"
              >
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className="border-b border-border/70 px-3 py-2.5 text-muted-foreground sm:px-4"
                  >
                    {cell || (
                      <span className="text-subtle/60">—</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
