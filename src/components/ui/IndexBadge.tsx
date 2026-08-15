import { accentAt, ACCENTS, type Accent } from "@/lib/accents";
import { cn } from "@/lib/utils";

/**
 * The numbered marker used for every ordered list on the site — section
 * headers, narrative beats, principles, case-study steps.
 *
 * It renders as a small bordered container rather than bare text so the number
 * reads as an object with weight, and so all the indices across the page look
 * like one system. Pass either an explicit `accent` or an `index` to cycle the
 * palette.
 */
export function IndexBadge({
    value,
    accent,
    index,
    className,
}: {
    value: string;
    /** Explicit hue. Falls back to cycling by `index`. */
    accent?: Accent;
    index?: number;
    className?: string;
}) {
    const tone = accent ? ACCENTS[accent] : accentAt(index ?? 0);

    return (
        <span
            className={cn(
                "tabular inline-grid h-[1.6rem] min-w-[2rem] shrink-0 place-items-center rounded-[var(--radius-sm)]",
                "border px-1.5 font-mono text-[11px] font-medium leading-none tracking-[0.06em]",
                tone.badge,
                className,
            )}
        >
            {value}
        </span>
    );
}
