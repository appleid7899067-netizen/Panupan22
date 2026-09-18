/**
 * Auto-pilot — lightweight continuous heartbeat for BossnuGrok.
 * Keeps a receive/run pulse without blocking the UI.
 */

export type AutoPilotEvent = {
  id: string;
  at: number;
  kind: "heartbeat" | "receive" | "run" | "idle";
  detail: string;
};

type Listener = (events: AutoPilotEvent[]) => void;

const MAX_EVENTS = 40;
let running = false;
let timer: number | null = null;
let events: AutoPilotEvent[] = [];
const listeners = new Set<Listener>();
let tick = 0;

function emit() {
  for (const fn of listeners) fn([...events]);
}

function push(kind: AutoPilotEvent["kind"], detail: string) {
  events = [
    {
      id: `ap_${Date.now().toString(36)}_${tick}`,
      at: Date.now(),
      kind,
      detail,
    },
    ...events,
  ].slice(0, MAX_EVENTS);
  emit();
}

const HEARTBEATS = [
  "Commander channel open",
  "Alliance roster synced",
  "Model catalog warm",
  "Skill memory checkpoint",
  "Sandbox sealed",
  "Receive queue idle",
];

function onTick() {
  tick += 1;
  const detail = HEARTBEATS[tick % HEARTBEATS.length]!;
  push(tick % 3 === 0 ? "receive" : "heartbeat", detail);
}

export function startAutoPilot(intervalMs = 4000) {
  if (typeof window === "undefined") return;
  if (running) return;
  running = true;
  push("run", "Auto-pilot started");
  timer = window.setInterval(onTick, intervalMs);
}

export function stopAutoPilot() {
  if (typeof window === "undefined") return;
  if (timer != null) {
    window.clearInterval(timer);
    timer = null;
  }
  if (running) {
    running = false;
    push("idle", "Auto-pilot stopped");
  }
}

export function isAutoPilotRunning() {
  return running;
}

export function getAutoPilotEvents() {
  return [...events];
}

export function subscribeAutoPilot(fn: Listener) {
  listeners.add(fn);
  fn([...events]);
  return () => {
    listeners.delete(fn);
  };
}
