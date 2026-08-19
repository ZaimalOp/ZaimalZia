"use client";
import { useState } from "react";
import { principles } from "@/content/principles";
import { sections } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { IndexBadge } from "@/components/ui/IndexBadge";
import { accentAt } from "@/lib/accents";
import { cn } from "@/lib/utils";

/**
 * Six principles as an index list. Hover or focus expands the explanation and
 * the evidence behind it; on touch the rows are buttons that toggle open.
 * Only one row is ever expanded, which keeps the section calm.
 */
export function Principles() {
    const [open, setOpen] = useState<string | null>(principles[0]?.id ?? null);

    return (
        <section
            id={sections.principles}
            aria-labelledby="principles-heading"
            className="border-t border-border band-violet"
        >
            <div className="container stack-gap">
                <SectionHeader
                    index="02"
                    accent="violet"
                    label="How I think"
                    title={<span id="principles-heading">Six rules I actually follow.</span>}
                    lede="Each one is attached to the place in the work where it cost me something."
                />

                <ul className="border-t border-border">
                    {principles.map((p, i) => {
                        const isOpen = open === p.id;
                        const accent = accentAt(i);
                        return (
                            <Reveal
                                as="li"
                                key={p.id}
                                delay={i * 50}
                                className="border-b border-border"
                            >
                                <button
                                    type="button"
                                    // Only a real mouse opens on hover. Touch browsers emulate
                                    // mouseenter before click, which would open the row and then
                                    // let the click immediately toggle it shut again.
                                    onPointerEnter={(e) => {
                                        if (e.pointerType === "mouse") setOpen(p.id);
                                    }}
                                    onFocus={() => setOpen(p.id)}
                                    onClick={() => setOpen(isOpen ? null : p.id)}
                                    aria-expanded={isOpen}
                                    aria-controls={`principle-${p.id}`}
                                    className="group w-full py-5 text-left md:py-6"
                                >
                                    <div className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 md:grid-cols-[5rem_1fr] md:gap-x-8">
                                        {/* Each index keeps its hue whether open or not, so
                                            all six read as a palette down the list. */}
                                        <IndexBadge
                                            value={p.index}
                                            index={i}
                                            className={cn(
                                                "transition-opacity duration-[var(--dur)]",
                                                isOpen ? "opacity-100" : "opacity-75",
                                            )}
                                        />

                                        <h3
                                            className={cn(
                                                "display text-[clamp(1.375rem,1rem+1.5vw,2.125rem)] transition-colors duration-[var(--dur)]",
                                                isOpen ? "text-fg" : "text-fg-muted group-hover:text-fg",
                                            )}
                                        >
                                            {p.title}
                                        </h3>

                                        <div
                                            id={`principle-${p.id}`}
                                            className={cn(
                                                "col-start-2 grid transition-[grid-template-rows,opacity] duration-[var(--dur)] ease-out",
                                                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                                            )}
                                        >
                                            <div className="overflow-hidden">
                                                <p className="max-w-2xl pt-4 text-[0.9375rem] leading-relaxed text-fg-muted md:text-base">
                                                    {p.body}
                                                </p>
                                                <p className="mt-4 flex max-w-2xl items-start gap-2.5 font-mono text-xs leading-relaxed text-fg-subtle">
                                                    <span
                                                        aria-hidden="true"
                                                        className={cn("mt-1.5 h-px w-4 shrink-0", accent.dot)}
                                                    />
                                                    <span>
                                                        <span className={accent.text}>Evidence — </span>
                                                        {p.evidence}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            </Reveal>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
