import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768; // px

export function useIsMobile(): boolean {
  // SSR-safe initial state: jika window tersedia, gunakan ukuran saat ini,
  // kalau tidak (SSR) set false untuk menghindari undefined/hydration mismatch.
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== "undefined"
      ? window.innerWidth < MOBILE_BREAKPOINT
      : false
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    // handler menerima MediaQueryListEvent (modern) atau bisa dipanggil tanpa arg (fallback)
    const handler = (e?: MediaQueryListEvent | MediaQueryList) => {
      // jika event ada gunakan e.matches, kalau enggak fallback ke mql.matches
      const matches = e && "matches" in e ? e.matches : mql.matches;
      setIsMobile(matches);
    };

    // set initial value from mql (safer than relying on window.innerWidth)
    setIsMobile(mql.matches);

    // modern browsers support addEventListener on MediaQueryList
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", handler as EventListener);
    } else if (typeof (mql as any).addListener === "function") {
      // legacy fallback (older Safari)
      (mql as any).addListener(handler);
    }

    return () => {
      if (typeof mql.removeEventListener === "function") {
        mql.removeEventListener("change", handler as EventListener);
      } else if (typeof (mql as any).removeListener === "function") {
        (mql as any).removeListener(handler);
      }
    };
  }, []);

  return isMobile;
}
