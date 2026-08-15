"use client";
import { useEffect, useId, useRef } from "react";
import { useCommandCenter } from "@/components/providers/CommandProvider";
import { useIsMac } from "@/hooks/useReducedMotion";

/** `mod` is substituted per platform so this never contradicts the nav hint. */
const SHORTCUTS: { keys: string[]; label: string }[] = [
    { keys: ["mod", "K"], label: "Open command palette" },
    { keys: ["G", "H"], label: "Go to top" },
    { keys: ["G", "A"], label: "Go to About" },
    { keys: ["G", "W"], label: "Go to Work" },
    { keys: ["G", "L"], label: "Go to Lab" },
    { keys: ["G", "T"], label: "Go to Timeline" },
    { keys: ["G", "C"], label: "Go to Contact" },
    { keys: ["?"], label: "Toggle this panel" },
    { keys: ["Esc"], label: "Close any overlay" },
];

export function ShortcutsDialog() {
    const { shortcutsOpen } = useCommandCenter();
    if (!shortcutsOpen) return null;
    return <Dialog />;
}

function Dialog() {
    const { setShortcutsOpen } = useCommandCenter();
    const mac = useIsMac();
    const closeRef = useRef<HTMLButtonElement>(null);
    const restoreTo = useRef<HTMLElement | null>(null);
    const titleId = useId();

    useEffect(() => {
        restoreTo.current = document.activeElement as HTMLElement;
        closeRef.current?.focus({ preventScroll: true });
        return () => {
            restoreTo.current?.focus?.({ preventScroll: true });
        };
    }, []);

    return (
        <div
            className="fixed inset-0 z-palette flex items-center justify-center px-4 animate-fade-in"
            onMouseDown={() => setShortcutsOpen(false)}
        >
            <div className="absolute inset-0 bg-bg-deep/80 backdrop-blur-md" aria-hidden="true" />

            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                onMouseDown={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                    if (e.key === "Escape") setShortcutsOpen(false);
                    // Only one focusable control, so keep focus inside.
                    if (e.key === "Tab") e.preventDefault();
                }}
                className="relative w-full max-w-md overflow-hidden rounded-[var(--radius-xl)] border border-border-strong bg-elevated shadow-lg animate-scale-in"
            >
                <div className="flex items-center justify-between border-b border-border px-5 py-4">
                    <h2 id={titleId} className="font-mono text-sm text-fg">
                        Keyboard shortcuts
                    </h2>
                    <button
                        ref={closeRef}
                        type="button"
                        onClick={() => setShortcutsOpen(false)}
                        className="rounded border border-border px-2 py-1 font-mono text-[10px] text-fg-subtle transition-colors hover:border-primary/60 hover:text-primary"
                    >
                        ESC
                    </button>
                </div>

                <ul className="divide-y divide-border">
                    {SHORTCUTS.map((s) => (
                        <li key={s.label} className="flex items-center justify-between gap-4 px-5 py-3">
                            <span className="text-sm text-fg-muted">{s.label}</span>
                            <span className="flex shrink-0 items-center gap-1">
                                {s.keys.map((k) => (
                                    <kbd
                                        key={k}
                                        className="min-w-[1.75rem] rounded border border-border bg-surface px-1.5 py-1 text-center font-mono text-[11px] text-fg"
                                    >
                                        {k === "mod" ? (mac ? "⌘" : "Ctrl") : k}
                                    </kbd>
                                ))}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
