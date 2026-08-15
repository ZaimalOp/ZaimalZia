import { trajectory } from "@/content/trajectory";
import { sections } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatusDot } from "@/components/ui/StatusStrip";
import { ConcurrencyChart } from "./ConcurrencyChart";
import { ACCENTS } from "@/lib/accents";
import { cn } from "@/lib/utils";

export function Trajectory() {
    return (
        <section
            id={sections.trajectory}
            aria-labelledby="trajectory-heading"
            className="border-t border-border band-amber"
        >
            <div className="container stack-gap">
                <SectionHeader
                    index="06"
                    accent="amber"
                    label="Trajectory"
                    title={<span id="trajectory-heading">Research and ventures, in parallel.</span>}
                    lede="Three concurrent tracks — which is where the mix of research rigour and operating experience comes from."
                />

                <Reveal className="mb-16">
                    <ConcurrencyChart />
                </Reveal>

                <ol className="relative">
                    {/* Spine */}
                    <span
                        aria-hidden="true"
                        className="absolute left-[7px] top-3 bottom-3 w-px bg-border md:left-[calc(11rem+7px)]"
                    />

                    {trajectory.map((item, i) => {
                        const accent = ACCENTS[item.accent];
                        return (
                        <Reveal as="li" key={`${item.role}-${item.company}`} delay={i * 80} className="relative">
                            <div className="grid gap-x-8 gap-y-3 py-8 md:grid-cols-[11rem_1fr] md:py-10">
                                {/* Period rail */}
                                <div className="md:text-right">
                                    <p className="font-mono text-xs text-fg-subtle md:pr-8">{item.period}</p>
                                    <p className={cn("mt-1 font-mono text-[10px] uppercase tracking-[0.12em] md:pr-8", accent.text)}>
                                        {item.kind}
                                    </p>
                                </div>

                                {/* Node */}
                                <span
                                    aria-hidden="true"
                                    className="absolute left-0 top-[2.15rem] grid h-[15px] w-[15px] place-items-center rounded-full border border-border-strong bg-bg md:left-[11rem]"
                                >
                                    <span className={cn("h-1.5 w-1.5 rounded-full", accent.dot)} />
                                </span>

                                <div className="pl-8 md:pl-8">
                                    <h3 className="text-lg font-medium text-fg md:text-xl">
                                        {item.role}
                                        <span className="text-fg-subtle"> · </span>
                                        <span className={accent.text}>{item.company}</span>
                                    </h3>

                                    <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-fg-subtle">
                                        <span>{item.location}</span>
                                        {item.current && (
                                            <span className="inline-flex items-center gap-1.5 text-emerald-ink">
                                                <StatusDot />
                                                Current
                                            </span>
                                        )}
                                    </p>

                                    <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-fg-muted">
                                        {item.description}
                                    </p>

                                    <ul className="mt-4 space-y-1.5">
                                        {item.responsibilities.map((r) => (
                                            <li key={r} className="flex gap-2.5 text-[0.8125rem] text-fg-muted">
                                                <span aria-hidden="true" className={cn("mt-2 h-px w-2.5 shrink-0", accent.dot)} />
                                                {r}
                                            </li>
                                        ))}
                                    </ul>

                                    <ul className="mt-5 flex flex-wrap gap-1.5">
                                        {item.tags.map((tag) => (
                                            <li
                                                key={tag}
                                                className="rounded-[var(--radius-sm)] border border-border bg-surface px-2.5 py-1 font-mono text-[11px] text-fg-subtle"
                                            >
                                                {tag}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </Reveal>
                        );
                    })}
                </ol>
            </div>
        </section>
    );
}
