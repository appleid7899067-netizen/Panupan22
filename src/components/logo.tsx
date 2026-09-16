import { cn } from "@/lib/utils";

export function AppMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("text-foreground", className)} fill="none" aria-hidden="true">
      <rect x="3.2" y="3.2" width="25.6" height="25.6" rx="8" stroke="currentColor" strokeWidth="1.4" opacity="0.4" />
      <path
        d="M10.2 22.2V9.8h6.1c3.05 0 5 1.65 5 4.15 0 1.7-1 3.05-2.7 3.65L21.8 22.2h-3.05l-2.85-4.35h-2.7v4.35H10.2Zm3.05-6.85h3c1.45 0 2.25-.7 2.25-1.8s-.8-1.75-2.25-1.75h-3v3.55Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function PuterMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("text-current", className)} fill="none" aria-hidden="true">
      <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8.5 16V8.6h4.15c2.2 0 3.55 1.2 3.55 3.05 0 1.9-1.4 3.15-3.6 3.15H10.7"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
