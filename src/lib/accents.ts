/**
 * The six-hue palette, as full Tailwind class strings.
 *
 * These must be written out rather than built by concatenation — Tailwind only
 * keeps classes it can literally see in source, so `text-${hue}` would be
 * stripped from the build.
 *
 * `text` uses the `-ink` variant where one exists, because those slots are
 * small text and have to clear 4.5:1 on a light background. `solid`, `dot` and
 * `border` use the vivid variant: UI graphics only need 3:1.
 */
export type Accent = "primary" | "violet" | "cyan" | "amber" | "emerald" | "rose";

export interface AccentClasses {
    /** Small text — accessible variant. */
    text: string;
    /** Filled dot / bar / rule. */
    dot: string;
    /** Border only. */
    border: string;
    /** Tinted chip: border + faint background + accessible text. */
    chip: string;
    /** Tinted panel: border + faint background. */
    panel: string;
    /** Resting tint — enough to stop a card reading as plain white. */
    soft: string;
    /** Stronger fill for grid cells whose borders are hidden by gap-px. */
    cell: string;
    /** Solid filled badge for index numbers. */
    badge: string;
    /** Icon tile: border + tint + vivid icon colour. */
    tile: string;
    /** Raw CSS colour, for SVG stroke/fill attributes. */
    raw: string;
}

export const ACCENTS: Record<Accent, AccentClasses> = {
    primary: {
        text: "text-primary",
        dot: "bg-primary",
        border: "border-primary/60",
        chip: "border-primary/30 bg-primary/[0.08] text-primary",
        panel: "border-primary/40 bg-primary/[0.07]",
        soft: "border-primary/55 bg-primary/[0.06]",
        cell: "cell-primary",
        badge: "badge-primary",
        tile: "border-primary/40 bg-primary/10 text-primary",
        raw: "hsl(var(--primary))",
    },
    violet: {
        text: "text-violet-ink",
        dot: "bg-violet",
        border: "border-violet/60",
        chip: "border-violet/30 bg-violet/[0.08] text-violet-ink",
        panel: "border-violet/40 bg-violet/[0.07]",
        soft: "border-violet/55 bg-violet/[0.06]",
        cell: "cell-violet",
        badge: "badge-violet",
        tile: "border-violet/40 bg-violet/10 text-violet",
        raw: "hsl(var(--signal-violet))",
    },
    cyan: {
        text: "text-cyan-ink",
        dot: "bg-cyan",
        border: "border-cyan/60",
        chip: "border-cyan/30 bg-cyan/[0.08] text-cyan-ink",
        panel: "border-cyan/40 bg-cyan/[0.07]",
        soft: "border-cyan/55 bg-cyan/[0.06]",
        cell: "cell-cyan",
        badge: "badge-cyan",
        tile: "border-cyan/40 bg-cyan/10 text-cyan",
        raw: "hsl(var(--signal-cyan))",
    },
    amber: {
        text: "text-amber-ink",
        dot: "bg-amber",
        border: "border-amber/60",
        chip: "border-amber/30 bg-amber/[0.08] text-amber-ink",
        panel: "border-amber/40 bg-amber/[0.07]",
        soft: "border-amber/55 bg-amber/[0.06]",
        cell: "cell-amber",
        badge: "badge-amber",
        tile: "border-amber/40 bg-amber/10 text-amber",
        raw: "hsl(var(--signal-amber))",
    },
    emerald: {
        text: "text-emerald-ink",
        dot: "bg-emerald",
        border: "border-emerald/60",
        chip: "border-emerald/30 bg-emerald/[0.08] text-emerald-ink",
        panel: "border-emerald/40 bg-emerald/[0.07]",
        soft: "border-emerald/55 bg-emerald/[0.06]",
        cell: "cell-emerald",
        badge: "badge-emerald",
        tile: "border-emerald/40 bg-emerald/10 text-emerald",
        raw: "hsl(var(--signal-emerald))",
    },
    rose: {
        text: "text-rose-ink",
        dot: "bg-rose",
        border: "border-rose/60",
        chip: "border-rose/30 bg-rose/[0.08] text-rose-ink",
        panel: "border-rose/40 bg-rose/[0.07]",
        soft: "border-rose/55 bg-rose/[0.06]",
        cell: "cell-rose",
        badge: "badge-rose",
        tile: "border-rose/40 bg-rose/10 text-rose",
        raw: "hsl(var(--signal-rose))",
    },
};

/** Stable order used when a list should cycle through the palette. */
export const ACCENT_CYCLE: Accent[] = ["primary", "violet", "cyan", "amber", "emerald", "rose"];

export const accentAt = (i: number): AccentClasses => ACCENTS[ACCENT_CYCLE[i % ACCENT_CYCLE.length]];
