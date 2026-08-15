/**
 * Engineering journal.
 *
 * MAINTENANCE: this is a hand-curated, static list — there is no live feed
 * behind it. Every entry must correspond to work described elsewhere in
 * src/content. Edit this file to update the log; do not add speculative items.
 */

export type LogState = "building" | "shipped" | "research" | "experimenting";

export interface LogEntry {
    state: LogState;
    title: string;
    detail: string;
    /** Optional section id to jump to for the full story. */
    ref?: string;
}

export const logStates: { key: LogState; label: string; tone: string }[] = [
    { key: "building", label: "Currently building", tone: "text-primary" },
    { key: "shipped", label: "Recently shipped", tone: "text-emerald" },
    { key: "research", label: "Current research", tone: "text-amber" },
    { key: "experimenting", label: "Experimenting with", tone: "text-fg-muted" },
];

export const buildLog: LogEntry[] = [
    {
        state: "building",
        title: "NeuroFusion AI — modality expansion",
        detail: "Five modalities are implemented and composing through the fusion layer. The roadmap extends the system to eight.",
        ref: "neurofusion",
    },
    {
        state: "building",
        title: "Evinic — request-broadcast engine",
        detail: "WhatsApp-native broadcast matching shoppers to verified vendors, on a Supabase data layer.",
        ref: "evinic",
    },
    {
        state: "shipped",
        title: "Shopify Autolister",
        detail: "Vision-LLM pipeline that lists products on Shopify straight from Drive images, with no human in the loop.",
        ref: "lab",
    },
    {
        state: "shipped",
        title: "Sentinel Omega",
        detail: "Real-time forensic CV pipeline combining detection, face recognition and plate reading.",
        ref: "lab",
    },
    {
        state: "shipped",
        title: "Food Faith Classifier",
        detail: "TF-IDF dietary classifier served through a lightweight Flask API.",
        ref: "lab",
    },
    {
        state: "research",
        title: "Honest evaluation under subject grouping",
        detail: "Nested cross-validation and calibration as the default protocol, with assertions written to surface leakage.",
        ref: "principles",
    },
    {
        state: "research",
        title: "Late fusion with missing modalities",
        detail: "A learned logistic meta-learner benchmarked against an AUC-weighted rule, with graceful degradation.",
        ref: "neurofusion",
    },
    {
        state: "experimenting",
        title: "WebGPU compute in the browser",
        detail: "WGSL compute shaders and Three.js scene work, explored through KRATOS.",
        ref: "lab",
    },
    {
        state: "experimenting",
        title: "Agentic development workflows",
        detail: "Building research systems with Claude Code against an Obsidian knowledge vault.",
    },
];
