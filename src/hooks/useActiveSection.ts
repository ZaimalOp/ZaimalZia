"use client";
import { useEffect, useState } from "react";

/**
 * Scroll-spy. Picks the entry closest to the top of the reading band so that
 * tall sections do not keep the previous one highlighted, and falls back to
 * the last known section when nothing is intersecting.
 */
export function useActiveSection(sectionIds: readonly string[]): string {
    const [active, setActive] = useState<string>(sectionIds[0] ?? "");

    useEffect(() => {
        const elements = sectionIds
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => Boolean(el));

        if (elements.length === 0) return;

        const visible = new Map<string, number>();

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        visible.set(entry.target.id, entry.intersectionRatio);
                    } else {
                        visible.delete(entry.target.id);
                    }
                }

                if (visible.size === 0) return;

                // Prefer the section earliest in document order among visible ones.
                let best = "";
                for (const id of sectionIds) {
                    if (visible.has(id)) {
                        best = id;
                        break;
                    }
                }
                if (best) setActive(best);
            },
            {
                // Reading band: the middle third of the viewport.
                rootMargin: "-33% 0px -60% 0px",
                threshold: [0, 0.01, 0.5],
            },
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
        // sectionIds is a module-level constant array; identity is stable.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return active;
}
