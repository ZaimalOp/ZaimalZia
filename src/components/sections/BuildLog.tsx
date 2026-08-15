import { buildLog, logStates } from "@/content/buildLog";
import { sections } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { accentAt } from "@/lib/accents";
import { cn } from "@/lib/utils";

/**
 * Engineering journal. Static and hand-curated by design — it reflects work
 * documented elsewhere on this page rather than a synthesised activity feed.
 */
export function BuildLog() {
    return (
        <section id={sections.log} aria-labelledby="log-heading" className="container stack-gap">
            <SectionHeader
                index="07"
                accent="violet"
                label="Build log"
                title={<span id="log-heading">What is on the bench.</span>}
                lede="Current state of the work, grouped by how settled it is."
            />

            <div className="grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-border bg-border sm:grid-cols-2">
                {logStates.map((state, i) => {
                    const entries = buildLog.filter((e) => e.state === state.key);
                    if (entries.length === 0) return null;

                    return (
                        <Reveal key={state.key} delay={i * 60} className={cn("p-6 md:p-7", accentAt(i).soft)}>
                            <h3 className="flex items-center gap-2.5">
                                <span
                                    aria-hidden="true"
                                    className={cn(
                                        "h-1.5 w-1.5 rounded-full bg-current",
                                        state.tone,
                                    )}
                                />
                                <span className="eyebrow text-fg-muted">{state.label}</span>
                            </h3>

                            <ul className="mt-5 space-y-5">
                                {entries.map((entry) => {
                                    const body = (
                                        <>
                                            <span className="block text-sm font-medium text-fg">{entry.title}</span>
                                            <span className="mt-1.5 block text-[0.8125rem] leading-relaxed text-fg-muted">
                                                {entry.detail}
                                            </span>
                                        </>
                                    );

                                    return (
                                        <li key={entry.title}>
                                            {entry.ref ? (
                                                <a
                                                    href={`#${entry.ref}`}
                                                    className="group block border-l border-border pl-4 transition-colors duration-[var(--dur)] hover:border-primary"
                                                >
                                                    {body}
                                                </a>
                                            ) : (
                                                <div className="border-l border-border pl-4">{body}</div>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </Reveal>
                    );
                })}
            </div>

            <Reveal delay={120}>
                <p className="mt-6 font-mono text-[11px] text-fg-subtle">
                    Maintained by hand. Every entry corresponds to work described elsewhere on this page.
                </p>
            </Reveal>
        </section>
    );
}
