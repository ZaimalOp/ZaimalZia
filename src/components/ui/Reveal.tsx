"use client";
import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll reveal built on a single shared IntersectionObserver plus two CSS
 * custom properties. No animation library and no layout reads.
 *
 * Every instance uses identical observer options, so they all share one
 * observer rather than constructing ~100 of them — one set of callbacks, one
 * allocation, far less GC churn on a long page.
 *
 * Availability rules, because a hidden-by-default effect must never be able to
 * eat the page:
 *   - the hiding CSS sits behind `@media (scripting: enabled)`, so no-JS (and
 *     any browser lacking that query) renders everything visible
 *   - if IntersectionObserver is missing, the element shows immediately
 *   - if the observer never delivers a callback within FAILSAFE_MS (a broken
 *     or non-compositing environment), every pending element is force-shown
 */

const FAILSAFE_MS = 1600;
const OPTIONS: IntersectionObserverInit = { rootMargin: "0px 0px -12% 0px", threshold: 0.08 };

let observer: IntersectionObserver | null = null;
let observerHealthy = false;
let failsafeArmed = false;

/** Elements that should re-hide when they leave the viewport. */
const repeating = new WeakSet<Element>();

function show(el: Element) {
    el.setAttribute("data-reveal", "shown");
}

function getObserver(): IntersectionObserver | null {
    if (typeof IntersectionObserver === "undefined") return null;
    if (observer) return observer;

    observer = new IntersectionObserver((entries) => {
        observerHealthy = true;
        for (const entry of entries) {
            const repeats = repeating.has(entry.target);
            if (entry.isIntersecting) {
                show(entry.target);
                if (!repeats) observer?.unobserve(entry.target);
            } else if (repeats) {
                entry.target.setAttribute("data-reveal", "");
            }
        }
    }, OPTIONS);

    return observer;
}

function armFailsafe() {
    if (failsafeArmed || typeof window === "undefined") return;
    failsafeArmed = true;

    window.setTimeout(() => {
        if (observerHealthy) return;
        document.querySelectorAll("[data-reveal]").forEach(show);
    }, FAILSAFE_MS);
}

export function Reveal({
    children,
    as: Tag = "div",
    delay = 0,
    y = 14,
    className,
    once = true,
    ...rest
}: {
    children: ReactNode;
    as?: ElementType;
    /** Stagger offset in ms. */
    delay?: number;
    /** Travel distance in px. */
    y?: number;
    className?: string;
    once?: boolean;
} & Record<string, unknown>) {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const io = getObserver();
        if (!io) {
            show(el);
            return;
        }

        if (!once) repeating.add(el);
        armFailsafe();
        io.observe(el);

        return () => {
            io.unobserve(el);
            repeating.delete(el);
        };
    }, [once]);

    return (
        <Tag
            ref={ref}
            data-reveal=""
            style={{ ["--reveal-delay" as string]: `${delay}ms`, ["--reveal-y" as string]: `${y}px` }}
            className={cn(className)}
            {...rest}
        >
            {children}
        </Tag>
    );
}
