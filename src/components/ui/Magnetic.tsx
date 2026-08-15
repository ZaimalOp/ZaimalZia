"use client";
import { useRef, type ReactNode } from "react";
import { useFinePointer, useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Subtle magnetic pull toward the cursor. Writes a transform directly inside
 * the pointer handler (no state, no re-render) and only activates on precise
 * pointers with motion allowed — touch and reduced-motion users get a plain
 * wrapper with identical layout.
 */
export function Magnetic({
    children,
    strength = 0.28,
    className,
}: {
    children: ReactNode;
    strength?: number;
    className?: string;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const frame = useRef(0);
    const fine = useFinePointer();
    const reduced = useReducedMotion();
    const enabled = fine && !reduced;

    const onMove = (e: React.PointerEvent<HTMLSpanElement>) => {
        if (!enabled) return;
        const el = ref.current;
        if (!el) return;

        cancelAnimationFrame(frame.current);
        const rect = el.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);

        frame.current = requestAnimationFrame(() => {
            el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
        });
    };

    const reset = () => {
        if (!enabled) return;
        const el = ref.current;
        if (!el) return;
        cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => {
            el.style.transform = "translate3d(0, 0, 0)";
        });
    };

    return (
        <span
            ref={ref}
            onPointerMove={onMove}
            onPointerLeave={reset}
            onPointerUp={reset}
            className={className}
            style={{ display: "inline-block", transition: "transform 420ms var(--ease-out)" }}
        >
            {children}
        </span>
    );
}
