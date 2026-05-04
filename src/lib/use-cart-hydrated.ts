"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/store";

/**
 * Becomes true after the persisted cart has finished rehydrating from storage.
 * Uses persist’s hydration callbacks instead of a mount-only flag so we avoid
 * synchronous setState in an effect and avoid flashing an empty cart.
 */
export function useCartHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (useCartStore.persist.hasHydrated()) {
      queueMicrotask(() => {
        setHydrated(true);
      });
      return;
    }

    const unsub = useCartStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    return unsub;
  }, []);

  return hydrated;
}
