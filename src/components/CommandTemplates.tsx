import { FileText, GraduationCap, Presentation, Search, WandSparkles } from "lucide-react";

type Props = { onSelect: (command: string) => void; disabled?: boolean };

const templates = [
  { label: "สรุปบิล", icon: FileText, prompt: "วิเคราะห์ไฟล์บิลที่แนบมา สรุปยอดรวม รายการสำคัญ ภาษี และจุดผิดปกติให้เลย" },
  { label: "ทำสไลด์", icon: Presentation, prompt: "ทำโครงสไลด์จากข้อมูลที่แนบมา พร้อมหัวข้อแต่ละสไลด์และเนื้อหาพร้อมนำไปทำต่อ" },
  { label: "วิเคราะห์โค้ด", icon: Search, prompt: "วิเคราะห์โค้ดที่แนบมา หา bug จุดเสี่ยง และเสนอวิธีแก้พร้อมโค้ดที่แก้แล้ว" },
  { label: "สอนฉัน", icon: GraduationCap, prompt: "สอนหัวข้อนี้แบบเข้าใจง่าย เริ่มจากพื้นฐาน แล้วให้ตัวอย่างและแบบฝึกหัดท้ายบท" },
  { label: "สรุปให้เลย", icon: WandSparkles, prompt: "สรุปข้อมูลที่แนบมาให้เป็นประเด็นสำคัญ พร้อมข้อสรุปและสิ่งที่ควรทำต่อ" },
];

export function CommandTemplates({ onSelect, disabled }: Props) {
  return (
    <div className="mx-auto flex w-full max-w-[1400px] gap-2 overflow-x-auto pb-2" aria-label="Command templates">
      {templates.map(({ label, icon: Icon, prompt }) => (
        <button
          key={label}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(prompt)}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-[11px] transition hover:border-primary/40 hover:bg-primary/[0.06] disabled:opacity-50"
        >
          <Icon className="size-3.5" />
          {label}
        </button>
      ))}
    </div>
  );
}
