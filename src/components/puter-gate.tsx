import { useEffect, useState, type ReactNode } from "react";
import { Cloud, Layers, Shield } from "lucide-react";
import { AppMark, PuterMark } from "@/components/logo";
import { OpenRouterKeyBar } from "@/components/openrouter-key-bar";
import { Button } from "@/components/ui/button";
import { COPY } from "@/lib/copy";
import { APP_EDITION, APP_SHORT_NAME } from "@/lib/brand";
import { getOpenRouterKey, OPENROUTER_KEY_EVENT } from "@/lib/openrouter-keys";
import { usePuterAuth } from "@/lib/puter-auth";
import { useBossStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function PuterGate({ children }: { children: ReactNode }) {
  const { status } = usePuterAuth();
  const [openRouter, setOpenRouter] = useState(() => Boolean(getOpenRouterKey()));

  useEffect(() => {
    const sync = () => setOpenRouter(Boolean(getOpenRouterKey()));
    window.addEventListener(OPENROUTER_KEY_EVENT, sync);
    return () => window.removeEventListener(OPENROUTER_KEY_EVENT, sync);
  }, []);

  // Either path unlocks the app: Puter session OR OpenRouter key
  if (status === "signed_in" || openRouter) return <>{children}</>;
  return <PuterLoginScreen />;
}

export function PuterLoginScreen() {
  const { status, error, pending, signIn, retry } = usePuterAuth();
  const language = useBossStore((s) => s.language);
  const setLanguage = useBossStore((s) => s.setLanguage);
  const t = COPY[language];
  const loading = status === "loading";
  const unavailable = status === "unavailable";
  const benefits = [
    { icon: Cloud, title: t.benefit1t, sub: t.benefit1s },
    { icon: Layers, title: t.benefit2t, sub: t.benefit2s },
    { icon: Shield, title: t.benefit3t, sub: t.benefit3s },
  ];

  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-background px-5 py-10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 puter-login-glow" />
      <div className="relative w-full max-w-md">
        <div className="mb-4 flex justify-end">
          <div className="flex rounded-full border border-border bg-card p-0.5 text-xs">
            <button
              type="button"
              className={cn(
                "h-8 rounded-full px-3",
                language === "th" ? "bg-secondary text-foreground" : "text-muted-foreground",
              )}
              onClick={() => setLanguage("th")}
            >
              TH
            </button>
            <button
              type="button"
              className={cn(
                "h-8 rounded-full px-3",
                language === "en" ? "bg-secondary text-foreground" : "text-muted-foreground",
              )}
              onClick={() => setLanguage("en")}
            >
              EN
            </button>
          </div>
        </div>
        <div className="boss-stagger rounded-[32px] border border-border bg-card px-6 py-8 sm:px-8">
          <div className="flex flex-col items-center text-center">
            <AppMark className="size-16 text-brand" />
            <h1 className="mt-5 font-display text-2xl font-semibold tracking-tight text-foreground">
              {APP_SHORT_NAME}
            </h1>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">{APP_EDITION}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {language === "th"
                ? "เลือกทางเข้า: ใส่ OpenRouter key หรือ Sign in with Puter"
                : "Enter via OpenRouter key or Sign in with Puter"}
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <OpenRouterKeyBar />
            <div className="relative py-2 text-center text-[10px] uppercase tracking-wider text-muted-foreground">
              <span className="bg-card px-2">{language === "th" ? "หรือ" : "or"}</span>
              <div className="absolute inset-x-0 top-1/2 -z-10 h-px bg-border" />
            </div>
            <Button
              className="h-11 w-full rounded-2xl"
              onClick={() => void signIn()}
              disabled={pending || loading}
            >
              <PuterMark className="size-4" />
              {pending || loading ? t.connecting : t.continuePuter}
            </Button>
            {unavailable ? (
              <Button variant="secondary" className="h-10 w-full rounded-2xl" onClick={() => void retry()}>
                {t.retry}
              </Button>
            ) : null}
            {error ? <p className="text-center text-xs text-destructive">{error}</p> : null}
          </div>

          <ul className="mt-8 space-y-3">
            {benefits.map((b) => (
              <li key={b.title} className="flex gap-3 rounded-2xl border border-border/60 bg-background/40 px-3 py-2.5">
                <b.icon className="mt-0.5 size-4 shrink-0 text-cyan-300" />
                <div>
                  <p className="text-sm font-medium text-foreground">{b.title}</p>
                  <p className="text-xs text-muted-foreground">{b.sub}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
