import { SkillCategory, Repo } from "@/types";

export const aboutMe = {
    title: "AI Systems Builder & Founder",
    bio: "I pair a rigorous research mindset with a builder's bias for shipping. Currently leading AI/ML research at Tkhex while completing my BS in AI. I design end-to-end ML systems with a strong emphasis on honest evaluation, explainability, and guarding against data leakage rather than chasing inflated metrics. Alongside research, I found and run digital ventures, giving me a rare blend of technical depth and entrepreneurial execution.",
    location: "Faisalabad, Pakistan",
    education: "BS Artificial Intelligence · COMSATS (2027)",
    beyondCode: ["Cricket", "Early-morning gym", "Philosophy & societal content creation"]
};

export const technicalArsenal: SkillCategory[] = [
    {
        category: "AI & Machine Learning",
        icon: "BrainCircuit",
        skills: ["PyTorch", "XGBoost", "scikit-learn", "1D-CNN", "MobileNetV2", "Subject-grouped CV", "Grad-CAM", "Leakage Auditing"]
    },
    {
        category: "Engineering & Frameworks",
        icon: "Code2",
        skills: ["Python", "TypeScript", "Next.js", "FastAPI", "Flutter", "React Native", "Node.js", "Capacitor"]
    },
    {
        category: "Data & Infrastructure",
        icon: "Database",
        skills: ["PostgreSQL", "Supabase", "Redis", "Firebase", "AWS", "Google Colab", "GA4"]
    },
    {
        category: "Product & Strategy",
        icon: "Compass",
        skills: ["Product Definition", "Startup Strategy", "Figma (UI/UX)", "Agile/Gantt", "Prompt Engineering", "Agentic AI"]
    }
];

export const engineeringPulse: Repo[] = [
    {
        name: "NeuroFusion-AI",
        description: "Multi-modal Parkinson's screening pipeline. Built with PyTorch & FastAPI.",
        tech: ["Python", "PyTorch", "scikit-learn"],
        url: "https://github.com/ZaimalOp",
        highlight: true
    },
    {
        name: "Hafeez-Center-Platform",
        description: "Two-sided retail discovery marketplace. Next.js, Supabase, WhatsApp integration.",
        tech: ["Next.js", "TypeScript", "Supabase"],
        url: "https://github.com/ZaimalOp",
        highlight: true
    },
    {
        name: "Sentinel-Omega",
        description: "Autonomous AI surveillance system with YOLOv8, DeepFace, and ANPR.",
        tech: ["Python", "YOLOv8", "DeepFace"],
        url: "https://github.com/ZaimalOp",
        highlight: true
    },
    {
        name: "KRATOS-Heavy-Mode",
        description: "Cyberpunk OS simulation with WebGPU compute and Three.js.",
        tech: ["JavaScript", "WebGPU", "Three.js"],
        url: "https://github.com/ZaimalOp",
        highlight: true
    }
];