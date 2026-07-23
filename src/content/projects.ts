export const featuredProjects = [
    {
        name: "NeuroFusion AI",
        category: "Multi-Modal ML · Built end-to-end from scratch",
        description: "A machine-learning system that screens for Parkinson's disease by fusing signals across multiple behavioral and physiological modalities. Built with strict subject-grouped cross-validation and leakage auditing.",
        stack: ["Python", "PyTorch", "XGBoost", "FastAPI", "Flutter"],
        metrics: [
            { label: "Voice AUC", value: "≈ 0.87" },
            { label: "Gait AUC", value: "≈ 0.84" },
            { label: "Handwriting AUC", value: "≈ 0.89" }
        ],
        href: "#neurofusion-case-study"
    },
    {
        name: "Hafeez Center Platform",
        category: "Two-sided marketplace · Product strategy & full-stack build",
        description: "A web-first market-discovery and trust platform bringing an informal cash electronics bazaar online. Features a WhatsApp-native request-broadcast engine and Supabase data layer.",
        stack: ["Next.js", "Capacitor", "Supabase", "Firebase", "Node.js"],
        metrics: [
            { label: "Product Phases", value: "15" },
            { label: "Strategy", value: "Lean Hybrid" },
            { label: "Stack", value: "Web + Android" }
        ],
        href: "#hafeez-case-study"
    }
];