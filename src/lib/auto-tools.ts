/**
 * Auto tool selection for in-chat agentic replies.
 * User talks normally — system picks tools, stays in the same room.
 * Default: prefer special skills (15 skills catalog).
 */
import { createSkillCall, executeSkill } from "@/lib/bossnugrok/skills";
import type { SkillCall } from "@/lib/bossnugrok/skills/skill-types";
import { fetchLiveData } from "@/lib/live-data";

export type AutoToolPack = {
  skillCall?: SkillCall;
  toolText: string;
  used: string[];
};

/** Only explicit “open mode” phrases should leave chat — not casual words. */
export function isExplicitModeSwitch(command: string): boolean {
  return (
    /^(เปิด|ไปที่|switch\s+to|open)\s+/i.test(command.trim()) ||
    (/\b(เปิด\s*)?(โหมด\s*)?(sandbox|prompt\s*lab|สตรีมสด|เทอร์มินอล|groksuper|manus\s*hub)\b/i.test(command) &&
      /(เปิด|ไป|switch|เข้า)/i.test(command))
  );
}

function needsLiveData(text: string): boolean {
  return /ผลบอล|ผลพรีเมียร์|live\s*scores|football|soccer\s*score|ตารางคะแนน|พรีเมียร์.*ผล|ลาลีกา|บุนเดส|วันนี้.*บอล|บอล.*วันนี้|ค้นหาเว็บ|ค้นหาว่า|web search|ดึงข้อมูลออนไลน์|ข่าวล่าสุด|ราคาทอง|อากาศวันนี้/i.test(
    text,
  );
}

/** Detect code blocks or “run this code” intent early so code-runner is preferred. */
function looksLikeCode(text: string): boolean {
  return (
    /```[\s\S]*```/.test(text) ||
    /รันโค้ด|run code|execute this|ลองรัน|ทดสอบโค้ด/i.test(text) ||
    /(function\s+\w+|const\s+\w+\s*=|let\s+\w+\s*=|import\s+|export\s+)/.test(text)
  );
}

/**
 * Run whatever tools fit this user message. Never navigates workspace.
 * Prefers special skills by default (15-skill catalog).
 */
export async function runAutoTools(
  userText: string,
  onStream?: (chunk: string) => void,
): Promise<AutoToolPack> {
  const used: string[] = [];
  let toolText = "";
  let skillCall: SkillCall | undefined;

  // 0) Code from user → force code-runner / code-review path (learn 10x later)
  let routedText = userText;
  if (looksLikeCode(userText)) {
    if (/รีวิว|review|ตรวจโค้ด|วิจารณ์โค้ด/i.test(userText)) {
      routedText = "รีวิวโค้ด " + userText;
    } else {
      routedText = "รันโค้ด " + userText;
    }
  } else if (/https?:\/\//i.test(userText) && /อ่าน|เปิด|ตรวจ|ดู|สรุป|analy[sz]e|read|open/i.test(userText)) {
    routedText = "อ่านลิงก์ " + userText;
  } else if (/prompt\s*lab|พรอมต์\s*แลบ|ทดลองพรอมต์|ทดสอบพรอมต์|ลอง prompt/i.test(userText)) {
    routedText = "เรียก Prompt Lab " + userText;
  } else if (/บทเรียน|เรียนรู้อะไรจาก|ความจำสกิล|skill memory|แก้พลาดอะไร|ข้อผิดพลาดที่ผ่านมา/i.test(userText)) {
    routedText = "ดูบทเรียน " + userText;
  } else if (/แปล|translate|แปลเป็น|translate to/i.test(userText)) {
    routedText = "แปลภาษา " + userText;
  } else if (/สร้างภาพ|วาดภาพ|generate image|create image|ทำรูป/i.test(userText)) {
    routedText = "สร้างภาพ " + userText;
  } else if (/สร้างวิดีโอ|generate video|create video|ทำวิดีโอ/i.test(userText)) {
    routedText = "สร้างวิดีโอ " + userText;
  } else if (/ค้นหา|ค้นข้อมูล|หาข้อมูล|ล่าสุด|ข่าว|ราคา|อากาศ|เว็บ|search|research/i.test(userText)) {
    routedText = "ค้นหาเว็บ " + userText;
  }

  const seed = createSkillCall(routedText);
  if (seed && seed.status !== "pending") {
    used.push(seed.skillId);
    const updated = await executeSkill({ ...seed, status: "running" }, onStream);
    skillCall = updated;
    toolText =
      updated.streamOutput?.trim() ||
      (updated.status === "done" ? String(updated.result ?? "") : updated.error ?? "");
    return { skillCall, toolText, used };
  }

  // 2) Conversational live-data without forcing the user to say “ค้นหาเว็บ”
  if (needsLiveData(userText)) {
    used.push("live-data");
    onStream?.("กำลังดึงข้อมูลออนไลน์…\n");
    try {
      const result = await fetchLiveData({ data: { query: userText.slice(0, 200) } });
      if (result.ok) {
        toolText = result.summary;
        onStream?.(`${result.summary}\n`);
        skillCall = {
          id: `auto_${Date.now().toString(36)}`,
          skillId: result.kind === "football" ? "live-scores" : "web-search",
          args: { query: userText },
          status: "done",
          streamOutput: result.summary,
          result: result.hits,
          duration: 0,
        };
      } else {
        toolText = result.error;
        onStream?.(`❌ ${result.error}\n`);
      }
    } catch (err) {
      toolText = err instanceof Error ? err.message : String(err);
      onStream?.(`❌ ${toolText}\n`);
    }
  }

  return { skillCall, toolText, used };
}

export function toolContextForModel(pack: AutoToolPack, lang: "th" | "en"): string {
  if (!pack.toolText.trim()) return "";
  if (lang === "th") {
    return [
      "[ข้อมูลจากเครื่องมือออนไลน์ — ใช้ตอบผู้ใช้ให้ตรงและสั้น",
      "อย่าบอกว่าเข้าถึงเน็ตไม่ได้ถ้ามีข้อมูลด้านล่าง",
      "ตอบเป็นภาษาคน ไม่ต้องแปะ log ทั้งก้อน เว้นแต่ผู้ใช้ขอ]",
      "",
      pack.toolText.slice(0, 6_000),
    ].join("\n");
  }
  return [
    "[Tool data — answer the user from this. Do not claim you lack internet if data is present. Be concise.]",
    "",
    pack.toolText.slice(0, 6_000),
  ].join("\n");
}
