import { Cloud, Layers, Shield } from "lucide-react";
import { AppMark, PuterMark } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { COPY } from "@/lib/copy";
import { APP_EDITION, APP_SHORT_NAME } from "@/lib/brand";
import { usePuterAuth } from "@/lib/puter-auth";
import { useBossStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function PuterGate({ children }: { children: ReactNode }) {
  const { status } = usePuterAuth();
  if (status === "signed_in" || status === "guest") return <>{children}</>;
  return <PuterLoginScreen />;
}

export function PuterLoginScreen() {
  const { status, error, pending, signIn, continueAsGuest, retry } = usePuterAuth();
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
            <h1 className="mt-5 font-display text-4xl tracking-[-0.04em] sm:text-5xl">{APP_SHORT_NAME}</h1>
            <p className="mt-2 text-sm uppercase tracking-[0.22em] text-subtle">{APP_EDITION}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">{t.loginLead}</p>
          </div>

          <ul className="mt-7 space-y-2.5">
            {benefits.map((item) => (
              <li key={item.title} className="flex items-center gap-3 text-left text-sm text-muted-foreground">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-[12px] border border-border bg-secondary">
                  <item.icon className="size-4 text-foreground" />
                </span>
                <span>
                  <span className="block text-foreground">{item.title}</span>
                  <span className="block text-xs text-subtle">{item.sub}</span>
                </span>
              </li>
            ))}
          </ul>

          {loading ? (
            <div className="mt-8 space-y-3">
              <div className="flex h-12 items-center justify-center rounded-full bg-secondary text-sm text-muted-foreground">
                {t.connecting}
              </div>
              <Button size="lg" variant="ghost" className="h-12 w-full rounded-full text-sm" onClick={continueAsGuest}>
                {t.continueGuest}
              </Button>
            </div>
          ) : (
            <div className="mt-8 space-y-3">
              <Button
                size="lg"
                className="h-12 w-full rounded-full text-sm"
                onClick={() => void signIn()}
                disabled={unavailable || pending}
              >
                <PuterMark className="size-4" />
                {pending ? t.waitingPuter : t.continuePuter}
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="h-12 w-full rounded-full text-sm"
                onClick={continueAsGuest}
                disabled={pending}
              >
                {t.continueGuest}
              </Button>
              {unavailable ? (
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 w-full rounded-full text-sm"
                  onClick={() => void retry()}
                >
                  {t.retryPuter}
                </Button>
              ) : null}
            </div>
          )}

          {error ? (
            <p
              className={cn(
                "mt-5 text-center text-xs leading-relaxed",
                unavailable ? "text-destructive" : "text-muted-foreground",
              )}
            >
              {error}
            </p>
          ) : (
            <p className="mt-5 text-center text-xs leading-relaxed text-subtle">{t.popupHint}</p>
          )}
        </div>
      </div>
    </div>
  );
}
