"use client";
import { useCallback, useSyncExternalStore } from "react";

/**
 * Media queries are a genuine external store, so useSyncExternalStore is the
 * right primitive: no setState-in-effect, no cascading render on mount, and a
 * correct server snapshot for hydration.
 */
function useMediaQuery(query: string): boolean {
    const subscribe = useCallback(
        (onChange: () => void) => {
            const mq = window.matchMedia(query);
            mq.addEventListener("change", onChange);
            return () => mq.removeEventListener("change", onChange);
        },
        [query],
    );

    const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

    // Server renders the "no fancy behaviour" branch; the client corrects it.
    return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export function useReducedMotion(): boolean {
    return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** True only on devices with a precise pointer — gates cursor-driven effects. */
export function useFinePointer(): boolean {
    return useMediaQuery("(hover: hover) and (pointer: fine)");
}

const noopSubscribe = () => () => {};

/** False during SSR and the hydration pass, true afterwards. */
export function useIsClient(): boolean {
    return useSyncExternalStore(
        noopSubscribe,
        () => true,
        () => false,
    );
}

/** Picks the right modifier glyph for the command palette hint. */
export function useIsMac(): boolean {
    return useSyncExternalStore(
        noopSubscribe,
        () => /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent),
        () => false,
    );
}
