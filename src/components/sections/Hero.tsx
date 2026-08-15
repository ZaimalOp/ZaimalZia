"use client";
import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { identity, sections } from "@/content/site";
import { useFinePointer, useReducedMotion } from "@/hooks/useReducedMotion";
import { ButtonLink } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { StatusDot, StatusStrip } from "@/components/ui/StatusStrip";
import { SystemPipeline } from "./SystemPipeline";
import { goToSection } from "@/lib/navigation";

export function Hero() {
    const rootRef = useRef<HTMLElement>(null);
    const fine = useFinePointer();
    const reduced = useReducedMotion();
    const spotlight = fine && !reduced;

    // Cursor-follow light. Writes two CSS variables inside a rAF — no renders.
    useEffect(() => {
        if (!spotlight) return;
        const el = rootRef.current;
        if (!el) return;

        let frame = 0;
        let x = 0;
        let y = 0;

        const apply = () => {
            frame = 0;
            el.style.setProperty("--mx", `${x}px`);
            el.style.setProperty("--my", `${y}px`);
        };

        const onMove = (e: PointerEvent) => {
            const rect = el.getBoundingClientRect();
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
            if (!frame) frame = requestAnimationFrame(apply);
        };

        el.addEventListener("pointermove", onMove);
        return () => {
            el.removeEventListener("pointermove", onMove);
            cancelAnimationFrame(frame);
        };
    }, [spotlight]);

    return (
        <section
            id={sections.hero}
            ref={rootRef}
            aria-labelledby="hero-heading"
            className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16 md:pt-28"
        >
            {/* Blueprint field, faded out toward the edges */}
            <div
                aria-hidden="true"
                className="grid-field absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_78%_58%_at_50%_28%,#000_35%,transparent_100%)]"
            />
            {/* Cursor spotlight (desktop, motion-allowed only) */}
            {spotlight && (
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 opacity-[0.55] transition-opacity duration-500"
                    style={{
                        background:
                            "radial-gradient(340px circle at var(--mx, 50%) var(--my, 40%), hsl(var(--glow) / 0.13), transparent 72%)",
                    }}
                />
            )}
            {/* Aurora: three offset colour fields rather than a single blue
                glow. On the light theme this is what stops the hero reading as
                flat grey; on dark it stays a subtle horizon. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[70vh] bg-[radial-gradient(ellipse_55%_75%_at_18%_0%,hsl(var(--signal-violet)/0.16),transparent_65%),radial-gradient(ellipse_50%_70%_at_78%_8%,hsl(var(--signal-cyan)/0.16),transparent_65%),radial-gradient(ellipse_70%_60%_at_50%_0%,hsl(var(--glow)/0.12),transparent_70%)]"
            />

            <div className="container">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
                    {/* ---- Statement ---- */}
                    <div className="lg:col-span-7">
                        <p
                            data-reveal="shown"
                            className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/60 px-3 py-1.5 font-mono text-[11px] text-fg-muted backdrop-blur-sm"
                        >
                            <StatusDot />
                            {identity.role}
                        </p>

                        <h1 id="hero-heading" className="mt-7">
                            <span className="sr-only">
                                {identity.name} — {identity.roles.join(", ")}. {identity.positioning}
                            </span>

                            <span
                                aria-hidden="true"
                                className="display block text-display-xl text-etched"
                            >
                                Zaimal Zia
                            </span>

                            {/* Each role carries its own trailing separator and never
                                breaks internally, so a wrap can't start a line with a dot. */}
                            <span
                                aria-hidden="true"
                                className="mt-5 flex flex-wrap items-center gap-y-2 font-mono text-[0.8125rem] uppercase tracking-[0.16em] text-fg-muted sm:text-sm"
                            >
                                {identity.roles.map((role, i) => (
                                    <span key={role} className="flex items-center whitespace-nowrap">
                                        {role}
                                        {i < identity.roles.length - 1 && (
                                            <span
                                                className="mx-3 h-1 w-1 shrink-0 rounded-full bg-primary/70"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </span>
                                ))}
                            </span>
                        </h1>

                        <p className="mt-8 max-w-xl text-lede text-fg-muted">
                            <span className="text-fg">{identity.positioning}</span>{" "}
                            {identity.summary}
                        </p>

                        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <Magnetic>
                                <ButtonLink
                                    href={`#${sections.work}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        goToSection(sections.work);
                                    }}
                                    className="w-full sm:w-auto"
                                >
                                    View the work
                                    <ArrowDown
                                        className="h-4 w-4 transition-transform duration-[var(--dur)] group-hover:translate-y-0.5"
                                        aria-hidden="true"
                                    />
                                </ButtonLink>
                            </Magnetic>

                            <Magnetic>
                                <ButtonLink href="/resume" variant="outline" className="w-full sm:w-auto">
                                    Resume
                                    <ArrowUpRight
                                        className="h-4 w-4 transition-transform duration-[var(--dur)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                        aria-hidden="true"
                                    />
                                </ButtonLink>
                            </Magnetic>
                        </div>

                        {/* Scroll cue — hidden when the viewport is too short to matter */}
                        <a
                            href={`#${sections.about}`}
                            onClick={(e) => {
                                e.preventDefault();
                                goToSection(sections.about);
                            }}
                            className="group mt-12 hidden items-center gap-3 text-fg-subtle transition-colors duration-[var(--dur)] hover:text-fg lg:[@media(min-height:760px)]:inline-flex"
                        >
                            <span
                                aria-hidden="true"
                                className="relative block h-8 w-px overflow-hidden bg-border-strong"
                            >
                                <span className="absolute inset-x-0 top-0 h-3 -translate-y-full bg-primary transition-transform duration-700 ease-out group-hover:translate-y-[266%]" />
                            </span>
                            <span className="eyebrow">Scroll</span>
                        </a>
                    </div>

                    {/* ---- Instrument ---- */}
                    <div className="lg:col-span-5">
                        <SystemPipeline />
                    </div>
                </div>

                {/* Status runs the full measure, giving the hero a horizontal
                    base instead of stranding the bottom-right corner. */}
                <StatusStrip className="mt-14 border-t border-border pt-7 md:mt-16" />
            </div>
        </section>
    );
}
