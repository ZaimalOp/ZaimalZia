import { GraduationCap, MapPin } from "lucide-react";
import { narrative, beyondCode } from "@/content/narrative";
import { identity, sections } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { accentAt } from "@/lib/accents";
import { cn } from "@/lib/utils";

/**
 * Editorial rather than a card grid: four movements on a numbered rail, so the
 * reader gets the philosophy in about half a minute.
 */
export function About() {
    return (
        <section id={sections.about} aria-labelledby="about-heading" className="container stack-gap">
            <SectionHeader
                index="01"
                label="About"
                title={<span id="about-heading">A researcher who ships.</span>}
                lede="Four things worth knowing before you look at the work."
            />

            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-8">
                    <ol className="divide-y divide-border border-y border-border">
                        {narrative.map((beat, i) => (
                            <Reveal as="li" key={beat.key} delay={i * 70} className="py-9 first:pt-0 last:pb-0 md:py-11">
                                <div className="grid gap-4 md:grid-cols-[9rem_1fr] md:gap-8">
                                    <div className="flex items-baseline gap-3 md:flex-col md:gap-2">
                                        <span className={cn("eyebrow tabular", accentAt(i).text)}>
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <span className="eyebrow text-fg-subtle">{beat.label}</span>
                                    </div>

                                    <div>
                                        <h3 className="display text-display-sm text-fg">{beat.heading}</h3>
                                        <p className="mt-3.5 max-w-2xl text-[0.9375rem] leading-relaxed text-fg-muted md:text-base">
                                            {beat.body}
                                        </p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </ol>
                </div>

                {/* Factual sidebar */}
                <Reveal delay={120} className="lg:col-span-4">
                    <dl className="panel divide-y divide-border">
                        <div className="flex items-start gap-3 p-5">
                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                            <div className="min-w-0">
                                <dt className="eyebrow text-fg-subtle">Based in</dt>
                                <dd className="mt-1.5 text-sm text-fg">{identity.location}</dd>
                                <dd className="font-mono text-xs text-fg-subtle">{identity.timezone}</dd>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-5">
                            <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                            <div className="min-w-0">
                                <dt className="eyebrow text-fg-subtle">Studied</dt>
                                <dd className="mt-1.5 text-sm text-fg">{identity.education}</dd>
                            </div>
                        </div>

                        <div className="p-5">
                            <dt className="eyebrow text-fg-subtle">Beyond code</dt>
                            <dd className="mt-3 flex flex-wrap gap-1.5">
                                {beyondCode.map((item) => (
                                    <span
                                        key={item}
                                        className="rounded-[var(--radius-sm)] border border-border bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-fg-muted"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </dd>
                        </div>
                    </dl>
                </Reveal>
            </div>
        </section>
    );
}
