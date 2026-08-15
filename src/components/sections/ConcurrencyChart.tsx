import { trajectory, toDecimalYear } from "@/content/trajectory";
import { ACCENTS } from "@/lib/accents";
import { cn } from "@/lib/utils";

/**
 * All three engagements run concurrently, which a stacked vertical list hides —
 * it reads as succession. This lays them on a shared year axis so the overlap
 * is the point.
 *
 * Server-rendered and static: positions are computed at build time from the
 * start dates in content, so this ships zero JavaScript and cannot drift out
 * of sync with the entries below it.
 */
export function ConcurrencyChart({ className }: { className?: string }) {
    // Evaluated on the server only, so there is no client/server date mismatch.
    const now = new Date();
    const nowDecimal = now.getUTCFullYear() + now.getUTCMonth() / 12;

    const earliest = Math.min(...trajectory.map((t) => toDecimalYear(t.start)));
    const axisStart = Math.floor(earliest);
    // Pad to the next whole year so the "present" edge is never flush.
    const axisEnd = Math.ceil(nowDecimal + 0.08);
    const span = axisEnd - axisStart;

    const ticks = Array.from({ length: span + 1 }, (_, i) => axisStart + i);
    const pct = (value: number) => ((value - axisStart) / span) * 100;

    return (
        <figure className={cn("m-0", className)}>
            <figcaption className="sr-only">
                Concurrency chart: {trajectory.length} engagements plotted on a shared timeline from{" "}
                {axisStart} to the present, showing that they overlap rather than follow one another.
            </figcaption>

            <div className="panel panel-invert edge-light overflow-hidden shadow-lg">
                <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-3.5">
                    <span className="eyebrow text-fg-subtle">Concurrency</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
                        {trajectory.length} tracks · all active
                    </span>
                </div>

                <div className="px-5 py-6 md:px-7">
                    {/* Year axis */}
                    <div aria-hidden="true" className="relative mb-4 h-4">
                        {ticks.map((year) => (
                            <span
                                key={year}
                                className="absolute top-0 -translate-x-1/2 font-mono text-[10px] text-fg-subtle"
                                style={{ left: `${pct(year)}%` }}
                            >
                                {/* Compact on small screens: '21 instead of 2021 */}
                                <span className="md:hidden">&apos;{String(year).slice(2)}</span>
                                <span className="hidden md:inline">{year}</span>
                            </span>
                        ))}
                    </div>

                    {/* Tracks */}
                    <div className="relative">
                        {/* Grid lines */}
                        <div aria-hidden="true" className="absolute inset-0">
                            {ticks.map((year) => (
                                <span
                                    key={year}
                                    className="absolute top-0 h-full w-px bg-border"
                                    style={{ left: `${pct(year)}%` }}
                                />
                            ))}
                        </div>

                        <ul className="relative space-y-3">
                            {trajectory.map((item) => {
                                const left = pct(toDecimalYear(item.start));
                                const width = Math.max(pct(nowDecimal) - left, 4);
                                const accent = ACCENTS[item.accent];

                                return (
                                    <li key={`${item.role}-${item.company}`} className="relative h-9">
                                        <span
                                            className={cn("absolute inset-y-0 flex items-center rounded-[var(--radius-sm)] border px-2.5", accent.panel)}
                                            style={{ left: `${left}%`, width: `${width}%` }}
                                        >
                                            <span className="truncate font-mono text-[11px] text-fg">
                                                {item.company}
                                            </span>
                                        </span>

                                        {/* Leading edge marker */}
                                        <span
                                            aria-hidden="true"
                                            className={cn("absolute inset-y-0 w-px", accent.dot)}
                                            style={{ left: `${left}%` }}
                                        />
                                    </li>
                                );
                            })}
                        </ul>

                        {/* "Now" edge */}
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-y-0 w-px bg-emerald/70"
                            style={{ left: `${pct(nowDecimal)}%` }}
                        />
                    </div>

                    <p className="mt-5 border-t border-border pt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
                        Research and ventures run in parallel, not in sequence
                    </p>
                </div>
            </div>
        </figure>
    );
}
