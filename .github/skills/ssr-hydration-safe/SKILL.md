---
name: ssr-hydration-safe
description: Fix React hydration mismatch error 418 on SSR apps. Use when server HTML text differs from first client render — clocks, relative time, AUTO labels, Date.now in initial store, locale strings, localStorage-driven UI.
---

# ssr-hydration-safe

Production symptom: `Minified React error #418` with `args[]=text`.
Meaning: server-rendered text did not match the first client render. React discards the SSR tree and regenerates on the client.

## Rule

**SSR and the first client render must produce identical text.**
Anything that depends on wall-clock time, locale formatting, `Math.random`, `localStorage`, or post-mount effects must wait until after mount.

Do not try to make server and client clocks equal. Defer the unstable text instead.

## Checklist before shipping SSR UI

Scan for these patterns in components that render on the initial route:

1. `new Date()` / `Date.now()` used during render or as `useState(() => ...)` initial value that is shown as text
2. `toLocaleTimeString` / `toLocaleDateString` / `toLocaleString`
3. `relativeTime(...)` or any "X minutes ago" helper
4. Text that flips after `useEffect` (e.g. `autoOn ? " · AUTO" : ""`)
5. Module-level or store init that stamps `Date.now()` into values that are rendered immediately
6. `typeof window !== "undefined"` branches that change visible text on first paint

## Pattern A — Live clock

Bad:

```tsx
const [now, setNow] = useState(() => new Date());
// render: now.toLocaleTimeString(...)
```

Good:

```tsx
const [now, setNow] = useState<Date | null>(null);
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
  setNow(new Date());
  const id = window.setInterval(() => setNow(new Date()), 1000);
  return () => window.clearInterval(id);
}, []);

const clockText =
  mounted && now
    ? now.toLocaleTimeString(lang, { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    : "\u00a0\u00a0:\u00a0\u00a0:\u00a0\u00a0"; // stable placeholder

<span suppressHydrationWarning>{clockText}</span>
```

## Pattern B — Label that appears only after an effect

Bad:

```tsx
const [autoOn, setAutoOn] = useState(false);
useEffect(() => { startAuto(); setAutoOn(true); }, []);
// render: {autoOn ? " · AUTO" : ""}  // server empty, client has text
```

Good:

```tsx
{mounted && autoOn ? " · AUTO" : ""}
```

Keep className toggles if needed; text content is what triggers #418 with `args[]=text`.

## Pattern C — Relative time in lists

Bad:

```tsx
<span>{relativeTime(agent.createdAt, language)}</span>
```

Good:

```tsx
<span suppressHydrationWarning>
  {mounted ? relativeTime(agent.createdAt, language) : "\u00a0"}
</span>
```

## Pattern D — Stable store / module defaults

Bad:

```ts
agents: [{ ...CORE_BOSS, createdAt: Date.now() }] // different every SSR vs client boot
```

Good:

```ts
agents: [{ ...CORE_BOSS }] // CORE_BOSS.createdAt is a fixed constant (e.g. 0)
```

Only stamp `Date.now()` when the user actually creates something at runtime (forge agent, new message), never at module evaluation time for values shown on first paint.

## Pattern E — Stale pending UI after crash

On zustand/localStorage rehydrate, drop half-finished assistant bubbles:

```ts
onRehydrateStorage: () => (state) => {
  if (!state) return;
  state.conversations = state.conversations.map((c) => ({
    ...c,
    messages: c.messages.filter((m) => !(m.role === "assistant" && m.pending)),
  }));
  state.markHydrated();
};
```

## Verify

1. Open the live URL in a clean session.
2. Console must not show `Minified React error #418`.
3. Optional: React DevTools → highlight updates; first paint should not flash mismatched text.

## What not to do

- Do not silence the error with empty catch and leave the mismatch.
- Do not rely on `suppressHydrationWarning` alone without a stable first-render string — use it as a safety net on the deferred node, not as the only fix.
- Do not move all UI to client-only (`dynamic(..., { ssr: false })`) unless the whole subtree is interactive chrome; prefer surgical deferral.

## Origin

Applied on BossnuGrok production (`panupan22.vercel.app`) 2026-09-19 for React #418 text mismatch in Command Center (clock, AUTO label, agent relative time, store init).
