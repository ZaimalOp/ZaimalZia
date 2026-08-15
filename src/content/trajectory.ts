export interface TrajectoryItem {
    role: string;
    company: string;
    kind: string;
    period: string;
    location: string;
    description: string;
    /** Concrete responsibilities, drawn from the role description. */
    responsibilities: string[];
    /** Hue used by the timeline and concurrency chart. */
    accent: "primary" | "amber" | "emerald";
    tags: string[];
    current: boolean;
    /**
     * Start of the engagement as a decimal year, used to lay out the
     * concurrency chart. `month` is 1-indexed; omit it when only the year is
     * known and it is treated as January.
     */
    start: { year: number; month?: number };
}

/** Decimal year, e.g. Apr 2025 -> 2025.25. */
export function toDecimalYear({ year, month }: { year: number; month?: number }): number {
    return year + ((month ?? 1) - 1) / 12;
}

export const trajectory: TrajectoryItem[] = [
    {
        accent: "primary",
        role: "Lead AI & ML Researcher",
        company: "Tkhex",
        kind: "Research",
        period: "Apr 2025 — Present",
        location: "San Francisco (Remote)",
        description:
            "Leads AI/ML research and strategy at a US-based startup, collaborating with in-house developers on applied AI initiatives.",
        responsibilities: [
            "Set and shape the model roadmap",
            "Lead applied AI research initiatives",
            "Collaborate with in-house engineering on delivery",
        ],
        tags: ["AI Strategy", "Deep Learning", "Remote"],
        current: true,
        start: { year: 2025, month: 4 },
    },
    {
        accent: "amber",
        role: "Founder",
        company: "Exotic Store",
        kind: "Venture",
        period: "Feb 2021 — Present",
        location: "Lahore, Pakistan",
        description:
            "Founded and runs an esports/gaming store trading game accounts and services, operated through WhatsApp and Telegram with cryptocurrency settlement.",
        responsibilities: [
            "Own inventory and pricing decisions",
            "Manage partner relationships and fulfilment",
            "Handle crypto payment operations",
        ],
        tags: ["E-commerce", "Operations", "Cryptocurrency"],
        current: true,
        start: { year: 2021, month: 2 },
    },
    {
        accent: "emerald",
        role: "AI Systems Builder & Founder",
        company: "Independent Ventures",
        kind: "Independent",
        period: "2021 — Present",
        location: "Various",
        description:
            "Runs LadiesHub.pk and trades cryptocurrency on Binance.",
        responsibilities: [
            "Operate LadiesHub.pk end to end",
            "Active cryptocurrency trading on Binance",
        ],
        tags: ["E-commerce", "Trading", "Operations"],
        current: true,
        // Year only — no month is stated in the source content.
        start: { year: 2021 },
    },
];
