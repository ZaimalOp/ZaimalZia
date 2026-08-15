"use client";
import { useState } from "react";
import { neurofusionCaseStudy as nf } from "@/content/neurofusion";
import { cn } from "@/lib/utils";

const { modalities, fusion, output } = nf;

/**
 * A hue per modality, so colour identifies the signal source rather than
 * decorating. Full class strings — Tailwind cannot see concatenated names.
 * `stroke` is the raw CSS var for the SVG convergence paths.
 */
const ACCENT: Record<string, { row: string; dot: string; text: string; stroke: string }> = {
    primary: {
        row: "border-primary/60 bg-primary/[0.09]",
        dot: "bg-primary",
        text: "text-primary",
        stroke: "hsl(var(--primary))",
    },
    violet: {
        row: "border-violet/60 bg-violet/[0.09]",
        dot: "bg-violet",
        text: "text-violet-ink",
        stroke: "hsl(var(--signal-violet))",
    },
    cyan: {
        row: "border-cyan/60 bg-cyan/[0.09]",
        dot: "bg-cyan",
        text: "text-cyan-ink",
        stroke: "hsl(var(--signal-cyan))",
    },
    amber: {
        row: "border-amber/60 bg-amber/[0.09]",
        dot: "bg-amber",
        text: "text-amber-ink",
        stroke: "hsl(var(--signal-amber))",
    },
    emerald: {
        row: "border-emerald/60 bg-emerald/[0.09]",
        dot: "bg-emerald",
        text: "text-emerald-ink",
        stroke: "hsl(var(--signal-emerald))",
    },
};

/**
 * Five modalities converging on a fusion layer.
 *
 * Layout is CSS grid, not absolute positioning, so it reflows on small screens
 * instead of overflowing. The connectors are a single SVG that stretches over
 * the modality column and is hidden below `lg`, where the rail becomes a
 * simple vertical list — the mobile alternative to the diagram.
 */
