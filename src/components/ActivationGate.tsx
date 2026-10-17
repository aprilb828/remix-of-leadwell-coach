import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getDeviceId } from "@/lib/device-id";
import appleLogo from "@/assets/companion-apple.png";
import { ActivationContext } from "@/premium/ActivationContext";
import { normalizePlan, PLAN_STORAGE_KEY } from "@/premium/plan";

const STORAGE_KEY = "companion-coach-access-code";
const FN = "/.netlify/functions";

type Status = "checking" | "locked" | "unlocked";

async function callFn(name: string, body: Record<string, unknown>) {
  try {
    const res = await fetch(`${FN}/${name}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(10000),
  });
  const text = await res.text();
    return { ok: res.ok, data: JSON.parse(text) as Record<string, unknown> };
  } catch {
    // Functions are not available on this host (e.g. local preview).
    return { ok: false, data: null };
  }
}

export function ActivationGate({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<Status>("checking");
  const [code, setCode] = useState("");
  const [activeCode, setActiveCode] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [plan, setPlan] = useState<string | null>(null);

  function savePlan(value: unknown) {
    const next = normalizePlan(value);
    if (next) window.localStorage.setItem(PLAN_STORAGE_KEY, next);
    else window.localStorage.removeItem(PLAN_STORAGE_KEY);
    setPlan(next);
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const deviceId = getDeviceId();
      const saved = window.localStorage.getItem(STORAGE_KEY) ?? undefined;
      setPlan(normalizePlan(window.localStorage.getItem(PLAN_STORAGE_KEY)));
      const { ok, data } = navigator.onLine
        ? await callFn("register", { deviceId, code: saved })
        : { ok: false, data: null };
      if (cancelled) return;
      if (!ok || !data) {
        // No activation service reachable — do not lock the app out.
        setActiveCode(saved ?? null);
        setStatus("unlocked");
        return;
      }
      if (data["activated"]) {
        const c = String(data["code"] ?? saved ?? "");
        window.localStorage.setItem(STORAGE_KEY, c);
        setActiveCode(c);
        savePlan(data["plan"]);
        setStatus("unlocked");
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
        savePlan(null);
        setStatus("locked");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function activate() {
    setBusy(true);
    setMessage(null);
    const entered = code.trim().toUpperCase();
    const { data } = await callFn("activate", { code: entered, deviceId: getDeviceId() });
    setBusy(false);
    if (!data) {
      setMessage("The activation service isn't reachable from here. Please try again shortly.");
      return;
    }
    if (data["success"]) {
      window.localStorage.setItem(STORAGE_KEY, entered);
      setActiveCode(entered);
      savePlan(data["plan"]);
      setStatus("unlocked");
    } else {
      setMessage(String(data["message"] ?? "That code could not be activated."));
    }
  }

  async function deactivate() {
    const current = activeCode ?? window.localStorage.getItem(STORAGE_KEY);
    if (!current) return;
    setBusy(true);
    const { data } = await callFn("deactivate", { code: current, deviceId: getDeviceId() });
    setBusy(false);
    window.localStorage.removeItem(STORAGE_KEY);
    savePlan(null);
    setActiveCode(null);
    setCode("");
    setStatus("locked");
    setMessage(String(data?.["message"] ?? "This device has been deactivated."));
  }

  if (status === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Checking this device…</p>
      </div>
    );
  }

  if (status === "locked") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <img src={appleLogo} alt="" className="h-10 w-10 rounded-xl bg-primary/10 p-1" />
            <div>
              <h1 className="text-base font-semibold leading-tight text-foreground">
                Companion Education-Coach Edition™
              </h1>
              <p className="text-xs text-muted-foreground">Enter your access code to activate this device.</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="CE-COAC-XXXXXX"
              autoCapitalize="characters"
              spellCheck={false}
              className="text-center tracking-widest"
              onKeyDown={(e) => {
                if (e.key === "Enter" && code.trim()) void activate();
              }}
            />
            <Button className="w-full" disabled={busy || !code.trim()} onClick={() => void activate()}>
              {busy ? "Activating…" : "Activate this device"}
            </Button>
            {message && <p className="text-center text-xs text-destructive">{message}</p>}
            <p className="text-center text-xs text-muted-foreground">
              Each access code works on up to 3 devices. If you've reached the limit, deactivate a device you no
              longer use, then activate this device.
            </p>
            <button
              type="button"
              className="w-full text-center text-xs text-muted-foreground underline underline-offset-2"
              onClick={() => void deactivate()}
            >
              Deactivate this device
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ActivationContext.Provider value={{ plan }}>
      {children}
      {activeCode && (
        <div className="mx-auto max-w-5xl px-4 pb-6 text-center text-[11px] text-muted-foreground">
          This device is activated with {activeCode}.{" "}
          <button type="button" className="underline underline-offset-2" onClick={() => void deactivate()}>
            Deactivate this device
          </button>
        </div>
      )}
    </ActivationContext.Provider>
  );
}
