"use client";
import { useEffect, useRef, useState } from "react";
import { identity } from "@/content/site";
import { useIsClient } from "@/hooks/useReducedMotion";

/**
 * Short boot overlay.
 *
 * Constraints it respects:
 *  - once per browser session, never on repeat navigation within the session
 *  - skipped entirely under prefers-reduced-motion
 *  - ~620ms visible + 240ms fade, and any key/click/scroll skips it
 *  - it never locks scroll, so content underneath stays interactive
 *
 * Tradeoff: on a cold session this delays the largest contentful paint by
 * roughly 0.6s. Set BOOT_ENABLED to false to remove it in one edit.
 */
export const BOOT_ENABLED = true;

const LINES = ["Initializing ZAIMAL.OS", "Loading systems", "Loading projects", "System ready"];

const STEP_MS = 155;
const FADE_MS = 240;

/**
 * Decided once per page load and cached, so the value is stable across the
 * render passes React may perform. Reading storage is side-effect free; the
 * matching write happens in an effect below.
 */
let decision: boolean | null = null;

function shouldBoot(): boolean {
    if (decision !== null) return decision;

    try {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        decision = !reduced && sessionStorage.getItem("zz.booted") !== "1";
    } catch {
        // Storage blocked (private mode): never trap the user behind an overlay.
        decision = false;
    }
    return decision;
}

export function BootSequence() {
    const isClient = useIsClient();
    const run = BOOT_ENABLED && isClient && shouldBoot();

    const [step, setStep] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const [done, setDone] = useState(false);
    const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

    useEffect(() => {
        if (!run) return;

        try {
            sessionStorage.setItem("zz.booted", "1");
        } catch {
            /* non-fatal */
        }

        const finish = () => {
            setLeaving(true);
            timers.current.push(setTimeout(() => setDone(true), FADE_MS));
        };

        LINES.forEach((_, i) => {
            if (i > 0) timers.current.push(setTimeout(() => setStep(i), i * STEP_MS));
        });
        timers.current.push(setTimeout(finish, LINES.length * STEP_MS));

        window.addEventListener("keydown", finish, { once: true });
        window.addEventListener("pointerdown", finish, { once: true });
        window.addEventListener("wheel", finish, { once: true, passive: true });

        return () => {
            timers.current.forEach(clearTimeout);
            timers.current = [];
            window.removeEventListener("keydown", finish);
            window.removeEventListener("pointerdown", finish);
            window.removeEventListener("wheel", finish);
        };
    }, [run]);

    if (!run || done) return null;

    return (
        <div
            aria-hidden="true"
            className="fixed inset-0 z-boot grid place-items-center bg-bg transition-opacity ease-out"
            style={{
                opacity: leaving ? 0 : 1,
                transitionDuration: `${FADE_MS}ms`,
                pointerEvents: leaving ? "none" : "auto",
            }}
        >
            <div className="w-full max-w-xs px-6">
                <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.16em]">
                    <span className="text-primary">{identity.initials}</span>
                    <span className="tabular text-fg-subtle">
                        {String(Math.round(((step + 1) / LINES.length) * 100)).padStart(3, "0")}%
                    </span>
                </div>

                <div className="mt-3 h-px w-full overflow-hidden bg-border">
                    <div
                        className="h-full origin-left bg-primary transition-transform ease-out"
                        style={{
                            transform: `scaleX(${(step + 1) / LINES.length})`,
                            transitionDuration: `${STEP_MS}ms`,
                        }}
                    />
                </div>

                <p className="mt-3 font-mono text-[11px] text-fg-muted">{LINES[step]}</p>
            </div>
        </div>
    );
}
