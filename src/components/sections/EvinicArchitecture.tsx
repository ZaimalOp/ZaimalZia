"use client";
import { useState } from "react";
import { evinicCaseStudy as ev } from "@/content/evinic";
import { cn } from "@/lib/utils";

const { clients, core, services } = ev.systemNodes;

interface SystemNode {
    id: string;
    name: string;
    tech: string;
    detail: string;
}

const ALL: SystemNode[] = [...clients, core, ...services];

/** Hoisted so it keeps a stable identity across renders. */
function NodeButton({
    node,
    active,
    onSelect,
}: {
    node: SystemNode;
    active: boolean;
    onSelect: (id: string) => void;
}) {
    return (
        <button
            type="button"
            onMouseEnter={() => onSelect(node.id)}
            onFocus={() => onSelect(node.id)}
            onClick={() => onSelect(node.id)}
            aria-pressed={active}
            className={cn(
                "flex w-full flex-col rounded-[var(--radius)] border px-4 py-3 text-left transition-colors duration-[var(--dur)]",
                active
                    ? "border-primary/60 bg-primary/[0.07]"
                    : "border-border bg-surface-2 hover:border-border-strong",
            )}
        >
            <span
                className={cn(
                    "font-mono text-[0.8125rem] uppercase tracking-[0.12em] transition-colors duration-[var(--dur)]",
                    active ? "text-fg" : "text-fg-muted",
                )}
            >
                {node.name}
            </span>
            <span className="mt-1 font-mono text-[10px] text-fg-subtle">{node.tech}</span>
        </button>
    );
}

/** Decorative vertical connector with a downward-flowing dash. */
function Connector() {
    return (
        <span aria-hidden="true" className="relative mx-auto my-1 block h-6 w-px bg-border-strong">
            <span className="absolute inset-0 opacity-70 [animation:flow-dash_1.4s_linear_infinite] [background:repeating-linear-gradient(to_bottom,hsl(var(--primary))_0_5px,transparent_5px_14px)]" />
        </span>
    );
}

/**
 * Two client targets converge on one codebase, which fans out to three
 * services. Laid out with CSS grid so it reflows to a single column on small
 * screens rather than overflowing; the connectors are decorative.
 */
export function EvinicArchitecture() {
    const [active, setActive] = useState<string>(core.id);
    const current = ALL.find((n) => n.id === active) ?? core;

    return (
        <div className="panel panel-invert edge-light overflow-hidden shadow-lg">
            <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-3.5">
                <span className="eyebrow text-fg-subtle">System architecture</span>
                {/* Hidden on the narrowest screens — both labels wrap and the
                    header becomes two cramped stacks of text. */}
                <span className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle sm:block">
                    one codebase · two targets
                </span>
            </div>

            <div className="p-5 md:p-7">
                <p className="eyebrow mb-2.5 text-fg-subtle">Clients</p>
                <div className="grid gap-3 sm:grid-cols-2">
                    {clients.map((n) => (
                        <NodeButton key={n.id} node={n} active={n.id === active} onSelect={setActive} />
                    ))}
                </div>

                <Connector />

                <div className="mx-auto md:max-w-md">
                    <NodeButton node={core} active={core.id === active} onSelect={setActive} />
                </div>

                <Connector />

                <p className="eyebrow mb-2.5 text-fg-subtle">Services</p>
                <div className="grid gap-3 md:grid-cols-3">
                    {services.map((n) => (
                        <NodeButton key={n.id} node={n} active={n.id === active} onSelect={setActive} />
                    ))}
                </div>
            </div>

            {/* Inspector */}
            <div aria-live="polite" className="border-t border-border bg-surface-2/60 px-5 py-4 md:px-7">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h4 className="font-mono text-sm uppercase tracking-[0.14em] text-fg">{current.name}</h4>
                    <span className="font-mono text-xs text-primary">{current.tech}</span>
                </div>
                <p className="mt-2 max-w-2xl text-[0.8125rem] leading-relaxed text-fg-muted">
                    {current.detail}
                </p>
            </div>
        </div>
    );
}
