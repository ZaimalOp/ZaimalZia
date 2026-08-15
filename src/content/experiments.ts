export interface Experiment {
    id: string;
    name: string;
    tagline: string;
    category: string;
    domain: "automation" | "graphics" | "vision" | "nlp";
    description: string;
    /**
     * Capabilities the system actually demonstrates. These describe the work
     * already listed in `breakdown` — they are not additional tech claims.
     */
    techniques: string[];
    /** Revealed on hover / focus as the technical breakdown. */
    breakdown: string[];
    stack: string[];
    metrics: { label: string; value: string }[];
    url: string;
}

export const experiments: Experiment[] = [
    {
        id: "autolister",
        name: "Shopify Autolister",
        tagline: "Drive → LLM → live product listing",
        category: "AI automation · Vision LLM · Shopify API",
        domain: "automation",
        description:
            "An unattended pipeline that turns a folder of product photographs into published Shopify listings. Images are pulled from Drive, a vision LLM reads the product attributes out of them, and the catalogue entry is created and filled in automatically.",
        breakdown: [
            "Pulls new product images from a Google Drive folder",
            "A vision LLM extracts attributes directly from the photographs",
            "Model output is coerced into a structured listing schema",
            "Shopify Admin API creates the product and fills every field — title, description, size and the rest",
            "Runs end to end with no human in the loop, replacing one-by-one manual listing",
        ],
        techniques: [
            "Workflow automation",
            "Vision LLM extraction",
            "Structured output",
            "API orchestration",
            "Unattended pipeline",
        ],
        stack: ["Vision LLM", "Google Drive API", "Shopify Admin API", "Structured extraction", "Workflow automation"],
        metrics: [
            { label: "Pipeline", value: "Autonomous" },
            { label: "Input", value: "Drive images" },
            { label: "Output", value: "Live listings" },
        ],
        url: "https://github.com/ZaimalOp",
    },
    {
        id: "kratos",
        name: "KRATOS",
        tagline: "Heavy Mode — cyberpunk OS simulation",
        category: "WebGPU · 3D UI · Real-time",
        domain: "graphics",
        description:
            "A cinematic browser experience simulating a distributed GPU compute node, with a draggable desktop shell over a real WebGPU compute pipeline.",
        techniques: [
            "GPU compute shaders",
            "Real-time rendering",
            "Realtime state sync",
            "Procedural graphics",
            "Spatial audio",
        ],
        breakdown: [
            "WGSL compute shaders running on WebGPU",
            "Three.js scene compositing behind the UI layer",
            "Draggable window manager and Matrix-rain canvas",
            "Firebase realtime node synchronisation",
            "Web Audio API for interface feedback",
        ],
        stack: ["WebGPU", "WGSL", "Three.js", "Firebase", "Web Audio API"],
        metrics: [
            // Kept short: these sit in a three-up grid and truncate if longer.
            { label: "Architecture", value: "Client-side" },
            { label: "Graphics", value: "WebGPU" },
            { label: "Sync", value: "Realtime DB" },
        ],
        url: "https://github.com/ZaimalOp",
    },
    {
        id: "sentinel",
        name: "Sentinel Omega",
        tagline: "Autonomous AI surveillance",
        category: "Computer vision · YOLOv8 · ANPR",
        domain: "vision",
        description:
            "A computer-vision system for real-time forensic analysis, combining object detection, biometric face recognition and automatic number-plate recognition over a geospatial tracking layer.",
        techniques: [
            "Object detection",
            "Biometric face matching",
            "OCR / ANPR",
            "GPU inference",
            "Geospatial analysis",
            "Multi-model pipeline",
        ],
        breakdown: [
            "YOLOv8 medium detector trained on a T4 GPU",
            "DeepFace embeddings for biometric matching",
            "EasyOCR pipeline for number-plate recognition",
            "Geospatial heatmap tracking of detections",
            "Streamlit control surface for review",
        ],
        stack: ["Python", "YOLOv8", "DeepFace", "EasyOCR", "Streamlit"],
        metrics: [
            { label: "mAP @ 0.50", value: "78.2%" },
            { label: "Inference", value: "~12 ms" },
            { label: "Model", value: "YOLOv8-M" },
        ],
        url: "https://github.com/ZaimalOp",
    },
    {
        id: "foodfaith",
        name: "Food Faith Classifier",
        tagline: "NLP dietary engine",
        category: "Machine learning · NLP · Flask",
        domain: "nlp",
        description:
            "A classifier that sorts food items into Halal/Haram and Vegetarian/Non-Vegetarian categories from text alone, served behind a lightweight API.",
        techniques: [
            "Text vectorisation",
            "Multi-class classification",
            "Model serving",
            "Data normalisation",
        ],
        breakdown: [
            "TF-IDF vectorisation over ingredient and dish text",
            "scikit-learn classifiers across four target categories",
            "Pandas preprocessing and label normalisation",
            "Flask API serving predictions to a web front end",
        ],
        stack: ["Python", "Flask", "scikit-learn", "TF-IDF", "Pandas"],
        metrics: [
            { label: "Vectorisation", value: "TF-IDF" },
            { label: "Backend", value: "Flask" },
            { label: "Classes", value: "4 categories" },
        ],
        url: "https://github.com/ZaimalOp",
    },
];
