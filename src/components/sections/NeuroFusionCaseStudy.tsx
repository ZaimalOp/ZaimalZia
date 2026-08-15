import { Info } from "lucide-react";
import { neurofusionCaseStudy as nf } from "@/content/neurofusion";
import { sections } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FusionDiagram } from "./FusionDiagram";
import { IndexBadge } from "@/components/ui/IndexBadge";
import { accentAt } from "@/lib/accents";
import { cn } from "@/lib/utils";

export function NeuroFusionCaseStudy() {
    return (
        <section
            id={sections.neurofusion}
            aria-labelledby="neurofusion-heading"
            className="border-t border-border band-primary"
        >
            <div className="container stack-gap">
                <SectionHeader
                    label="Case study 01 · Research system"
                    title={<span id="neurofusion-heading">{nf.title}</span>}
                    lede={nf.overview}
                >
                    <Reveal delay={160} className="mt-6 flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] text-fg-muted">
                            {nf.subtitle}
                        </span>
                        <span className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] text-fg-muted">
                            {nf.status}
                        </span>
                    </Reveal>
                </SectionHeader>

                {/* Problem / solution */}
                <div className="grid gap-10 border-y border-border py-12 md:grid-cols-2 md:gap-16">
                    <Reveal>
                        <h3 className="eyebrow text-fg-subtle">The problem</h3>
                        <p className="mt-4 text-[0.9375rem] leading-relaxed text-fg-muted md:text-base">
                            {nf.problem}
                        </p>
                    </Reveal>
                    <Reveal delay={80}>
                        <h3 className="eyebrow text-fg-subtle">The approach</h3>
                        <p className="mt-4 text-[0.9375rem] leading-relaxed text-fg-muted md:text-base">
                            {nf.solution}
                        </p>
                    </Reveal>
                </div>

                {/* Interactive architecture */}
                <Reveal className="mt-14">
                    <h3 className="sr-only">Multi-modal architecture</h3>
                    <FusionDiagram />
                </Reveal>

                {/* Honest-metrics disclaimer sits directly under the numbers */}
                <Reveal delay={60}>
                    <p className="mt-5 flex max-w-3xl items-start gap-2.5 rounded-[var(--radius)] border border-border bg-surface/50 p-4 text-xs leading-relaxed text-fg-subtle">
                        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber" aria-hidden="true" />
                        <span>{nf.metricsNote}</span>
                    </p>
                </Reveal>

                {/* Engineering rigor */}
                <div className="mt-20">
                    <Reveal>
                        <h3 className="display text-display-sm text-fg">Engineering rigour</h3>
                    </Reveal>

                    <ol className="mt-8 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-border bg-border md:grid-cols-3">
                        {nf.engineeringRigor.map((item, i) => (
                            <Reveal as="li" key={item.title} delay={i * 70} className={cn("p-6 md:p-7", accentAt(i).soft)}>
                                <IndexBadge value={String(i + 1).padStart(2, "0")} index={i} />
                                <h4 className="mt-4 text-base font-medium text-fg">{item.title}</h4>
                                <p className="mt-3 text-[0.8125rem] leading-relaxed text-fg-muted">
                                    {item.description}
                                </p>
                            </Reveal>
                        ))}
                    </ol>
                </div>

                {/* Stack + status footer */}
                <Reveal className="mt-12 flex flex-col gap-6 border-t border-border pt-8 lg:flex-row lg:items-start lg:justify-between">
                    <ul className="flex flex-wrap gap-1.5">
                        {nf.stack.map((tech) => (
                            <li
                                key={tech}
                                className="rounded-[var(--radius-sm)] border border-border px-2.5 py-1 font-mono text-[11px] text-fg-subtle"
                            >
                                {tech}
                            </li>
                        ))}
                    </ul>

                    <dl className="shrink-0 space-y-2 lg:text-right">
                        <div>
                            <dt className="sr-only">Infrastructure</dt>
                            <dd className="font-mono text-[11px] text-fg-subtle">{nf.infrastructure}</dd>
                        </div>
                        <div>
                            <dt className="sr-only">Roadmap</dt>
                            <dd className="font-mono text-[11px] text-amber-ink">{nf.roadmap}</dd>
                        </div>
                    </dl>
                </Reveal>
            </div>
        </section>
    );
}
