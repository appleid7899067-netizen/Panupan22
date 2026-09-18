import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { getPuter, loadPuter, puterErrorMessage, type PuterSDK, type PuterUser } from "@/lib/puter";
import { applyWorkspace, pullWorkspace, pushWorkspace, snapshotWorkspace } from "@/lib/puter-sync";
import { useBossStore } from "@/lib/store";

export type PuterAuthStatus = "loading" | "signed_out" | "signed_in" | "unavailable";
export type PuterSyncStatus = "idle" | "syncing" | "synced" | "error";

type PuterAuthValue = {
  status: PuterAuthStatus;
  user: PuterUser | null;
  error: string | null;
  pending: boolean;
  syncStatus: PuterSyncStatus;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  retry: () => Promise<void>;
};

const PuterAuthContext = createContext<PuterAuthValue | null>(null);

export function PuterAuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<PuterAuthStatus>("loading");
  const [user, setUser] = useState<PuterUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [syncStatus, setSyncStatus] = useState<PuterSyncStatus>("idle");
  const sdkRef = useRef<PuterSDK | null>(null);
  const hydrated = useBossStore((s) => s.hydrated);

  const hydrate = useCallback(async () => {
    setError(null);
    try {
      const puter = await loadPuter();
      sdkRef.current = puter;
      if (puter.auth.isSignedIn()) {
        const next = await puter.auth.getUser();
        setUser(next);
        setStatus("signed_in");
        return;
      }
      setUser(null);
      setStatus("signed_out");
    } catch (err) {
      sdkRef.current = getPuter();
      setUser(null);
      setStatus("unavailable");
      setError(puterErrorMessage(err));
    }
  }, []);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  const signIn = useCallback(async () => {
    const puter = sdkRef.current ?? getPuter();
    if (!puter?.auth) {
      setError("Puter is still connecting. Wait a moment, then try again.");
      return;
    }
    setError(null);
    setPending(true);
    try {
      await puter.auth.signIn();
      const next = await puter.auth.getUser();
      setUser(next);
      setStatus("signed_in");
    } catch (err) {
      setError(puterErrorMessage(err));
    } finally {
      setPending(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      const puter = sdkRef.current ?? getPuter();
      await puter?.auth.signOut();
    } catch {
      /* already signed out */
    }
    setUser(null);
    setStatus("signed_out");
    setError(null);
    setSyncStatus("idle");
  }, []);

  useEffect(() => {
    if (status !== "signed_in" || !hydrated) return;
    const puter = sdkRef.current ?? getPuter();
    if (!puter?.auth) return;

    let cancelled = false;
    let timer: number | null = null;
    let unsub: (() => void) | undefined;
    let readyToPush = false;

    const persist = () => {
      if (!readyToPush || cancelled) return;
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        setSyncStatus("syncing");
        void pushWorkspace(puter)
          .then(() => {
            if (!cancelled) setSyncStatus("synced");
          })
          .catch(() => {
            if (!cancelled) setSyncStatus("error");
          });
      }, 700);
    };

    setSyncStatus("syncing");
    void (async () => {
      try {
        const cloud = await pullWorkspace(puter);
        if (cancelled) return;
        if (cloud && (cloud.agents.length > 0 || cloud.conversations.length > 0)) {
          applyWorkspace(cloud);
        } else {
          await pushWorkspace(puter, snapshotWorkspace());
        }
        if (!cancelled) setSyncStatus("synced");
      } catch {
        if (!cancelled) setSyncStatus("error");
      } finally {
        readyToPush = true;
      }
    })();

    unsub = useBossStore.subscribe(persist);

    return () => {
      cancelled = true;
      unsub?.();
      if (timer) window.clearTimeout(timer);
    };
  }, [status, hydrated]);

  const value = useMemo<PuterAuthValue>(
    () => ({
      status,
      user,
      error,
      pending,
      syncStatus,
      signIn,
      signOut,
      retry: hydrate,
    }),
    [status, user, error, pending, syncStatus, signIn, signOut, hydrate],
  );

  return <PuterAuthContext.Provider value={value}>{children}</PuterAuthContext.Provider>;
}

export function usePuterAuth() {
  const ctx = useContext(PuterAuthContext);
  if (!ctx) throw new Error("usePuterAuth must be used within PuterAuthProvider");
  return ctx;
}
