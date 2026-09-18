/** Chat-side guards shared by ChatPanel */

export function needsApproval(command: string): boolean {
  const t = command.trim();
  // Bare URL or site name is NOT a deploy order
  if (/^https?:\/\/\S+$/i.test(t)) return false;
  if (/^panupan22\.vercel\.app\/?$/i.test(t)) return false;
  // Only explicit mutation / ship intents
  return /\b(git\s+push|git\s+commit|commit\s+and\s+push|deploy\s+to\s+production|deploy\s+production|push\s+to\s+(github|origin)|publish\s+to\s+vercel)\b|แก้ไฟล์ใน\s*(repo|โปรเจกต์)|ลบไฟล์ถาวร|ส่งขึ้น\s*(production|github)|commit\s+โค้ด|push\s+โค้ด/i.test(t);
}
