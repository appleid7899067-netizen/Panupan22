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
    <main className="relative min-h-screen overflow-hidden bg-black text-white selection:bg-white selection:text-black">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(255,255,255,0.08),transparent_26%),radial-gradient(circle_at_50%_78%,rgba(255,255,255,0.035),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/[0.08]" />

      <div className="relative flex min-h-screen flex-col px-5 pb-7 pt-5 sm:px-8">
        <header className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => window.history.back()}
            aria-label="ย้อนกลับ"
            className="grid size-10 place-items-center rounded-full text-white/65 transition hover:bg-white/[0.07] hover:text-white active:scale-95"
          >
            <span className="text-3xl font-light leading-none">‹</span>
          </button>

          <div className="text-[11px] font-semibold tracking-[0.22em] text-white/30">
            BOSSNUGROK
          </div>
        </header>

        <div className="flex flex-1 items-center justify-center">
          <section className="w-full max-w-[440px] text-center">
            <div className="mb-9">
              <div className="mx-auto mb-7 grid size-[74px] place-items-center rounded-[24px] border border-white/10 bg-white/[0.045] shadow-[0_0_70px_rgba(255,255,255,0.055)]">
                <span className="text-[42px] font-black tracking-[-0.09em]">B</span>
              </div>

              <h1 className="text-[46px] font-bold tracking-[-0.065em] sm:text-[58px]">
                BossnuGrok
              </h1>
              <p className="mt-3 text-[15px] font-medium tracking-[-0.01em] text-white/45">
                AI ที่สร้างมาเพื่อคุณ
              </p>
            </div>

            <div className="mx-auto mb-7 h-px w-10 bg-white/15" />

            <h2 className="text-[23px] font-semibold tracking-[-0.025em] sm:text-[26px]">
              เข้าสู่ BossnuGrok
            </h2>

            <p className="mx-auto mt-3 max-w-[350px] text-[14px] leading-6 text-white/45">
              ลงชื่อเข้าใช้เพื่อเข้าถึงห้องบัญชาการและระบบ AI ของคุณ
            </p>

            {authEnabled ? (
              <div className="mt-8 space-y-3">
                {GROK_PROVIDERS.map((provider) => (
                  <button
                    key={provider.providerId}
                    type="button"
                    onClick={() =>
                      void signIn(provider.providerId, { callbackURL: "/" })
                    }
                    className="group flex h-[54px] w-full items-center justify-center gap-3 rounded-full border border-white/[0.12] bg-white px-5 text-[15px] font-semibold text-black shadow-[0_10px_35px_rgba(0,0,0,0.3)] transition hover:bg-white/90 active:scale-[0.985]"
                  >
                    <span className="grid size-7 place-items-center rounded-full bg-black text-[13px] font-bold text-white">
                      {provider.label === "Google" ? "G" : "𝕏"}
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
                      className="flex h-[54px] w-full items-center justify-center gap-3 rounded-full border border-white/[0.12] bg-[#181818] px-5 text-[15px] font-semibold text-white transition hover:bg-[#222] active:scale-[0.985]"
                    >
                      <span className="text-base">✉</span>
                      ดำเนินการต่อด้วยอีเมล
                    </button>

                    {showEmail && (
                      <form
                        onSubmit={submitEmail}
                        className="mt-4 space-y-3 rounded-[28px] border border-white/10 bg-[#111] p-4 text-left shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
                      >
                        <label className="block text-sm text-white/65">
                          อีเมล
                          <input
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="you@example.com"
                            className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-black px-4 text-white outline-none placeholder:text-white/25 focus:border-white/35"
                            required
                          />
                        </label>

                        <label className="block text-sm text-white/65">
                          รหัสผ่าน
                          <input
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="รหัสผ่าน"
                            className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-black px-4 text-white outline-none placeholder:text-white/25 focus:border-white/35"
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
              <div className="mx-auto mt-8 max-w-[390px] rounded-3xl border border-white/[0.08] bg-white/[0.035] px-5 py-5">
                <div className="mx-auto mb-3 grid size-9 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-white/45">
                  •
                </div>
                <p className="text-sm text-white/45">
                  Sign-in ถูกปิดอยู่ใน environment นี้
                </p>
              </div>
            )}

            <p className="mx-auto mt-7 max-w-[370px] text-[11px] leading-5 text-white/25">
              การดำเนินการต่อถือว่าคุณยอมรับข้อกำหนดและนโยบายความเป็นส่วนตัวของ BossnuGrok
            </p>
          </section>
        </div>

        <footer className="text-center text-[10px] font-semibold tracking-[0.28em] text-white/20">
          BOSSNUGROK · AI COMMAND CENTER
        </footer>
      </div>
    </main>
  );
}
