/**
 * Capability architecture.
 *
 * Scope note: this describes what Zaimal builds and delivers, including work
 * carried out with his team. It is organised by what the capability lets him
 * do rather than as a flat keyword list.
 */

export type Accent = "primary" | "violet" | "emerald" | "amber" | "cyan" | "rose";

export interface StackNode {
    id: string;
    domain: string;
    /** Each domain carries its own hue so the section reads as a palette. */
    accent: Accent;
    icon: "brain" | "spark" | "code" | "server" | "database" | "compass";
    /** What this domain actually means in practice, in one line. */
    summary: string;
    branches: { name: string; items: string[] }[];
}

export const stackTree: StackNode[] = [
    {
        id: "ml",
        accent: "primary",
        domain: "AI / ML Foundations",
        icon: "brain",
        summary: "Model development under evaluation protocols designed to catch my own errors.",
        branches: [
            {
                name: "Modelling",
                items: ["PyTorch", "TensorFlow", "scikit-learn", "XGBoost", "LightGBM", "1D-CNN", "MobileNetV2", "Transformers"],
            },
            {
                name: "Evaluation",
                items: ["Subject-grouped CV", "Nested CV", "Probability calibration", "Leakage auditing", "Benchmarking"],
            },
            {
                name: "Explainability",
                items: ["Grad-CAM", "SHAP", "Feature importance", "Confound audits"],
            },
            {
                name: "Applied",
                items: ["Computer vision", "NLP", "Speech", "Multi-modal fusion", "Time series"],
            },
        ],
    },
    {
        id: "genai",
        accent: "violet",
        domain: "LLM, Agents & Automation",
        icon: "spark",
        summary: "Systems built on top of foundation models — retrieval, agents, and automations that remove work rather than demo well.",
        branches: [
            {
                name: "Applications",
                items: ["RAG pipelines", "Agentic AI", "Tool / function calling", "MCP", "Structured output"],
            },
            {
                name: "AI Automation",
                items: [
                    "Workflow automation",
                    "n8n",
                    "Make",
                    "Zapier",
                    "Multi-agent orchestration",
                    "Browser automation",
                    "Webhooks & integrations",
                    "Document extraction",
                ],
            },
            {
                name: "Adaptation",
                items: ["Prompt engineering", "Fine-tuning", "LoRA / QLoRA", "Quantisation", "Distillation"],
            },
            {
                name: "Tooling",
                items: ["Hugging Face", "LangChain", "LlamaIndex", "vLLM", "Ollama", "OpenAI / Anthropic APIs"],
            },
            {
                name: "Quality",
                items: ["Eval harnesses", "LLM-as-judge", "Guardrails", "Hallucination testing", "Prompt regression"],
            },
        ],
    },
    {
        id: "engineering",
        accent: "cyan",
        domain: "Engineering",
        icon: "code",
        summary: "Shipping the system around the model — APIs, apps and the glue between them.",
        branches: [
            { name: "Languages", items: ["Python", "TypeScript", "JavaScript", "Go", "SQL"] },
            { name: "Web", items: ["Next.js", "React", "Node.js", "Tailwind CSS", "Vite"] },
            { name: "Services", items: ["FastAPI", "Flask", "REST", "GraphQL", "gRPC", "WebSockets"] },
            { name: "Mobile", items: ["Flutter", "React Native", "Capacitor (Ionic)"] },
        ],
    },
    {
        id: "infra",
        accent: "amber",
        domain: "Infrastructure & Cloud",
        icon: "server",
        summary: "Getting models and services into production, and keeping them observable once they are there.",
        branches: [
            { name: "Cloud", items: ["AWS", "GCP", "Vercel", "Cloudflare", "Google Colab"] },
            { name: "Containers & CI", items: ["Docker", "Kubernetes", "GitHub Actions", "Terraform"] },
            { name: "MLOps", items: ["MLflow", "Weights & Biases", "Model registry", "Experiment tracking", "GPU training"] },
            { name: "Serving & Scale", items: ["Model serving", "Inference optimisation", "Celery", "Redis queues", "Kafka"] },
        ],
    },
    {
        id: "data",
        accent: "emerald",
        domain: "Data & Search",
        icon: "database",
        summary: "Storage, retrieval and search paths that hold up outside a demo.",
        branches: [
            { name: "Databases", items: ["PostgreSQL", "Supabase", "Redis", "Firebase", "MongoDB"] },
            { name: "Vector & Retrieval", items: ["pgvector", "Qdrant", "Pinecone", "Embeddings", "Hybrid search"] },
            { name: "Search", items: ["Postgres full-text", "Elasticsearch", "Semantic search", "Roman-Urdu synonym expansion"] },
            { name: "Pipelines", items: ["Pandas", "NumPy", "ETL", "Feature engineering", "Data validation"] },
        ],
    },
    {
        id: "product",
        accent: "rose",
        domain: "Product & Venture",
        icon: "compass",
        summary: "Deciding what to build, in what order, and how to know it worked.",
        branches: [
            { name: "Strategy", items: ["Product definition", "TAM / SAM / SOM", "Gate-based KPIs", "Risk register", "Pricing"] },
            { name: "Execution", items: ["Agile / Gantt", "30-60-90 planning", "Evidence-gated staging", "Roadmapping"] },
            { name: "Design", items: ["Figma (UI/UX)", "Design systems", "Trust & anti-fraud design"] },
            { name: "Venture", items: ["Founding", "Operations", "Growth", "Analytics (GA4)"] },
        ],
    },
];
