/**
 * ApprovalCard — confirm dangerous intents before acting
 */
import { Check, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { guardCommand } from "@/lib/chat-guards";
import { cn } from "@/lib/utils";

type Props = {
  command: string;
  onApprove: () => void;
  onReject: () => void;
  context?: string;
};

const COLOR_RING: Record<string, string> = {
  red: "border-red-400/40 bg-red-400/5",
  orange: "border-orange-400/40 bg-orange-400/5",
  yellow: "border-amber-400/40 bg-amber-400/5",
  blue: "border-sky-400/40 bg-sky-400/5",
  green: "border-lime-400/40 bg-lime-400/5",
};

export function ApprovalCard({ command, onApprove, onReject, context }: Props) {
  const { intent, meta } = guardCommand(command);

  return (
    <div
      className={cn(
        "mt-3 rounded-2xl border p-3",
        COLOR_RING[meta.color] ?? COLOR_RING.orange,
      )}
    >
      <div className="flex items-start gap-2">
        <span className="text-lg leading-none">{meta.icon}</span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">ต้องยืนยันก่อนดำเนินการ</p>
          <p className="text-[11px] text-muted-foreground">
            {meta.labelTh} · {meta.label}
            {meta.dangerous ? " · อันตราย" : ""}
          </p>
        </div>
        <span className="rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wider text-subtle">
          {intent}
        </span>
      </div>

      {context ? <p className="mt-2 text-xs text-muted-foreground">{context}</p> : null}

      <pre className="mt-2 overflow-x-auto rounded-xl border border-border bg-black/40 px-3 py-2 font-mono text-[11px] text-foreground/90">
        <span className="text-lime-300">$ </span>
        {command}
      </pre>

      <p className="mt-2 text-[11px] text-amber-200/90">
        คำสั่งนี้อาจเปลี่ยนไฟล์ / git / deploy — ตรวจก่อนยืนยัน
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          className="h-8 rounded-full bg-lime-300 text-black hover:bg-lime-200"
          onClick={onApprove}
        >
          <Check className="size-3.5" /> ยืนยัน
        </Button>
        <Button type="button" size="sm" variant="ghost" className="h-8 rounded-full" onClick={onReject}>
          <ShieldAlert className="size-3.5" /> ยกเลิก
        </Button>
      </div>
    </div>
  );
}
