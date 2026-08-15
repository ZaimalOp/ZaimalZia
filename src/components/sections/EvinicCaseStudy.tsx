"use client";
import { useState } from "react";
import { evinicCaseStudy as ev } from "@/content/evinic";
import { sections } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EvinicArchitecture } from "./EvinicArchitecture";
import { accentAt } from "@/lib/accents";
import { cn } from "@/lib/utils";

export function EvinicCaseStudy() {
    const [step, setStep] = useState(0);

    return (
        <section id={sections.evinic} aria-labelledby="evinic-heading" className="container stack-gap">
            <SectionHeader
                label="Case study 02 · Product & venture"
                title={<span id="evinic-heading">{ev.title}</span>}
                lede={ev.overview}
            >
                <Reveal delay={160} className="mt-6 flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] text-fg-muted">
                        {ev.subtitle}
                    </span>
                    <span className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] text-fg-muted">
                        {ev.status}
                    </span>
                </Reveal>
            </SectionHeader>

            {/* Problem / insight / solution */}
            <div className="grid gap-10 border-y border-border py-12 md:grid-cols-3 md:gap-12">
                {[
                    { label: "The problem", body: ev.problem },
                    { label: "Market insight", body: ev.marketInsight },
                    { label: "The approach", body: ev.solution },
                ].map((block, i) => (
                    <Reveal key={block.label} delay={i * 70}>
                        <h3 className="eyebrow text-fg-subtle">{block.label}</h3>
                        <p className="mt-4 text-[0.9375rem] leading-relaxed text-fg-muted">{block.body}</p>
                    </Reveal>
                ))}
            </div>

            {/* ---- WhatsApp-native request flow ---- */}
            <div className="mt-16">
                <Reveal>
                    <h3 className="display text-display-sm text-fg">The request-broadcast flow</h3>
                    <p className="mt-3 max-w-2xl text-[0.9375rem] text-fg-muted">
                        The hero feature, as a shopper moves through it.
                    </p>
                </Reveal>

                <Reveal delay={80} className="mt-8">
                    {/* Horizontal rail on desktop, scrollable on small screens */}
                    <ol
                        className="mask-edges-x no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:overflow-visible"
                        onKeyDown={(e) => {
                            if (e.key === "ArrowRight") {
                                e.preventDefault();
                                setStep((s) => (s + 1) % ev.requestFlow.length);
                            } else if (e.key === "ArrowLeft") {
                                e.preventDefault();
                                setStep((s) => (s - 1 + ev.requestFlow.length) % ev.requestFlow.length);
                            }
                        }}
                    >
                        {ev.requestFlow.map((s, i) => {
                            const on = i === step;
                            const accent = accentAt(i);
                            return (
                                <li key={s.step} className="w-[15rem] shrink-0 snap-start md:w-auto">
                                    <button
                                        type="button"
                                        onMouseEnter={() => setStep(i)}
                                        onFocus={() => setStep(i)}
                                        onClick={() => setStep(i)}
                                        aria-pressed={on}
                                        className={cn(
                                            "flex h-full w-full flex-col rounded-[var(--radius-lg)] border p-5 text-left transition-colors duration-[var(--dur)]",
                                            on ? accent.panel : accent.soft,
                                        )}
                                    >
                                        <span className="flex items-center gap-2">
                                            <span
                                                className={cn(
                                                    "eyebrow tabular transition-opacity duration-[var(--dur)]",
                                                    accent.text,
                                                    on ? "opacity-100" : "opacity-90",
                                                )}
                                            >
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                            {i < ev.requestFlow.length - 1 && (
                                                <span aria-hidden="true" className="h-px flex-1 bg-border" />
                                            )}
                                        </span>

                                        <span className="mt-4 font-mono text-sm uppercase tracking-[0.12em] text-fg">
                                            {s.step}
                                        </span>
                                        <span className="mt-2 text-[0.8125rem] leading-snug text-fg-muted">
                                            {s.detail}
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ol>
                </Reveal>
            </div>

            {/* ---- Architecture ---- */}
            <div className="mt-20">
                <Reveal>
                    <h3 className="display text-display-sm text-fg">System architecture</h3>
                    <p className="mt-3 max-w-2xl text-[0.9375rem] text-fg-muted">
                        Web-first, wrapped for Android from the same codebase, over three services.
                    </p>
                </Reveal>

                <Reveal delay={80} className="mt-8">
                    <EvinicArchitecture />
                </Reveal>
            </div>

            {/* ---- Trust ---- */}
            <div className="mt-20">
                <Reveal>
                    <h3 className="display text-display-sm text-fg">Trust system</h3>
                    <p className="mt-3 max-w-2xl text-[0.9375rem] text-fg-muted">
                        The hard part of a cash bazaar is not payments — it is reputation.
                    </p>
                </Reveal>

                <ul className="mt-8 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-border bg-border md:grid-cols-3">
                    {ev.trustSystem.map((t, i) => (
                        <Reveal as="li" key={t.title} delay={i * 60} className="bg-surface p-5 md:p-6">
                            <h4 className="flex items-center gap-2.5 text-sm font-medium text-fg">
                                <span aria-hidden="true" className={cn("h-1.5 w-1.5 shrink-0 rounded-full", accentAt(i).dot)} />
                                {t.title}
                            </h4>
                            <p className="mt-2.5 pl-[0.875rem] text-[0.8125rem] leading-relaxed text-fg-muted">
                                {t.detail}
                            </p>
                        </Reveal>
                    ))}
                </ul>
            </div>

            {/* ---- Product definition ---- */}
            <div className="mt-20">
                <Reveal>
                    <h3 className="display text-display-sm text-fg">Product definition</h3>
                    <p className="mt-3 max-w-2xl text-[0.9375rem] text-fg-muted">
                        A {ev.masterplan.processLabel} produced {ev.masterplan.documentLabel}. These are the
                        artifacts it is documented as covering.
                    </p>
                </Reveal>

                <ol className="mt-8 border-t border-border">
                    {ev.masterplan.artifacts.map((a, i) => (
                        <Reveal
                            as="li"
                            key={a.name}
                            delay={i * 40}
                            className="group grid grid-cols-[2.75rem_1fr] items-baseline gap-x-4 border-b border-border py-4 md:grid-cols-[4rem_14rem_1fr] md:gap-x-8"
                        >
                            <span className={cn("eyebrow tabular transition-opacity duration-[var(--dur)] opacity-80 group-hover:opacity-100", accentAt(i).text)}>
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="font-mono text-sm text-fg">{a.name}</span>
                            <span className="col-span-2 text-[0.8125rem] leading-relaxed text-fg-muted md:col-span-1">
                                {a.note}
                            </span>
                        </Reveal>
                    ))}
                </ol>

                <Reveal delay={60} className="mt-6 flex flex-wrap items-start justify-between gap-6 border-t border-border pt-8">
                    <ul className="flex flex-wrap gap-1.5">
                        {ev.stack.map((tech) => (
                            <li
                                key={tech}
                                className="rounded-[var(--radius-sm)] border border-border px-2.5 py-1 font-mono text-[11px] text-fg-subtle"
                            >
                                {tech}
                            </li>
                        ))}
                    </ul>
                    <p className="max-w-sm font-mono text-[11px] leading-relaxed text-amber-ink">{ev.roadmap}</p>
                </Reveal>
            </div>
        </section>
    );
}
