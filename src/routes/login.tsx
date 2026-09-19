import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  GROK_PROVIDERS,
  authClient,
  authEnabled,
  signIn,
} from "@/lib/auth/client";
import { emailAndPasswordEnabled } from "@/lib/auth/email-password";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submitEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password || busy) return;

    setBusy(true);
    setError("");

    const result = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });

    setBusy(false);

    if (result.error) {
      setError(result.error.message ?? "เข้าสู่ระบบไม่สำเร็จ");
      return;
    }

    window.location.href = "/";
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#090a0c] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_18%,rgba(255,255,255,0.10),transparent_30%),radial-gradient(ellipse_at_50%_75%,rgba(120,120,140,0.06),transparent_42%),linear-gradient(to_bottom,#090a0c_0%,#0d0e11_58%,#070809_100%)]" />
      <div className="pointer-events-none absolute left-1/2 top-[43%] h-32 w-[620px] max-w-[150%] -translate-x-1/2 rounded-[50%] border border-white/[0.035] bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.025))] blur-[1px]" />

      <div className="relative flex min-h-screen flex-col px-5 pb-10 pt-5 sm:px-8">
        <header className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => window.history.back()}
            aria-label="ย้อนกลับ"
            className="grid size-11 place-items-center rounded-full border border-white/[0.06] bg-white/[0.025] text-white/80 transition hover:bg-white/[0.07] active:scale-95"
          >
            <span className="text-3xl font-light leading-none">‹</span>
          </button>

          <div className="grid size-11 place-items-center rounded-full border border-white/[0.06] bg-white/[0.025] text-white/60">
            <span className="text-lg">◷</span>
          </div>
        </header>

        <div className="flex flex-1 items-center justify-center">
          <section className="w-full max-w-[430px] text-center">
            <div className="mb-7 select-none text-[64px] font-semibold leading-none tracking-[-0.07em] text-white drop-shadow-[0_0_28px_rgba(255,255,255,0.08)] sm:text-[82px]">
              BossnuGrok
            </div>

            <div className="mx-auto mb-7 h-px w-16 bg-white/15" />

            <h1 className="text-[24px] font-medium tracking-[-0.02em] sm:text-[28px]">
              ขอบคุณที่ลองใช้ BossnuGrok
            </h1>

            <p className="mx-auto mt-4 max-w-[360px] text-[16px] leading-7 text-white/60">
              ดำเนินการต่อเพื่อเข้าสู่ระบบและใช้งานตามสิทธิ์ของบัญชี
            </p>

            {authEnabled ? (
              <div className="mt-9 space-y-3">
                {GROK_PROVIDERS.map((provider) => (
                  <button
                    key={provider.providerId}
                    type="button"
                    onClick={() =>
                      void signIn(provider.providerId, { callbackURL: "/" })
                    }
                    className="group flex h-14 w-full items-center justify-center gap-3 rounded-full border border-white/[0.09] bg-[#202125]/95 px-5 text-[16px] font-medium shadow-[0_8px_30px_rgba(0,0,0,0.22)] transition hover:border-white/15 hover:bg-[#292a2e] active:scale-[0.985]"
                  >
                    <span className="grid size-7 place-items-center rounded-full bg-white text-sm font-bold text-black">
                      {provider.label === "Google" ? "G" : "X"}
                    </span>
                    ดำเนินการต่อด้วย {provider.label}
                  </button>
                ))}

                {emailAndPasswordEnabled && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setShowEmail((value) => !value);
                        setError("");
                      }}
                      className="flex h-14 w-full items-center justify-center gap-3 rounded-full border border-white/[0.09] bg-[#202125]/95 px-5 text-[16px] font-medium shadow-[0_8px_30px_rgba(0,0,0,0.22)] transition hover:border-white/15 hover:bg-[#292a2e] active:scale-[0.985]"
                    >
                      <span className="text-lg">✉</span>
                      ดำเนินการต่อด้วยอีเมล
                    </button>

                    {showEmail && (
                      <form
                        onSubmit={submitEmail}
                        className="mt-4 space-y-3 rounded-3xl border border-white/10 bg-white/[0.045] p-4 text-left backdrop-blur-xl"
                      >
                        <label className="block text-sm text-white/70">
                          อีเมล
                          <input
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="you@example.com"
                            className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-[#151518] px-4 text-white outline-none placeholder:text-white/30 focus:border-white/30"
                            required
                          />
                        </label>

                        <label className="block text-sm text-white/70">
                          รหัสผ่าน
                          <input
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="รหัสผ่าน"
                            className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-[#151518] px-4 text-white outline-none placeholder:text-white/30 focus:border-white/30"
                            required
                          />
                        </label>

                        {error && (
                          <p className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                            {error}
                          </p>
                        )}

                        <button
                          type="submit"
                          disabled={busy}
                          className="h-12 w-full rounded-2xl bg-white px-4 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {busy ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
                        </button>
                      </form>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div className="mx-auto mt-9 max-w-[390px] rounded-3xl border border-white/[0.08] bg-white/[0.035] px-5 py-5 shadow-[0_12px_40px_rgba(0,0,0,0.24)] backdrop-blur-xl">
                <div className="mx-auto mb-3 grid size-9 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-sm text-white/60">
                  •
                </div>
                <p className="text-sm text-white/55">
                  Sign-in ถูกปิดอยู่ใน environment นี้
                </p>
              </div>
            )}

            <p className="mx-auto mt-8 max-w-[370px] text-xs leading-6 text-white/30">
              การดำเนินการต่อถือว่าคุณยอมรับข้อกำหนดและนโยบายความเป็นส่วนตัวของระบบ
            </p>
          </section>
        </div>

        <footer className="pb-1 text-center text-[11px] tracking-[0.18em] text-white/20">
          BOSSnUGROK
        </footer>
      </div>
    </main>
  );
}
