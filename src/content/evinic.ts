export const evinicCaseStudy = {
    title: "Evinic",
    subtitle: "Digital retail navigation platform",
    status: "Founder / Product · Full-Stack Build · In development",
    overview: "A web-first market-discovery and trust platform that brings informal cash electronics bazaars online, starting with Lahore's Hafeez Center as the first market. Its hero feature is a WhatsApp-native request-broadcast engine that gets shoppers trusted answers in minutes, with a verified shop directory serving as the data layer.",
    problem: "Informal physical tech markets lack digital trust and discovery. Shoppers cannot easily verify stock, pricing, or shop reputation without physically visiting the market or relying on fragmented, unverified WhatsApp groups.",
    solution: "A two-sided marketplace bridging the gap between shoppers and shopkeepers. By utilizing a WhatsApp-native request-broadcast engine, the platform matches shopper demands with verified vendors instantly, providing a trusted, evidence-gated discovery experience.",
    productStrategy: [
        {
            title: "15-Phase Product Definition",
            description: "Driven through a rigorous 15-phase process into a complete Startup Masterplan (v3) covering vision, TAM/SAM/SOM, gate-based KPIs, revenue model, expansion strategy, risk register, and a 30/60/90 execution plan."
        },
        {
            title: "Lean Hybrid Model",
            description: "Category-focused launch strategy (mobile repair & parts). Evidence-gated feature staging ensures development is tied to real user demand."
        },
        {
            title: "Trust & Anti-Fraud Safeguards",
            description: "Implemented a verified-review system with strict anti-fraud safeguards to maintain marketplace integrity in a historically cash-only, informal economy."
        }
    ],
    architecture: [
        {
            title: "Web + Mobile Wrapper",
            description: "Next.js (web-first) architecture wrapped for Android via Capacitor (Ionic), ensuring a single codebase deployment."
        },
        {
            title: "Backend & Data Layer",
            description: "Supabase (PostgreSQL, Auth, Storage) acting as the core data layer. Includes Postgres full-text search augmented with Roman-Urdu synonyms for localized search."
        },
        {
            title: "Notification & Comms",
            description: "Firebase Cloud Messaging for push notifications and OTP authentication. WhatsApp Business API integration for the core request-broadcast engine."
        }
    ],
    stack: ["Next.js", "Capacitor (Ionic)", "Supabase", "PostgreSQL", "Firebase", "WhatsApp Business API", "Node.js", "GA4"],

    marketInsight:
        "The market already runs on WhatsApp — fragmented, unverified groups where price and stock discovery happens by broadcast. The opportunity was not to replace that behaviour but to structure it and attach identity, verification and a searchable directory to it.",

    /**
     * The product definition ran as a 15-phase process. Listed below are the
     * artifacts that process is documented as producing in Masterplan v3 —
     * not a renaming of all 15 phases.
     */
    masterplan: {
        processLabel: "15-phase product definition",
        documentLabel: "Startup Masterplan v3",
        artifacts: [
            { name: "Vision", note: "Problem framing and the end-state the product is aiming at." },
            { name: "TAM / SAM / SOM", note: "Market sizing from the total category down to a serviceable obtainable share." },
            { name: "Gate-based KPIs", note: "Metrics that must clear a threshold before the next stage unlocks." },
            { name: "Revenue model", note: "How the marketplace captures value in a cash-first economy." },
            { name: "Expansion strategy", note: "Sequencing beyond the launch category and market." },
            { name: "Risk register", note: "Named failure modes with mitigations, including fraud and trust risk." },
            { name: "30 / 60 / 90 plan", note: "Execution schedule for the first three months." },
        ],
    },

    trustSystem: [
        { title: "Verified vendors", detail: "Shops are verified before they can answer broadcast requests." },
        { title: "Evidence-gated reviews", detail: "A verified-review system with anti-fraud safeguards, built for a market with no prior digital reputation layer." },
        { title: "Identity & OTP", detail: "Firebase OTP authentication ties accounts to reachable phone numbers." },
    ],

    /** The hero flow, as a sequence a shopper actually moves through. */
    requestFlow: [
        { step: "Request", detail: "Shopper posts what they need — part, model, budget." },
        { step: "Broadcast", detail: "The request fans out to verified vendors in the matching category." },
        { step: "Respond", detail: "Vendors reply with stock and pricing through WhatsApp." },
        { step: "Compare", detail: "Shopper sees responses side by side against shop reputation." },
        { step: "Transact", detail: "Conversation continues in WhatsApp, where the market already operates." },
    ],

    roadmap: "Category-focused launch in mobile repair and parts, with further categories gated on demand evidence.",

    /**
     * System topology, drawn from the documented stack above — clients on top,
     * one application layer, three service pillars underneath.
     */
    systemNodes: {
        clients: [
            {
                id: "web",
                name: "Web",
                tech: "Next.js",
                detail: "Web-first surface. The primary target, since discovery starts in a browser.",
            },
            {
                id: "android",
                name: "Android",
                tech: "Capacitor (Ionic)",
                detail: "The same codebase wrapped for Android rather than a second native app.",
            },
        ],
        core: {
            id: "app",
            name: "Application layer",
            tech: "Next.js · Node.js",
            detail: "One codebase serving both targets, holding the directory, matching and request logic.",
        },
        services: [
            {
                id: "data",
                name: "Data",
                tech: "Supabase · PostgreSQL",
                detail: "Postgres, Auth and Storage. Full-text search augmented with Roman-Urdu synonyms so local spellings still resolve.",
            },
            {
                id: "comms",
                name: "Messaging",
                tech: "WhatsApp Business API",
                detail: "The request-broadcast engine. Requests fan out to verified vendors where the market already talks.",
            },
            {
                id: "notify",
                name: "Identity & push",
                tech: "Firebase",
                detail: "Cloud Messaging for push notifications, plus OTP authentication tying accounts to reachable numbers.",
            },
        ],
    },
};