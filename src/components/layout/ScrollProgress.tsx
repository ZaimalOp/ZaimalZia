"use client";
import { useEffect, useRef } from "react";

/**
 * Reading-progress hairline. Writes scaleX straight to the node inside a rAF,
 * so scrolling never triggers a React render.
 */
export function ScrollProgress() {
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let frame = 0;

        const update = () => {
            frame = 0;
            const el = barRef.current;
            if (!el) return;
            const doc = document.documentElement;
            const max = doc.scrollHeight - doc.clientHeight;
            const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
            el.style.transform = `scaleX(${progress})`;
        };

        const onScroll = () => {
            if (frame) return;
            frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    return (
        <div aria-hidden="true" className="no-print fixed inset-x-0 top-0 z-[60] h-px bg-transparent">
            <div
                ref={barRef}
                className="h-full origin-left bg-primary"
                style={{ transform: "scaleX(0)" }}
            />
        </div>
    );
}
