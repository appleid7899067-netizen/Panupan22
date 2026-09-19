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
    <main className="relative min-h-screen overflow-hidden bg-[#0b0b0d] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.07),transparent_34%),linear-gradient(to_bottom,#0b0b0d_0%,#0b0b0d_65%,#070708_100%)]" />

      <div className="relative flex min-h-screen flex-col items-center justify-center px-5 py-12">
        <section className="w-full max-w-[430px] text-center">
          <div className="mb-8 select-none text-[72px] font-semibold leading-none tracking-[-0.065em] text-white sm:text-[88px]">
            BossnuGrok
          </div>

          <h1 className="text-[25px] font-medium tracking-[-0.02em] sm:text-[28px]">
            ขอบคุณที่ลองใช้ BossnuGrok
          </h1>

          <p className="mx-auto mt-4 max-w-[360px] text-[16px] leading-7 text-white/65">
            ดำเนินการต่อเพื่อเข้าสู่ระบบและใช้งานตามสิทธิ์ของบัญชี
          </p>

          {authEnabled ? (
            <div className="mt-9 space-y-3">
              {GROK_PROVIDERS.map((provider) => (
                <button
                  key={provider.providerId}
                  type="button"
                  onClick={() => void signIn(provider.providerId, { callbackURL: "/" })}
                  className="flex h-14 w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-[#202125] px-5 text-[16px] font-medium transition hover:bg-[#292a2e] active:scale-[0.99]"
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
                    className="flex h-14 w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-[#202125] px-5 text-[16px] font-medium transition hover:bg-[#292a2e] active:scale-[0.99]"
                  >
                    <span className="text-lg">✉</span>
                    ดำเนินการต่อด้วยอีเมล
                  </button>

                  {showEmail && (
                    <form
                      onSubmit={submitEmail}
                      className="mt-4 space-y-3 rounded-3xl border border-white/10 bg-white/[0.04] p-4 text-left"
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
                        {busy ? "กำลังเข้าสู่ระบบ…" : "เข้าสู่ระบบ"}
                      </button>
                    </form>
                  )}
                </>
              )}
            </div>
          ) : (
            <p className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white/55">
              Sign-in ถูกปิดอยู่ใน environment นี้
            </p>
          )}

          <p className="mx-auto mt-9 max-w-[370px] text-xs leading-6 text-white/35">
            การดำเนินการต่อถือว่าคุณยอมรับข้อกำหนดและนโยบายความเป็นส่วนตัวของระบบ
          </p>
        </section>
      </div>
    </main>
  );
}
