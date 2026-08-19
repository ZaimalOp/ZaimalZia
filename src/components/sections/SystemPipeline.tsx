"use client";
import { useState } from "react";
import { systemStatus } from "@/content/site";
import { StatusDot } from "@/components/ui/StatusStrip";
import { cn } from "@/lib/utils";

/**
 * The through-line of how I work, as an instrument panel rather than a diagram.
 * Each stage is a real button: hover on desktop, tap on touch, arrow-key
 * traversal for keyboards. The travelling dash is pure CSS and is switched off
 * by the reduced-motion block in globals.css.
 */
const STAGES = [
    { id: "inputs", label: "Inputs", detail: "Signals, users and the constraints they arrive with" },
    { id: "data", label: "Data", detail: "Public datasets, subject-grouped splits, confound audits" },
    { id: "models", label: "Models", detail: "CNNs, gradient boosting and calibrated ensembles" },
    { id: "fusion", label: "Fusion", detail: "A meta-learner composing modules through one contract" },
    { id: "product", label: "Product", detail: "APIs, apps and the surfaces people actually reach" },
    { id: "impact", label: "Impact", detail: "An output someone can act on, with its confidence attached" },
];

export function SystemPipeline({ className }: { className?: string }) {
    const [active, setActive] = useState(0);

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown" || e.key === "ArrowRight") {
            e.preventDefault();
            setActive((i) => (i + 1) % STAGES.length);
        } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
            e.preventDefault();
            setActive((i) => (i - 1 + STAGES.length) % STAGES.length);
        }
    };

    return (
        <div
            className={cn(
                "panel panel-invert edge-light relative overflow-hidden p-5 shadow-lg sm:p-6",
                className,
            )}
        >
            {/* Header */}
            <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-border pb-3">
                <span className="eyebrow text-fg-subtle">System</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
                    research → production
                </span>
            </div>

            <ul className="relative" onKeyDown={onKeyDown}>
                {/* Connector rail */}
                <span
                    aria-hidden="true"
                    className="absolute left-[7px] top-2 bottom-2 w-px bg-border-strong"
                />
                <span
                    aria-hidden="true"
                    className="absolute left-[7px] top-2 bottom-2 w-px opacity-70 [background:repeating-linear-gradient(to_bottom,hsl(var(--primary))_0_6px,transparent_6px_18px)] [animation:flow-dash_1.4s_linear_infinite] [mask-image:linear-gradient(to_bottom,transparent,#000_18%,#000_82%,transparent)]"
                />

                {STAGES.map((stage, i) => {
                    const on = i === active;
                    return (
                        <li key={stage.id}>
                            <button
                                type="button"
                                onMouseEnter={() => setActive(i)}
                                onFocus={() => setActive(i)}
                                onClick={() => setActive(i)}
                                aria-pressed={on}
                                className="group flex w-full items-start gap-3.5 py-2 text-left"
                            >
                                <span
                                    aria-hidden="true"
                                    className={cn(
                                        "relative z-10 mt-[7px] grid h-[15px] w-[15px] shrink-0 place-items-center rounded-full border bg-bg transition-colors duration-[var(--dur)]",
                                        on ? "border-primary" : "border-border-strong",
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "h-1.5 w-1.5 rounded-full transition-[transform,background-color] duration-[var(--dur)]",
                                            on ? "scale-100 bg-primary" : "scale-75 bg-border-strong",
                                        )}
                                    />
                                </span>

                                <span className="min-w-0 flex-1">
                                    <span
                                        className={cn(
                                            "block font-mono text-[0.8125rem] uppercase tracking-[0.14em] transition-colors duration-[var(--dur)]",
                                            on ? "text-fg" : "text-fg-subtle",
                                        )}
                                    >
                                        {stage.label}
                                    </span>
                                    {/* Grid-rows trick animates height without measuring */}
                                    <span
                                        className={cn(
                                            "grid transition-[grid-template-rows,opacity] duration-[var(--dur)] ease-out",
                                            on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                                        )}
                                    >
                                        <span className="overflow-hidden">
                                            <span className="block pt-1 text-[0.8125rem] leading-snug text-fg-muted">
                                                {stage.detail}
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </button>
                        </li>
                    );
                })}
            </ul>

            {/* Availability lives inside the panel so the hero's right column
                reads as one object rather than a panel plus an orphaned line. */}
            <p className="mt-5 flex items-center gap-2.5 border-t border-border pt-3.5 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
                <StatusDot />
                {systemStatus.availability}
            </p>
        </div>
    );
}
