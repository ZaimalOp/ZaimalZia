import { cn } from "@/lib/utils";

export interface MetricItem {
    label: string;
    value: string;
    /** Qualifier printed under the label — the units, split or caveat. */
    note?: string;
}

/**
 * A single figure with its label and qualifying note.
 *
 * The note slot exists on purpose: every number on this site is meant to carry
 * the context that makes it honest (what it measures, on which split), rather
 * than floating free as a marketing stat.
 */
export function Metric({
    label,
    value,
    note,
    size = "md",
    className,
}: MetricItem & { size?: "sm" | "md"; className?: string }) {
    return (
        <div className={cn("min-w-0", className)}>
            <dd
                className={cn(
                    "tabular text-fg",
                    size === "md"
                        // Sized so short phrases ("Web + Android") stay on one
                        // line, not just bare figures. Balanced if they do wrap.
                        ? "display text-balance text-[clamp(1.0625rem,0.85rem+0.7vw,1.5rem)] leading-tight"
                        : "truncate font-mono text-[0.8125rem]",
                )}
            >
                {value}
            </dd>
            <dt
                className={cn(
                    "text-fg-muted",
                    size === "md"
                        ? "mt-2 text-[11px] leading-tight"
                        : "mt-1 truncate text-[10px] uppercase tracking-[0.08em] text-fg-subtle",
                )}
            >
                {label}
            </dt>
            {note && (
                <p className="mt-1 font-mono text-[10px] leading-tight text-fg-subtle">{note}</p>
            )}
        </div>
    );
}

/** Hairline-separated row of metrics. */
export function MetricGrid({
    items,
    size = "md",
    className,
}: {
    items: MetricItem[];
    size?: "sm" | "md";
    className?: string;
}) {
    if (size === "sm") {
        return (
            <dl className={cn("grid grid-cols-3 gap-3 border-t border-border pt-4", className)}>
                {items.map((m) => (
                    <Metric key={m.label} {...m} size="sm" />
                ))}
            </dl>
        );
    }

    return (
        <dl
            className={cn(
                "grid grid-cols-3 gap-px overflow-hidden rounded-[var(--radius-lg)] border border-border bg-border",
                className,
            )}
        >
            {items.map((m) => (
                <Metric key={m.label} {...m} className="bg-surface p-4 md:p-5" />
            ))}
        </dl>
    );
}
