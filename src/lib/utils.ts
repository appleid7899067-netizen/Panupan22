import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function uid(prefix = "id"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
}

export function relativeTime(ts: number, lang: "th" | "en"): string {
  const delta = Date.now() - ts;
  const min = Math.round(delta / 60_000);
  if (min < 1) return lang === "th" ? "เมื่อกี้" : "just now";
  if (min < 60) return lang === "th" ? `${min} นาทีที่แล้ว` : `${min}m ago`;
  const hr = Math.round(min / 60);
  if (hr < 24) return lang === "th" ? `${hr} ชม. ที่แล้ว` : `${hr}h ago`;
  const day = Math.round(hr / 24);
  return lang === "th" ? `${day} วันที่แล้ว` : `${day}d ago`;
}
