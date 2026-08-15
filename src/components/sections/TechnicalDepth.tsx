import { BrainCircuit, Code2, Compass, Database, Server, Sparkles } from "lucide-react";
import { stackTree } from "@/content/stack";
import { sections } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

const ICONS = {
    brain: BrainCircuit,
    spark: Sparkles,
    code: Code2,
    server: Server,
    database: Database,
    compass: Compass,
} as const;

/**
 * Full class strings per accent — Tailwind only keeps classes it can see in
 * source, so these can never be built by concatenation.
 */
const ACCENT = {
    primary: {
        icon: "border-primary/40 bg-primary/10 text-primary",
        rule: "bg-primary/50",
        chip: "border-primary/30 bg-primary/[0.07] text-primary",
    },
    violet: {
        icon: "border-violet/40 bg-violet/10 text-violet",
        rule: "bg-violet/50",
        chip: "border-violet/30 bg-violet/[0.07] text-violet-ink",
    },
    cyan: {
        icon: "border-cyan/40 bg-cyan/10 text-cyan",
        rule: "bg-cyan/50",
        chip: "border-cyan/30 bg-cyan/[0.07] text-cyan-ink",
    },
    amber: {
        icon: "border-amber/40 bg-amber/10 text-amber",
        rule: "bg-amber/50",
        chip: "border-amber/30 bg-amber/[0.07] text-amber-ink",
    },
    emerald: {
        icon: "border-emerald/40 bg-emerald/10 text-emerald",
        rule: "bg-emerald/50",
        chip: "border-emerald/30 bg-emerald/[0.07] text-emerald-ink",
    },
    rose: {
        icon: "border-rose/40 bg-rose/10 text-rose",
        rule: "bg-rose/50",
        chip: "border-rose/30 bg-rose/[0.07] text-rose-ink",
    },
} as const;

/**
 * Capability architecture drawn as a tree rather than a tag cloud, so the
 * structure carries the meaning instead of the keyword count.
 */
export function TechnicalDepth() {
    return (
        <section id={sections.stack} aria-labelledby="stack-heading" className="container stack-gap">
            <SectionHeader
                index="05"
                label="Technical depth"
                title={<span id="stack-heading">What I can actually build.</span>}
                lede="Six domains, organised by what each one lets me build end to end — from the model through to the product it ships inside."
            />

            <div className="grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-border bg-border md:grid-cols-2">
                {stackTree.map((node, i) => {
                    const Icon = ICONS[node.icon];
                    const accent = ACCENT[node.accent];
                    return (
                        <Reveal key={node.id} delay={i * 70} className="bg-surface p-6 md:p-8">
                            <div className="flex items-start gap-3.5">
                                <span
                                    aria-hidden="true"
                                    className={cn(
                                        "grid h-9 w-9 shrink-0 place-items-center rounded-[var(--radius-sm)] border",
                                        accent.icon,
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                </span>
                                <div className="min-w-0">
                                    <h3 className="font-mono text-sm uppercase tracking-[0.14em] text-fg">
                                        {node.domain}
                                    </h3>
                                    <p className="mt-2 text-[0.8125rem] leading-relaxed text-fg-muted">
                                        {node.summary}
                                    </p>
                                </div>
                            </div>

                            {/* Tree */}
                            <div className="mt-7 space-y-5 pl-1">
                                {node.branches.map((branch) => (
                                    <div key={branch.name} className="relative pl-5">
                                        <span
                                            aria-hidden="true"
                                            className={cn("absolute left-0 top-[0.45rem] h-px w-3", accent.rule)}
                                        />
                                        <span
                                            aria-hidden="true"
                                            className="absolute left-0 top-0 h-full w-px bg-border"
                                        />
                                        <h4 className="text-[0.8125rem] font-medium text-fg">{branch.name}</h4>
                                        <ul className="mt-2 flex flex-wrap gap-1.5">
                                            {branch.items.map((item) => (
                                                <li
                                                    key={item}
                                                    className={cn(
                                                        "rounded-[var(--radius-sm)] border px-2 py-0.5 font-mono text-[11px]",
                                                        accent.chip,
                                                    )}
                                                >
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    );
                })}
            </div>
        </section>
    );
}
