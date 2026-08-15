"use client";
import { useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { experiments } from "@/content/experiments";
import { identity, sections } from "@/content/site";
import { MetricGrid } from "@/components/ui/Metric";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

/**
 * One hue per domain. Full class strings — Tailwind cannot see concatenated
 * names, so these must be written out.
 */
const ACCENT = {
    automation: {
        text: "text-violet",
        border: "border-violet/60",
        badge: "border-violet/40 bg-violet/10 text-violet-ink",
        tagline: "text-violet-ink",
        body: "bg-violet/[0.04]",
    },
    graphics: {
        text: "text-cyan",
        border: "border-cyan/60",
        badge: "border-cyan/40 bg-cyan/10 text-cyan-ink",
        tagline: "text-cyan-ink",
        body: "bg-cyan/[0.04]",
    },
    vision: {
        text: "text-amber",
        border: "border-amber/60",
        badge: "border-amber/40 bg-amber/10 text-amber-ink",
        tagline: "text-amber-ink",
        body: "bg-amber/[0.04]",
    },
    nlp: {
        text: "text-emerald",
        border: "border-emerald/60",
        badge: "border-emerald/40 bg-emerald/10 text-emerald-ink",
        tagline: "text-emerald-ink",
        body: "bg-emerald/[0.04]",
    },
} as const;

/** Each domain gets its own generative preview so the cards are not identical. */
function Preview({ domain, active }: { domain: string; active: boolean }) {
    return (
        <div
            aria-hidden="true"
            className={cn(
                "pointer-events-none absolute inset-0 transition-opacity duration-500",
                active ? "opacity-100" : "opacity-45",
            )}
        >
            {/* Three stages with items flowing between them — reads as a
                pipeline moving records left to right. */}
            {domain === "automation" && (
                <svg viewBox="0 0 200 120" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
                    {/* Connecting rail */}
                    <line
                        x1="18"
                        y1="60"
                        x2="182"
                        y2="60"
                        stroke="currentColor"
                        strokeOpacity="0.3"
                        strokeWidth="1"
                    />
                    {/* Items in transit */}
                    {[46, 78, 122, 154].map((x, i) => (
                        <rect
                            key={x}
                            x={x}
                            y="56"
                            width="8"
                            height="8"
                            rx="1.5"
                            fill="currentColor"
                            fillOpacity={active ? 0.55 - i * 0.08 : 0.24}
                            className="transition-all duration-700"
                        />
                    ))}
                    {/* Stages */}
                    {[18, 92, 166].map((x, i) => (
                        <g key={x}>
                            <rect
                                x={x - 10}
                                y="44"
                                width="26"
                                height="32"
                                rx="3"
                                fill="currentColor"
                                fillOpacity="0.07"
                                stroke="currentColor"
                                strokeOpacity={active ? 0.7 : 0.38}
                                strokeWidth="1"
                                className="transition-all duration-700"
                            />
                            {/* Field lines inside each stage */}
                            {[54, 60, 66].map((y) => (
                                <line
                                    key={y}
                                    x1={x - 5}
                                    y1={y}
                                    x2={x + 11 - (y === 66 ? 5 : 0)}
                                    y2={y}
                                    stroke="currentColor"
                                    strokeOpacity={0.2 + i * 0.08}
                                    strokeWidth="1.5"
                                />
                            ))}
                        </g>
                    ))}
                </svg>
            )}

            {/* A compute grid: cells lit at varying intensity, which reads as
                GPU workgroups rather than decorative diagonals. */}
            {domain === "graphics" && (
                <svg viewBox="0 0 200 120" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
                    {Array.from({ length: 10 * 6 }).map((_, i) => {
                        const col = i % 10;
                        const row = Math.floor(i / 10);
                        // Deterministic pseudo-random so SSR and client agree
                        const n = ((col * 7 + row * 13) % 11) / 11;
                        return (
                            <rect
                                key={i}
                                x={col * 20 + 1}
                                y={row * 20 + 1}
                                width="18"
                                height="18"
                                fill="currentColor"
                                fillOpacity={active ? 0.04 + n * 0.3 : 0.03 + n * 0.12}
                                stroke="currentColor"
                                strokeOpacity="0.16"
                                strokeWidth="0.5"
                                className="transition-all duration-700"
                            />
                        );
                    })}
                </svg>
            )}

            {domain === "vision" && (
                <svg viewBox="0 0 200 120" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
                    {[
                        [28, 26, 44, 38],
                        [92, 48, 58, 44],
                        [140, 20, 34, 30],
                    ].map(([x, y, w, h], i) => (
                        <g key={i}>
                            <rect
                                x={x}
                                y={y}
                                width={w}
                                height={h}
                                fill="currentColor"
                                fillOpacity="0.06"
                                stroke="currentColor"
                                strokeOpacity={active ? 0.8 : 0.4}
                                strokeWidth="1"
                                className="transition-all duration-500"
                            />
                            <line x1={x} y1={y} x2={x + 7} y2={y} stroke="currentColor" strokeWidth="2" />
                            <line x1={x} y1={y} x2={x} y2={y + 7} stroke="currentColor" strokeWidth="2" />
                        </g>
                    ))}
                </svg>
            )}

            {domain === "nlp" && (
                <svg viewBox="0 0 200 120" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
                    {Array.from({ length: 26 }).map((_, i) => {
                        const x = 14 + (i % 9) * 21;
                        const y = 22 + Math.floor(i / 9) * 28;
                        const w = 8 + ((i * 7) % 13);
                        return (
                            <rect
                                key={i}
                                x={x}
                                y={y}
                                width={w}
                                height="4"
                                rx="2"
                                fill="currentColor"
                                fillOpacity={active ? 0.15 + ((i * 13) % 40) / 100 : 0.12}
                                className="transition-all duration-500"
                            />
                        );
                    })}
                </svg>
            )}
        </div>
    );
}

export function Lab() {
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <section
            id={sections.lab}
            aria-labelledby="lab-heading"
            className="border-t border-border band-cyan"
        >
            <div className="container stack-gap">
                <SectionHeader
                    index="04"
                    accent="cyan"
                    label="Engineering archive"
                    title={<span id="lab-heading">The lab.</span>}
                    lede="Systems built to answer a specific technical question — automation, graphics, vision and language."
                >
                    <Reveal delay={160} className="mt-6">
                        <a
                            href={identity.github}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex min-h-11 items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
                        >
                            <Github className="h-4 w-4" aria-hidden="true" />
                            <span className="link-underline">All repositories on GitHub</span>
                            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                    </Reveal>
                </SectionHeader>

                {/* Two columns: with four projects a 3-up grid strands the last
                    card alone on its own row. Revisit if a fifth is added. */}
                <ul className="grid gap-5 md:grid-cols-2">
                    {experiments.map((project, i) => {
                        const active = hovered === project.id;
                        const accent = ACCENT[project.domain];
                        return (
                            <Reveal as="li" key={project.id} delay={i * 70}>
                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    onMouseEnter={() => setHovered(project.id)}
                                    onMouseLeave={() => setHovered(null)}
                                    onFocus={() => setHovered(project.id)}
                                    onBlur={() => setHovered(null)}
                                    className={cn(
                                        "lift edge-light group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border",
                                        accent.body,
                                        active ? accent.border : "border-border",
                                    )}
                                >
                                    {/* Preview — the SVGs draw in currentColor,
                                        so the wrapper's text colour tints them. */}
                                    <div
                                        className={cn(
                                            "relative h-28 overflow-hidden border-b border-border bg-surface-2",
                                            accent.text,
                                        )}
                                    >
                                        <Preview domain={project.domain} active={active} />
                                        <span
                                            className={cn(
                                                "absolute right-3 top-3 rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] backdrop-blur-sm",
                                                accent.badge,
                                            )}
                                        >
                                            {project.domain}
                                        </span>
                                    </div>

                                    <div className="flex flex-1 flex-col p-5">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <h3 className="font-mono text-sm uppercase tracking-[0.12em] text-fg">
                                                    {project.name}
                                                </h3>
                                                <p className={cn("mt-1.5 text-[0.8125rem]", accent.tagline)}>
                                                    {project.tagline}
                                                </p>
                                            </div>
                                            <ArrowUpRight
                                                className="h-4 w-4 shrink-0 text-fg-subtle transition-all duration-[var(--dur)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                                                aria-hidden="true"
                                            />
                                        </div>

                                        <p className="mt-4 text-[0.8125rem] leading-relaxed text-fg-muted">
                                            {project.description}
                                        </p>

                                        {/* Capabilities stay visible — this is the evidence that
                                            makes the card worth stopping on, so it should not be
                                            hidden behind a hover state. */}
                                        <ul className="mb-5 mt-4 flex flex-wrap gap-1.5">
                                            {project.techniques.map((t) => (
                                                <li
                                                    key={t}
                                                    className={cn(
                                                        "rounded-full border px-2.5 py-0.5 text-[11px]",
                                                        accent.badge,
                                                    )}
                                                >
                                                    {t}
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Technical breakdown — revealed on hover/focus, always in the DOM for AT */}
                                        <div
                                            className={cn(
                                                "grid transition-[grid-template-rows,opacity] duration-[var(--dur-slow)] ease-out",
                                                active ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                                            )}
                                        >
                                            <div className="overflow-hidden">
                                                <p className="eyebrow text-fg-subtle">Technical breakdown</p>
                                                <ul className="mt-2.5 space-y-1.5">
                                                    {project.breakdown.map((line) => (
                                                        <li
                                                            key={line}
                                                            className="flex gap-2 text-[0.75rem] leading-snug text-fg-muted"
                                                        >
                                                            <span aria-hidden="true" className="mt-1.5 h-px w-2 shrink-0 bg-primary/60" />
                                                            {line}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        {/* mt-auto pins the data block to the card floor so a
                                            row of cards keeps a common baseline */}
                                        <MetricGrid items={project.metrics} size="sm" className="mt-auto" />

                                        <ul className="mt-4 flex flex-wrap gap-1">
                                            {project.stack.map((tech) => (
                                                <li
                                                    key={tech}
                                                    className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-fg-subtle"
                                                >
                                                    {tech}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </a>
                            </Reveal>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
