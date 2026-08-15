import { ArrowDown } from "lucide-react";
import { featuredProjects } from "@/content/projects";
import { sections } from "@/content/site";
import { MetricGrid } from "@/components/ui/Metric";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { accentAt } from "@/lib/accents";
import { cn } from "@/lib/utils";

/**
 * Index of the two deep case studies. Deliberately not cards — a numbered
 * editorial listing that hands off to the full study below.
 */
export function FeaturedWork() {
    return (
        <section id={sections.work} aria-labelledby="work-heading" className="container stack-gap">
            <SectionHeader
                index="03"
                label="Featured work"
                title={<span id="work-heading">Two systems, start to finish.</span>}
                lede="One research system and one venture. Both are documented below in full — problem, architecture, evaluation and what is still open."
            />

            <ol className="border-t border-border">
                {featuredProjects.map((project, i) => {
                    const accent = accentAt(i);
                    return (
                    <Reveal as="li" key={project.id} delay={i * 80} className="border-b border-border">
                        <a
                            href={project.href}
                            className="group relative block overflow-hidden py-10 md:py-14"
                            aria-label={`${project.name} — read the case study`}
                        >
                            {/* Oversized ghost numeral — drifts in on hover, purely decorative */}
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -right-4 top-1/2 hidden -translate-y-1/2 translate-x-6 select-none font-mono text-[11rem] font-medium leading-none text-fg opacity-0 transition-[opacity,transform] duration-700 ease-out group-hover:translate-x-0 group-hover:opacity-[0.035] lg:block"
                            >
                                {project.index}
                            </span>

                            <div className="relative grid gap-8 lg:grid-cols-12 lg:gap-12">
                                <div className="lg:col-span-7">
                                    <div className="flex items-center gap-3">
                                        <span className={cn("eyebrow tabular", accent.text)}>{project.index}</span>
                                        <span className="eyebrow text-fg-subtle">{project.kind}</span>
                                    </div>

                                    <h3 className="display mt-4 text-display-md text-fg transition-colors duration-[var(--dur)]">
                                        {project.name}
                                    </h3>

                                    <p className="mt-2 font-mono text-xs text-fg-subtle">{project.category}</p>

                                    <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-fg-muted md:text-base">
                                        {project.description}
                                    </p>

                                    <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-fg">
                                        <span className="link-underline">Read the case study</span>
                                        <ArrowDown
                                            className={cn("h-4 w-4 transition-transform duration-[var(--dur)] group-hover:translate-y-0.5", accent.text)}
                                            aria-hidden="true"
                                        />
                                    </span>
                                </div>

                                {/* Metrics rail */}
                                <div className="lg:col-span-5">
                                    <MetricGrid items={project.metrics} />

                                    <ul className="mt-4 flex flex-wrap gap-1.5">
                                        {project.stack.map((tech) => (
                                            <li
                                                key={tech}
                                                className="rounded-[var(--radius-sm)] border border-border px-2.5 py-1 font-mono text-[11px] text-fg-subtle"
                                            >
                                                {tech}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </a>
                    </Reveal>
                    );
                })}
            </ol>
        </section>
    );
}