export function FusionDiagram() {
    const [active, setActive] = useState<string>(modalities[0].id);
    const current = modalities.find((m) => m.id === active) ?? modalities[0];

    return (
        <div className="panel panel-invert overflow-hidden shadow-lg">
            <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-3.5">
                <span className="eyebrow text-fg-subtle">Architecture</span>
                <span className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle sm:block">
                    {modalities.length} modalities → fusion → output
                </span>
            </div>

            <div className="grid gap-6 p-5 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-4 lg:p-7">
                {/* ---- Modality column ---- */}
                <ul
                    className="relative flex flex-col gap-1.5"
                    onKeyDown={(e) => {
                        const i = modalities.findIndex((m) => m.id === active);
                        if (e.key === "ArrowDown") {
                            e.preventDefault();
                            setActive(modalities[(i + 1) % modalities.length].id);
                        } else if (e.key === "ArrowUp") {
                            e.preventDefault();
                            setActive(modalities[(i - 1 + modalities.length) % modalities.length].id);
                        }
                    }}
                >
                    {modalities.map((m) => {
                        const on = m.id === active;
                        const accent = ACCENT[m.accent];
                        return (
                            <li key={m.id}>
                                <button
                                    type="button"
                                    onMouseEnter={() => setActive(m.id)}
                                    onFocus={() => setActive(m.id)}
                                    onClick={() => setActive(m.id)}
                                    aria-pressed={on}
                                    className={cn(
                                        "flex w-full items-center justify-between gap-3 rounded-[var(--radius)] border px-3.5 py-2.5 text-left transition-colors duration-[var(--dur)]",
                                        on ? accent.row : "border-border bg-surface-2 hover:border-border-strong",
                                    )}
                                >
                                    <span className="flex min-w-0 items-center gap-2.5">
                                        {/* Dot keeps its hue even when inactive, so the
                                            colour reads as an identity not a state. */}
                                        <span
                                            aria-hidden="true"
                                            className={cn(
                                                "h-1.5 w-1.5 shrink-0 rounded-full transition-opacity duration-[var(--dur)]",
                                                accent.dot,
                                                on ? "opacity-100" : "opacity-60",
                                            )}
                                        />
                                        <span
                                            className={cn(
                                                "truncate text-sm transition-colors duration-[var(--dur)]",
                                                on ? "text-fg" : "text-fg-muted",
                                            )}
                                        >
                                            {m.name}
                                        </span>
                                    </span>
                                    <span
                                        className={cn(
                                            "tabular shrink-0 font-mono text-[11px] transition-colors duration-[var(--dur)]",
                                            on ? accent.text : "text-fg-subtle",
                                        )}
                                    >
                                        {m.metric}
                                    </span>
                                </button>
                            </li>
                        );
                    })}
                </ul>

                {/* ---- Convergence ---- */}
                <div className="hidden lg:flex lg:h-full lg:w-24 lg:items-center lg:justify-center">
                    <svg
                        viewBox="0 0 96 200"
                        preserveAspectRatio="none"
                        className="h-full w-full"
                        aria-hidden="true"
                        focusable="false"
                    >
                        {modalities.map((m, i) => {
                            const y = 20 + i * 40;
                            const on = m.id === active;
                            const accent = ACCENT[m.accent];
                            return (
                                <path
                                    key={m.id}
                                    d={`M0 ${y} C 44 ${y}, 52 100, 96 100`}
                                    fill="none"
                                    // Each path carries its modality's hue, dimmed when inactive
                                    stroke={accent.stroke}
                                    strokeOpacity={on ? 1 : 0.35}
                                    strokeWidth={on ? 1.75 : 1}
                                    className="transition-all duration-[var(--dur)]"
                                    vectorEffect="non-scaling-stroke"
                                />
                            );
                        })}
                    </svg>
                </div>

                {/* ---- Fusion + output ---- */}
                <div className="flex flex-col gap-3">
                    <div className="rounded-[var(--radius)] border border-primary/40 bg-primary/[0.07] p-4">
                        <p className="eyebrow text-primary">{fusion.title}</p>
                        <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-fg-muted">
                            {fusion.description}
                        </p>
                        <ul className="mt-3 flex flex-wrap gap-1">
                            {fusion.contract.map((field) => (
                                <li
                                    key={field}
                                    className="rounded border border-primary/25 px-1.5 py-0.5 font-mono text-[10px] text-primary"
                                >
                                    {field}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-[var(--radius)] border border-border bg-surface-2 p-4">
                        <p className="eyebrow text-fg-subtle">{output.title}</p>
                        <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-fg-muted">
                            {output.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* ---- Inspector: details for the selected modality ---- */}
            <div className="border-t border-border bg-surface-2/60 px-5 py-5 lg:px-7">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h4 className="flex items-center gap-2.5 font-mono text-sm uppercase tracking-[0.14em] text-fg">
                        <span
                            aria-hidden="true"
                            className={cn("h-2 w-2 shrink-0 rounded-full", ACCENT[current.accent].dot)}
                        />
                        {current.name}
                    </h4>
                    <p className={cn("tabular font-mono text-xs", ACCENT[current.accent].text)}>
                        {current.metric}{" "}
                        <span className="text-fg-subtle">{current.metricLabel}</span>
                    </p>
                </div>

                {/* aria-live so keyboard/AT users hear the panel change */}
                <dl
                    aria-live="polite"
                    className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {[
                        { label: "Dataset", value: current.dataset, sub: current.dataFormat },
                        { label: "Model", value: current.architecture },
                        { label: "Evaluation", value: current.evaluation },
                        { label: "Explainability", value: current.explainability },
                    ].map((row) => (
                        <div key={row.label}>
                            <dt className="eyebrow text-fg-subtle">{row.label}</dt>
                            <dd className="mt-1.5 text-[0.8125rem] leading-snug text-fg-muted">
                                {row.value}
                                {row.sub && (
                                    <span className="mt-0.5 block font-mono text-[10px] text-fg-subtle">
                                        {row.sub}
                                    </span>
                                )}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    );
}
