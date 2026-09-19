import { createFileRoute } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <main className="grid min-h-screen place-items-center bg-background p-6">
      <div className="w-full max-w-sm space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">BossnuGrok</p>
          <h1 className="mt-2 text-2xl font-semibold">เข้าสู่ระบบ</h1>
          <p className="mt-1 text-sm text-muted-foreground">เข้าสู่ระบบเพื่อใช้งานตามสิทธิ์ของบัญชี</p>
        </div>
        {authEnabled ? (
          <div className="space-y-2">
            {GROK_PROVIDERS.map((p) => (
              <button
                key={p.providerId}
                type="button"
                onClick={() => void signIn(p.providerId, { callbackURL: "/" })}
                className="w-full cursor-pointer rounded-xl border border-border px-4 py-3 text-sm hover:bg-secondary"
              >
                ดำเนินการต่อด้วย {p.label}
              </button>
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-border p-3 text-sm text-muted-foreground">Sign-in ถูกปิดอยู่ใน environment นี้</p>
        )}
      </div>
    </main>
  );
}
