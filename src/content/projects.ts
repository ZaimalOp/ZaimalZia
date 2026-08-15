import { sections } from "./site";

export interface FeaturedProject {
    id: string;
    index: string;
    name: string;
    kind: string;
    category: string;
    description: string;
    stack: string[];
    metrics: { label: string; value: string; note?: string }[];
    href: string;
}

export const featuredProjects: FeaturedProject[] = [
    {
        id: "neurofusion",
        index: "01",
        name: "NeuroFusion AI",
        kind: "Research system",
        category: "Multi-modal ML · Built end-to-end from scratch",
        description:
            "A screening system for Parkinson's disease that fuses five behavioural and physiological modalities into one calibrated output. Trained under subject-grouped cross-validation with explicit leakage auditing.",
        stack: ["Python", "PyTorch", "XGBoost", "FastAPI", "Flutter"],
        metrics: [
            { label: "Voice", value: "≈ 0.87", note: "Subject-level AUC" },
            { label: "Gait", value: "≈ 0.84", note: "AUC" },
            { label: "Handwriting", value: "≈ 0.89", note: "AUC" },
        ],
        href: `#${sections.neurofusion}`,
    },
    {
        id: "evinic",
        index: "02",
        name: "Evinic",
        kind: "Product & venture",
        category: "Two-sided marketplace · Product strategy & full-stack build",
        description:
            "A market-discovery and trust platform bringing informal cash electronics bazaars online, built around a WhatsApp-native request-broadcast engine and a verified shop directory. First market: Lahore's Hafeez Center.",
        stack: ["Next.js", "Capacitor", "Supabase", "Firebase", "Node.js"],
        metrics: [
            { label: "Product phases", value: "15", note: "Definition process" },
            { label: "Strategy", value: "Lean hybrid", note: "Evidence-gated" },
            { label: "Targets", value: "Web + Android", note: "Single codebase" },
        ],
        href: `#${sections.evinic}`,
    },
];
