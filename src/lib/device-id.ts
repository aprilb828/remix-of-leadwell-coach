const KEY = "companion-ed-device-id";

let cached: string | null = null;

/** Stable per-device/browser identifier used to scope saved entries. */
export function getDeviceId(): string {
  if (cached) return cached;
  if (typeof window === "undefined") return "server";
  let id = window.localStorage.getItem(KEY);
  if (!id) {
    id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `dev-${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
    window.localStorage.setItem(KEY, id);
  }
  cached = id;
  return id;
}
