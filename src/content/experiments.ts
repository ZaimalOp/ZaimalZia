export interface Experiment {
    name: string;
    tagline: string;
    category: string;
    description: string;
    stack: string[];
    metrics: { label: string; value: string }[];
    url: string;
}

export const experiments: Experiment[] = [
    {
        name: "KRATOS // HEAVY MODE",
        tagline: "Cyberpunk OS Simulation",
        category: "WebGPU · 3D UI · Real-time",
        description: "A cinematic cyberpunk browser experience simulating a distributed GPU compute node. Features a draggable desktop UI, WebGPU compute shaders, Three.js backgrounds, Matrix rain, and Firebase realtime node synchronization.",
        stack: ["WebGPU", "WGSL", "Three.js", "Firebase", "Web Audio API"],
        metrics: [
            { label: "Architecture", value: "Client-Side" },
            { label: "Graphics", value: "WebGPU / Canvas" },
            { label: "Sync", value: "Realtime DB" }
        ],
        url: "https://github.com/ZaimalOp"
    },
    {
        name: "Sentinel Omega",
        tagline: "Autonomous AI Surveillance",
        category: "Computer Vision · YOLOv8 · ANPR",
        description: "An enterprise-grade computer vision system for real-time forensic analysis. Integrates biometric face recognition (DeepFace), automatic number plate recognition (EasyOCR), and geospatial heatmap tracking on a T4 GPU.",
        stack: ["Python", "YOLOv8", "DeepFace", "EasyOCR", "Streamlit"],
        metrics: [
            { label: "mAP @ 0.50", value: "78.2%" },
            { label: "Inference", value: "~12ms" },
            { label: "Model", value: "YOLOv8 Med" }
        ],
        url: "https://github.com/ZaimalOp"
    },
    {
        name: "Food Faith Classifier",
        tagline: "NLP Dietary Engine",
        category: "Machine Learning · NLP · Flask",
        description: "An AI-powered web application that classifies food based on Halal/Haram and Vegetarian/Non-Vegetarian categories. Uses TF-IDF text vectorization and Scikit-learn models served via a lightweight Flask API.",
        stack: ["Python", "Flask", "Scikit-learn", "TF-IDF", "Pandas"],
        metrics: [
            { label: "Vectorization", value: "TF-IDF" },
            { label: "Backend", value: "Flask" },
            { label: "Classes", value: "4 Categories" }
        ],
        url: "https://github.com/ZaimalOp"
    }
];