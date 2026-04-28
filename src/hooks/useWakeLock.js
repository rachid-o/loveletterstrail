import { useEffect } from "react";

export function useWakeLock() {
  useEffect(() => {
    if (!("wakeLock" in navigator)) return;

    let lock = null;

    async function acquire() {
      try {
        lock = await navigator.wakeLock.request("screen");
      } catch {
        // Silently ignore — device may deny (e.g. low battery)
      }
    }

    acquire();

    // Re-acquire when the tab becomes visible again
    function onVisibilityChange() {
      if (document.visibilityState === "visible") acquire();
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      lock?.release();
    };
  }, []);
}
